'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroCarousel } from './HeroCarousel';

export function Hero() {
  const [currentUspIndex, setCurrentUspIndex] = useState(0);

  const uspList = [
    {
      icon: 'fa-shield-halved',
      title: 'Garantie op alle producten',
    },
    {
      icon: 'fa-leaf',
      title: 'Duurzame keuze',
    },
    {
      icon: 'fa-truck-fast',
      title: 'Snelle levering',
    },
    {
      icon: 'fa-headset',
      title: 'Deskundig advies',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUspIndex((prev) => (prev + 1) % uspList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [uspList.length]);
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Desktop Hero Banner */}
      <div
        className="hidden lg:block"
        style={{
          background: 'linear-gradient(135deg, #1266BD 0%, #29AAE3 100%)',
          position: 'relative',
          padding: '80px 0',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-boxed" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: 'white' }}>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: '700',
                marginBottom: '24px',
                lineHeight: '1.2',
              }}
            >
              Gereviseerde Ventilatie-units
            </h1>
            <p
              style={{
                fontSize: '20px',
                marginBottom: '40px',
                opacity: 0.95,
                lineHeight: '1.6',
              }}
            >
              Bespaar tot 70% op ventilatie met onze professioneel gereviseerde units. 
              Volledig getest, schoongemaakt en technisch gecontroleerd.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/mechanische-ventilatoren"
                style={{
                  display: 'inline-block',
                  background: 'white',
                  color: '#1266BD',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
              >
                Bekijk Units
              </Link>
              <Link
                href="/offerte"
                style={{
                  display: 'inline-block',
                  background: 'transparent',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  border: '2px solid white',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Vraag Offerte Aan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* USP Cards - Desktop only */}
      <div className="hidden lg:block" style={{ background: 'white', padding: '48px 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container-boxed">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '32px',
            }}
            className="usp-grid"
          >
            {[
              {
                icon: 'fa-shield-halved',
                title: 'Garantie op alle producten',
                description: '2 jaar garantie op alle gereviseerde units',
              },
              {
                icon: 'fa-leaf',
                title: 'Duurzame keuze',
                description: 'Bespaar geld én het milieu',
              },
              {
                icon: 'fa-truck-fast',
                title: 'Snelle levering',
                description: 'Voor 12:00 besteld, binnen 48 uur in huis',
              },
              {
                icon: 'fa-headset',
                title: 'Deskundig advies',
                description: 'Van 09:00 - 17:00 bereikbaar',
              },
            ].map((usp, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '24px',
                  borderRadius: '12px',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 16px',
                    background: 'linear-gradient(135deg, #61CE70 0%, #4db85f 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '28px',
                  }}
                >
                  <i className={`fas ${usp.icon}`} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1266BD', marginBottom: '8px' }}>
                  {usp.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#54595F', margin: 0 }}>
                  {usp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Hero Carousel */}
      <HeroCarousel />
    </section>
  );
}
