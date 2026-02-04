'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, AuthProvider } from '@/contexts/AuthContext';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, profile, isAdmin, loading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  useEffect(() => {
    // Wait for both user AND profile to load before checking
    if (!loading && user && profile !== null && !isAdmin) {
      router.push('/login');
    }
  }, [user, profile, isAdmin, loading, router]);

  // Show loading while auth or profile is loading
  if (loading || !user || profile === null) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Laden...</div>
      </div>
    );
  }

  // If profile loaded but not admin, redirect
  if (!isAdmin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '18px', color: '#ef4444' }}>Geen toegang - alleen voor admins</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Mobile Header */}
      <div
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: '#1e293b',
          alignItems: 'center',
          padding: '0 16px',
          zIndex: 1000,
        }}
        className="mobile-header"
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <i className={sidebarOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </button>
        <span style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginLeft: '12px' }}>
          Admin
        </span>
      </div>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            display: 'none',
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          className="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: '280px',
          background: '#1e293b',
          color: 'white',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          zIndex: 1000,
          transition: 'transform 0.3s ease',
        }}
        className={sidebarOpen ? 'sidebar-open' : 'sidebar'}
      >
        {/* Logo */}
        <Link
          href="/admin"
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'white',
            textDecoration: 'none',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <i className="fas fa-shield-alt" style={{ color: '#29AAE3' }} />
          Admin Dashboard
        </Link>

        {/* Navigation */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NavLink href="/admin" icon="fa-chart-line" label="Dashboard" />
          <NavLink href="/admin/bestellingen" icon="fa-box" label="Bestellingen" />
          <NavLink href="/admin/producten" icon="fa-shopping-bag" label="Producten" />
          <NavLink href="/admin/klanten" icon="fa-users" label="Klanten" />
          <NavLink href="/admin/kortingscodes" icon="fa-ticket-alt" label="Kortingscodes" />
          <NavLink href="/admin/verzendcategorieen" icon="fa-truck" label="Verzendcategorieën" />
          <NavLink href="/admin/instellingen" icon="fa-cog" label="Instellingen" />
        </nav>

        {/* Footer */}
        <div style={{ paddingTop: '24px', borderTop: '1px solid #334155' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
            Ingelogd als:
          </div>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
            {user.email}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={handleSignOut}
              style={{
                padding: '10px',
                background: '#ef4444',
                border: 'none',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#dc2626')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#ef4444')}
            >
              <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }} />
              Uitloggen
            </button>

            <Link
              href="/"
              style={{
                display: 'block',
                padding: '10px',
                background: '#334155',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              <i className="fas fa-arrow-left" style={{ marginRight: '8px' }} />
              Terug naar Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '32px' }} className="admin-main">
        {children}
      </main>

      {/* Mobile Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-header {
            display: flex !important;
          }
          
          .sidebar-overlay {
            display: block !important;
          }
          
          .sidebar {
            transform: translateX(-100%);
          }
          
          .sidebar-open {
            transform: translateX(0);
          }
          
          .admin-main {
            margin-left: 0 !important;
            padding: 76px 16px 16px 16px !important;
          }
        }

        @media (max-width: 640px) {
          .admin-main {
            padding: 76px 12px 12px 12px !important;
          }
        }
      `}</style>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  const isActive = typeof window !== 'undefined' && window.location.pathname === href;

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        color: isActive ? 'white' : '#94a3b8',
        background: isActive ? '#29AAE3' : 'transparent',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: isActive ? '600' : '500',
        transition: 'all 0.2s',
      }}
      onMouseOver={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#334155';
          e.currentTarget.style.color = 'white';
        }
      }}
      onMouseOut={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#94a3b8';
        }
      }}
    >
      <i className={`fas ${icon}`} style={{ width: '16px' }} />
      {label}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
