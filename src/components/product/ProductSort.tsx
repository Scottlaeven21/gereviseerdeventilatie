'use client';

interface ProductSortProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  productCount: number;
}

export function ProductSort({ sortBy, onSortChange, productCount }: ProductSortProps) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px 24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontSize: '14px', color: '#64748b' }}>
        <strong style={{ color: '#1e293b' }}>{productCount}</strong>{' '}
        {productCount === 1 ? 'product' : 'producten'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label
          htmlFor="sortBy"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#64748b',
          }}
        >
          Sorteer op:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          style={{
            padding: '8px 32px 8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#1e293b',
            background: 'white',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          <option value="default">Standaard</option>
          <option value="name-asc">Naam (A-Z)</option>
          <option value="price-asc">Prijs (Laag-Hoog)</option>
          <option value="price-desc">Prijs (Hoog-Laag)</option>
          <option value="discount">Hoogste korting</option>
        </select>
      </div>
    </div>
  );
}
