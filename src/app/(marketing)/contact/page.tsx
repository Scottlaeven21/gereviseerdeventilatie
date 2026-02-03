'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
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
            Contact
          </h1>
          <p
            style={{
              fontSize: '20px',
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.95,
            }}
          >
            Vragen over onze producten of diensten? We helpen u graag verder!
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div style={{ padding: '80px 0' }}>
        <div className="container-boxed">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            {/* Left: Contact Info */}
            <div>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1266BD',
                  marginBottom: '24px',
                }}
              >
                Neem contact op
              </h2>
              <p
                style={{
                  fontSize: '17px',
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '40px',
                }}
              >
                Heeft u vragen over onze gereviseerde ventilatiesystemen, wilt u advies op maat, 
                of een offerte aanvragen? Ons team staat voor u klaar!
              </p>

              {/* Contact Methods */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                <a
                  href="tel:+31652641106"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '24px',
                    background: 'white',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: '#1266BD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className="fas fa-phone" style={{ fontSize: '24px', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                      Telefoon
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1266BD' }}>
                      +31 6 52641106
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@gereviseerdeventilatie.nl"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '24px',
                    background: 'white',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: '#61CE70',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className="fas fa-envelope" style={{ fontSize: '24px', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                      E-mail
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1266BD' }}>
                      info@gereviseerdeventilatie.nl
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/31652641106"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '24px',
                    background: 'white',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: '#29AAE3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className="fab fa-whatsapp" style={{ fontSize: '28px', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                      WhatsApp
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1266BD' }}>
                      Start chat
                    </div>
                  </div>
                </a>
              </div>

              {/* Opening Hours */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                  Openingstijden
                </h3>
                <div style={{ fontSize: '15px', color: '#64748b', lineHeight: '2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Maandag - Vrijdag</span>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>09:00 - 17:30</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Zaterdag</span>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>10:00 - 16:00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Zondag</span>
                    <span style={{ fontWeight: '600', color: '#dc2626' }}>Gesloten</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '40px',
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
                  Stuur ons een bericht
                </h2>

                {submitted ? (
                  <div
                    style={{
                      padding: '48px 24px',
                      textAlign: 'center',
                    }}
                  >
                    <i
                      className="fas fa-check-circle"
                      style={{
                        fontSize: '64px',
                        color: '#61CE70',
                        marginBottom: '24px',
                      }}
                    />
                    <h3
                      style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: '12px',
                      }}
                    >
                      Bericht verzonden!
                    </h3>
                    <p style={{ fontSize: '16px', color: '#64748b' }}>
                      We nemen zo snel mogelijk contact met u op.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                      <label
                        htmlFor="name"
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
                        id="name"
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

                    <div style={{ marginBottom: '20px' }}>
                      <label
                        htmlFor="email"
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
                        id="email"
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

                    <div style={{ marginBottom: '20px' }}>
                      <label
                        htmlFor="phone"
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '8px',
                        }}
                      >
                        Telefoonnummer
                      </label>
                      <input
                        type="tel"
                        id="phone"
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

                    <div style={{ marginBottom: '20px' }}>
                      <label
                        htmlFor="subject"
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '8px',
                        }}
                      >
                        Onderwerp *
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '15px',
                          color: formData.subject ? '#1e293b' : '#94a3b8',
                          background: 'white',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">Selecteer een onderwerp</option>
                        <option value="product">Productvraag</option>
                        <option value="order">Bestellingsvraag</option>
                        <option value="technical">Technisch advies</option>
                        <option value="quote">Offerte aanvraag</option>
                        <option value="other">Anders</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label
                        htmlFor="message"
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '8px',
                        }}
                      >
                        Bericht *
                      </label>
                      <textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                        placeholder="Uw vraag of opmerking..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: isSubmitting ? '#94a3b8' : '#1266BD',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseOver={(e) => {
                        if (!isSubmitting) e.currentTarget.style.background = '#29AAE3';
                      }}
                      onMouseOut={(e) => {
                        if (!isSubmitting) e.currentTarget.style.background = '#1266BD';
                      }}
                    >
                      {isSubmitting ? 'Verzenden...' : 'Verstuur bericht'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
