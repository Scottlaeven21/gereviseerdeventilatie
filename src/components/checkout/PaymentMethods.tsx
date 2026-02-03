'use client';

import { useCheckoutStore } from '@/store/checkoutStore';
import { PaymentMethod } from '@/types/checkout';

const paymentMethods: Array<{ id: PaymentMethod; name: string; icon: string; logo: string }> = [
  { id: 'ideal', name: 'iDEAL', icon: 'building-columns', logo: '/images/homepage/ideal.png' },
  { id: 'paypal', name: 'PayPal', icon: 'paypal', logo: '/images/homepage/paypal.png' },
  { id: 'bancontact', name: 'Bancontact', icon: 'credit-card', logo: '/images/homepage/Bancontant.png' },
  { id: 'creditcard', name: 'Creditcard', icon: 'credit-card', logo: '/images/homepage/mastercard.png' },
];

export function PaymentMethods() {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
        Betaalmethode
      </h2>

      <div style={{ display: 'grid', gap: '12px' }}>
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              border: `2px solid ${paymentMethod === method.id ? '#1266BD' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: paymentMethod === method.id ? '#1266BD08' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
            }}
            onMouseOver={(e) => {
              if (paymentMethod !== method.id) {
                e.currentTarget.style.borderColor = '#1266BD';
              }
            }}
            onMouseOut={(e) => {
              if (paymentMethod !== method.id) {
                e.currentTarget.style.borderColor = '#e5e7eb';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Radio Button */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${paymentMethod === method.id ? '#1266BD' : '#cbd5e1'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {paymentMethod === method.id && (
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#1266BD',
                    }}
                  />
                )}
              </div>

              {/* Method Name */}
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                {method.name}
              </span>
            </div>

            {/* Logo */}
            <img
              src={method.logo}
              alt={method.name}
              style={{
                height: '32px',
                maxWidth: '80px',
                objectFit: 'contain',
              }}
            />
          </button>
        ))}
      </div>

      <div
        style={{
          marginTop: '16px',
          padding: '16px',
          background: '#f8f9fa',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '14px',
          color: '#64748b',
        }}
      >
        <i className="fas fa-lock" style={{ color: '#61CE70' }} />
        <span>Alle betalingen worden veilig verwerkt via onze beveiligde betaalpartners</span>
      </div>
    </div>
  );
}
