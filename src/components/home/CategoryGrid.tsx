'use client';

import Link from 'next/link';

export function CategoryGrid() {
  return (
    <div className="category-section-mobile lg:py-16 category-section-desktop" style={{ background: 'white', padding: '32px 16px' }}>
      <div className="container-boxed">
        <h2
          className="hidden lg:block"
          style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#1266BD',
            textAlign: 'center',
            marginBottom: '56px',
          }}
        >
          Populaire Categorieën
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="categories-grid"
        >
          {[
            {
              title: 'Mechanische Ventilatoren',
              image: '/images/homepage/mechanischeventilatoren.jpg',
              href: '/mechanische-ventilatoren',
              color: '#1266BD',
            },
            {
              title: 'WTW-Units',
              image: '/images/homepage/ducowtw.jpg',
              href: '/wtw-units',
              color: '#1266BD',
            },
            {
              title: 'Filters',
              image: '/images/homepage/ducofilters.jpg',
              href: '/filters',
              color: '#1266BD',
            },
            {
              title: 'Flexibele Slangen',
              image: '/images/homepage/flexibeleslangen.jpg',
              href: '/flexibele-slangen',
              color: '#1266BD',
            },
            {
              title: 'Ventielen',
              image: '/images/homepage/ducofilters.jpg',
              href: '/ventielen',
              color: '#1266BD',
            },
            {
              title: 'Offerte',
              image: 'ICON',
              href: '/offerte',
              color: '#1266BD',
              iconColor: '#61CE70',
            },
          ].map((category, index) => (
            <Link
              key={index}
              href={category.href}
              style={{
                display: 'block',
                textDecoration: 'none',
                background: 'white',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                borderBottom: `4px solid ${category.color}`,
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 24px ${category.color}30`;
                e.currentTarget.style.borderBottomWidth = '8px';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderBottomWidth = '4px';
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  padding: '28px 24px 20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '160px',
                  background: 'transparent',
                }}
                className="category-image-container"
              >
                {category.image === 'ICON' ? (
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `${category.iconColor || category.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i
                      className="fas fa-file-invoice"
                      style={{
                        fontSize: '32px',
                        color: category.iconColor || category.color,
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={category.image}
                    alt={category.title}
                    style={{
                      width: '100%',
                      height: '130px',
                      objectFit: 'contain',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(category.title);
                    }}
                  />
                )}
              </div>

              {/* Category Info */}
              <div
                style={{
                  padding: '16px 16px 20px 16px',
                  textAlign: 'center',
                  background: 'white',
                }}
              >
                <h3 
                  style={{ 
                    fontSize: '15px', 
                    fontWeight: '700', 
                    color: '#1e293b', 
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
