'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export function OrderSummary() {
  const { items, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const btw = subtotal * 0.21;
  const shipping = subtotal >= 25 ? 0 : 6.95;
  const total = subtotal + shipping;

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: '24px',
      }}
    >
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
        Besteloverzicht
      </h2>

      {/* Order Items */}
      <div style={{ marginBottom: '24px' }}>
        {items.map((item) => (
          <div
            key={item.product.id}
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                background: '#f8f9fa',
                padding: '8px',
                flexShrink: 0,
              }}
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.product.name}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                {item.quantity}x €{item.product.price.toFixed(2)}
              </div>
            </div>

            <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', flexShrink: 0 }}>
              €{(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', color: '#64748b' }}>Subtotaal</span>
          <span style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
            €{subtotal.toFixed(2)}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', color: '#64748b' }}>BTW (21%)</span>
          <span style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
            €{btw.toFixed(2)}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', color: '#64748b' }}>Verzendkosten</span>
          <span
            style={{
              fontSize: '15px',
              fontWeight: '600',
              color: shipping === 0 ? '#61CE70' : '#1e293b',
            }}
          >
            {shipping === 0 ? 'Gratis!' : `€${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Total */}
      <div
        style={{
          paddingTop: '24px',
          borderTop: '2px solid #f1f5f9',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>Totaal</span>
          <span style={{ fontSize: '28px', fontWeight: '700', color: '#1266BD' }}>
            €{total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Edit Cart Link */}
      <Link
        href="/winkelwagen"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px',
          color: '#1266BD',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '600',
          borderRadius: '8px',
          transition: 'background 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = '#f8f9fa')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <i className="fas fa-edit" />
        Winkelwagen bewerken
      </Link>
    </div>
  );
}
