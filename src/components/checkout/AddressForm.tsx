'use client';

import { Address } from '@/types/checkout';
import { FormInput } from './FormInput';

interface AddressFormProps {
  title: string;
  address: Address;
  onChange: (address: Partial<Address>) => void;
}

export function AddressForm({ title, address, onChange }: AddressFormProps) {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
        {title}
      </h2>

      <FormInput
        label="Straatnaam"
        name="street"
        value={address.street}
        onChange={(value) => onChange({ street: value })}
        placeholder="Hoofdstraat"
        required
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <FormInput
          label="Huisnummer"
          name="houseNumber"
          value={address.houseNumber}
          onChange={(value) => onChange({ houseNumber: value })}
          placeholder="123"
          required
        />

        <FormInput
          label="Toevoeging"
          name="addition"
          value={address.addition || ''}
          onChange={(value) => onChange({ addition: value })}
          placeholder="A"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
        <FormInput
          label="Postcode"
          name="postalCode"
          value={address.postalCode}
          onChange={(value) => onChange({ postalCode: value })}
          placeholder="1234 AB"
          required
        />

        <FormInput
          label="Plaats"
          name="city"
          value={address.city}
          onChange={(value) => onChange({ city: value })}
          placeholder="Amsterdam"
          required
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="country"
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px',
          }}
        >
          Land
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
        </label>
        <select
          id="country"
          name="country"
          value={address.country}
          onChange={(e) => onChange({ country: e.target.value })}
          required
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '15px',
            color: '#1e293b',
            background: 'white',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="Nederland">Nederland</option>
          <option value="België">België</option>
          <option value="Duitsland">Duitsland</option>
        </select>
      </div>
    </div>
  );
}
