'use client';

import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'offerte',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic hier
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="contact-section-mobile" style={{ background: 'white', padding: '80px 0' }}>
      <div className="container-boxed">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="contact-grid">
          {/* Left Side - Info */}
          <div>
            <h2
              className="contact-heading-mobile"
              style={{
                fontSize: '42px',
                fontWeight: '700',
                color: '#1266BD',
                marginBottom: '24px',
                lineHeight: '1.2',
                textAlign: 'center',
              }}
            >
              Vragen of Offerte Nodig?
            </h2>
            <p
              className="contact-text-mobile"
              style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#54595F',
                marginBottom: '32px',
              }}
            >
              Neem contact met ons op en onze experts helpen je graag verder. Of je nu vragen hebt over onze
              gereviseerde ventilatie-units of een vrijblijvende offerte wilt aanvragen, wij staan voor je klaar!
            </p>

            {/* Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
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
                    background: '#1266BD',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                  }}
                >
                  <i className="fas fa-phone" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#54595F', marginBottom: '4px' }}>Bel ons</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1266BD' }}>
                    Van 09:00 - 17:00
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
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
                    background: '#61CE70',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                  }}
                >
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#54595F', marginBottom: '4px' }}>Email ons</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1266BD' }}>
                    Snelle reactie gegarandeerd
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
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
                    background: '#29AAE3',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                  }}
                >
                  <i className="fab fa-whatsapp" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#54595F', marginBottom: '4px' }}>WhatsApp</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1266BD' }}>
                    Direct contact
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
              padding: '40px',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1266BD',
                marginBottom: '24px',
              }}
            >
              Stuur ons een bericht
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#54595F',
                    marginBottom: '8px',
                  }}
                >
                  Naam *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    color: '#1e293b',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#54595F',
                    marginBottom: '8px',
                  }}
                >
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    color: '#1e293b',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#54595F',
                    marginBottom: '8px',
                  }}
                >
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    color: '#1e293b',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#54595F',
                    marginBottom: '8px',
                  }}
                >
                  Onderwerp *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    color: '#1e293b',
                  }}
                >
                  <option value="offerte">Offerte aanvragen</option>
                  <option value="vraag">Vraag over product</option>
                  <option value="installatie">Installatie</option>
                  <option value="anders">Anders</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#54595F',
                    marginBottom: '8px',
                  }}
                >
                  Bericht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    background: 'white',
                    color: '#1e293b',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#1266BD',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 12px rgba(18, 102, 189, 0.3)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(18, 102, 189, 0.4)';
                  e.currentTarget.style.background = '#29AAE3';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 102, 189, 0.3)';
                  e.currentTarget.style.background = '#1266BD';
                }}
              >
                Verstuur Bericht
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
