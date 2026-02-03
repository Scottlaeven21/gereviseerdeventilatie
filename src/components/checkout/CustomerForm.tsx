'use client';

import { useCheckoutStore } from '@/store/checkoutStore';
import { FormInput } from './FormInput';

export function CustomerForm() {
  const { customer, updateCustomer } = useCheckoutStore();

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
        Klantgegevens
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <FormInput
          label="Voornaam"
          name="firstName"
          value={customer.firstName}
          onChange={(value) => updateCustomer({ firstName: value })}
          placeholder="Jan"
          required
        />

        <FormInput
          label="Achternaam"
          name="lastName"
          value={customer.lastName}
          onChange={(value) => updateCustomer({ lastName: value })}
          placeholder="Jansen"
          required
        />
      </div>

      <FormInput
        label="E-mailadres"
        name="email"
        type="email"
        value={customer.email}
        onChange={(value) => updateCustomer({ email: value })}
        placeholder="jan@example.com"
        required
      />

      <FormInput
        label="Telefoonnummer"
        name="phone"
        type="tel"
        value={customer.phone}
        onChange={(value) => updateCustomer({ phone: value })}
        placeholder="+31 6 12345678"
        required
      />

      <FormInput
        label="Bedrijfsnaam (optioneel)"
        name="company"
        value={customer.company || ''}
        onChange={(value) => updateCustomer({ company: value })}
        placeholder="Mijn Bedrijf B.V."
      />
    </div>
  );
}
