'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || searchParams.get('orderId') || 'UNKNOWN';
  const { clearCart } = useCartStore();

  // Clear cart when payment is successful
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container-boxed">
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textAlign: 'center',
          }}
        >
          {/* Success Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              background: '#61CE70',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
            }}
          >
            <i className="fas fa-check" style={{ fontSize: '40px', color: 'white' }} />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '16px',
            }}
          >
            Bedankt voor je bestelling!
          </h1>

          {/* Message */}
          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              lineHeight: '1.6',
              marginBottom: '32px',
            }}
          >
            Je bestelling is succesvol geplaatst en wordt zo snel mogelijk verwerkt.
            Je ontvangt een bevestigingsmail met alle details.
          </p>

          {/* Order Number */}
          <div
            style={{
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px',
            }}
          >
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
              Bestelnummer
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1266BD',
                fontFamily: 'monospace',
              }}
            >
              {orderNumber}
            </div>
          </div>

          {/* Info Boxes */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                background: '#f0f7ff',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <i
                className="fas fa-envelope"
                style={{ fontSize: '24px', color: '#1266BD', marginBottom: '12px' }}
              />
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                E-mail bevestiging
              </div>
            </div>
            <div
              style={{
                background: '#f0f7ff',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <i
                className="fas fa-truck-fast"
                style={{ fontSize: '24px', color: '#1266BD', marginBottom: '12px' }}
              />
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                Verzending binnen 48u
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              href="/"
              style={{
                display: 'block',
                width: '100%',
                padding: '16px',
                background: '#1266BD',
                color: 'white',
                textAlign: 'center',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#29AAE3')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#1266BD')}
            >
              Terug naar Home
            </Link>

            <Link
              href="/producten"
              style={{
                display: 'block',
                width: '100%',
                padding: '16px',
                background: 'white',
                color: '#1266BD',
                textAlign: 'center',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                border: '2px solid #1266BD',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#1266BD';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#1266BD';
              }}
            >
              Bekijk Meer Producten
            </Link>
          </div>

          {/* Contact Info */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '32px',
              borderTop: '1px solid #e5e7eb',
              fontSize: '14px',
              color: '#64748b',
            }}
          >
            <p style={{ marginBottom: '8px' }}>
              <strong>Vragen over je bestelling?</strong>
            </p>
            <p>
              <i className="fas fa-phone" style={{ marginRight: '8px', color: '#1266BD' }} />
              <a href="tel:+31612345678" style={{ color: '#1266BD', textDecoration: 'none' }}>
                +31 6 12 34 56 78
              </a>
            </p>
            <p>
              <i className="fas fa-envelope" style={{ marginRight: '8px', color: '#1266BD' }} />
              <a href="mailto:info@gereviseerdeventilatie.nl" style={{ color: '#1266BD', textDecoration: 'none' }}>
                info@gereviseerdeventilatie.nl
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Laden...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
