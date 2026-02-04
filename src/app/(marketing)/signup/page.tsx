'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, user, loading: authLoading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user && !success) {
      router.push('/account');
    }
  }, [user, authLoading, success, router]);

  if (authLoading) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password.length < 6) {
      setError('Wachtwoord moet minimaal 6 karakters bevatten');
      return;
    }

    if (password !== confirmPassword) {
      setError('Wachtwoorden komen niet overeen');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error.message || 'Er is iets misgegaan. Probeer het opnieuw.');
      setLoading(false);
    } else {
      setSuccess(true);
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
              <i className="fas fa-check" style={{ fontSize: '32px', color: 'white' }} />
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Controleer je inbox!
            </h1>

            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '32px' }}>
              We hebben een bevestigingsmail gestuurd naar <strong>{email}</strong>.
              Klik op de link in de email om je account te activeren.
            </p>

            <Link
              href="/"
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
              Terug naar Home
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
            Account Aanmaken
          </h1>

          <p
            style={{
              fontSize: '15px',
              color: '#64748b',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            Maak een account aan om sneller af te rekenen en je bestellingen te volgen
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

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
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
                Volledige Naam
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Jan de Vries"
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

            {/* Email */}
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

            {/* Password */}
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
                Wachtwoord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minimaal 6 karakters"
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

            {/* Confirm Password */}
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
                Bevestig Wachtwoord
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Herhaal je wachtwoord"
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

            {/* Submit Button */}
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
              {loading ? 'Account aanmaken...' : 'Account Aanmaken'}
            </button>

            {/* Terms */}
            <p
              style={{
                fontSize: '13px',
                color: '#64748b',
                textAlign: 'center',
                lineHeight: '1.5',
              }}
            >
              Door een account aan te maken ga je akkoord met onze{' '}
              <Link href="/algemene-voorwaarden" style={{ color: '#1266BD' }}>
                Algemene Voorwaarden
              </Link>{' '}
              en{' '}
              <Link href="/privacy" style={{ color: '#1266BD' }}>
                Privacy Policy
              </Link>
              .
            </p>
          </form>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              margin: '32px 0',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            <span style={{ fontSize: '14px', color: '#64748b' }}>of</span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          </div>

          {/* Login Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: '#64748b' }}>
              Heb je al een account?{' '}
              <Link href="/login" style={{ color: '#1266BD', fontWeight: '600', textDecoration: 'none' }}>
                Inloggen
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
