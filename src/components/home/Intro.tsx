'use client';

export function Intro() {
  return (
    <section 
      style={{ background: 'white', padding: '0 0 80px', position: 'relative', overflow: 'hidden' }}
      className="intro-section-mobile"
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(18,102,189,0.05) 0%, rgba(41,170,227,0.05) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '-5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(97,206,112,0.05) 0%, rgba(97,206,112,0.05) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-boxed" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main heading */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2
            className="intro-heading-mobile"
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#1266BD',
              marginBottom: '16px',
            }}
          >
            Wie zijn wij?
          </h2>
          <div
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #1266BD 0%, #29AAE3 100%)',
              margin: '0 auto',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Text Content */}
          <div style={{ gridColumn: 'span 2' }}>
            <div
              className="intro-text-mobile"
              style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#54595F',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              <p style={{ marginBottom: '24px' }}>
                Bij <strong style={{ color: '#1266BD' }}>Gereviseerde Ventilatie</strong> geloven we dat een gezond
                binnenklimaat niet duur of ingewikkeld hoeft te zijn. Daarom specialiseren wij ons in{' '}
                <strong style={{ color: '#1266BD' }}>
                  gereviseerde, volledig geteste en energiezuinige ventilatie-units
                </strong>{' '}
                die opnieuw jarenlang meegaan.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Met meer dan <strong style={{ color: '#29AAE3' }}>10 jaar ervaring</strong> in de ventilatiesector
                kennen we elk systeem van binnen en buiten. Iedere unit die ons pand verlaat, wordt zorgvuldig
                gereinigd, voorzien van nieuwe onderdelen waar nodig, en{' '}
                <strong style={{ color: '#29AAE3' }}>technisch 100% gecontroleerd</strong>.
              </p>
              <p style={{ marginBottom: 0 }}>
                Wij combineren <strong style={{ color: '#61CE70' }}>duurzaamheid</strong>,{' '}
                <strong style={{ color: '#61CE70' }}>kwaliteit</strong> en{' '}
                <strong style={{ color: '#61CE70' }}>betaalbaarheid</strong> zodat jij kunt kiezen voor een oplossing
                die goed is voor je woning én voor de toekomst.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className="intro-stats-mobile"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginTop: '64px',
          }}
        >
          {[
            {
              number: '10+',
              label: 'Jaar Ervaring',
              icon: 'fa-calendar-check',
              color: '#1266BD',
            },
            {
              number: '100%',
              label: 'Technisch Gecontroleerd',
              icon: 'fa-check-circle',
              color: '#29AAE3',
            },
            {
              number: '70%',
              label: 'Besparing Mogelijk',
              icon: 'fa-piggy-bank',
              color: '#61CE70',
            },
            {
              number: '2 jaar',
              label: 'Garantie',
              icon: 'fa-shield-halved',
              color: '#1266BD',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="intro-stat-card-mobile"
              style={{
                background: 'white',
                padding: '32px 24px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                border: '1px solid #f0f0f0',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  margin: '0 auto 16px',
                  background: `${stat.color}15`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                  fontSize: '24px',
                }}
              >
                <i className={`fas ${stat.icon}`} />
              </div>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: stat.color,
                  marginBottom: '8px',
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#54595F',
                  fontWeight: '500',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
