'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface ShippingCategory {
  id: string;
  name: string;
  price: number;
}

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [shippingCategories, setShippingCategories] = useState<ShippingCategory[]>([]);

  // Form state
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('WTW-units');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('0');
  const [description, setDescription] = useState('');
  const [specs, setSpecs] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [shippingCategoryId, setShippingCategoryId] = useState('');

  useEffect(() => {
    loadShippingCategories();
  }, []);

  const loadShippingCategories = async () => {
    const { data } = await supabase
      .from('shipping_categories')
      .select('*')
      .order('price');

    if (data) {
      setShippingCategories(data);
      if (data.length > 0) {
        setShippingCategoryId(data[0].id);
      }
    }
  };

  // Auto-generate slug from name
  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generatedSlug);
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Parse specs from textarea (key:value pairs)
    let specsObj: Record<string, string> = {};
    try {
      const lines = specs.split('\n').filter(l => l.trim());
      lines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          specsObj[key.trim()] = valueParts.join(':').trim();
        }
      });
    } catch (e) {
      console.error('Error parsing specs:', e);
    }

    // Build product data with correct database schema
    const productData: Record<string, any> = {
      name,
      slug,
      category,
      description,
      price: price, // Keep as string
      regular_price: price,
      sale_price: price,
      stock_quantity: parseInt(stock) || 0,
      stock_status: parseInt(stock) > 0 ? 'instock' : 'outofstock',
      sku: slug, // Use slug as SKU for now
      featured: isFeatured,
      visibility: 'visible',
      specifications: JSON.stringify(specsObj),
      images: imageUrl ? JSON.stringify([imageUrl]) : JSON.stringify([]),
      short_description: description.substring(0, 200), // First 200 chars
    };

    // Add shipping category if selected
    if (shippingCategoryId) {
      productData.shipping_category_id = shippingCategoryId;
    }

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) {
      console.error('Product insert error:', error);
      alert('Fout bij opslaan: ' + error.message);
      setSaving(false);
    } else {
      alert('Product succesvol aangemaakt!\n\nID: ' + (data?.[0]?.id || 'onbekend'));
      router.push('/admin/producten');
    }
  };

  const categories = ['WTW-units', 'Luchtkanalen', 'Ventilatoren', 'Filters', 'Toebehoren'];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link
          href="/admin/producten"
          style={{
            fontSize: '14px',
            color: '#1266BD',
            textDecoration: 'none',
            marginBottom: '12px',
            display: 'inline-block',
          }}
        >
          <i className="fas fa-arrow-left" style={{ marginRight: '8px' }} />
          Terug naar producten
        </Link>

        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Nieuw Product Toevoegen
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>
          Vul de productgegevens in om een nieuw product toe te voegen
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="product-form-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Basic Info */}
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                Basisgegevens
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                    PRODUCTNAAM *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Bijv. Brink Renovent Excellent 300"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                    SLUG (URL) *
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    placeholder="brink-renovent-excellent-300"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: 'monospace',
                    }}
                  />
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    Wordt automatisch gegenereerd uit de naam
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                    BESCHRIJVING
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Beschrijving van het product..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                Specificaties
              </h2>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                  SPECS (Key: Value per regel)
                </label>
                <textarea
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  rows={10}
                  placeholder={'Debiet: 325 m³/h\nGeluidsniveau: 27 dB(A)\nEnergieklasse: A+\nAfmetingen: 805 x 805 x 350 mm'}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: 'monospace',
                    resize: 'vertical',
                  }}
                />
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Gebruik format: "Naam: Waarde" (één per regel)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Pricing & Stock */}
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                Prijs & Voorraad
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                    PRIJS (€) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="299.00"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                    VOORRAAD *
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    placeholder="10"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                Categorie
              </h2>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                  CATEGORIE *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Shipping */}
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                Verzending
              </h2>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                  VERZENDCATEGORIE
                </label>
                <select
                  value={shippingCategoryId}
                  onChange={(e) => setShippingCategoryId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                >
                  {shippingCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} (€{cat.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image */}
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                Afbeelding
              </h2>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                  AFBEELDING URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                {imageUrl && (
                  <div
                    style={{
                      marginTop: '12px',
                      height: '200px',
                      background: `url(${imageUrl}) center/cover`,
                      borderRadius: '8px',
                    }}
                  />
                )}
              </div>
            </div>

            {/* Featured */}
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                    <i className="fas fa-star" style={{ color: '#f59e0b', marginRight: '8px' }} />
                    Featured Product
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    Toon dit product op de homepage
                  </div>
                </div>
              </label>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={saving}
              style={{
                width: '100%',
                padding: '14px',
                background: saving ? '#94a3b8' : '#61CE70',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Opslaan...' : 'Product Aanmaken'}
            </button>
          </div>
        </div>
      </form>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 968px) {
          .product-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
