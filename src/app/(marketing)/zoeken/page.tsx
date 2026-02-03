'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/mockProducts';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import type { Product } from '@/types/product';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');

  useEffect(() => {
    let results = products;

    // Search filter
    if (query) {
      const searchLower = query.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter((product) => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      results = results.filter((product) => product.specs?.['Merk'] === selectedBrand);
    }

    // Price range filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case '0-500':
          results = results.filter((product) => product.price < 500);
          break;
        case '500-1000':
          results = results.filter((product) => product.price >= 500 && product.price < 1000);
          break;
        case '1000-2000':
          results = results.filter((product) => product.price >= 1000 && product.price < 2000);
          break;
        case '2000+':
          results = results.filter((product) => product.price >= 2000);
          break;
      }
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'discount':
        results.sort((a, b) => {
          const discountA = a.discount ? parseInt(a.discount.replace('%', ''), 10) : 0;
          const discountB = b.discount ? parseInt(b.discount.replace('%', ''), 10) : 0;
          return discountB - discountA;
        });
        break;
      default:
        // relevance (default order)
        break;
    }

    setFilteredProducts(results);
  }, [query, selectedCategory, selectedBrand, priceRange, sortBy]);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container-boxed">
        {/* Search Header */}
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1266BD',
              marginBottom: '12px',
            }}
          >
            {query ? `Zoekresultaten voor "${query}"` : 'Alle Producten'}
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b' }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'producten'} gevonden
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
          {/* Filters Sidebar */}
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            showCategoryFilter={true}
          />

          {/* Results */}
          <div>
            {/* Sort Bar */}
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
                <strong style={{ color: '#1e293b' }}>{filteredProducts.length}</strong> producten
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
                  onChange={(e) => setSortBy(e.target.value)}
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
                  <option value="relevance">Relevantie</option>
                  <option value="name-asc">Naam (A-Z)</option>
                  <option value="price-asc">Prijs (Laag-Hoog)</option>
                  <option value="price-desc">Prijs (Hoog-Laag)</option>
                  <option value="discount">Hoogste korting</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '80px 40px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <i
                  className="fas fa-search"
                  style={{
                    fontSize: '64px',
                    color: '#e5e7eb',
                    marginBottom: '24px',
                  }}
                />
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '12px',
                  }}
                >
                  Geen producten gevonden
                </h3>
                <p
                  style={{
                    fontSize: '16px',
                    color: '#64748b',
                    marginBottom: '24px',
                  }}
                >
                  Probeer een andere zoekopdracht of pas de filters aan.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                  }}
                  style={{
                    padding: '12px 24px',
                    background: '#1266BD',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Reset alle filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div style={{ background: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '48px', color: '#1266BD', marginBottom: '16px' }} />
            <p style={{ fontSize: '18px', color: '#64748b' }}>Zoeken...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
