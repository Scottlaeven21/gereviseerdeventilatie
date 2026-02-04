import { NextRequest, NextResponse } from 'next/server';
import * as React from 'react';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { ShippingNotificationEmail } from '@/emails/ShippingNotification';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'order';
  const email = searchParams.get('email') || 'test@example.com';

  try {
    if (type === 'order') {
      // Test Order Confirmation Email
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'TEST - Bestelling Bevestigd - #TEST123',
        react: OrderConfirmationEmail({
          customerName: 'Test Klant',
          orderNumber: 'TEST123',
          items: [
            { name: 'Test WTW Unit', quantity: 1, price: 1299.99 },
            { name: 'Test Filter', quantity: 2, price: 49.99 },
          ],
          subtotal: 1399.97,
          shipping: 9.95,
          total: 1409.92,
          shippingAddress: {
            name: 'Test Klant',
            street: 'Teststraat 123',
            city: 'Amsterdam',
            postalCode: '1234 AB',
            country: 'Nederland',
          },
        }) as React.ReactElement,
      });

      if (error) {
        return NextResponse.json({ 
          success: false, 
          error: error.message 
        }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        type: 'order_confirmation',
        emailId: data?.id,
        sentTo: email,
        message: 'Order confirmation email sent!'
      });

    } else if (type === 'shipping') {
      // Test Shipping Notification Email
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'TEST - Je Pakket is Verzonden! - #TEST123',
        react: ShippingNotificationEmail({
          customerName: 'Test Klant',
          orderNumber: 'TEST123',
          trackingCode: '3STEST1234567890',
          carrier: 'PostNL',
          trackingUrl: 'https://postnl.nl/tracktrace/?B=3STEST1234567890&P=1234AB',
        }) as React.ReactElement,
      });

      if (error) {
        return NextResponse.json({ 
          success: false, 
          error: error.message 
        }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        type: 'shipping_notification',
        emailId: data?.id,
        sentTo: email,
        message: 'Shipping notification email sent!'
      });
    }

    return NextResponse.json({ 
      error: 'Invalid type. Use ?type=order or ?type=shipping' 
    }, { status: 400 });

  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
