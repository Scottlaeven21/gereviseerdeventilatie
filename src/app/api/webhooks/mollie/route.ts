import { NextRequest, NextResponse } from 'next/server';
import { getPayment } from '@/lib/mollie';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id: paymentId } = body;

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Missing payment ID' },
        { status: 400 }
      );
    }

    // Get payment details from Mollie
    const payment = await getPayment(paymentId);

    // Type assertion for metadata
    const metadata = payment.metadata as { orderId?: string } | null | undefined;
    
    if (!metadata?.orderId) {
      console.error('No orderId in payment metadata');
      return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 });
    }

    const orderNumber = metadata.orderId;
    const status = payment.status;

    // First get the order to retrieve its database ID
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('id')
      .eq('order_number', orderNumber)
      .single();

    if (fetchError || !order) {
      console.error('Order not found:', fetchError);
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update order status in database
    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: status,
        order_status: status === 'paid' ? 'processing' : 'pending',
        updated_at: new Date().toISOString(),
      })
      .eq('order_number', orderNumber);

    if (error) {
      console.error('Database update error:', error);
      return NextResponse.json(
        { error: 'Database update failed' },
        { status: 500 }
      );
    }

    console.log(`Order ${orderNumber} updated to status: ${status}`);

    // Send confirmation email for paid orders
    if (status === 'paid') {
      try {
        await fetch(`${request.nextUrl.origin}/api/emails/order-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order.id }),
        });
        console.log(`Order confirmation email sent for ${orderNumber}`);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the webhook if email fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
