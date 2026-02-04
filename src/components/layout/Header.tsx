'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { mainNav } from '@/content/navigation';
import { Logo } from '@/components/layout/Logo';
import { CartIcon } from '@/components/cart/CartIcon';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { TopUSPBanner } from '@/components/layout/TopUSPBanner';
import { useAuth } from '@/contexts/AuthContext';

interface SearchResult {
  id: number;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  category: string;
}

export function Header() {
  const { user, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const uspItems = [
    { icon: 'fa-file-invoice', text: 'Gratis offerte op aanvraag' },
    { icon: 'fa-truck-fast', text: 'Voor 17:00 besteld binnen 48 uur verzonden' },
    { icon: 'fa-phone', text: 'Van 09:00 tot 17:00 bereikbaar' },
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Hide search bar when scrolling down on mobile
          if (window.innerWidth <= 768) {
            const scrollDiff = currentScrollY - lastScrollY;
            
            // Only hide if scrolling down more than 5px and past 30px
            if (scrollDiff > 5 && currentScrollY > 30) {
              setShowSearch(false);
            } 
            // Only show if scrolling up more than 5px or at top
            else if (scrollDiff < -5 || currentScrollY < 30) {
              setShowSearch(true);
            }
          } else {
            setShowSearch(true);
          }
          
          setIsScrolled(currentScrollY > 0);
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Live search with debounce
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.products || []);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setShowMobileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      setShowMobileDropdown(false);
      window.location.href = `/zoeken?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleResultClick = (slug: string) => {
    setShowDropdown(false);
    setShowMobileDropdown(false);
    setSearchQuery('');
  };

  return (
    <header
      style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: 'white',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
        transition: 'box-shadow 0.2s',
        // iPhone notch fix - gray background for safe area
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      {/* Safe area background for iPhone notch - same gray as USP banner */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: 'env(safe-area-inset-top)', 
        background: '#f8f9fa',
        zIndex: 51 
      }} />
      {/* Top USP Banner - Mobile Only */}
      <TopUSPBanner />

      {/* Desktop Header */}
      <div className="hidden lg:block">
        {/* Top USP Bar - Very Light Gray Background with Green Icons */}
        <div style={{ background: '#f8f9fa', borderBottom: '1px solid #e5e7eb' }}>
          <div className="container-boxed">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', padding: '12px 0' }}>
              {uspItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#54595F',
                  }}
                >
                  <i className={`fas ${item.icon}`} style={{ color: '#61CE70', fontSize: '16px' }} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logo + Search + Icons - White Background */}
        <div style={{ background: 'white', padding: '16px 0' }}>
          <div className="container-boxed">
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {/* Logo */}
              <Link href="/" style={{ flexShrink: 0 }}>
                <Logo height={50} />
              </Link>

              {/* Search Bar with Dropdown */}
              <div ref={searchRef} style={{ flex: 1, maxWidth: '500px', position: 'relative' }}>
                <form onSubmit={handleSearch}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery.trim().length >= 2 && searchResults.length > 0 && setShowDropdown(true)}
                      placeholder="Zoek producten…"
                      style={{
                        width: '100%',
                        padding: '10px 40px 10px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9ca3af',
                      }}
                      aria-label="Zoeken"
                    >
                      {isSearching ? (
                        <i className="fas fa-spinner fa-spin" />
                      ) : (
                        <i className="fas fa-search" />
                      )}
                    </button>
                  </div>
                </form>

                {/* Search Results Dropdown */}
                {showDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: '4px',
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      maxHeight: '400px',
                      overflowY: 'auto',
                      zIndex: 100,
                    }}
                  >
                    {searchResults.length > 0 ? (
                      <>
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={() => handleResultClick(product.slug)}
                            style={{
                              display: 'flex',
                              gap: '12px',
                              padding: '12px',
                              textDecoration: 'none',
                              color: 'inherit',
                              borderBottom: '1px solid #f3f4f6',
                              transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                          >
                            {/* Product Image */}
                            <div
                              style={{
                                width: '60px',
                                height: '60px',
                                flexShrink: 0,
                                background: '#f3f4f6',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              ) : (
                                <i className="fas fa-image" style={{ fontSize: '24px', color: '#9ca3af' }} />
                              )}
                            </div>

                            {/* Product Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: '#1e293b',
                                  marginBottom: '4px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {product.name}
                              </div>
                              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                                {product.category}
                              </div>
                              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1266BD' }}>
                                €{product.price.toFixed(2)}
                              </div>
                            </div>

                            {/* Arrow Icon */}
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#9ca3af',
                              }}
                            >
                              <i className="fas fa-chevron-right" style={{ fontSize: '12px' }} />
                            </div>
                          </Link>
                        ))}

                        {/* View All Results */}
                        <Link
                          href={`/zoeken?q=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setShowDropdown(false)}
                          style={{
                            display: 'block',
                            padding: '12px',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1266BD',
                            textDecoration: 'none',
                            background: '#f8f9fa',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                          onMouseLeave={(e) => e.currentTarget.style.background = '#f8f9fa'}
                        >
                          Bekijk alle {searchResults.length} resultaten →
                        </Link>
                      </>
                    ) : (
                      <div
                        style={{
                          padding: '24px',
                          textAlign: 'center',
                          color: '#64748b',
                          fontSize: '14px',
                        }}
                      >
                        <i className="fas fa-search" style={{ fontSize: '32px', marginBottom: '12px', opacity: 0.5 }} />
                        <div>Geen resultaten gevonden voor "{searchQuery}"</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Link
                  href={user ? (isAdmin ? '/admin' : '/account') : '/login'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#54595F',
                    textDecoration: 'none',
                    fontSize: '14px',
                  }}
                >
                  <i className="far fa-user-circle" style={{ fontSize: '24px' }} />
                  <span>Account</span>
                </Link>
                <Link
                  href="/contact"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#54595F',
                    textDecoration: 'none',
                    fontSize: '14px',
                  }}
                >
                  <i className="far fa-comments" style={{ fontSize: '24px' }} />
                  <span>Contact</span>
                </Link>
                <CartIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Blue Background */}
        <div style={{ background: '#1266BD', padding: '12px 0' }}>
          <div className="container-boxed">
            <nav style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '500',
                    padding: '8px 0',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#29AAE3')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'white')}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        {/* Mobile Top Bar */}
        <div style={{ background: 'white', padding: '12px 12px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '22px',
                cursor: 'pointer',
                padding: '4px',
                flexShrink: 0,
              }}
              aria-label="Menu"
            >
              <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
            </button>

            {/* Logo */}
            <Link href="/" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Logo height={32} />
            </Link>

            {/* Right Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <Link href={user ? (isAdmin ? '/admin' : '/account') : '/login'} style={{ color: user ? '#1266BD' : '#64748b', fontSize: '20px', padding: '4px' }}>
                <i className={user ? 'fas fa-user-circle' : 'fas fa-user'} />
              </Link>
              <div style={{ marginRight: '-4px' }}>
                <CartIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Hides on scroll with Dropdown */}
        <div
          ref={mobileSearchRef}
          style={{
            background: 'white',
            padding: showSearch ? '12px 16px' : '0 16px',
            maxHeight: showSearch ? (showMobileDropdown ? '500px' : '60px') : '0',
            overflow: showSearch ? 'visible' : 'hidden',
            transition: 'all 0.3s ease-in-out',
            borderBottom: showSearch ? '1px solid #e5e7eb' : 'none',
            position: 'relative',
          }}
        >
          <form onSubmit={handleSearch}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && searchResults.length > 0 && setShowMobileDropdown(true)}
                placeholder="Zoek producten..."
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af',
                }}
                aria-label="Zoeken"
              >
                {isSearching ? (
                  <i className="fas fa-spinner fa-spin" />
                ) : (
                  <i className="fas fa-search" />
                )}
              </button>
            </div>
          </form>

          {/* Mobile Search Results Dropdown */}
          {showMobileDropdown && showSearch && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '16px',
                right: '16px',
                marginTop: '8px',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                maxHeight: '400px',
                overflowY: 'auto',
                zIndex: 100,
              }}
            >
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => handleResultClick(product.slug)}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '12px',
                        textDecoration: 'none',
                        color: 'inherit',
                        borderBottom: '1px solid #f3f4f6',
                      }}
                    >
                      {/* Product Image */}
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          flexShrink: 0,
                          background: '#f3f4f6',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <i className="fas fa-image" style={{ fontSize: '24px', color: '#9ca3af' }} />
                        )}
                      </div>

                      {/* Product Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {product.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                          {product.category}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1266BD' }}>
                          €{product.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: '#9ca3af',
                        }}
                      >
                        <i className="fas fa-chevron-right" style={{ fontSize: '12px' }} />
                      </div>
                    </Link>
                  ))}

                  {/* View All Results */}
                  <Link
                    href={`/zoeken?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => {
                      setShowMobileDropdown(false);
                      setSearchQuery('');
                    }}
                    style={{
                      display: 'block',
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1266BD',
                      textDecoration: 'none',
                      background: '#f8f9fa',
                    }}
                  >
                    Bekijk alle {searchResults.length} resultaten →
                  </Link>
                </>
              ) : (
                <div
                  style={{
                    padding: '24px',
                    textAlign: 'center',
                    color: '#64748b',
                    fontSize: '14px',
                  }}
                >
                  <i className="fas fa-search" style={{ fontSize: '32px', marginBottom: '12px', opacity: 0.5 }} />
                  <div>Geen resultaten voor "{searchQuery}"</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Drawer - Modern with Smooth Animation */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: mobileMenuOpen ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
            zIndex: 9998,
            pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            transition: 'background 0.3s ease-in-out',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: mobileMenuOpen ? 0 : '-100%',
              bottom: 0,
              width: '85%',
              maxWidth: '320px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              overflowY: 'auto',
              boxShadow: mobileMenuOpen ? '4px 0 24px rgba(0,0,0,0.15)' : 'none',
              transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modern Header */}
            <div style={{ 
              padding: '24px 20px', 
              background: '#1266BD',
              boxShadow: '0 4px 12px rgba(18, 102, 189, 0.15)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', margin: '0 0 4px 0' }}>
                    Menu
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                    Navigeer door de site
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>

            {/* Menu Items - Modern Cards */}
            <nav style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {mainNav.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    color: '#1e293b',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    border: '1px solid #f1f5f9',
                    transition: 'all 0.2s',
                    animation: `slideIn 0.3s ease-out ${index * 0.05}s backwards`,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 102, 189, 0.15)';
                    e.currentTarget.style.borderColor = '#1266BD';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = '#f1f5f9';
                  }}
                >
                  <span>{item.label}</span>
                  <i className="fas fa-chevron-right" style={{ fontSize: '12px', color: '#94a3b8' }} />
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>

        {/* Mobile USP Banner - Hidden */}
        {/* <div style={{ background: '#f9fafb', padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', color: '#54595F' }}>
            <i className="fas fa-clock" style={{ color: '#61CE70' }} />
            <span>Voor 12:00 Besteld, Binnen 48 Uur In Huis</span>
          </div>
        </div> */}
      </div>

      {/* Cart Drawer */}
      <CartDrawer />
    </header>
  );
}
