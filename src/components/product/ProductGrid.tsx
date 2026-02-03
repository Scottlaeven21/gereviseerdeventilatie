'use client';

import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 20px',
          color: '#64748b',
        }}
      >
        <i className="fas fa-box-open" style={{ fontSize: '64px', marginBottom: '24px', opacity: 0.3 }} />
        <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
          Geen producten gevonden
        </h3>
        <p style={{ fontSize: '16px' }}>
          Er zijn momenteel geen producten beschikbaar in deze categorie.
        </p>
      </div>
    );
  }

  return (
    <div
      className="products-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
