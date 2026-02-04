'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      setError('Er is iets misgegaan. Controleer je email en probeer opnieuw.');
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container-boxed">
          <div
            style={{
              maxWidth: '480px',
              margin: '0 auto',
              background: 'white',
              borderRadius: '16px',
              padding: '48px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                background: '#61CE70',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <i className="fas fa-envelope" style={{ fontSize: '28px', color: 'white' }} />
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Controleer je inbox!
            </h1>

            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '32px' }}>
              We hebben een wachtwoord reset link gestuurd naar <strong>{email}</strong>.
              Klik op de link in de email om je wachtwoord te resetten.
            </p>

            <Link
              href="/login"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: '#1266BD',
                color: 'white',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Terug naar Inloggen
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container-boxed">
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            Wachtwoord Vergeten?
          </h1>

          <p
            style={{
              fontSize: '15px',
              color: '#64748b',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            Geen probleem! Vul je email in en we sturen je een reset link.
          </p>

          {/* Error Message */}
          {error && (
            <div
              style={{
                background: '#fee',
                border: '1px solid #fcc',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '24px',
                color: '#c33',
                fontSize: '14px',
              }}
            >
              <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }} />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '8px',
                }}
              >
                E-mailadres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="je@email.nl"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1266BD')}
                onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? '#94a3b8' : '#1266BD',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '24px',
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.background = '#29AAE3')}
              onMouseOut={(e) => !loading && (e.currentTarget.style.background = '#1266BD')}
            >
              {loading ? 'Verzenden...' : 'Reset Link Verzenden'}
            </button>
          </form>

          {/* Back to Login */}
          <div style={{ textAlign: 'center' }}>
            <Link href="/login" style={{ fontSize: '14px', color: '#1266BD', textDecoration: 'none' }}>
              <i className="fas fa-arrow-left" style={{ marginRight: '8px' }} />
              Terug naar Inloggen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
