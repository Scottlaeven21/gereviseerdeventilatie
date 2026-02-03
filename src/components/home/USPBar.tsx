'use client';

import { useEffect, useState } from 'react';

const uspItems = [
  {
    icon: 'fa-comment',
    text: 'Van 09:00 - 17:00 Beschikbaar',
  },
  {
    icon: 'fa-clock',
    text: 'Voor 12:00 Besteld, Binnen 48 Uur In Huis',
  },
  {
    icon: 'fa-file-alt',
    text: 'Gratis Offerte Op Aanvraag',
  },
];

export function USPBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % uspItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile: Vertical Carousel */}
      <div style={{ display: 'block', background: 'white', padding: '16px 0' }} className="lg:hidden">
        <div style={{ position: 'relative', height: '64px', overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              transform: `translateY(-${currentIndex * 4}rem)`,
              transition: 'transform 0.7s ease-in-out'
            }}
          >
            {uspItems.concat(uspItems).map((item, index) => (
              <div
                key={index}
                className="usp-item"
                style={{ height: '64px' }}
              >
                <i className={`far ${item.icon}`} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Horizontal Static */}
      <div style={{ display: 'none', background: 'white', padding: '16px 0' }} className="lg:block">
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '48px', padding: '0 16px' }}>
          {uspItems.map((item, index) => (
            <div key={index} className="usp-item">
              <i className={`far ${item.icon}`} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
