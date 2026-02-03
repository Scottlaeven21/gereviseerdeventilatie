'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts } from '@/data/mockProducts';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/product';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const prod = await getProductBySlug(slug);
      if (!prod) {
        notFound();
      }
      setProduct(prod);
      const related = await getRelatedProducts(prod.id);
      setRelatedProducts(related);
      setLoading(false);
    }
    loadProduct();
  }, [slug]);

  if (loading || !product) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Product laden...</div>
      </div>
    );
  }
  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="product-page" style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container-boxed">
        {/* Breadcrumbs */}
        <div className="breadcrumbs-mobile" style={{ marginBottom: '24px', fontSize: '14px', color: '#64748b' }}>
          <Link href="/" style={{ color: '#1266BD', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href={`/${product.category}`} style={{ color: '#1266BD', textDecoration: 'none' }}>
            {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Link>
          {' / '}
          <span>{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div
          className="product-main-card"
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '48px',
            marginBottom: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <div className="product-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
            {/* Left: Gallery */}
            <div>
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right: Product Info */}
            <div>
              <h1
                className="product-title-mobile"
                style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '16px',
                  lineHeight: '1.2',
                }}
              >
                {product.name}
              </h1>

              <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px', lineHeight: '1.6' }}>
                {product.shortDescription}
              </p>

              {/* SKU */}
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
                <strong>Artikel nummer:</strong> {product.sku}
              </div>

              {/* Price */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
                  <span
                    className="product-price-mobile"
                    style={{
                      fontSize: '42px',
                      fontWeight: '700',
                      color: product.oldPrice ? '#61CE70' : '#1266BD',
                    }}
                  >
                    €{product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span
                      className="product-old-price-mobile"
                      style={{
                        fontSize: '28px',
                        fontWeight: '500',
                        color: '#94a3b8',
                        textDecoration: 'line-through',
                      }}
                    >
                      €{product.oldPrice.toFixed(2)}
                    </span>
                  )}
                  {discountPercentage && (
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#61CE70',
                        background: '#61CE7020',
                        padding: '6px 12px',
                        borderRadius: '8px',
                      }}
                    >
                      -{discountPercentage}% korting
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  Inclusief BTW, exclusief verzendkosten
                </div>
              </div>

              {/* Stock Status */}
              <div
                style={{
                  padding: '16px',
                  background: product.inStock ? '#61CE7015' : '#dc262615',
                  borderRadius: '12px',
                  marginBottom: '32px',
                }}
              >
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: product.inStock ? '#61CE70' : '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <i className={`fas fa-${product.inStock ? 'check-circle' : 'exclamation-circle'}`} />
                  {product.inStock ? (
                    product.stock && product.stock <= 5 ? (
                      `Nog ${product.stock} op voorraad - bestel snel!`
                    ) : (
                      'Op voorraad - vandaag besteld, morgen in huis'
                    )
                  ) : (
                    'Momenteel niet op voorraad'
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              {product.inStock && (
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '8px',
                    }}
                  >
                    Aantal:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1266BD',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#1266BD';
                        e.currentTarget.style.background = '#f8f9fa';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.background = 'white';
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock || 99, parseInt(e.target.value) || 1)))}
                      style={{
                        width: '80px',
                        height: '40px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: '600',
                      }}
                      min="1"
                      max={product.stock || 99}
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1266BD',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#1266BD';
                        e.currentTarget.style.background = '#f8f9fa';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.background = 'white';
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                className="add-to-cart-button-mobile"
                disabled={!product.inStock}
                onClick={() => {
                  if (product.inStock) {
                    addItem(product, quantity);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: product.inStock ? '#1266BD' : '#94a3b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
                onMouseOver={(e) => {
                  if (product.inStock) e.currentTarget.style.background = '#29AAE3';
                }}
                onMouseOut={(e) => {
                  if (product.inStock) e.currentTarget.style.background = '#1266BD';
                }}
              >
                <i className="fas fa-shopping-cart" />
                {product.inStock ? 'In winkelwagen' : 'Niet beschikbaar'}
              </button>

              {/* USPs */}
              <div className="product-usp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px' }}>
                {[
                  { icon: 'truck-fast', text: 'Gratis verzending vanaf €25' },
                  { icon: 'shield-halved', text: '2 jaar garantie' },
                  { icon: 'rotate-left', text: '14 dagen retourrecht' },
                  { icon: 'headset', text: 'Deskundig advies' },
                ].map((usp, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                    }}
                  >
                    <i className={`fas fa-${usp.icon}`} style={{ fontSize: '20px', color: '#1266BD' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>{usp.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Description & Specs */}
        <div className="product-description-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '40px' }}>
          {/* Description */}
          <div
            className="product-description-card"
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
              Productbeschrijving
            </h2>
            <div
              style={{
                fontSize: '16px',
                color: '#64748b',
                lineHeight: '1.8',
                whiteSpace: 'pre-line',
              }}
            >
              {product.description}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Kenmerken
                </h3>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: '16px',
                        color: '#64748b',
                        marginBottom: '12px',
                        lineHeight: '1.6',
                      }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Specifications */}
          {product.specs && (
            <div
              className="product-specs-card"
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                Specificaties
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                      }}
                    >
                      <td
                        style={{
                          padding: '12px 0',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#64748b',
                          verticalAlign: 'top',
                        }}
                      >
                        {key}
                      </td>
                      <td
                        style={{
                          padding: '12px 0',
                          fontSize: '14px',
                          color: '#1e293b',
                          textAlign: 'right',
                        }}
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '32px',
              }}
            >
              Gerelateerde Producten
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
