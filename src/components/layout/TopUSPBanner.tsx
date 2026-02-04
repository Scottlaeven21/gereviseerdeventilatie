'use client';

import { useState, useEffect } from 'react';

const uspItems = [
  {
    icon: 'fa-file-invoice',
    text: 'Gratis offerte op aanvraag',
    color: '#61CE70',
  },
  {
    icon: 'fa-phone',
    text: 'Van 09:00 tot 17:00 bereikbaar',
    color: '#1266BD',
  },
  {
    icon: 'fa-truck-fast',
    text: 'Voor 17:00 besteld binnen 48 uur in huis',
    color: '#29AAE3',
  },
];

export function TopUSPBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % uspItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="lg:hidden"
      style={{ 
        background: '#f8f9fa', 
        borderBottom: '1px solid #e5e7eb',
        padding: '8px 16px',
      }}
    >
      <div style={{ height: '32px', overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            transform: `translateY(-${currentIndex * 32}px)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {uspItems.map((item, index) => (
            <div
              key={index}
              style={{
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <i className={`fas ${item.icon}`} style={{ color: item.color, fontSize: '14px' }} />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#54595F',
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
