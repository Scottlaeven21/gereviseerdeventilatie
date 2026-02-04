'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ShippingCategory {
  id: string;
  name: string;
  price: number;
  description: string | null;
  created_at: string;
}

export default function ShippingCategoriesPage() {
  const [categories, setCategories] = useState<ShippingCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('shipping_categories')
      .select('*')
      .order('price');

    if (data) {
      setCategories(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const categoryData = {
      name,
      price: parseFloat(price),
      description: description || null,
    };

    if (editingId) {
      // Update existing
      const { error } = await supabase
        .from('shipping_categories')
        .update(categoryData)
        .eq('id', editingId);

      if (error) {
        alert('Fout: ' + error.message);
      } else {
        alert('Verzendcategorie bijgewerkt!');
        resetForm();
        loadCategories();
      }
    } else {
      // Create new
      const { error } = await supabase
        .from('shipping_categories')
        .insert([categoryData]);

      if (error) {
        alert('Fout: ' + error.message);
      } else {
        alert('Verzendcategorie aangemaakt!');
        resetForm();
        loadCategories();
      }
    }

    setSaving(false);
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (category: ShippingCategory) => {
    setEditingId(category.id);
    setName(category.name);
    setPrice(category.price.toString());
    setDescription(category.description || '');
    setShowForm(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Weet je zeker dat je "${name}" wilt verwijderen?\n\nLET OP: Producten met deze verzendcategorie zullen geen verzendkosten meer hebben!`)) {
      return;
    }

    const { error } = await supabase
      .from('shipping_categories')
      .delete()
      .eq('id', id);

    if (!error) {
      alert('Verzendcategorie verwijderd!');
      loadCategories();
    } else {
      alert('Fout: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Verzendcategorieën laden...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
            Verzendcategorieën
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b' }}>
            Beheer verzendkosten voor verschillende producttypen
          </p>
        </div>

        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          style={{
            padding: '12px 24px',
            background: showForm ? '#64748b' : '#1266BD',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          {showForm ? 'Annuleren' : '+ Nieuwe Categorie'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
            {editingId ? 'Verzendcategorie Bewerken' : 'Nieuwe Verzendcategorie'}
          </h2>

          <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                NAAM *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Bijv. Groot Pakket"
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
                PRIJS (€) *
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="14.95"
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

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
              BESCHRIJVING
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Voor grotere ventilatieproducten..."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '12px 24px',
                background: saving ? '#94a3b8' : '#61CE70',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Opslaan...' : editingId ? 'Bijwerken' : 'Aanmaken'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: '12px 24px',
                  background: '#64748b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Annuleren
              </button>
            )}
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '2px solid #f1f5f9',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
                  {category.name}
                </h3>
                {category.description && (
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
                    {category.description}
                  </p>
                )}
              </div>
              <div
                style={{
                  padding: '8px 16px',
                  background: '#f0f7ff',
                  borderRadius: '8px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>
                  Verzendkosten
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#1266BD' }}>
                  €{category.price.toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <button
                onClick={() => handleEdit(category)}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#1266BD',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                <i className="fas fa-edit" style={{ marginRight: '6px' }} />
                Bewerken
              </button>
              <button
                onClick={() => handleDelete(category.id, category.name)}
                style={{
                  padding: '10px 16px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <i className="fas fa-truck" style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }} />
          <div style={{ fontSize: '16px', color: '#64748b' }}>
            Nog geen verzendcategorieën aangemaakt
          </div>
        </div>
      )}

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
