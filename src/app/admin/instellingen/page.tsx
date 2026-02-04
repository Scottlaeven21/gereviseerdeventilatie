'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: Implement settings save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Instellingen
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>
          Beheer algemene instellingen van je webshop
        </p>
      </div>

      <div style={{ maxWidth: '800px' }}>
        {/* Account Info */}
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
            <i className="fas fa-user-shield" style={{ marginRight: '12px', color: '#1266BD' }} />
            Admin Account
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>Email</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                {user?.email}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>Role</span>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  padding: '4px 12px',
                  background: '#dcfce7',
                  color: '#15803d',
                  borderRadius: '6px',
                }}
              >
                Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Shop Info */}
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
            <i className="fas fa-store" style={{ marginRight: '12px', color: '#1266BD' }} />
            Webshop Gegevens
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                BEDRIJFSNAAM
              </label>
              <input
                type="text"
                defaultValue="Gereviseerde Ventilatie"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                CONTACT EMAIL
              </label>
              <input
                type="email"
                defaultValue="contact@laevenitservices.nl"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                TELEFOONNUMMER
              </label>
              <input
                type="tel"
                defaultValue="+31 6 12345678"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
            <i className="fas fa-credit-card" style={{ marginRight: '12px', color: '#1266BD' }} />
            Betaalinstellingen
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                MOLLIE API KEY
              </label>
              <input
                type="password"
                defaultValue="test_********************"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                }}
              />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Mollie API key voor betalingen (momenteel test mode)
              </div>
            </div>
          </div>
        </div>

        {/* Tax Settings */}
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
            <i className="fas fa-percentage" style={{ marginRight: '12px', color: '#1266BD' }} />
            BTW & Belastingen
          </h2>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
              BTW PERCENTAGE
            </label>
            <select
              defaultValue="21"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              <option value="0">0% (Geen BTW)</option>
              <option value="9">9% (Verlaagd tarief)</option>
              <option value="21">21% (Hoog tarief)</option>
            </select>
          </div>
        </div>

        {/* Email Settings */}
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
            <i className="fas fa-envelope" style={{ marginRight: '12px', color: '#1266BD' }} />
            Email Instellingen
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                  Order bevestiging emails
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  Verstuur automatisch een email bij nieuwe bestellingen
                </div>
              </div>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                  Verzend notificaties
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  Email klant wanneer bestelling verzonden is
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '14px',
            background: saved ? '#61CE70' : '#1266BD',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {saved ? (
            <>
              <i className="fas fa-check" style={{ marginRight: '8px' }} />
              Opgeslagen!
            </>
          ) : (
            <>
              <i className="fas fa-save" style={{ marginRight: '8px' }} />
              Instellingen Opslaan
            </>
          )}
        </button>

        <div style={{ marginTop: '16px', fontSize: '13px', color: '#64748b', textAlign: 'center' }}>
          💡 Deze instellingen zijn momenteel read-only en dienen als voorbeeld
        </div>
      </div>
    </div>
  );
}
