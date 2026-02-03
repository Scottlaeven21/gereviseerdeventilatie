import { NextRequest, NextResponse } from 'next/server';
import { createPayment } from '@/lib/mollie';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderId, customerEmail, orderData } = body;

    if (!amount || !orderId || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Mollie payment
    const payment = await createPayment({
      amount: parseFloat(amount),
      description: `Order #${orderId} - Gereviseerde Ventilatie`,
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?orderId=${orderId}`,
      webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhooks/mollie`,
      metadata: {
        orderId,
        customerEmail,
      },
    });

    // Save order to database with pending status
    const { error: dbError } = await supabase.from('orders').insert({
      order_number: orderId,
      customer_email: customerEmail,
      customer_name: `${orderData.customer?.firstName || ''} ${orderData.customer?.lastName || ''}`.trim(),
      customer_phone: orderData.customer?.phone || null,
      billing_address: orderData.billingAddress || {},
      shipping_address: orderData.shippingAddress || null,
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      shipping_cost: orderData.shipping || 0,
      tax: orderData.tax || 0,
      total: amount,
      payment_method: orderData.paymentMethod || 'ideal',
      payment_status: 'pending',
      order_status: 'processing',
      mollie_payment_id: payment.id,
      notes: orderData.orderNotes || null,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue anyway - payment is more important
    }

    return NextResponse.json({
      checkoutUrl: payment.getCheckoutUrl(),
      paymentId: payment.id,
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    );
  }
}
