import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookiebeleid | Gereviseerde Ventilatie',
  description: 'Lees hoe Gereviseerde Ventilatie cookies gebruikt op deze website.',
};

export default function CookiesPage() {
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
            Cookiebeleid
          </h1>

          <div style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '24px' }}>
              <strong>Laatst bijgewerkt: 2 februari 2026</strong>
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Wat zijn cookies?
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Cookies zijn kleine tekstbestanden die op uw computer of mobiele apparaat worden opgeslagen wanneer u onze website bezoekt. 
              Deze cookies helpen ons om de website beter te laten functioneren en uw gebruikerservaring te verbeteren.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Welke cookies gebruiken wij?
            </h2>

            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Functionele cookies (noodzakelijk)
            </h3>
            <p style={{ marginBottom: '12px' }}>
              Deze cookies zijn essentieel voor het functioneren van de website:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Winkelwagen:</strong> Om uw geselecteerde producten te onthouden
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Authenticatie:</strong> Om u ingelogd te houden op uw account
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Beveiliging:</strong> Voor de bescherming tegen frauduleus gebruik
              </li>
            </ul>

            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Analytische cookies (optioneel)
            </h3>
            <p style={{ marginBottom: '20px' }}>
              Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken, zodat we deze kunnen verbeteren. 
              We gebruiken deze informatie anoniem en delen deze niet met derden.
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Marketing cookies (optioneel)
            </h3>
            <p style={{ marginBottom: '20px' }}>
              Deze cookies worden gebruikt om advertenties relevanter voor u te maken. 
              Ze worden alleen geplaatst met uw toestemming.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Cookies beheren
            </h2>
            <p style={{ marginBottom: '20px' }}>
              U kunt cookies te allen tijde beheren via de instellingen van uw browser. 
              Let op: als u cookies uitschakelt, kunnen bepaalde onderdelen van de website mogelijk niet goed functioneren.
            </p>

            <p style={{ marginBottom: '12px' }}>
              <strong>Hoe cookies verwijderen?</strong>
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Chrome:</strong> Instellingen → Privacy en beveiliging → Cookies en andere sitegegevens
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Firefox:</strong> Instellingen → Privacy en beveiliging → Cookies en sitegegevens
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Safari:</strong> Voorkeuren → Privacy → Websitegegevens beheren
              </li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Contact
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Heeft u vragen over ons cookiebeleid? Neem dan contact met ons op via:
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Email:</strong> contact@laevenitservices.nl
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Telefoon:</strong> +31 6 12345678
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
