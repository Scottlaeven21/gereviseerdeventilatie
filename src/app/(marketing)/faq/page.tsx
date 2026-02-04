import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veelgestelde Vragen (FAQ) | Gereviseerde Ventilatie',
  description: 'Antwoorden op veelgestelde vragen over onze producten, levering, garantie en meer.',
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Bestellen & Betalen',
      questions: [
        {
          q: 'Hoe kan ik een bestelling plaatsen?',
          a: 'U kunt eenvoudig online bestellen door producten aan uw winkelwagen toe te voegen en het afrekenproces te volgen. Na uw bestelling ontvangt u direct een bevestiging per e-mail.'
        },
        {
          q: 'Welke betaalmethoden accepteren jullie?',
          a: 'Wij accepteren iDEAL, PayPal, Mastercard en Bancontact. Alle betalingen worden veilig verwerkt via Mollie.'
        },
        {
          q: 'Kan ik een factuur krijgen?',
          a: 'Ja, bij elke bestelling ontvangt u automatisch een factuur per e-mail. Deze kunt u ook vinden in uw account onder "Mijn Bestellingen".'
        }
      ]
    },
    {
      category: 'Levering & Verzending',
      questions: [
        {
          q: 'Hoe lang duurt de levering?',
          a: 'Standaard leveren wij binnen 2-5 werkdagen na ontvangst van uw betaling. Voor bestellingen voor 17:00 uur proberen we deze binnen 48 uur te verzenden.'
        },
        {
          q: 'Wat zijn de verzendkosten?',
          a: 'De verzendkosten variëren per product en worden duidelijk weergegeven bij het afrekenen. Voor kleinere producten rekenen wij € 5,95. Grotere units hebben hogere verzendkosten vanwege gewicht en formaat.'
        },
        {
          q: 'Kan ik mijn pakket volgen?',
          a: 'Ja, zodra uw bestelling is verzonden ontvangt u automatisch een track & trace code per e-mail waarmee u uw pakket kunt volgen.'
        },
        {
          q: 'Leveren jullie in heel Nederland?',
          a: 'Ja, wij leveren in heel Nederland. Voor leveringen naar België of andere landen kunt u contact met ons opnemen.'
        }
      ]
    },
    {
      category: 'Producten & Kwaliteit',
      questions: [
        {
          q: 'Wat betekent "gereviseerd"?',
          a: 'Gereviseerde producten zijn gebruikte units die professioneel zijn gereinigd, geïnspecteerd en waar nodig voorzien van nieuwe onderdelen. Ze worden getest volgens strenge normen en zijn technisch volledig functioneel.'
        },
        {
          q: 'Krijg ik garantie op gereviseerde producten?',
          a: 'Ja, op alle gereviseerde ventilatie-units geven wij minimaal 12 maanden garantie. Voor nieuwe producten geldt de fabrieksgarantie.'
        },
        {
          q: 'Zijn gereviseerde producten net zo goed als nieuw?',
          a: 'Technisch gezien functioneren onze gereviseerde producten even goed als nieuwe units. Ze kunnen cosmetisch kleine gebruikssporen hebben, maar dit heeft geen invloed op de prestaties.'
        },
        {
          q: 'Welke merken verkopen jullie?',
          a: 'Wij werken met gerenommeerde merken zoals Zehnder, Itho Daalderop en Duco. Dit zijn betrouwbare A-merken in de ventilatiebranche.'
        }
      ]
    },
    {
      category: 'Retourneren & Garantie',
      questions: [
        {
          q: 'Kan ik mijn bestelling retourneren?',
          a: 'Ja, volgens de wet heeft u 14 dagen bedenktijd vanaf ontvangst van uw bestelling. Het product moet ongebruikt zijn en in de originele verpakking worden geretourneerd. Neem contact op voor een retourlabel.'
        },
        {
          q: 'Wat als mijn product defect is?',
          a: 'Neem direct contact met ons op via contact@laevenitservices.nl. Wij bieden een snelle oplossing binnen de garantievoorwaarden, zoals reparatie, vervanging of restitutie.'
        },
        {
          q: 'Hoe claim ik garantie?',
          a: 'Neem contact op met ons klantenservice team met uw ordernummer en een beschrijving van het probleem. Wij helpen u graag verder met het garantieproces.'
        }
      ]
    },
    {
      category: 'Installatie & Onderhoud',
      questions: [
        {
          q: 'Bieden jullie installatieservice aan?',
          a: 'Ja, op aanvraag kunnen wij de installatie van uw ventilatie-unit verzorgen. Neem contact met ons op voor een offerte op maat.'
        },
        {
          q: 'Hebben jullie ook onderhoudsdiensten?',
          a: 'Ja, wij bieden reiniging en onderhoud van ventilatiesystemen aan. Dit verlengt de levensduur en zorgt voor optimale prestaties.'
        },
        {
          q: 'Kan ik zelf een WTW-unit installeren?',
          a: 'Met technische kennis en ervaring is zelfinstallatie mogelijk. Wij adviseren echter om een professional in te schakelen voor optimale prestaties en garantie.'
        }
      ]
    },
    {
      category: 'Account & Privacy',
      questions: [
        {
          q: 'Moet ik een account aanmaken om te bestellen?',
          a: 'Nee, u kunt ook als gast afrekenen. Een account heeft wel voordelen: sneller bestellen, ordergeschiedenis inzien en eenvoudig retourneren.'
        },
        {
          q: 'Zijn mijn gegevens veilig?',
          a: 'Ja, wij nemen privacy en gegevensbescherming zeer serieus. Al uw gegevens worden beveiligd opgeslagen en worden nooit zonder toestemming gedeeld. Zie ook ons privacybeleid.'
        },
        {
          q: 'Hoe kan ik mijn gegevens wijzigen?',
          a: 'Log in op uw account en ga naar "Account Instellingen" om uw gegevens aan te passen.'
        }
      ]
    }
  ];

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '80px 0' }}>
      <div className="container-boxed" style={{ maxWidth: '1000px' }}>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#1266BD',
              marginBottom: '16px',
            }}
          >
            Veelgestelde Vragen
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            Vind snel antwoorden op de meest gestelde vragen
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {faqs.map((category, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '24px',
                }}
              >
                {category.category}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {category.questions.map((faq, qIdx) => (
                  <div key={qIdx} style={{ borderBottom: qIdx < category.questions.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: '24px' }}>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1266BD',
                        marginBottom: '12px',
                      }}
                    >
                      <i className="fas fa-question-circle" style={{ marginRight: '12px' }} />
                      {faq.q}
                    </h3>
                    <p
                      style={{
                        fontSize: '16px',
                        color: '#64748b',
                        lineHeight: '1.7',
                        marginLeft: '32px',
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

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
            Staat uw vraag er niet bij?
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
  );
}
