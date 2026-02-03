'use client';

import Link from 'next/link';

const featuredProducts = [
  {
    id: 1,
    name: 'Gereviseerde Zehnder WHR 930 R',
    price: '€ 395,00',
    oldPrice: '€ 495,00',
    discount: '-20%',
    image: '/images/homepage/WHR930.jpg',
    href: '/product/gereviseerde-zehnder-whr-930-r',
  },
  {
    id: 2,
    name: 'Gereviseerde Zehnder WHR 930 L',
    price: '€ 395,00',
    oldPrice: '€ 495,00',
    discount: '-20%',
    image: '/images/homepage/WHR930.jpg',
    href: '/product/gereviseerde-zehnder-whr-930-l',
  },
  {
    id: 3,
    name: 'Demper (flexibel en geïsoleerd) Sonodec TRD 25 Ø152mm, L = 0.5m',
    price: '€ 29,95',
    discount: 'Nieuw',
    image: '/images/homepage/flexibeleslangen.jpg',
    href: '/product/demper-flexibel-en-geisoleerd-sonodec-trd-25-o152mm-l-0-5m',
  },
  {
    id: 4,
    name: 'Demper (flexibel en geïsoleerd) Sonodec TRD 25 Ø152mm, L = 1m',
    price: '€ 39,95',
    discount: 'Nieuw',
    image: '/images/homepage/flexibeleslangen.jpg',
    href: '/product/demper-flexibel-en-geisoleerd-sonodec-trd-25-o152mm-l-1m',
  },
];

export function FeaturedProducts() {
  return (
    <section className="featured-section-mobile" style={{ background: '#f8f9fa', padding: '80px 0' }}>
      <div className="container-boxed">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            className="featured-heading-mobile"
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#1266BD',
              marginBottom: '16px',
            }}
          >
            Hoogste Kortingen
          </h2>
          <div
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #1266BD 0%, #29AAE3 100%)',
              margin: '0 auto',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
          className="products-grid"
        >
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              style={{
                position: 'relative',
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s',
                border: '1px solid #f0f0f0',
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
              {product.discount && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: product.discount.startsWith('-') ? '#61CE70' : '#29AAE3',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    zIndex: 1,
                  }}
                >
                  {product.discount}
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
                }}
              >
                <img
                  src={product.image}
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
                    marginBottom: '12px',
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

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#61CE70',
                    }}
                  >
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span
                      style={{
                        fontSize: '16px',
                        color: '#9ca3af',
                        textDecoration: 'line-through',
                      }}
                    >
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#1266BD',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#29AAE3';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#1266BD';
                  }}
                >
                  Bekijk Product
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
