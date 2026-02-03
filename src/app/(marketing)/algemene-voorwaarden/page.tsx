import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | Gereviseerde Ventilatie',
  description: 'Algemene voorwaarden van Gereviseerde Ventilatie.',
};

export default function TermsPage() {
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
            Algemene Voorwaarden
          </h1>

          <div style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '24px' }}>
              <strong>Laatst bijgewerkt: 2 februari 2026</strong>
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 1: Definities
            </h2>
            <p style={{ marginBottom: '20px' }}>
              In deze algemene voorwaarden wordt verstaan onder:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Verkoper:</strong> Gereviseerde Ventilatie</li>
              <li style={{ marginBottom: '8px' }}><strong>Koper:</strong> De natuurlijke of rechtspersoon die een aankoop doet</li>
              <li style={{ marginBottom: '8px' }}><strong>Producten:</strong> Gereviseerde ventilatiesystemen en accessoires</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 2: Toepasselijkheid
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, bestellingen en overeenkomsten 
              tussen Gereviseerde Ventilatie en de koper.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 3: Aanbod en Prijzen
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Alle aanbiedingen zijn vrijblijvend. Prijzen zijn inclusief BTW, tenzij anders vermeld. 
              Prijswijzigingen en typefouten zijn voorbehouden.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 4: Bestellingen
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Een overeenkomst komt tot stand op het moment dat de koper de bestelling heeft geplaatst en 
              wij deze schriftelijk (per e-mail) hebben bevestigd.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 5: Betaling
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Betaling dient vooraf te geschieden via een van onze beschikbare betaalmethoden: 
              iDEAL, PayPal, Bancontact of Creditcard. Wij gebruiken beveiligde betaalsystemen.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 6: Levering
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Bestellingen worden binnen 2-3 werkdagen verzonden. Levertijd is afhankelijk van de gekozen verzendmethode. 
              Bij bestellingen boven €25 worden geen verzendkosten in rekening gebracht.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 7: Herroepingsrecht
            </h2>
            <p style={{ marginBottom: '20px' }}>
              U heeft het recht om binnen 14 dagen na ontvangst van het product de overeenkomst te ontbinden, 
              zonder opgave van redenen. Het product dient onbeschadigd en in de originele verpakking te worden geretourneerd.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 8: Garantie
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Op alle gereviseerde producten geven wij 2 jaar garantie. De garantie dekt fabricagefouten en 
              technische defecten die ontstaan bij normaal gebruik. Schade door verkeerd gebruik valt niet onder de garantie.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 9: Aansprakelijkheid
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Gereviseerde Ventilatie is niet aansprakelijk voor indirecte schade, gevolgschade of bedrijfsschade. 
              Onze aansprakelijkheid is beperkt tot het bedrag van de bestelling.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Artikel 10: Geschillen
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter.
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
                Vragen over onze algemene voorwaarden?
              </p>
              <a
                href="mailto:info@gereviseerdeventilatie.nl"
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
                Neem contact op
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
