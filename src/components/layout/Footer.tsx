'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      {/* Brand Logos Section - Light Gray Background */}
      <div style={{ background: '#f5f5f5', padding: '48px 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container-boxed">
          <div className="brand-logos-footer" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '80px', alignItems: 'center' }}>
            <img
              src="/images/homepage/Zehnder-logo.png"
              alt="Zehnder"
              style={{ width: '180px', height: '80px', objectFit: 'contain' }}
            />
            <img
              src="/images/homepage/Ithodaalderoplogo.png"
              alt="Itho Daalderop"
              style={{ width: '180px', height: '80px', objectFit: 'contain' }}
            />
            <img
              src="/images/homepage/Duco-logo.png"
              alt="Duco"
              style={{ width: '180px', height: '80px', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

      {/* Main Footer - Blue Background */}
      <div style={{ background: '#1266BD', color: 'white', padding: '48px 0' }}>
        <div className="container-boxed">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px', maxWidth: '1100px', margin: '0 auto' }}>
            {/* Productcategorieën */}
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                Productcategorieën
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                <li>
                  <Link href="/mechanische-ventilatoren" style={{ color: 'white', textDecoration: 'none' }}>
                    Mechanische Ventilatoren
                  </Link>
                </li>
                <li>
                  <Link href="/wtw-units" style={{ color: 'white', textDecoration: 'none' }}>
                    WTW-Units
                  </Link>
                </li>
                <li>
                  <Link href="/filters" style={{ color: 'white', textDecoration: 'none' }}>
                    Filters
                  </Link>
                </li>
                <li>
                  <Link href="/flexibele-slangen" style={{ color: 'white', textDecoration: 'none' }}>
                    Flexibele Slangen
                  </Link>
                </li>
                <li>
                  <Link href="/ventielen" style={{ color: 'white', textDecoration: 'none' }}>
                    Ventielen
                  </Link>
                </li>
                <li>
                  <Link href="/offerte" style={{ color: 'white', textDecoration: 'none' }}>
                    Offerte
                  </Link>
                </li>
              </ul>
            </div>

            {/* Gereviseerdeventilatie */}
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                Gereviseerdeventilatie
              </h2>
              <address style={{ fontStyle: 'normal', fontSize: '15px', lineHeight: '1.8' }}>
                <p style={{ margin: 0 }}>Gereviseerdeventilatie</p>
                <p style={{ margin: 0 }}>Rozenstraat 1,</p>
                <p style={{ margin: 0 }}>6361HS NUTH,</p>
                <p style={{ margin: 0 }}>Nederland</p>
              </address>
            </div>

            {/* Algemeen */}
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                Algemeen
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                <li>
                  <Link href="/algemene-voorwaarden" style={{ color: 'white', textDecoration: 'none' }}>
                    Algemene Voorwaarden
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" style={{ color: 'white', textDecoration: 'none' }}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/beleidsverklaring" style={{ color: 'white', textDecoration: 'none' }}>
                    Beleidsverklaring
                  </Link>
                </li>
              </ul>
            </div>

            {/* Klantenservice */}
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                Klantenservice
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                <li>
                  <Link href="/contact" style={{ color: 'white', textDecoration: 'none' }}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/verzending" style={{ color: 'white', textDecoration: 'none' }}>
                    Verzenden
                  </Link>
                </li>
                <li>
                  <Link href="/verzending" style={{ color: 'white', textDecoration: 'none' }}>
                    Retourneren
                  </Link>
                </li>
                <li>
                  <Link href="/pakket-volgen" style={{ color: 'white', textDecoration: 'none' }}>
                    Pakket volgen
                  </Link>
                </li>
                <li>
                  <Link href="/levertijden" style={{ color: 'white', textDecoration: 'none' }}>
                    Levertijden
                  </Link>
                </li>
                <li>
                  <Link href="/faq" style={{ color: 'white', textDecoration: 'none' }}>
                    Veel gestelde vragen (FAQ)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section - Light Background */}
      <div style={{ background: 'white', padding: '48px 0' }}>
        <div className="container-boxed">
          <h2 className="payment-title-mobile" style={{ textAlign: 'center', fontSize: '24px', fontWeight: '600', color: '#54595F', marginBottom: '32px' }}>
            Betaal mogelijkheden
          </h2>
          <div className="payment-methods" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
            {[
              { src: '/images/homepage/ideal.png', alt: 'iDEAL', fallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/2024/11/ideal-logo-150x150.png' },
              { src: '/images/homepage/paypal.png', alt: 'PayPal', fallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/2024/11/paypal-logo-500x500.png' },
              { src: '/images/homepage/mastercard.png', alt: 'Mastercard', fallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/2024/11/Mastercard-Logo-500x281.png' },
              { src: '/images/homepage/Bancontant.png', alt: 'Bancontact', fallback: 'https://gereviseerdeventilatie.nl/wp-content/uploads/2023/02/Bancontant-logo-removebg-preview.png' },
            ].map((logo) => (
              <div
                key={logo.alt}
                className="payment-logo"
                style={{
                  width: '100px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.src = logo.fallback;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Blue */}
      <div style={{ background: '#1266BD', color: 'white', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-boxed">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '16px', fontSize: '14px' }}>
            <Link href="/cookies" style={{ color: 'white', textDecoration: 'none' }}>
              Cookies
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
            <p style={{ margin: 0 }}>
              Copyright © {new Date().getFullYear()} Gereviseerdeventilatie
            </p>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
            <Link href="/privacy" style={{ color: 'white', textDecoration: 'none' }}>
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
