import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CheckoutData, CustomerInfo, Address, PaymentMethod } from '@/types/checkout';

const initialCustomer: CustomerInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
};

const initialAddress: Address = {
  street: '',
  houseNumber: '',
  addition: '',
  postalCode: '',
  city: '',
  country: 'Nederland',
};

interface CheckoutStore extends CheckoutData {
  updateCustomer: (customer: Partial<CustomerInfo>) => void;
  updateShippingAddress: (address: Partial<Address>) => void;
  updateBillingAddress: (address: Partial<Address>) => void;
  setUseSameAddress: (value: boolean) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setNotes: (notes: string) => void;
  resetCheckout: () => void;
  isValid: () => boolean;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      customer: initialCustomer,
      shippingAddress: initialAddress,
      billingAddress: initialAddress,
      useSameAddress: true,
      paymentMethod: null,
      notes: '',

      updateCustomer: (customer) => {
        set((state) => ({
          customer: { ...state.customer, ...customer },
        }));
      },

      updateShippingAddress: (address) => {
        set((state) => ({
          shippingAddress: { ...state.shippingAddress, ...address },
        }));
      },

      updateBillingAddress: (address) => {
        set((state) => ({
          billingAddress: { ...state.billingAddress, ...address },
        }));
      },

      setUseSameAddress: (value) => {
        set({ useSameAddress: value });
      },

      setPaymentMethod: (method) => {
        set({ paymentMethod: method });
      },

      setNotes: (notes) => {
        set({ notes });
      },

      resetCheckout: () => {
        set({
          customer: initialCustomer,
          shippingAddress: initialAddress,
          billingAddress: initialAddress,
          useSameAddress: true,
          paymentMethod: null,
          notes: '',
        });
      },

      isValid: () => {
        const { customer, shippingAddress, paymentMethod, useSameAddress, billingAddress } = get();

        // Validate customer
        if (
          !customer.firstName ||
          !customer.lastName ||
          !customer.email ||
          !customer.phone
        ) {
          return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customer.email)) {
          return false;
        }

        // Validate shipping address
        if (
          !shippingAddress.street ||
          !shippingAddress.houseNumber ||
          !shippingAddress.postalCode ||
          !shippingAddress.city
        ) {
          return false;
        }

        // Validate billing address if different
        if (!useSameAddress) {
          if (
            !billingAddress.street ||
            !billingAddress.houseNumber ||
            !billingAddress.postalCode ||
            !billingAddress.city
          ) {
            return false;
          }
        }

        // Validate payment method
        if (!paymentMethod) {
          return false;
        }

        return true;
      },
    }),
    {
      name: 'gereviseerde-ventilatie-checkout',
    }
  )
);
