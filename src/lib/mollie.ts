import { createMollieClient } from '@mollie/api-client';

if (!process.env.MOLLIE_API_KEY) {
  throw new Error('Missing MOLLIE_API_KEY environment variable');
}

// Initialize Mollie client
export const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY,
});

// Payment helper functions
export async function createPayment({
  amount,
  description,
  redirectUrl,
  webhookUrl,
  metadata,
}: {
  amount: number;
  description: string;
  redirectUrl: string;
  webhookUrl?: string;
  metadata?: Record<string, any>;
}) {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: amount.toFixed(2),
      },
      description,
      redirectUrl,
      webhookUrl,
      metadata,
    });

    return payment;
  } catch (error) {
    console.error('Mollie payment creation error:', error);
    throw error;
  }
}

export async function getPayment(paymentId: string) {
  try {
    return await mollieClient.payments.get(paymentId);
  } catch (error) {
    console.error('Mollie get payment error:', error);
    throw error;
  }
}
