'use client';

import { useState, useEffect } from 'react';
import { products } from '@/data/mockProducts';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import type { Product } from '@/types/product';

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let results = [...products];

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
        // default order
        break;
    }

    setFilteredProducts(results);
  }, [selectedCategory, selectedBrand, priceRange, sortBy]);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container-boxed">
        {/* Page Header */}
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '48px',
            marginBottom: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <h1
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#1266BD',
              marginBottom: '16px',
            }}
          >
            Alle Producten
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#64748b',
              lineHeight: '1.6',
              maxWidth: '800px',
            }}
          >
            Ontdek ons volledige assortiment aan hoogwaardige gereviseerde ventilatiesystemen, filters, ventielen en accessoires. 
            Alle producten zijn technisch gecontroleerd en worden geleverd met garantie.
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
            <ProductSort sortBy={sortBy} onSortChange={setSortBy} productCount={filteredProducts.length} />
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
