'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

export function CartIcon() {
  const { getCartCount, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const cartCount = getCartCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggleCart}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        color: '#54595F',
      }}
      aria-label={mounted ? `Winkelwagen (${cartCount} ${cartCount === 1 ? 'item' : 'items'})` : 'Winkelwagen'}
    >
      <i className="fas fa-shopping-cart" style={{ fontSize: '24px' }} />
      
      {/* Badge - only show after mount to prevent hydration mismatch */}
      {mounted && cartCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: '#61CE70',
            color: 'white',
            fontSize: '11px',
            fontWeight: '700',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white',
          }}
        >
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </button>
  );
}
