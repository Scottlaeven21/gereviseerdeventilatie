'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string | null;
  valid_from: string;
  valid_until: string | null;
  max_uses: number | null;
  current_uses: number;
  min_order_amount: number;
  active: boolean;
  created_at: string;
}

export default function DiscountCodesPage() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [maxUses, setMaxUses] = useState('');
  const [minOrder, setMinOrder] = useState('0');
  const [validUntil, setValidUntil] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCodes();
  }, []);

  const loadCodes = async () => {
    const { data } = await supabase
      .from('discount_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setCodes(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const newCode = {
      code: code.toUpperCase(),
      type,
      value: parseFloat(value),
      description: description || null,
      max_uses: maxUses ? parseInt(maxUses) : null,
      min_order_amount: parseFloat(minOrder),
      valid_until: validUntil || null,
      active: true,
    };

    const { error } = await supabase
      .from('discount_codes')
      .insert([newCode]);

    if (error) {
      alert('Fout: ' + error.message);
    } else {
      alert('Kortingscode aangemaakt!');
      setShowForm(false);
      resetForm();
      loadCodes();
    }

    setSaving(false);
  };

  const resetForm = () => {
    setCode('');
    setValue('');
    setDescription('');
    setMaxUses('');
    setMinOrder('0');
    setValidUntil('');
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('discount_codes')
      .update({ active: !currentStatus })
      .eq('id', id);

    if (!error) {
      loadCodes();
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Weet je zeker dat je code "${code}" wilt verwijderen?`)) {
      return;
    }

    const { error } = await supabase
      .from('discount_codes')
      .delete()
      .eq('id', id);

    if (!error) {
      alert('Kortingscode verwijderd!');
      loadCodes();
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Kortingscodes laden...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
            Kortingscodes
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b' }}>
            Beheer kortingscodes voor je klanten
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
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
          {showForm ? 'Annuleren' : '+ Nieuwe Code'}
        </button>
      </div>

      {/* Add Form */}
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
            Nieuwe Kortingscode
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                CODE *
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="ZOMER2024"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                TYPE *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'percentage' | 'fixed')}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Vast Bedrag (€)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                WAARDE *
              </label>
              <input
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                placeholder={type === 'percentage' ? '10' : '5.00'}
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
                MAX GEBRUIK
              </label>
              <input
                type="number"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                placeholder="Onbeperkt"
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
                MIN. BEDRAG (€)
              </label>
              <input
                type="number"
                step="0.01"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
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
                GELDIG TOT
              </label>
              <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
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
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Zomer actie 2024"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>

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
            {saving ? 'Opslaan...' : 'Code Aanmaken'}
          </button>
        </form>
      )}

      {/* Codes List */}
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f8f9fa' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                CODE
              </th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                WAARDE
              </th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                GEBRUIK
              </th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                MIN. BEDRAG
              </th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                GELDIG TOT
              </th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                STATUS
              </th>
              <th style={{ padding: '16px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                ACTIES
              </th>
            </tr>
          </thead>
          <tbody>
            {codes.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                  Nog geen kortingscodes aangemaakt
                </td>
              </tr>
            ) : (
              codes.map((discountCode) => (
                <tr key={discountCode.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'monospace', color: '#1e293b' }}>
                      {discountCode.code}
                    </div>
                    {discountCode.description && (
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{discountCode.description}</div>
                    )}
                  </td>
                  <td style={{ padding: '16px', fontSize: '15px', fontWeight: '600', color: '#1266BD' }}>
                    {discountCode.type === 'percentage' ? `${discountCode.value}%` : `€${discountCode.value.toFixed(2)}`}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                    {discountCode.current_uses} / {discountCode.max_uses || '∞'}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                    €{discountCode.min_order_amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                    {discountCode.valid_until
                      ? new Date(discountCode.valid_until).toLocaleDateString('nl-NL')
                      : 'Geen limiet'}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleToggleActive(discountCode.id, discountCode.active)}
                      style={{
                        padding: '4px 12px',
                        background: discountCode.active ? '#dcfce7' : '#fee2e2',
                        color: discountCode.active ? '#15803d' : '#b91c1c',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {discountCode.active ? 'Actief' : 'Inactief'}
                    </button>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(discountCode.id, discountCode.code)}
                      style={{
                        padding: '8px 12px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .form-grid-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
