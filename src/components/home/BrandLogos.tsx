'use client';

export function BrandLogos() {
  const brands = [
    {
      name: 'Zehnder',
      image: '/images/homepage/zehnder.png',
      imageFallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/2023/02/Zehnder-logo-8-1024x655.png',
    },
    {
      name: 'Itho Daalderop',
      image: '/images/homepage/ithodaalderop.png',
      imageFallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/2023/02/Itho-Daalderop-logo-1024x196.png',
    },
    {
      name: 'Duco',
      image: '/images/homepage/duco.png',
      imageFallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/2023/02/Duco-logo.png',
    },
  ];

  return (
    <section className="brand-logos-container">
      <div className="container-boxed">
        <h2 className="brand-logos-title">Hoogste Kortingen</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px' }}>
          {brands.map((brand) => (
            <div key={brand.name} className="brand-logo-item">
              <img
                src={brand.image}
                alt={brand.name}
                onError={(e) => {
                  e.currentTarget.src = brand.imageFallback;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
