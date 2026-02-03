'use client';

import { useState } from 'react';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productType: '',
    quantity: '1',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

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
            }}
          >
            Offerte Aanvragen
          </h1>
          <p
            style={{
              fontSize: '20px',
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.95,
            }}
          >
            Vraag een vrijblijvende offerte aan en ontvang binnen 24 uur een scherp prijsvoorstel op maat.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div style={{ padding: '80px 0' }}>
        <div className="container-boxed" style={{ maxWidth: '800px' }}>
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '48px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <i
                  className="fas fa-check-circle"
                  style={{
                    fontSize: '80px',
                    color: '#61CE70',
                    marginBottom: '32px',
                  }}
                />
                <h2
                  style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '16px',
                  }}
                >
                  Offerteaanvraag Ontvangen!
                </h2>
                <p
                  style={{
                    fontSize: '18px',
                    color: '#64748b',
                    marginBottom: '32px',
                    maxWidth: '500px',
                    margin: '0 auto 32px',
                  }}
                >
                  Bedankt voor uw aanvraag. We nemen binnen 24 uur contact met u op met een vrijblijvend voorstel.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      productType: '',
                      quantity: '1',
                      description: '',
                    });
                  }}
                  style={{
                    padding: '16px 32px',
                    background: '#1266BD',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Nieuwe aanvraag
                </button>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '32px',
                  }}
                >
                  Offerte Formulier
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* Personal Info */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                      Contactgegevens
                    </h3>

                    <div style={{ marginBottom: '20px' }}>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '8px',
                        }}
                      >
                        Naam *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '15px',
                          color: '#1e293b',
                        }}
                        placeholder="Uw naam"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '8px',
                          }}
                        >
                          E-mailadres *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '15px',
                            color: '#1e293b',
                          }}
                          placeholder="uw@email.nl"
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '8px',
                          }}
                        >
                          Telefoonnummer *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '15px',
                            color: '#1e293b',
                          }}
                          placeholder="+31 6 12345678"
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '8px',
                        }}
                      >
                        Bedrijfsnaam (optioneel)
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '15px',
                          color: '#1e293b',
                        }}
                        placeholder="Uw bedrijfsnaam"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                      Productinformatie
                    </h3>

                    <div style={{ marginBottom: '20px' }}>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '8px',
                        }}
                      >
                        Type product *
                      </label>
                      <select
                        required
                        value={formData.productType}
                        onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '15px',
                          color: formData.productType ? '#1e293b' : '#94a3b8',
                          background: 'white',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">Selecteer een categorie</option>
                        <option value="mechanische-ventilatoren">Mechanische Ventilatoren</option>
                        <option value="wtw-units">WTW-Units</option>
                        <option value="filters">Filters</option>
                        <option value="flexibele-slangen">Flexibele Slangen</option>
                        <option value="ventielen">Ventielen</option>
                        <option value="anders">Anders</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '8px',
                        }}
                      >
                        Gewenst aantal *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '15px',
                          color: '#1e293b',
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '8px',
                        }}
                      >
                        Beschrijving & wensen *
                      </label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={6}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '15px',
                          color: '#1e293b',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                        }}
                        placeholder="Beschrijf uw wensen en specificaties zo gedetailleerd mogelijk..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: isSubmitting ? '#94a3b8' : '#1266BD',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) e.currentTarget.style.background = '#29AAE3';
                    }}
                    onMouseOut={(e) => {
                      if (!isSubmitting) e.currentTarget.style.background = '#1266BD';
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" />
                        Verzenden...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane" />
                        Verstuur offerteaanvraag
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Why Request Quote */}
          <div
            style={{
              marginTop: '40px',
              background: 'white',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
              Waarom een offerte aanvragen?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {[
                {
                  icon: 'tags',
                  title: 'Scherpe prijzen',
                  description: 'Ontvang de beste prijs voor uw specifieke situatie',
                },
                {
                  icon: 'comments',
                  title: 'Persoonlijk advies',
                  description: 'Deskundig advies afgestemd op uw wensen',
                },
                {
                  icon: 'clock',
                  title: 'Snelle reactie',
                  description: 'Binnen 24 uur een compleet voorstel',
                },
                {
                  icon: 'handshake',
                  title: 'Vrijblijvend',
                  description: 'Geen verplichtingen, alleen een voorstel',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: '#1266BD15',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <i className={`fas fa-${item.icon}`} style={{ fontSize: '20px', color: '#1266BD' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
