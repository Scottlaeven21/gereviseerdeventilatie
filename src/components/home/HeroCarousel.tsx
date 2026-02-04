'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const carouselSlides = [
  {
    title: 'WTW-units',
    image: '/images/homepage/ducowtw.jpg',
    link: '/wtw-units',
    bgColor: '#64748b',
    type: 'product',
  },
  {
    title: 'Woonhuisventilatoren',
    image: '/images/homepage/mechanischeventilatoren.jpg',
    link: '/mechanische-ventilatoren',
    bgColor: '#64748b',
    type: 'product',
  },
  {
    title: 'Offerte op aanvraag',
    description: 'Vraag direct een gratis offerte aan voor uw ventilatie project.',
    link: '/offerte',
    bgColor: '#64748b',
    type: 'service',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:hidden hero-carousel-mobile" style={{ position: 'relative', height: '450px', overflow: 'hidden' }}>
      {carouselSlides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          {slide.type === 'product' ? (
            <>
              {/* Background Image */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              
              {/* Dark Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  zIndex: 1,
                }}
              />
              
              {/* Content */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px 20px',
                  textAlign: 'center',
                }}
              >
                <h2
                  className="hero-title"
                  style={{
                    fontSize: '40px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '20px',
                    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    lineHeight: '1.2',
                  }}
                >
                  {slide.title}
                </h2>
                <style jsx>{`
                  @media (max-width: 640px) {
                    .hero-title {
                      font-size: 28px !important;
                    }
                  }
                `}</style>
                <Link
                  href={slide.link}
                  style={{
                    display: 'inline-block',
                    padding: '14px 40px',
                    background: 'transparent',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '15px',
                    border: '2px solid white',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#1266BD';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Klik hier
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Background for service slides */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1266BD 0%, #29AAE3 100%)',
                }}
              />
              
              {/* Content */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px 20px',
                  textAlign: 'center',
                }}
              >
                <h2
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '16px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {slide.title}
                </h2>
                <p
                  style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.95)',
                    textAlign: 'center',
                    lineHeight: '1.6',
                    maxWidth: '300px',
                    marginBottom: '20px',
                  }}
                >
                  {slide.description}
                </p>
                <Link
                  href={slide.link}
                  style={{
                    display: 'inline-block',
                    padding: '14px 40px',
                    background: 'transparent',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '15px',
                    border: '2px solid white',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#1266BD';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Neem contact op
                </Link>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Arrow Navigation */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(4px)',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          fontSize: '20px',
          zIndex: 10,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
        }}
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)}
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(4px)',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          fontSize: '20px',
          zIndex: 10,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
        }}
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
}
