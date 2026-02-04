import { NextRequest, NextResponse } from 'next/server';
import * as React from 'react';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    // Fetch order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Parse order items
    const items = order.items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Parse shipping address
    const shippingAddress = {
      name: order.shipping_name || order.customer_name,
      street: order.shipping_street,
      city: order.shipping_city,
      postalCode: order.shipping_postal_code,
      country: order.shipping_country || 'Nederland',
    };

    // Send email
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Bestelling Bevestigd - #${order.order_number}`,
      react: OrderConfirmationEmail({
        customerName: order.customer_name,
        orderNumber: order.order_number,
        items,
        subtotal: order.total_amount - order.shipping_cost,
        shipping: order.shipping_cost,
        total: order.total_amount,
        shippingAddress,
      }) as React.ReactElement,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
