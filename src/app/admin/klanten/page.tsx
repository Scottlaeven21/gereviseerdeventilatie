'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Customer {
  email: string;
  name: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string | null;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    // Get all orders and group by customer
    const { data: orders } = await supabase
      .from('orders')
      .select('customer_email, customer_name, total, created_at, payment_status')
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: false });

    if (orders) {
      // Group by email
      const customerMap = new Map<string, Customer>();

      orders.forEach((order) => {
        const email = order.customer_email;
        if (!customerMap.has(email)) {
          customerMap.set(email, {
            email,
            name: order.customer_name,
            totalOrders: 0,
            totalSpent: 0,
            lastOrder: null,
          });
        }

        const customer = customerMap.get(email)!;
        customer.totalOrders += 1;
        customer.totalSpent += order.total;
        if (!customer.lastOrder || order.created_at > customer.lastOrder) {
          customer.lastOrder = order.created_at;
        }
      });

      // Convert to array and sort by total spent
      const customersArray = Array.from(customerMap.values()).sort(
        (a, b) => b.totalSpent - a.totalSpent
      );

      setCustomers(customersArray);
    }

    setLoading(false);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Klanten laden...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Klanten
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>
          Overzicht van alle klanten en hun bestellingen
        </p>
      </div>

      {/* Search */}
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <input
          type="text"
          placeholder="Zoek op naam of email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
          {filteredCustomers.length} van {customers.length} klanten
        </div>
      </div>

      {/* Customers Table */}
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f8f9fa' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                KLANT
              </th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                BESTELLINGEN
              </th>
              <th style={{ padding: '16px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                TOTAAL BESTEED
              </th>
              <th style={{ padding: '16px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                GEM. ORDER
              </th>
              <th style={{ padding: '16px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                LAATSTE BESTELLING
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                  Geen klanten gevonden
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.email} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                      {customer.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{customer.email}</div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                    {customer.totalOrders}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right', fontSize: '15px', fontWeight: '700', color: '#1266BD' }}>
                    €{customer.totalSpent.toFixed(2)}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: '#64748b' }}>
                    €{(customer.totalSpent / customer.totalOrders).toFixed(2)}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: '#64748b' }}>
                    {customer.lastOrder
                      ? new Date(customer.lastOrder).toLocaleDateString('nl-NL', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
