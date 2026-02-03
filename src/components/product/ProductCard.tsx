'use client';

import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.3s',
        border: '1px solid #f0f0f0',
        height: '100%',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
    >
      {/* Discount Badge */}
      {(product.discount || discountPercentage) && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: product.discount && !product.discount.startsWith('-') ? '#29AAE3' : '#61CE70',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 1,
          }}
        >
          {product.discount || `-${discountPercentage}%`}
        </div>
      )}

      {/* Stock Badge */}
      {!product.inStock && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#dc2626',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 1,
          }}
        >
          Uitverkocht
        </div>
      )}

      {/* Product Image */}
      <div
        style={{
          height: '220px',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          position: 'relative',
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Product Info */}
      <div style={{ padding: '20px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1266BD',
            marginBottom: '8px',
            minHeight: '48px',
            lineHeight: '1.5',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </h3>

        {/* Short Description */}
        <p
          style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '12px',
            lineHeight: '1.4',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.shortDescription}
        </p>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: product.oldPrice ? '#61CE70' : '#1266BD',
            }}
          >
            €{product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span
              style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#94a3b8',
                textDecoration: 'line-through',
              }}
            >
              €{product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Info */}
        <div
          style={{
            fontSize: '13px',
            color: product.inStock ? '#61CE70' : '#dc2626',
            fontWeight: '600',
            marginBottom: '12px',
          }}
        >
          {product.inStock ? (
            product.stock && product.stock <= 5 ? (
              `Nog ${product.stock} op voorraad`
            ) : (
              'Op voorraad'
            )
          ) : (
            'Uitverkocht'
          )}
        </div>

        {/* View Product Button */}
        <div
          style={{
            width: '100%',
            padding: '12px',
            background: product.inStock ? '#1266BD' : '#94a3b8',
            color: 'white',
            textAlign: 'center',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: product.inStock ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
          }}
        >
          {product.inStock ? 'Bekijk Product' : 'Niet beschikbaar'}
        </div>
      </div>
    </Link>
  );
}
