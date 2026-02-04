import { NextRequest, NextResponse } from 'next/server';
import * as React from 'react';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { ShippingNotificationEmail } from '@/emails/ShippingNotification';
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

    // Check if tracking code exists
    if (!order.tracking_code) {
      return NextResponse.json(
        { error: 'No tracking code available' },
        { status: 400 }
      );
    }

    // Generate tracking URL based on carrier
    let trackingUrl = '';
    const carrier = order.shipping_carrier || 'PostNL';
    
    if (carrier === 'PostNL') {
      trackingUrl = `https://postnl.nl/tracktrace/?B=${order.tracking_code}&P=${order.shipping_postal_code.replace(/\s/g, '')}`;
    } else if (carrier === 'DHL') {
      trackingUrl = `https://www.dhl.com/nl-nl/home/tracking/tracking-parcel.html?submit=1&tracking-id=${order.tracking_code}`;
    } else if (carrier === 'DPD') {
      trackingUrl = `https://tracking.dpd.de/status/nl_NL/parcel/${order.tracking_code}`;
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Je Pakket is Verzonden! - #${order.order_number}`,
      react: ShippingNotificationEmail({
        customerName: order.customer_name,
        orderNumber: order.order_number,
        trackingCode: order.tracking_code,
        carrier,
        trackingUrl,
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
