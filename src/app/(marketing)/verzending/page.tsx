import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verzending & Retour | Gereviseerde Ventilatie',
  description: 'Informatie over verzending, levertijden en retourneren bij Gereviseerde Ventilatie.',
};

export default function ShippingPage() {
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
            Verzending & Retour
          </h1>

          <div style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.8' }}>
            {/* Verzending */}
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
              Verzending
            </h2>

            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Verzendkosten
            </h3>
            <p style={{ marginBottom: '20px' }}>
              De verzendkosten worden berekend op basis van het product en worden duidelijk weergegeven bij het afrekenen. 
              Elk product heeft zijn eigen verzendcategorie, afhankelijk van gewicht en afmetingen.
            </p>
            <div
              style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid #e5e7eb',
              }}
            >
              <p style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b', marginBottom: '12px' }}>
                <i className="fas fa-info-circle" style={{ color: '#1266BD', marginRight: '8px' }} />
                Indicatie verzendkosten:
              </p>
              <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '15px', color: '#64748b' }}>
                <li style={{ marginBottom: '6px' }}>Kleine onderdelen (filters, ventielen): vanaf €5,95</li>
                <li style={{ marginBottom: '6px' }}>Middelgrote producten (slangen, accessoires): vanaf €8,95</li>
                <li style={{ marginBottom: '6px' }}>Grote ventilatie-units: vanaf €15,95</li>
              </ul>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Levertijd
            </h3>
            <div
              style={{
                background: '#dbeafe',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                borderLeft: '4px solid #1266BD',
              }}
            >
              <p style={{ fontSize: '17px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                <i className="fas fa-clock" style={{ color: '#1266BD', marginRight: '8px' }} />
                Standaard verzonden binnen 48 uur na betaling
              </p>
            </div>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Nederland:</strong> 2-5 werkdagen na verzending
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>België:</strong> 3-5 werkdagen na verzending (op aanvraag)
              </li>
            </ul>
            <div
              style={{
                background: '#fef3c7',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #fbbf24',
              }}
            >
              <p style={{ fontSize: '14px', color: '#78350f', margin: 0 }}>
                <i className="fas fa-exclamation-triangle" style={{ color: '#d97706', marginRight: '8px' }} />
                <strong>Let op:</strong> Bij grotere pakketten (zoals WTW-units en mechanische ventilatoren) 
                kan de verwerkings- en levertijd afwijken. U wordt hierover geïnformeerd bij de orderbevestiging.
              </p>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Track & Trace
            </h3>
            <p style={{ marginBottom: '20px' }}>
              U ontvangt na verzending een track & trace code waarmee u uw pakket kunt volgen.
            </p>

            {/* Retourneren */}
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginTop: '48px', marginBottom: '24px' }}>
              Retourneren
            </h2>

            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Herroepingsrecht
            </h3>
            <p style={{ marginBottom: '20px' }}>
              U heeft het recht om binnen 14 dagen na ontvangst van uw bestelling deze zonder opgave van 
              redenen te retourneren. Het product dient onbeschadigd en in de originele verpakking te zijn.
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Retourprocedure
            </h3>
            <ol style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>
                Neem binnen 14 dagen contact met ons op via email of telefoon
              </li>
              <li style={{ marginBottom: '12px' }}>
                U ontvangt een retourlabel en instructies
              </li>
              <li style={{ marginBottom: '12px' }}>
                Stuur het product zorgvuldig verpakt retour
              </li>
              <li style={{ marginBottom: '12px' }}>
                Na ontvangst en controle krijgt u het aankoopbedrag binnen 14 dagen teruggestort
              </li>
            </ol>

            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Retourkosten
            </h3>
            <p style={{ marginBottom: '20px' }}>
              De retourkosten zijn voor rekening van de koper, tenzij het product defect is of 
              niet overeenkomt met de bestelling.
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginTop: '24px', marginBottom: '12px' }}>
              Defecte producten
            </h3>
            <p style={{ marginBottom: '20px' }}>
              Is uw product defect binnen de garantieperiode? Neem dan contact met ons op. 
              Wij zorgen voor een snelle oplossing via reparatie, vervanging of terugbetaling.
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
              <p style={{ marginBottom: '16px', fontSize: '15px' }}>
                Vragen over verzending of retourneren?
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
