'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  billing_address: any;
  shipping_address: any;
  total: number;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  order_status: string;
  payment_status: string;
  payment_method: string;
  mollie_payment_id: string;
  tracking_code: string | null;
  shipping_carrier: string | null;
  admin_notes: string | null;
  created_at: string;
  items: any;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Edit states
  const [orderStatus, setOrderStatus] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const [shippingCarrier, setShippingCarrier] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [sendEmail, setSendEmail] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (!error && data) {
      setOrder(data);
      setOrderStatus(data.order_status);
      setTrackingCode(data.tracking_code || '');
      setShippingCarrier(data.shipping_carrier || '');
      setAdminNotes(data.admin_notes || '');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const updates = {
      order_status: orderStatus,
      tracking_code: trackingCode || null,
      shipping_carrier: shippingCarrier || null,
      admin_notes: adminNotes || null,
    };

    const { error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId);

    if (!error) {
      // TODO: Send email to customer if sendEmail is true
      // For now, we'll implement this later with Resend
      alert('Bestelling bijgewerkt!');
      loadOrder();
    } else {
      alert('Fout bij opslaan: ' + error.message);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Bestelling laden...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '18px', color: '#ef4444', marginBottom: '16px' }}>
          Bestelling niet gevonden
        </div>
        <Link href="/admin/bestellingen" style={{ color: '#1266BD' }}>
          Terug naar overzicht
        </Link>
      </div>
    );
  }

  const items = order.items ? (Array.isArray(order.items) ? order.items : JSON.parse(order.items)) : [];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link
          href="/admin/bestellingen"
          style={{
            fontSize: '14px',
            color: '#1266BD',
            textDecoration: 'none',
            marginBottom: '12px',
            display: 'inline-block',
          }}
        >
          <i className="fas fa-arrow-left" style={{ marginRight: '8px' }} />
          Terug naar bestellingen
        </Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
              Bestelling #{order.order_number}
            </h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>
              Geplaatst op {new Date(order.created_at).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <PaymentBadge status={order.payment_status} />
            <StatusBadge status={order.order_status} />
          </div>
        </div>
      </div>

      <div className="order-details-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Order Items */}
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
              Bestelde Producten
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingBottom: '16px',
                    borderBottom: idx < items.length - 1 ? '1px solid #f1f5f9' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: '#f1f5f9',
                      borderRadius: '8px',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                      {item.name}
                    </div>
                    {item.variant && (
                      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                        Variant: {item.variant}
                      </div>
                    )}
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      Aantal: {item.quantity}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                      €{item.price.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      per stuk
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>Subtotaal</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                  €{order.subtotal.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>Verzendkosten</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                  €{order.shipping_cost.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>BTW (21%)</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                  €{order.tax.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e7eb',
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Totaal</span>
                <span style={{ fontSize: '20px', fontWeight: '700', color: '#1266BD' }}>
                  €{order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
              Klantgegevens
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Billing Address */}
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '12px' }}>
                  FACTUURADRES
                </div>
                <div style={{ fontSize: '14px', color: '#1e293b', lineHeight: '1.6' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{order.customer_name}</div>
                  <div>{order.billing_address.street} {order.billing_address.houseNumber}</div>
                  <div>{order.billing_address.postalCode} {order.billing_address.city}</div>
                  <div style={{ marginTop: '8px' }}>
                    <a href={`mailto:${order.customer_email}`} style={{ color: '#1266BD' }}>
                      {order.customer_email}
                    </a>
                  </div>
                  {order.customer_phone && (
                    <div>
                      <a href={`tel:${order.customer_phone}`} style={{ color: '#1266BD' }}>
                        {order.customer_phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '12px' }}>
                  VERZENDADRES
                </div>
                <div style={{ fontSize: '14px', color: '#1e293b', lineHeight: '1.6' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{order.customer_name}</div>
                  <div>{order.shipping_address.street} {order.shipping_address.houseNumber}</div>
                  <div>{order.shipping_address.postalCode} {order.shipping_address.city}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Order Status Update */}
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
              Bestelling Bijwerken
            </h2>

            {/* Order Status */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#64748b',
                  marginBottom: '8px',
                }}
              >
                ORDER STATUS
              </label>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              >
                <option value="pending">In Afwachting</option>
                <option value="processing">Verwerken</option>
                <option value="shipped">Verzonden</option>
                <option value="delivered">Afgeleverd</option>
                <option value="cancelled">Geannuleerd</option>
              </select>
            </div>

            {/* Shipping Carrier */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#64748b',
                  marginBottom: '8px',
                }}
              >
                VERZENDER
              </label>
              <select
                value={shippingCarrier}
                onChange={(e) => setShippingCarrier(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              >
                <option value="">Selecteer verzender</option>
                <option value="PostNL">PostNL</option>
                <option value="DHL">DHL</option>
                <option value="DPD">DPD</option>
                <option value="UPS">UPS</option>
                <option value="Eigen bezorging">Eigen bezorging</option>
              </select>
            </div>

            {/* Tracking Code */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#64748b',
                  marginBottom: '8px',
                }}
              >
                TRACK & TRACE CODE
              </label>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="3SABCD1234567"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Admin Notes */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#64748b',
                  marginBottom: '8px',
                }}
              >
                INTERNE NOTITIES
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Notities voor intern gebruik..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Send Email Checkbox */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#1e293b',
                }}
              >
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                Email klant bij status update
              </label>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                width: '100%',
                padding: '12px',
                background: saving ? '#94a3b8' : '#1266BD',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Opslaan...' : 'Wijzigingen Opslaan'}
            </button>
          </div>

          {/* Payment Info */}
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
              Betaalinformatie
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>Betaalmethode</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                  {order.payment_method || 'Niet beschikbaar'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>Mollie Payment ID</span>
                <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#1e293b' }}>
                  {order.mollie_payment_id || '-'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>Status</span>
                <PaymentBadge status={order.payment_status} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 968px) {
          .order-details-grid {
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
        padding: '6px 16px',
        borderRadius: '6px',
        fontSize: '13px',
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
        padding: '6px 16px',
        borderRadius: '6px',
        fontSize: '13px',
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
