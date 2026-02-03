'use client';

import Link from 'next/link';

const categories = [
  {
    title: 'Mechanische ventilatoren',
    href: '/mechanische-ventilatoren',
    image: '/images/homepage/mechanischeventilatoren.jpg',
    imageFallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/elementor/thumbs/Ducoducoboxsilent5-qvxdezhbpjxrmszzwwpyb6iwuze84gxzbe0sw0cxi8.jpg',
    imageAlt: 'Mechanische Ventilatoren',
  },
  {
    title: 'WTW-Units',
    href: '/wtw-units',
    image: '/images/homepage/ducowtw.jpg',
    imageFallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/elementor/thumbs/DucoWTWpicture1-01-qvxdi3c4au6w0ehirr2k1warju2wkga1ernkzxr2xs.jpg',
    imageAlt: 'WTW Units',
  },
  {
    title: 'Filters',
    href: '/filters',
    image: '/images/homepage/ducofilters.jpg',
    imageFallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/elementor/thumbs/Duco-filters-qvxdi49yho86c0g5m9h6me2857y9s5drqwb2h7pork.jpg',
    imageAlt: 'Ventilatie Filters',
  },
  {
    title: 'Flexibele Slangen',
    href: '/flexibele-slangen',
    image: '/images/homepage/flexibeleslangen.jpg',
    imageFallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/elementor/thumbs/Flexibele-slangen-qvxdi49yho86c0g5m9h6me2857y9s5drqwb2h7pork.jpg',
    imageAlt: 'Flexibele Ventilatieslangen',
  },
];

export function CategoryCards() {
  return (
    <section style={{ background: '#f7f7f7', padding: '64px 0' }}>
      <div className="container-boxed">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="category-card"
            >
              <img
                src={category.image}
                alt={category.imageAlt}
                className="category-card-image"
                onError={(e) => {
                  e.currentTarget.src = category.imageFallback;
                }}
              />
              <h2 className="category-card-title">
                {category.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
