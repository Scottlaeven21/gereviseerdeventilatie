'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
  tracking_code: string | null;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchQuery, statusFilter, paymentFilter, orders]);

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
      setFilteredOrders(data);
    }
    setLoading(false);
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.order_number.toLowerCase().includes(query) ||
          o.customer_name.toLowerCase().includes(query) ||
          o.customer_email.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((o) => o.order_status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter((o) => o.payment_status === paymentFilter);
    }

    setFilteredOrders(filtered);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Bestellingen laden...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Bestellingen
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>
          Beheer en volg alle bestellingen van je klanten
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <div className="filters-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
          {/* Search */}
          <input
            type="text"
            placeholder="Zoek op ordernummer, naam of email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          />

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="all">Alle Statussen</option>
            <option value="pending">In Afwachting</option>
            <option value="processing">Verwerken</option>
            <option value="shipped">Verzonden</option>
            <option value="delivered">Afgeleverd</option>
            <option value="cancelled">Geannuleerd</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="all">Alle Betalingen</option>
            <option value="paid">Betaald</option>
            <option value="pending">In Afwachting</option>
            <option value="failed">Mislukt</option>
          </select>
        </div>

        {/* Results count */}
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
          {filteredOrders.length} van {orders.length} bestellingen
        </div>
      </div>

      {/* Orders Table */}
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
                ORDER
              </th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                KLANT
              </th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                DATUM
              </th>
              <th style={{ padding: '16px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                BEDRAG
              </th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                BETALING
              </th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                STATUS
              </th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                TRACKING
              </th>
              <th style={{ padding: '16px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                ACTIES
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                  Geen bestellingen gevonden
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                      #{order.order_number}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                      {order.customer_name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{order.customer_email}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>
                    {new Date(order.created_at).toLocaleDateString('nl-NL', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td style={{ padding: '16px', fontSize: '15px', fontWeight: '600', color: '#1e293b', textAlign: 'right' }}>
                    €{order.total.toFixed(2)}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <PaymentBadge status={order.payment_status} />
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <StatusBadge status={order.order_status} />
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                    {order.tracking_code ? (
                      <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>{order.tracking_code}</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <Link
                      href={`/admin/bestellingen/${order.id}`}
                      style={{
                        padding: '8px 16px',
                        background: '#1266BD',
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'inline-block',
                      }}
                    >
                      Bekijken
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .filters-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    pending: { label: 'In Afwachting', bg: '#fef3c7', color: '#a16207' },
    processing: { label: 'Verwerken', bg: '#dbeafe', color: '#1e40af' },
    shipped: { label: 'Verzonden', bg: '#e0e7ff', color: '#4c1d95' },
    delivered: { label: 'Afgeleverd', bg: '#dcfce7', color: '#15803d' },
    cancelled: { label: 'Geannuleerd', bg: '#fee2e2', color: '#b91c1c' },
  }[status] || { label: status, bg: '#f3f4f6', color: '#6b7280' };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
        background: config.bg,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const config = {
    paid: { label: 'Betaald', bg: '#dcfce7', color: '#15803d', icon: 'fa-check-circle' },
    pending: { label: 'In Afwachting', bg: '#fef3c7', color: '#a16207', icon: 'fa-clock' },
    failed: { label: 'Mislukt', bg: '#fee2e2', color: '#b91c1c', icon: 'fa-times-circle' },
  }[status] || { label: status, bg: '#f3f4f6', color: '#6b7280', icon: 'fa-question-circle' };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
        background: config.bg,
        color: config.color,
      }}
    >
      <i className={`fas ${config.icon}`} />
      {config.label}
    </span>
  );
}
