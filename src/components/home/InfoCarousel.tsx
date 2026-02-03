'use client';

import { useState } from 'react';

const cards = [
  {
    title: 'Installatie of Reiniging?',
    text: 'Neem nu contact op voor installatie of reiniging van al uw ventilatie installaties! Ons team probeert zo snel mogelijk contact met u op te nemen.',
  },
  {
    title: 'Gereviseerd',
    text: 'Bent u opzoek naar een goedkope maar duurzame optie voor mechanische ventilatie? Bekijk dan onze gereviseerde ventilatoren!',
  },
  {
    title: 'Overige Vragen?',
    text: 'Kunt u iets niet vinden op onze website? Of heeft u vragen over ventilatie? Neem dan contact op via WhatsApp.',
  },
];

export function InfoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="info-carousel-section" style={{ padding: '48px 0', background: 'white' }}>
      <div className="container-boxed">
        {/* Desktop: All cards visible - Hidden on desktop/tablet */}
        <div className="hidden" style={{ gap: '24px' }}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="info-card"
              style={{ flex: 1 }}
            >
              <h3 className="info-card-title">
                {card.title}
              </h3>
              <p className="info-card-text">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                transform: `translateX(-${activeIndex * 100}%)`,
                transition: 'transform 0.5s ease-out'
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  style={{ width: '100%', flexShrink: 0, padding: '0 16px' }}
                >
                  <div 
                    style={{
                      background: '#f9fafb',
                      borderRadius: '16px',
                      padding: '28px 24px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid #e5e7eb',
                    }}
                  >
                    <h3 
                      style={{
                        fontSize: '22px',
                        fontWeight: '700',
                        color: '#0070d9',
                        marginBottom: '16px',
                        lineHeight: '1.3',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p 
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.7',
                        color: '#475569',
                        margin: 0,
                      }}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ marginTop: '28px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                style={{
                  height: '10px',
                  width: index === activeIndex ? '32px' : '10px',
                  borderRadius: index === activeIndex ? '5px' : '50%',
                  background: index === activeIndex ? '#0070d9' : '#cbd5e0',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
