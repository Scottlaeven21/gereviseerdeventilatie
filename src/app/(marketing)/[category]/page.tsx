'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { getProductsByCategory } from '@/data/mockProducts';
import { getCategoryBySlug } from '@/data/categories';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import type { Product } from '@/types/product';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = use(params);
  const category = getCategoryBySlug(categorySlug);
  
  if (!category) {
    notFound();
  }

  const [allCategoryProducts, setAllCategoryProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Load products from Supabase
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const products = await getProductsByCategory(categorySlug);
      setAllCategoryProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    }
    loadProducts();
  }, [categorySlug]);

  useEffect(() => {
    let results = [...allCategoryProducts];

    // Brand filter - check product name for brand
    if (selectedBrand !== 'all') {
      results = results.filter((product) => {
        const productName = product.name.toLowerCase();
        const brandName = selectedBrand.toLowerCase();
        
        // Handle different brand name variations
        if (brandName.includes('itho')) {
          return productName.includes('itho');
        }
        if (brandName.includes('zehnder')) {
          return productName.includes('zehnder');
        }
        if (brandName.includes('duco')) {
          return productName.includes('duco');
        }
        
        return productName.includes(brandName);
      });
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
  }, [selectedBrand, priceRange, sortBy, allCategoryProducts]);

  if (loading) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Producten laden...</div>
      </div>
    );
  }

  return (
    <div className="category-page" style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container-boxed">
        {/* Category Header */}
        <div
          className="category-header-card"
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <div className="category-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'center' }}>
            <div>
              <h1
                className="category-title-mobile"
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1266BD',
                  marginBottom: '12px',
                }}
              >
                {category.name}
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                }}
              >
                {category.description}
              </p>
            </div>

            {/* Category Image */}
            <div
              className="category-image-mobile"
              style={{
                width: '140px',
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="mobile-filter-button-container">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            style={{
              width: '100%',
              padding: '14px',
              background: '#1266BD',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <i className="fas fa-filter" />
            {showMobileFilters ? 'Verberg Filters' : 'Toon Filters'}
          </button>
        </div>

        <div className="category-content-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
          {/* Filters Sidebar */}
          <div className={`filters-sidebar ${showMobileFilters ? 'show-mobile' : ''}`}>
            <ProductFilters
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
              onCategoryChange={() => {}}
              showCategoryFilter={false}
            />
          </div>

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
