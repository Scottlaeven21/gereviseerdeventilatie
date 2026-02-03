'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from './CartItem';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isCartOpen, closeCart, getCartTotal, getCartCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const cartTotal = getCartTotal();
  const cartCount = getCartCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          onClick={closeCart}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 9998,
            opacity: 1,
            transition: 'opacity 0.2s ease-out',
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isCartOpen ? 0 : '-450px',
          width: '450px',
          height: '100vh',
          background: '#f8f9fa',
          zIndex: 9999,
          transition: 'right 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isCartOpen ? '-4px 0 24px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            background: '#1266BD',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fas fa-shopping-cart" style={{ fontSize: '24px' }} />
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>
                Winkelwagen
              </h2>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>
                {mounted ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : '...'}
              </div>
            </div>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'none')}
            aria-label="Sluit winkelwagen"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Cart Items */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#64748b',
              }}
            >
              <i
                className="fas fa-shopping-cart"
                style={{ fontSize: '64px', marginBottom: '24px', opacity: 0.2 }}
              />
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>
                Je winkelwagen is leeg
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '24px' }}>
                Voeg producten toe om te beginnen met winkelen
              </p>
              <Link
                href="/producten"
                onClick={closeCart}
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: '#1266BD',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#29AAE3')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#1266BD')}
              >
                Bekijk Producten
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <CartItem key={item.product.id} item={item} onClose={closeCart} />
            ))
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: '24px',
              background: 'white',
              borderTop: '1px solid #e5e7eb',
              flexShrink: 0,
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#64748b' }}>
                Subtotaal
              </span>
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>
                €{cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Shipping Note */}
            <div
              style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fas fa-truck-fast" style={{ color: '#61CE70' }} />
              <span>
                {cartTotal >= 25 ? (
                  <strong style={{ color: '#61CE70' }}>Gratis verzending!</strong>
                ) : (
                  `Nog €${(25 - cartTotal).toFixed(2)} voor gratis verzending`
                )}
              </span>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href="/checkout"
                onClick={closeCart}
                style={{
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
                  display: 'block',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#29AAE3')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#1266BD')}
              >
                Afrekenen
              </Link>

              <Link
                href="/winkelwagen"
                onClick={closeCart}
                style={{
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
                  display: 'block',
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
                Bekijk Winkelwagen
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
