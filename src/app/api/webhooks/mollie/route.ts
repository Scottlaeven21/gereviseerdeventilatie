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

    const orderId = metadata.orderId;
    const status = payment.status;

    // Update order status in database
    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: status,
        order_status: status === 'paid' ? 'completed' : 'processing',
        updated_at: new Date().toISOString(),
      })
      .eq('order_number', orderId);

    if (error) {
      console.error('Database update error:', error);
      return NextResponse.json(
        { error: 'Database update failed' },
        { status: 500 }
      );
    }

    console.log(`Order ${orderId} updated to status: ${status}`);

    // Here you could send confirmation emails for 'paid' status
    if (status === 'paid') {
      // TODO: Send order confirmation email
      console.log(`Order ${orderId} is PAID - send confirmation email`);
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
