'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Stats {
  totalRevenue: number;
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  totalOrders: number;
  todayOrders: number;
  weekOrders: number;
  monthOrders: number;
  averageOrderValue: number;
  pendingOrders: number;
}

interface RecentOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
}

interface TopProduct {
  name: string;
  slug: string;
  total_sold: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    todayRevenue: 0,
    weekRevenue: 0,
    monthRevenue: 0,
    totalOrders: 0,
    todayOrders: 0,
    weekOrders: 0,
    monthOrders: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get all orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (orders) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const paidOrders = orders.filter((o) => o.payment_status === 'paid');
        const todayOrders = paidOrders.filter((o) => new Date(o.created_at) >= today);
        const weekOrders = paidOrders.filter((o) => new Date(o.created_at) >= weekAgo);
        const monthOrders = paidOrders.filter((o) => new Date(o.created_at) >= monthAgo);

        const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
        const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
        const weekRevenue = weekOrders.reduce((sum, o) => sum + o.total, 0);
        const monthRevenue = monthOrders.reduce((sum, o) => sum + o.total, 0);

        setStats({
          totalRevenue,
          todayRevenue,
          weekRevenue,
          monthRevenue,
          totalOrders: paidOrders.length,
          todayOrders: todayOrders.length,
          weekOrders: weekOrders.length,
          monthOrders: monthOrders.length,
          averageOrderValue: paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0,
          pendingOrders: orders.filter((o) => o.order_status === 'pending').length,
        });

        // Recent orders (last 10)
        setRecentOrders(orders.slice(0, 10));

        // Top products (mock for now - needs order_items join)
        // TODO: Create proper query when order_items table exists
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Dashboard laden...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>
          Welkom terug! Hier is een overzicht van je webshop.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <StatCard
          icon="fa-euro-sign"
          label="Vandaag Omzet"
          value={`€${stats.todayRevenue.toFixed(2)}`}
          color="#61CE70"
        />
        <StatCard
          icon="fa-box"
          label="Vandaag Bestellingen"
          value={stats.todayOrders.toString()}
          color="#29AAE3"
        />
        <StatCard
          icon="fa-chart-line"
          label="Gemiddelde Order"
          value={`€${stats.averageOrderValue.toFixed(2)}`}
          color="#9333ea"
        />
        <StatCard
          icon="fa-clock"
          label="In Afwachting"
          value={stats.pendingOrders.toString()}
          color="#f59e0b"
        />
      </div>

      {/* Revenue Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <RevenueCard period="Week" revenue={stats.weekRevenue} orders={stats.weekOrders} />
        <RevenueCard period="Maand" revenue={stats.monthRevenue} orders={stats.monthOrders} />
        <RevenueCard period="Totaal" revenue={stats.totalRevenue} orders={stats.totalOrders} />
      </div>

      {/* Recent Orders */}
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>
            <i className="fas fa-clock" style={{ marginRight: '12px', color: '#1266BD' }} />
            Recente Bestellingen
          </h2>
          <Link
            href="/admin/bestellingen"
            style={{
              fontSize: '14px',
              color: '#1266BD',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Alles bekijken →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Nog geen bestellingen
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                    ORDER
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                    KLANT
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                    DATUM
                  </th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                    BEDRAG
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px' }}>
                      <Link
                        href={`/admin/bestellingen/${order.id}`}
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1266BD',
                          textDecoration: 'none',
                        }}
                      >
                        #{order.order_number}
                      </Link>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                        {order.customer_name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{order.customer_email}</div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>
                      {new Date(order.created_at).toLocaleDateString('nl-NL')}
                    </td>
                    <td style={{ padding: '16px', fontSize: '15px', fontWeight: '600', color: '#1e293b', textAlign: 'right' }}>
                      €{order.total.toFixed(2)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <StatusBadge status={order.order_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className={`fas ${icon}`} style={{ fontSize: '20px', color }} />
        </div>
        <div>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>{label}</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{value}</div>
        </div>
      </div>
    </div>
  );
}

function RevenueCard({ period, revenue, orders }: { period: string; revenue: number; orders: number }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '12px' }}>
        {period.toUpperCase()}
      </div>
      <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
        €{revenue.toFixed(2)}
      </div>
      <div style={{ fontSize: '14px', color: '#64748b' }}>
        {orders} {orders === 1 ? 'bestelling' : 'bestellingen'}
      </div>
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
