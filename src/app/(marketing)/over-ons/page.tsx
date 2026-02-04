import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Over Ons | Gereviseerde Ventilatie',
  description: 'Leer meer over Gereviseerde Ventilatie - uw specialist in hoogwaardige gereviseerde ventilatiesystemen.',
};

export default function AboutPage() {
  return (
    <div style={{ background: '#f8f9fa' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1266BD 0%, #29AAE3 100%)',
          padding: '80px 0',
          color: 'white',
        }}
      >
        <div className="container-boxed" style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '52px',
              fontWeight: '700',
              marginBottom: '24px',
              lineHeight: '1.2',
            }}
          >
            Over Gereviseerde Ventilatie
          </h1>
          <p
            style={{
              fontSize: '20px',
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.95,
              lineHeight: '1.6',
            }}
          >
            Uw specialist in hoogwaardige gereviseerde ventilatiesystemen. Kwaliteit, service en duurzaamheid staan bij ons centraal.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '80px 0' }}>
        <div className="container-boxed">
          {/* Wie zijn wij */}
          <div style={{ maxWidth: '900px', margin: '0 auto 80px' }}>
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '48px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <h2
                style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#1266BD',
                  marginBottom: '24px',
                }}
              >
                Wie zijn wij?
              </h2>
              <div
                style={{
                  fontSize: '17px',
                  color: '#64748b',
                  lineHeight: '1.8',
                }}
              >
                <p style={{ marginBottom: '20px' }}>
                  Gereviseerde Ventilatie is uw betrouwbare partner op het gebied van gereviseerde ventilatiesystemen. 
                  Met meer dan 10 jaar ervaring leveren wij hoogwaardige WTW-units, mechanische ventilatoren, 
                  filters en accessoires aan particulieren en bedrijven door heel Nederland.
                </p>
                <p style={{ marginBottom: '20px' }}>
                  Al onze producten worden door onze ervaren technici volledig technisch gecontroleerd, 
                  gereinigd en waar nodig voorzien van nieuwe onderdelen. Zo garanderen wij u een 
                  betrouwbaar product tegen een scherpe prijs, met 2 jaar garantie.
                </p>
                <p>
                  Duurzaamheid is belangrijk. Door ventilatiesystemen een tweede leven te geven, 
                  dragen wij bij aan een circulaire economie en besparen we waardevolle grondstoffen.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ marginBottom: '80px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
              }}
            >
              {[
                { icon: 'calendar-days', number: '10+', label: 'Jaar Ervaring' },
                { icon: 'circle-check', number: '100%', label: 'Technisch Getest' },
                { icon: 'piggy-bank', number: '70%', label: 'Besparing Mogelijk' },
                { icon: 'shield-halved', number: '2 jaar', label: 'Garantie' },
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  <i
                    className={`fas fa-${stat.icon}`}
                    style={{
                      fontSize: '48px',
                      color: '#1266BD',
                      marginBottom: '16px',
                    }}
                  />
                  <div
                    style={{
                      fontSize: '36px',
                      fontWeight: '700',
                      color: '#1266BD',
                      marginBottom: '8px',
                    }}
                  >
                    {stat.number}
                  </div>
                  <div style={{ fontSize: '15px', color: '#64748b', fontWeight: '600' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wat wij doen */}
          <div style={{ marginBottom: '80px', maxWidth: '900px', margin: '0 auto 80px' }}>
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '48px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <h2
                style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#1266BD',
                  marginBottom: '32px',
                }}
              >
                Wat wij doen
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  {
                    icon: 'screwdriver-wrench',
                    title: 'Technische Revisie',
                    description: 'Elk systeem wordt volledig gedemonteerd, gereinigd en technisch gecontroleerd door onze specialisten.',
                  },
                  {
                    icon: 'filter',
                    title: 'Vervanging Onderdelen',
                    description: 'Alle filters en slijtende onderdelen worden vervangen door originele of gelijkwaardige nieuwe onderdelen.',
                  },
                  {
                    icon: 'clipboard-check',
                    title: 'Kwaliteitscontrole',
                    description: 'Na revisie wordt elk systeem uitgebreid getest op functionaliteit, rendement en geluidsniveau.',
                  },
                  {
                    icon: 'shield-halved',
                    title: 'Garantie & Service',
                    description: '2 jaar garantie op alle gereviseerde producten en altijd deskundig advies van onze specialisten.',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '24px',
                      padding: '24px',
                      background: '#f8f9fa',
                      borderRadius: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '12px',
                        background: '#1266BD15',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <i className={`fas fa-${item.icon}`} style={{ fontSize: '28px', color: '#1266BD' }} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#1e293b',
                          marginBottom: '8px',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Waarom kiezen voor ons */}
          <div style={{ marginBottom: '80px' }}>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#1266BD',
                textAlign: 'center',
                marginBottom: '48px',
              }}
            >
              Waarom kiezen voor Gereviseerde Ventilatie?
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
              }}
            >
              {[
                {
                  icon: 'euro-sign',
                  title: 'Scherpe Prijzen',
                  description: 'Tot 70% goedkoper dan nieuw, zonder concessies aan kwaliteit.',
                },
                {
                  icon: 'leaf',
                  title: 'Duurzaam',
                  description: 'Bespaar grondstoffen en draag bij aan een circulaire economie.',
                },
                {
                  icon: 'award',
                  title: 'Kwaliteit',
                  description: 'Alle systemen volledig gereviseerd met 2 jaar garantie.',
                },
                {
                  icon: 'truck-fast',
                  title: 'Snelle Levering',
                  description: 'Gratis verzending vanaf €25 en snelle levertijden.',
                },
                {
                  icon: 'headset',
                  title: 'Deskundig Advies',
                  description: 'Onze specialisten helpen u met plezier bij uw keuze.',
                },
                {
                  icon: 'star',
                  title: 'Topmerken',
                  description: 'Werken met A-merken zoals Zehnder, Itho Daalderop en Duco.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '32px',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      margin: '0 auto 20px',
                      borderRadius: '50%',
                      background: '#61CE7015',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className={`fas fa-${item.icon}`} style={{ fontSize: '32px', color: '#61CE70' }} />
                  </div>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '12px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '64px 48px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px',
              }}
            >
              Klaar om te beginnen?
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#64748b',
                marginBottom: '32px',
                maxWidth: '600px',
                margin: '0 auto 32px',
              }}
            >
              Ontdek ons assortiment aan hoogwaardige gereviseerde ventilatiesystemen of neem contact op voor persoonlijk advies.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/producten"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  background: '#1266BD',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                Bekijk Producten
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  background: 'white',
                  color: '#1266BD',
                  border: '2px solid #1266BD',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                Neem Contact Op
              </Link>
            </div>
          </div>

          {/* Contact Footer */}
          <div
            style={{
              maxWidth: '900px',
              margin: '32px auto 0',
              padding: '24px',
              background: '#f8f9fa',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <p style={{ marginBottom: '16px', fontSize: '15px', color: '#64748b' }}>
              Direct contact opnemen?
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
  );
}
