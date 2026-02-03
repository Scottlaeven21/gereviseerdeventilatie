'use client';

import { useState, useEffect } from 'react';

const uspItems = [
  {
    icon: 'fa-leaf',
    text: 'Duurzame producten',
    color: '#61CE70',
  },
  {
    icon: 'fa-shield-alt',
    text: 'Garantie op alle producten',
    color: '#0070d9',
  },
  {
    icon: 'fa-rotate-left',
    text: '14 dagen retourbeleid',
    color: '#1266BD',
  },
];

export function GuaranteeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % uspItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="guarantee-section-mobile" style={{ background: 'white', padding: '16px', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
      <div className="container-boxed">
        <div style={{ height: '40px', overflow: 'hidden', position: 'relative' }}>
          <div
            style={{
              transform: `translateY(-${currentIndex * 40}px)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {uspItems.map((item, index) => (
              <div
                key={index}
                style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${item.color}15`,
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                >
                  <i className={`fas ${item.icon}`} style={{ color: item.color, fontSize: '16px' }} />
                </div>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1e293b',
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
