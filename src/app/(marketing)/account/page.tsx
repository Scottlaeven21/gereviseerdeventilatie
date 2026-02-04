'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  total: number;
  payment_status: string;
  order_status: string;
  items: any[];
}

export default function AccountPage() {
  const router = useRouter();
  const { user, signOut, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Load user orders
  useEffect(() => {
    async function loadOrders() {
      if (!user) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoadingOrders(false);
    }

    loadOrders();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (authLoading || !user) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Laden...</div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container-boxed">
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '32px',
          }}
        >
          Mijn Account
        </h1>

        <div className="account-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
          {/* Sidebar */}
          <div>
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  paddingBottom: '20px',
                  borderBottom: '1px solid #e5e7eb',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: '#1266BD',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}
                >
                  <i className="fas fa-user" style={{ fontSize: '28px', color: 'white' }} />
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                  {user.user_metadata?.full_name || 'Gebruiker'}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{user.email}</div>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href="#orders"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    color: '#1266BD',
                    background: '#f0f7ff',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <i className="fas fa-box" />
                  Mijn Bestellingen
                </a>

                <button
                  onClick={handleSignOut}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    color: '#64748b',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.color = '#e11d48';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <i className="fas fa-sign-out-alt" />
                  Uitloggen
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {/* Orders Section */}
            <div
              id="orders"
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '24px',
                }}
              >
                <i className="fas fa-box" style={{ marginRight: '12px', color: '#1266BD' }} />
                Mijn Bestellingen
              </h2>

              {loadingOrders ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  Bestellingen laden...
                </div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <i
                    className="fas fa-shopping-bag"
                    style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }}
                  />
                  <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px' }}>
                    Je hebt nog geen bestellingen geplaatst
                  </p>
                  <Link
                    href="/producten"
                    style={{
                      display: 'inline-block',
                      padding: '12px 32px',
                      background: '#1266BD',
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                    }}
                  >
                    Bekijk Producten
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                            Bestelling #{order.order_number}
                          </div>
                          <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {new Date(order.created_at).toLocaleDateString('nl-NL', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: '#1266BD', marginBottom: '4px' }}>
                            €{order.total.toFixed(2)}
                          </div>
                          <div
                            style={{
                              fontSize: '12px',
                              fontWeight: '600',
                              padding: '4px 12px',
                              borderRadius: '6px',
                              background:
                                order.payment_status === 'paid'
                                  ? '#dcfce7'
                                  : order.payment_status === 'pending'
                                  ? '#fef3c7'
                                  : '#fee2e2',
                              color:
                                order.payment_status === 'paid'
                                  ? '#15803d'
                                  : order.payment_status === 'pending'
                                  ? '#a16207'
                                  : '#b91c1c',
                            }}
                          >
                            {order.payment_status === 'paid'
                              ? 'Betaald'
                              : order.payment_status === 'pending'
                              ? 'In afwachting'
                              : 'Mislukt'}
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      {order.items && order.items.length > 0 && (
                        <div style={{ fontSize: '14px', color: '#64748b' }}>
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx}>
                              {item.quantity}x {item.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .account-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
