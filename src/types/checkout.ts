export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
}

export interface Address {
  street: string;
  houseNumber: string;
  addition?: string;
  postalCode: string;
  city: string;
  country: string;
}

export type PaymentMethod = 'ideal' | 'paypal' | 'bancontact' | 'creditcard';

export interface CheckoutData {
  customer: CustomerInfo;
  shippingAddress: Address;
  billingAddress: Address;
  useSameAddress: boolean;
  paymentMethod: PaymentMethod | null;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  customer: CustomerInfo;
  shippingAddress: Address;
  billingAddress: Address;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  btw: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}
