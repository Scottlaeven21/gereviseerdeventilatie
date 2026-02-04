import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pakket Volgen | Gereviseerde Ventilatie',
  description: 'Volg uw pakket met de track & trace code.',
};

export default function PakketVolgenPage() {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '80px 0' }}>
      <div className="container-boxed" style={{ maxWidth: '900px' }}>
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <i className="fas fa-map-marker-alt" style={{ fontSize: '64px', color: '#1266BD', marginBottom: '24px' }} />
            <h1
              style={{
                fontSize: '42px',
                fontWeight: '700',
                color: '#1266BD',
                marginBottom: '16px',
              }}
            >
              Pakket Volgen
            </h1>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              Volg uw bestelling met de track & trace code
            </p>
          </div>

          <div style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.8' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                padding: '32px',
                borderRadius: '12px',
                marginBottom: '32px',
                textAlign: 'center',
              }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: 'white' }}>
                Track & Trace Code Ontvangen?
              </h2>
              <p style={{ marginBottom: '24px', opacity: 0.9 }}>
                U ontvangt automatisch een e-mail met tracking informatie zodra uw pakket is verzonden.
              </p>
              <Link
                href="/account"
                style={{
                  display: 'inline-block',
                  padding: '14px 32px',
                  background: 'white',
                  color: '#2563eb',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                <i className="fas fa-user-circle" style={{ marginRight: '8px' }} />
                Mijn Bestellingen
              </Link>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Hoe Werkt Track & Trace?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#dbeafe',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#1266BD',
                    fontWeight: '700',
                    fontSize: '20px',
                  }}
                >
                  1
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Bestelling Verzonden
                  </h3>
                  <p style={{ color: '#64748b', margin: 0 }}>
                    U ontvangt een e-mail met track & trace code zodra uw pakket is verzonden.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#dbeafe',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#1266BD',
                    fontWeight: '700',
                    fontSize: '20px',
                  }}
                >
                  2
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Code Invoeren
                  </h3>
                  <p style={{ color: '#64748b', margin: 0 }}>
                    Klik op de link in de e-mail of bezoek de website van de vervoerder.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#dbeafe',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#1266BD',
                    fontWeight: '700',
                    fontSize: '20px',
                  }}
                >
                  3
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Pakket Volgen
                  </h3>
                  <p style={{ color: '#64748b', margin: 0 }}>
                    Zie realtime waar uw pakket zich bevindt en wanneer het geleverd wordt.
                  </p>
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Vervoerders Tracking Links
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Afhankelijk van de vervoerder kunt u uw pakket volgen via:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <a
                href="https://postnl.nl/tracktrace"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#1e293b',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontWeight: '600' }}>
                  <i className="fas fa-box" style={{ marginRight: '12px', color: '#1266BD' }} />
                  PostNL Track & Trace
                </span>
                <i className="fas fa-external-link-alt" style={{ color: '#64748b' }} />
              </a>

              <a
                href="https://www.dhl.com/nl-nl/home/tracking.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#1e293b',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontWeight: '600' }}>
                  <i className="fas fa-shipping-fast" style={{ marginRight: '12px', color: '#1266BD' }} />
                  DHL Track & Trace
                </span>
                <i className="fas fa-external-link-alt" style={{ color: '#64748b' }} />
              </a>

              <a
                href="https://www.dpd.com/nl/nl/ontvangen/pakket-volgen/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#1e293b',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontWeight: '600' }}>
                  <i className="fas fa-truck" style={{ marginRight: '12px', color: '#1266BD' }} />
                  DPD Track & Trace
                </span>
                <i className="fas fa-external-link-alt" style={{ color: '#64748b' }} />
              </a>
            </div>

            <div
              style={{
                background: '#fef3c7',
                border: '1px solid #fbbf24',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '32px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                <i className="fas fa-lightbulb" style={{ color: '#d97706', fontSize: '20px', flexShrink: 0 }} />
                <div style={{ color: '#78350f' }}>
                  <strong style={{ display: 'block', marginBottom: '8px' }}>Tip:</strong>
                  De tracking informatie wordt meestal binnen een paar uur na verzending geactiveerd. 
                  Heeft u nog geen tracking info? Check uw spam folder of neem contact met ons op.
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Geen Track & Trace Code Ontvangen?
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Als u binnen 24 uur na de verwachte verzending geen tracking informatie heeft ontvangen:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Controleer uw spam/ongewenste e-mail folder</li>
              <li style={{ marginBottom: '8px' }}>Check uw account bij "Mijn Bestellingen"</li>
              <li style={{ marginBottom: '8px' }}>Neem contact met ons op via contact@laevenitservices.nl</li>
            </ul>

            <div
              style={{
                marginTop: '48px',
                padding: '24px',
                background: '#f8f9fa',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <p style={{ marginBottom: '16px', fontSize: '15px', color: '#64748b' }}>
                Vragen over uw levering?
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="tel:+31652641106"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: '#1266BD',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '600',
                  }}
                >
                  <i className="fas fa-phone" style={{ marginRight: '8px' }} />
                  Bel ons
                </a>
                <a
                  href="mailto:info@gereviseerdeventilatie.nl"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: 'white',
                    color: '#1266BD',
                    border: '2px solid #1266BD',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '600',
                  }}
                >
                  <i className="fas fa-envelope" style={{ marginRight: '8px' }} />
                  E-mail ons
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
