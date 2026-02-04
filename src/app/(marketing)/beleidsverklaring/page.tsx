import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beleidsverklaring | Gereviseerde Ventilatie',
  description: 'Beleidsverklaring van Gereviseerde Ventilatie over onze bedrijfswaarden en werkwijze.',
};

export default function BeleidsverklaringPage() {
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
            Beleidsverklaring
          </h1>

          <div style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '24px' }}>
              <strong>Laatst bijgewerkt: 2 februari 2026</strong>
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Onze Missie
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Gereviseerde Ventilatie streeft ernaar om hoogwaardige ventilatieoplossingen toegankelijk te maken voor iedereen. 
              Door het reviseren en verkopen van kwalitatieve ventilatie-units bieden wij een duurzaam en betaalbaar alternatief 
              voor nieuw materiaal, zonder in te leveren op kwaliteit of prestaties.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Kwaliteit & Duurzaamheid
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Alle door ons aangeboden gereviseerde producten worden zorgvuldig geïnspecteerd, gereinigd en waar nodig voorzien 
              van nieuwe onderdelen. Elk product wordt getest volgens strenge kwaliteitsnormen voordat het wordt verzonden. 
              Hierdoor garanderen wij:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Optimale prestaties van alle producten</li>
              <li style={{ marginBottom: '8px' }}>Minimaal 12 maanden garantie op gereviseerde units</li>
              <li style={{ marginBottom: '8px' }}>Duurzame keuze door hergebruik van materialen</li>
              <li style={{ marginBottom: '8px' }}>Besparing van gemiddeld 30-50% t.o.v. nieuwprijs</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Klanttevredenheid
            </h2>
            <p style={{ marginBottom: '20px' }}>
              De tevredenheid van onze klanten staat centraal. Wij streven naar:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Snelle levering binnen 2-5 werkdagen</li>
              <li style={{ marginBottom: '8px' }}>Deskundig advies en persoonlijke service</li>
              <li style={{ marginBottom: '8px' }}>Transparante communicatie over productstatus</li>
              <li style={{ marginBottom: '8px' }}>Eerlijke prijzen zonder verborgen kosten</li>
              <li style={{ marginBottom: '8px' }}>14 dagen bedenktijd volgens wettelijke regels</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Milieu & Maatschappelijk Verantwoord Ondernemen
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Als specialist in gereviseerde ventilatie dragen wij actief bij aan een duurzamere toekomst:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Circulaire economie:</strong> Door producten te reviseren verlengen we de levensduur en verminderen we afval
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>CO2-reductie:</strong> Hergebruik bespaart productie-energie en transportemissies
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Duurzame verpakking:</strong> Waar mogelijk gebruiken we gerecycled verpakkingsmateriaal
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Energiebesparing:</strong> Onze WTW-units helpen klanten tot 30% te besparen op verwarmingskosten
              </li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Expertise & Professionaliteit
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Ons team bestaat uit ervaren technici met jarenlange kennis van ventilatiesystemen. 
              Wij werken samen met gerenommeerde merken zoals Zehnder, Itho Daalderop en Duco. 
              Deze expertise stelt ons in staat om:
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Deskundig advies te geven over het juiste product voor uw situatie</li>
              <li style={{ marginBottom: '8px' }}>Complexe installaties en onderhoudswerkzaamheden uit te voeren</li>
              <li style={{ marginBottom: '8px' }}>Technische support te bieden na aankoop</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Privacy & Gegevensbescherming
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Wij gaan zorgvuldig om met uw persoonlijke gegevens en handelen volgens de AVG (Algemene Verordening Gegevensbescherming). 
              Uw gegevens worden uitsluitend gebruikt voor orderverwerking en communicatie, en worden nooit zonder uw toestemming 
              gedeeld met derden. Zie ook ons <a href="/privacy" style={{ color: '#1266BD', textDecoration: 'underline' }}>privacybeleid</a>.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Continue Verbetering
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Wij streven voortdurend naar verbetering van onze producten, diensten en processen. 
              Klantfeedback is voor ons zeer waardevol en wordt serieus genomen. Suggesties of klachten 
              kunt u altijd met ons delen via <a href="/contact" style={{ color: '#1266BD', textDecoration: 'underline' }}>contact</a>.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '32px', marginBottom: '16px' }}>
              Contact
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Gereviseerde Ventilatie<br />
              Rozenstraat 1<br />
              6361 HS Nuth<br />
              Nederland
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
                Vragen over ons beleid?
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
