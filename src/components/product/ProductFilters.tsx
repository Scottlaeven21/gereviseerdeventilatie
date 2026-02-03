'use client';

import { categories } from '@/data/categories';

interface ProductFiltersProps {
  selectedCategory?: string;
  onCategoryChange: (category: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  selectedBrand?: string;
  onBrandChange: (brand: string) => void;
  showCategoryFilter?: boolean;
}

const brands = ['Zehnder', 'Itho Daalderop', 'Duco'];

export function ProductFilters({
  selectedCategory = 'all',
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedBrand = 'all',
  onBrandChange,
  showCategoryFilter = true,
}: ProductFiltersProps) {
  const hasActiveFilters = 
    (showCategoryFilter && selectedCategory !== 'all') || 
    priceRange !== 'all' || 
    selectedBrand !== 'all';

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: '100px',
      }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '24px',
        }}
      >
        <i className="fas fa-filter" style={{ marginRight: '8px', color: '#1266BD' }} />
        Filters
      </h2>

      {/* Category Filter */}
      {showCategoryFilter && (
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#64748b',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Categorie
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                color: selectedCategory === 'all' ? '#1266BD' : '#64748b',
                fontWeight: selectedCategory === 'all' ? '600' : '400',
              }}
            >
              <input
                type="radio"
                name="category"
                value="all"
                checked={selectedCategory === 'all'}
                onChange={(e) => onCategoryChange(e.target.value)}
                style={{ accentColor: '#1266BD' }}
              />
              Alle categorieën
            </label>
            {categories.map((category) => (
              <label
                key={category.slug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: selectedCategory === category.slug ? '#1266BD' : '#64748b',
                  fontWeight: selectedCategory === category.slug ? '600' : '400',
                }}
              >
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  checked={selectedCategory === category.slug}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  style={{ accentColor: '#1266BD' }}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Brand Filter */}
      <div style={{ marginBottom: '32px' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#64748b',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Merk
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              color: selectedBrand === 'all' ? '#1266BD' : '#64748b',
              fontWeight: selectedBrand === 'all' ? '600' : '400',
            }}
          >
            <input
              type="radio"
              name="brand"
              value="all"
              checked={selectedBrand === 'all'}
              onChange={(e) => onBrandChange(e.target.value)}
              style={{ accentColor: '#1266BD' }}
            />
            Alle merken
          </label>
          {brands.map((brand) => (
            <label
              key={brand}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                color: selectedBrand === brand ? '#1266BD' : '#64748b',
                fontWeight: selectedBrand === brand ? '600' : '400',
              }}
            >
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={(e) => onBrandChange(e.target.value)}
                style={{ accentColor: '#1266BD' }}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div style={{ marginBottom: hasActiveFilters ? '32px' : '0' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#64748b',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Prijsbereik
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { value: 'all', label: 'Alle prijzen' },
            { value: '0-500', label: '€0 - €500' },
            { value: '500-1000', label: '€500 - €1000' },
            { value: '1000-2000', label: '€1000 - €2000' },
            { value: '2000+', label: '€2000+' },
          ].map((range) => (
            <label
              key={range.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                color: priceRange === range.value ? '#1266BD' : '#64748b',
                fontWeight: priceRange === range.value ? '600' : '400',
              }}
            >
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={priceRange === range.value}
                onChange={(e) => onPriceRangeChange(e.target.value)}
                style={{ accentColor: '#1266BD' }}
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <button
          onClick={() => {
            if (showCategoryFilter) onCategoryChange('all');
            onPriceRangeChange('all');
            onBrandChange('all');
          }}
          style={{
            width: '100%',
            padding: '10px',
            background: '#f8f9fa',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#64748b',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#1266BD';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.borderColor = '#1266BD';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#f8f9fa';
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <i className="fas fa-times" style={{ marginRight: '8px' }} />
          Reset filters
        </button>
      )}
    </div>
  );
}
