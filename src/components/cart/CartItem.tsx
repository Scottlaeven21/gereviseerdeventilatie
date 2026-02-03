'use client';

import Link from 'next/link';
import { CartItem as CartItemType } from '@/store/cartStore';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
  onClose?: () => void;
}

export function CartItem({ item, onClose }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto',
        gap: '16px',
        padding: '16px',
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #f0f0f0',
      }}
    >
      {/* Product Image */}
      <Link
        href={`/product/${product.slug}`}
        onClick={onClose}
        style={{
          display: 'block',
          width: '80px',
          height: '80px',
          background: '#f8f9fa',
          borderRadius: '8px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '8px',
          }}
        />
      </Link>

      {/* Product Info */}
      <div style={{ minWidth: 0 }}>
        <Link
          href={`/product/${product.slug}`}
          onClick={onClose}
          style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#1266BD',
            textDecoration: 'none',
            display: 'block',
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          {product.name}
        </Link>

        <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
          €{product.price.toFixed(2)}
        </div>

        {/* Quantity Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            style={{
              width: '28px',
              height: '28px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#1266BD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Verlaag aantal"
          >
            -
          </button>
          <span style={{ fontSize: '14px', fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={product.stock !== undefined && quantity >= product.stock}
            style={{
              width: '28px',
              height: '28px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: product.stock !== undefined && quantity >= product.stock ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#1266BD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: product.stock !== undefined && quantity >= product.stock ? 0.5 : 1,
            }}
            aria-label="Verhoog aantal"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button & Subtotal */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <button
          onClick={() => removeItem(product.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#dc2626',
            fontSize: '18px',
            padding: '4px',
          }}
          aria-label="Verwijder uit winkelwagen"
        >
          <i className="fas fa-trash" />
        </button>

        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
          €{(product.price * quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
