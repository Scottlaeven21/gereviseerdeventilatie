'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/account');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError('Ongeldige inloggegevens. Probeer het opnieuw.');
      setLoading(false);
    } else {
      router.push('/account');
    }
  };

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
            Inloggen
          </h1>

          <p
            style={{
              fontSize: '15px',
              color: '#64748b',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            Log in om je bestellingen te bekijken en sneller af te rekenen
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

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
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
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1266BD')}
                onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
              />
            </div>

            {/* Password */}
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
                Wachtwoord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1266BD')}
                onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
              />
            </div>

            {/* Forgot Password Link */}
            <div style={{ textAlign: 'right', marginBottom: '24px' }}>
              <Link
                href="/wachtwoord-vergeten"
                style={{
                  fontSize: '14px',
                  color: '#1266BD',
                  textDecoration: 'none',
                }}
              >
                Wachtwoord vergeten?
              </Link>
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
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.background = '#29AAE3')}
              onMouseOut={(e) => !loading && (e.currentTarget.style.background = '#1266BD')}
            >
              {loading ? 'Inloggen...' : 'Inloggen'}
            </button>
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

          {/* Sign Up Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '12px' }}>
              Nog geen account?
            </p>
            <Link
              href="/signup"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                border: '2px solid #1266BD',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                color: '#1266BD',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#1266BD';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1266BD';
              }}
            >
              Account Aanmaken
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
