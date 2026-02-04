'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '100%',
          maxWidth: '450px',
          background: 'white',
          boxShadow: '-4px 0 16px rgba(0,0,0,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>
            Winkelwagen ({items.length})
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#64748b',
              lineHeight: 1,
            }}
            aria-label="Sluit winkelwagen"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <i className="fas fa-shopping-cart" style={{ fontSize: '64px', opacity: 0.3, marginBottom: '16px' }} />
              <p style={{ fontSize: '18px', fontWeight: '500' }}>Je winkelwagen is leeg</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>Voeg producten toe om te beginnen!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '12px',
                  }}
                >
                  {/* Image */}
                  <img
                    src={item.product.images[0] || '/images/placeholder.png'}
                    alt={item.product.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      background: 'white',
                    }}
                  />

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', lineHeight: 1.4 }}>
                      {item.product.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#61CE70' }}>
                        €{item.product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          border: '1px solid #d1d5db',
                          background: 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          border: '1px solid #d1d5db',
                          background: 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '14px',
                        }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid #e5e7eb',
              background: '#f9fafb',
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
                fontSize: '18px',
              }}
            >
              <span style={{ fontWeight: '600', color: '#1e293b' }}>Subtotaal</span>
              <span style={{ fontWeight: '700', color: '#1266BD' }}>
                €{getTotalPrice().toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={onClose}
              style={{
                display: 'block',
                width: '100%',
                padding: '16px',
                background: '#1266BD',
                color: 'white',
                textAlign: 'center',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#29AAE3';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#1266BD';
              }}
            >
              Naar Afrekenen
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '12px',
                background: 'transparent',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#64748b',
                cursor: 'pointer',
              }}
            >
              Verder winkelen
            </button>
          </div>
        )}
      </div>
    </>
  );
}
