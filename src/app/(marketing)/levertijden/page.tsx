import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Levertijden | Gereviseerde Ventilatie',
  description: 'Informatie over levertijden en verzending van uw bestelling.',
};

export default function LevertijdenPage() {
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
            Levertijden
          </h1>

          <div style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.8' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <i className="fas fa-truck-fast" style={{ fontSize: '48px' }} />
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                    Snelle Levering
                  </div>
                  <div style={{ fontSize: '16px', opacity: 0.9 }}>
                    Voor 17:00 besteld? Binnen 48 uur verzonden!
                  </div>
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Standaard Levertijden
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Wij streven ernaar om alle bestellingen zo snel mogelijk te verwerken en te verzenden:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Voorraad artikelen:</strong> 2-5 werkdagen na ontvangst van betaling
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Besteld voor 17:00:</strong> Verzending binnen 48 uur
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Weekend bestellingen:</strong> Verwerkt op eerstvolgende werkdag
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Op aanvraag producten:</strong> Levertijd wordt apart gecommuniceerd
              </li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Verzendmethoden
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1266BD', marginBottom: '8px' }}>
                  <i className="fas fa-box" style={{ marginRight: '8px' }} />
                  PostNL
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Voor kleinere pakketjes en standaard artikelen
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1266BD', marginBottom: '8px' }}>
                  <i className="fas fa-truck" style={{ marginRight: '8px' }} />
                  DHL / DPD
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Voor grotere units en snellere levering
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1266BD', marginBottom: '8px' }}>
                  <i className="fas fa-warehouse" style={{ marginRight: '8px' }} />
                  Eigen Bezorging
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Op aanvraag mogelijk in regio Limburg
                </p>
              </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Track & Trace
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Zodra uw bestelling is verzonden, ontvangt u automatisch een e-mail met:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Track & trace code om uw pakket te volgen</li>
              <li style={{ marginBottom: '8px' }}>Verwachte leveringsdatum</li>
              <li style={{ marginBottom: '8px' }}>Link naar de website van de vervoerder</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Afwijkende Levertijden
            </h2>
            <p style={{ marginBottom: '20px' }}>
              In sommige gevallen kan de levertijd afwijken:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Feestdagen:</strong> Tijdens officiële feestdagen verzenden wij niet
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Grote WTW-units:</strong> Kunnen extra verwerkingstijd vergen
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Installatie op aanvraag:</strong> Wordt in overleg gepland
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Uitzonderlijke omstandigheden:</strong> Bij vertragingen informeren wij u proactief
              </li>
            </ul>

            <div
              style={{
                background: '#fef3c7',
                border: '1px solid #fbbf24',
                borderRadius: '12px',
                padding: '20px',
                marginTop: '32px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                <i className="fas fa-info-circle" style={{ color: '#d97706', fontSize: '20px', flexShrink: 0 }} />
                <div style={{ color: '#78350f' }}>
                  <strong style={{ display: 'block', marginBottom: '8px' }}>Let op bij levering:</strong>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Zorg dat er iemand thuis is om het pakket in ontvangst te nemen</li>
                    <li>Controleer het pakket direct bij ontvangst op beschadigingen</li>
                    <li>Bij schade: meld dit meteen bij de bezorger én ons</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Vragen over uw levering?
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Heeft u vragen over de status van uw bestelling of de levertijd? Neem gerust contact met ons op:
            </p>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Email:</strong> <a href="mailto:contact@laevenitservices.nl" style={{ color: '#1266BD' }}>contact@laevenitservices.nl</a>
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Telefoon:</strong> +31 6 12345678
              </p>
              <p style={{ margin: 0 }}>
                <strong>Bereikbaar:</strong> Ma-Vr 09:00 - 17:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
