'use client';

import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import Link from 'next/link';
import type { Metadata } from 'next';

export default function CartPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const cartTotal = getCartTotal();
  const btw = cartTotal * 0.21;
  const shippingCost = cartTotal >= 25 ? 0 : 6.95;
  const totalWithShipping = cartTotal + shippingCost;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container-boxed">
        {/* Page Header */}
        <div
          style={{
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#1266BD',
              marginBottom: '8px',
            }}
          >
            Winkelwagen
          </h1>
          <div style={{ fontSize: '16px', color: '#64748b' }}>
            {items.length} {items.length === 1 ? 'product' : 'producten'} in je winkelwagen
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '80px 40px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <i
              className="fas fa-shopping-cart"
              style={{
                fontSize: '80px',
                color: '#e5e7eb',
                marginBottom: '32px',
              }}
            />
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px',
              }}
            >
              Je winkelwagen is leeg
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
              Ontdek ons assortiment aan gereviseerde ventilatiesystemen en voeg producten toe aan je winkelwagen.
            </p>
            <Link
              href="/producten"
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: '#1266BD',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#29AAE3')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#1266BD')}
            >
              Bekijk Producten
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Left: Cart Items */}
            <div>
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                    Producten ({items.length})
                  </h2>
                  <button
                    onClick={() => {
                      if (confirm('Weet je zeker dat je alle producten wilt verwijderen?')) {
                        clearCart();
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Leeg winkelwagen
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Continue Shopping Button */}
              <Link
                href="/producten"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: 'white',
                  color: '#1266BD',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: '2px solid #1266BD',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#1266BD';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#1266BD';
                }}
              >
                <i className="fas fa-arrow-left" />
                Verder winkelen
              </Link>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  position: 'sticky',
                  top: '24px',
                }}
              >
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                  Totaaloverzicht
                </h2>

                {/* Summary Lines */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '15px', color: '#64748b' }}>Subtotaal</span>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                      €{cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '15px', color: '#64748b' }}>BTW (21%)</span>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                      €{btw.toFixed(2)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '15px', color: '#64748b' }}>Verzendkosten</span>
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: shippingCost === 0 ? '#61CE70' : '#1e293b',
                      }}
                    >
                      {shippingCost === 0 ? 'Gratis!' : `€${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  {/* Free Shipping Progress */}
                  {shippingCost > 0 && (
                    <div
                      style={{
                        padding: '12px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#64748b',
                      }}
                    >
                      <i className="fas fa-truck-fast" style={{ color: '#1266BD', marginRight: '8px' }} />
                      Nog <strong>€{(25 - cartTotal).toFixed(2)}</strong> voor gratis verzending
                    </div>
                  )}
                </div>

                {/* Total */}
                <div
                  style={{
                    paddingTop: '24px',
                    borderTop: '2px solid #f1f5f9',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>Totaal</span>
                    <span style={{ fontSize: '28px', fontWeight: '700', color: '#1266BD' }}>
                      €{totalWithShipping.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '18px',
                    background: '#1266BD',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                    marginBottom: '16px',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#29AAE3')}
                  onMouseOut={(e) => (e.currentTarget.style.background = '#1266BD')}
                >
                  Afrekenen
                </Link>

                {/* Trust Signals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { icon: 'shield-halved', text: '2 jaar garantie' },
                    { icon: 'rotate-left', text: '14 dagen retourrecht' },
                    { icon: 'lock', text: 'Veilig betalen' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '13px',
                        color: '#64748b',
                      }}
                    >
                      <i className={`fas fa-${item.icon}`} style={{ color: '#61CE70', fontSize: '16px' }} />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
