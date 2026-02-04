import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gereviseerde Ventilatie',
  description: 'Privacy policy van Gereviseerde Ventilatie. Lees hoe wij omgaan met uw persoonlijke gegevens.',
};

export default function PrivacyPage() {
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
          <h1
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#1266BD',
              marginBottom: '32px',
            }}
          >
            Privacy Policy
          </h1>

          <div style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '24px' }}>
              <strong>Laatst bijgewerkt: 2 februari 2026</strong>
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              1. Introductie
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Gereviseerde Ventilatie respecteert uw privacy en gaat zorgvuldig om met uw persoonlijke gegevens. 
              In deze privacy policy leggen we uit welke gegevens we verzamelen, waarom we dit doen, en wat uw rechten zijn.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              2. Welke gegevens verzamelen wij?
            </h2>
            <p style={{ marginBottom: '12px' }}>We verzamelen de volgende persoonsgegevens:</p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Naam en contactgegevens (e-mail, telefoon)</li>
              <li style={{ marginBottom: '8px' }}>Adresgegevens voor levering</li>
              <li style={{ marginBottom: '8px' }}>Betaalgegevens (via beveiligde betaalproviders)</li>
              <li style={{ marginBottom: '8px' }}>Bestelgeschiedenis</li>
              <li style={{ marginBottom: '8px' }}>Communicatie met onze klantenservice</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              3. Waarom gebruiken we uw gegevens?
            </h2>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Het verwerken en verzenden van uw bestellingen</li>
              <li style={{ marginBottom: '8px' }}>Communicatie over uw bestelling</li>
              <li style={{ marginBottom: '8px' }}>Klantenservice en support</li>
              <li style={{ marginBottom: '8px' }}>Verbetering van onze dienstverlening</li>
              <li style={{ marginBottom: '8px' }}>Naleving van wettelijke verplichtingen</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              4. Beveiliging
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen 
              tegen verlies of enige vorm van onrechtmatige verwerking. We gebruiken veilige verbindingen (SSL) 
              en werken alleen met betrouwbare betaalproviders.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              5. Uw rechten
            </h2>
            <p style={{ marginBottom: '12px' }}>U heeft het recht om:</p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Uw gegevens in te zien</li>
              <li style={{ marginBottom: '8px' }}>Uw gegevens te corrigeren</li>
              <li style={{ marginBottom: '8px' }}>Uw gegevens te laten verwijderen</li>
              <li style={{ marginBottom: '8px' }}>Bezwaar te maken tegen verwerking</li>
              <li style={{ marginBottom: '8px' }}>Gegevensoverdracht aan te vragen</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              6. Contact
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Voor vragen over uw privacy of om gebruik te maken van uw rechten, kunt u contact opnemen.
            </p>

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
                Vragen over privacy?
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
