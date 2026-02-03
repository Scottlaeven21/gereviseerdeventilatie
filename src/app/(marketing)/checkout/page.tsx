'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Personal info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Billing address
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    country: 'Nederland',
    
    // Same as billing
    shippingDifferent: false,
    
    // Shipping address (if different)
    shippingStreet: '',
    shippingHouseNumber: '',
    shippingPostalCode: '',
    shippingCity: '',
    shippingCountry: 'Nederland',
    
    // Payment
    paymentMethod: 'ideal',
    
    // Options
    newsletter: false,
    terms: false,
    
    // Notes
    orderNotes: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push('/');
    }
  }, [mounted, items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.terms) {
      alert('Je moet akkoord gaan met de algemene voorwaarden');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Calculate totals
      const subtotal = getCartTotal();
      const shipping = subtotal >= 25 ? 0 : 5.95;
      const tax = (subtotal + shipping) * 0.21;
      const total = subtotal + shipping + tax;
      
      // Generate order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Prepare order data
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        billingAddress: {
          street: formData.street,
          houseNumber: formData.houseNumber,
          postalCode: formData.postalCode,
          city: formData.city,
          country: formData.country,
        },
        shippingAddress: formData.shippingDifferent ? {
          street: formData.shippingStreet,
          houseNumber: formData.shippingHouseNumber,
          postalCode: formData.shippingPostalCode,
          city: formData.shippingCity,
          country: formData.shippingCountry,
        } : null,
        paymentMethod: formData.paymentMethod,
        orderNotes: formData.orderNotes,
        subtotal,
        shipping,
        tax,
        total,
      };
      
      // Create Mollie payment
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          orderId,
          customerEmail: formData.email,
          orderData,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment creation failed');
      }
      
      const { checkoutUrl } = await response.json();
      
      // Don't clear cart yet - will be cleared on success page after payment
      // This prevents redirect to home before Mollie redirect happens
      
      // Redirect to Mollie checkout
      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error('Order failed:', error);
      alert(error.message || 'Er is iets misgegaan. Probeer het opnieuw.');
      setIsProcessing(false);
    }
  };

  if (!mounted) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Laden...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Will redirect
  }

  const subtotal = getCartTotal();
  const shippingCost = subtotal >= 25 ? 0 : 5.95;
  const tax = subtotal * 0.21; // 21% BTW
  const total = subtotal + shippingCost;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container-boxed">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
            Afrekenen
          </h1>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            <Link href="/" style={{ color: '#1266BD', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href="/winkelwagen" style={{ color: '#1266BD', textDecoration: 'none' }}>Winkelwagen</Link>
            {' / '}
            <span>Afrekenen</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }}>
            {/* Left Column - Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Personal Info */}
              <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                  Contactgegevens
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                      Voornaam *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                      Achternaam *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                  Factuuradres
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                      Straat *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                      Huisnummer *
                    </label>
                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                      Postcode *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                      Plaats *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Land *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  >
                    <option value="Nederland">Nederland</option>
                    <option value="België">België</option>
                    <option value="Duitsland">Duitsland</option>
                  </select>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                  Betaalmethode
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['ideal', 'creditcard', 'bancontact', 'paypal'].map((method) => (
                    <label
                      key={method}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        border: formData.paymentMethod === method ? '2px solid #1266BD' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: formData.paymentMethod === method ? '#f0f7ff' : 'white',
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'capitalize' }}>
                        {method === 'ideal' ? 'iDEAL' : 
                         method === 'creditcard' ? 'Creditcard' :
                         method === 'bancontact' ? 'Bancontact' : 'PayPal'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Notes */}
              <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                  Opmerkingen (optioneel)
                </h2>
                <textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder="Bijzonderheden over je bestelling..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div style={{ position: 'sticky', top: '100px' }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                    Jouw bestelling
                  </h2>

                  {/* Items */}
                  <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                    {items.map((item) => (
                      <div key={item.product.id} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '8px', background: '#f8f9fa' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                            {item.product.name}
                          </div>
                          <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {item.quantity}x €{item.product.price.toFixed(2)}
                          </div>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                      <span style={{ color: '#64748b' }}>Subtotaal</span>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                      <span style={{ color: '#64748b' }}>Verzendkosten</span>
                      <span style={{ fontWeight: '600', color: shippingCost === 0 ? '#61CE70' : '#1e293b' }}>
                        {shippingCost === 0 ? 'GRATIS' : `€${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '14px' }}>
                      <span style={{ color: '#64748b' }}>BTW (21%)</span>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>€{tax.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                      <span style={{ fontWeight: '700', color: '#1e293b' }}>Totaal</span>
                      <span style={{ fontWeight: '700', color: '#1266BD' }}>€{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Terms */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '24px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      required
                      style={{ marginTop: '2px' }}
                    />
                    <span style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                      Ik ga akkoord met de{' '}
                      <Link href="/algemene-voorwaarden" target="_blank" style={{ color: '#1266BD' }}>
                        algemene voorwaarden
                      </Link>
                      {' '}en{' '}
                      <Link href="/privacy-policy" target="_blank" style={{ color: '#1266BD' }}>
                        privacyverklaring
                      </Link>
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: isProcessing ? '#94a3b8' : '#1266BD',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseOver={(e) => {
                      if (!isProcessing) e.currentTarget.style.background = '#29AAE3';
                    }}
                    onMouseOut={(e) => {
                      if (!isProcessing) e.currentTarget.style.background = '#1266BD';
                    }}
                  >
                    {isProcessing ? (
                      <>
                        <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }} />
                        Bezig met verwerken...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock" style={{ marginRight: '8px' }} />
                        Plaats Bestelling
                      </>
                    )}
                  </button>

                  {/* Security Notice */}
                  <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
                    <i className="fas fa-shield-alt" style={{ marginRight: '6px', color: '#61CE70' }} />
                    Veilige betaling via Mollie
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
