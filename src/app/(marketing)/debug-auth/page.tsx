'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function DebugAuthPage() {
  const { user, profile, isAdmin, loading } = useAuth();

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h1 style={{ marginBottom: '20px' }}>🔍 Auth Debug Info</h1>

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Loading State:</h2>
        <pre>{loading ? '⏳ LOADING...' : '✅ LOADED'}</pre>
      </div>

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>User (from Supabase Auth):</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Profile (from user_profiles table):</h2>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>

      <div style={{ background: isAdmin ? '#dcfce7' : '#fee2e2', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Is Admin:</h2>
        <pre style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {isAdmin ? '✅ YES - IS ADMIN' : '❌ NO - NOT ADMIN'}
        </pre>
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
          Calculated from: profile?.role === 'admin'<br/>
          Profile role: <strong>{profile?.role || 'NULL'}</strong>
        </p>
      </div>

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <h2>Admin Access Check:</h2>
        {isAdmin ? (
          <p style={{ color: 'green', fontSize: '18px' }}>
            ✅ You should be able to access <a href="/admin">/admin</a>
          </p>
        ) : (
          <p style={{ color: 'red', fontSize: '18px' }}>
            ❌ You cannot access /admin (not admin)
          </p>
        )}
      </div>
    </div>
  );
}
