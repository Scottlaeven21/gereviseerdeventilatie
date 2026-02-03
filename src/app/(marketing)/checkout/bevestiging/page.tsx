'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { customer } = useCheckoutStore();
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    // Clear cart after successful order
    clearCart();
  }, [orderId, router, clearCart]);

  if (!orderId) {
    return null;
  }

  const orderNumber = `GV-${orderId.toUpperCase().substring(0, 8)}`;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container-boxed" style={{ maxWidth: '800px' }}>
        {/* Success Icon */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: '#61CE70',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(97, 206, 112, 0.3)',
            }}
          >
            <i className="fas fa-check" style={{ fontSize: '60px', color: 'white' }} />
          </div>

          <h1
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '16px',
            }}
          >
            Bestelling Geplaatst!
          </h1>

          <p
            style={{
              fontSize: '18px',
              color: '#64748b',
              marginBottom: '8px',
            }}
          >
            Bedankt voor je bestelling, {customer.firstName}!
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 24px',
              background: '#1266BD15',
              borderRadius: '12px',
              marginTop: '16px',
            }}
          >
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
              Bestelnummer:
            </span>
            <span style={{ fontSize: '18px', color: '#1266BD', fontWeight: '700' }}>
              {orderNumber}
            </span>
          </div>
        </div>

        {/* Confirmation Details */}
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
            Wat gebeurt er nu?
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                icon: 'envelope',
                color: '#1266BD',
                title: 'Bevestiging per e-mail',
                description: `We hebben een bevestiging gestuurd naar ${customer.email} met alle details van je bestelling.`,
              },
              {
                icon: 'box',
                color: '#29AAE3',
                title: 'Bestelling verwerken',
                description: 'Je bestelling wordt nu verwerkt. We controleren de producten en maken ze klaar voor verzending.',
              },
              {
                icon: 'truck-fast',
                color: '#61CE70',
                title: 'Verzending',
                description: 'Binnen 1-2 werkdagen ontvang je een track & trace code om je pakket te volgen.',
              },
              {
                icon: 'home',
                color: '#1266BD',
                title: 'Bezorging',
                description: 'Je bestelling wordt binnen 2-3 werkdagen bij je bezorgd.',
              },
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: `${step.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <i className={`fas fa-${step.icon}`} style={{ fontSize: '24px', color: step.color }} />
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
            Vragen over je bestelling?
          </h3>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px' }}>
            Ons team staat voor je klaar
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="tel:+31652641106"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#1266BD',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#29AAE3')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#1266BD')}
            >
              <i className="fas fa-phone" />
              Bel ons
            </a>

            <a
              href={`https://wa.me/31652641106?text=Ik heb een vraag over bestelling ${orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#25D366',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#128C7E')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#25D366')}
            >
              <i className="fab fa-whatsapp" />
              WhatsApp
            </a>

            <Link
              href="/contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'white',
                color: '#1266BD',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
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
              <i className="fas fa-envelope" />
              E-mail ons
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              background: '#1266BD',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#29AAE3')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#1266BD')}
          >
            <i className="fas fa-home" />
            Terug naar home
          </Link>

          <Link
            href="/producten"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              background: 'white',
              color: '#1266BD',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
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
            <i className="fas fa-shopping-bag" />
            Verder winkelen
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div style={{ background: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '48px', color: '#1266BD', marginBottom: '16px' }} />
            <p style={{ fontSize: '18px', color: '#64748b' }}>Bevestiging laden...</p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
