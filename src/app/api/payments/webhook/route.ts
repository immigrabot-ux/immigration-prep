import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Create Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const packageId = session.metadata?.packageId;
      const packageName = session.metadata?.packageName;
      const formsIncluded = JSON.parse(session.metadata?.formsIncluded || '[]');

      if (!userId || !packageId || !packageName || !formsIncluded.length) {
        console.error('Missing metadata in checkout session:', session.id);
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
      }

      // Create purchase record
      const { data: purchase, error: purchaseError } = await supabaseAdmin
        .from('purchases')
        .insert({
          user_id: userId,
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          package_id: packageId,
          package_name: packageName,
          forms_included: formsIncluded,
          amount_paid: session.amount_total || 0,
          currency: session.currency || 'usd',
          status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (purchaseError) {
        console.error('Error creating purchase:', purchaseError);
        return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 });
      }

      // Grant access to all forms in the package
      const accessRecords = formsIncluded.map((formId: string) => ({
        user_id: userId,
        form_id: formId,
        purchase_id: purchase.id,
        granted_via: 'purchase',
        is_active: true,
      }));

      const { error: accessError } = await supabaseAdmin
        .from('user_form_access')
        .insert(accessRecords);

      if (accessError) {
        console.error('Error granting form access:', accessError);
        return NextResponse.json({ error: 'Failed to grant access' }, { status: 500 });
      }

      console.log(`Successfully processed payment for user ${userId}, package ${packageId}`);
    }

    // Handle payment_intent.payment_failed event
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Update purchase status to failed
      await supabaseAdmin
        .from('purchases')
        .update({ status: 'failed' })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      console.log(`Payment failed for payment intent ${paymentIntent.id}`);
    }

    // Handle charge.refunded event
    if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;

      // Update purchase status to refunded
      const { data: purchase } = await supabaseAdmin
        .from('purchases')
        .update({ status: 'refunded' })
        .eq('stripe_payment_intent_id', charge.payment_intent as string)
        .select()
        .single();

      if (purchase) {
        // Revoke access to forms
        await supabaseAdmin
          .from('user_form_access')
          .update({ is_active: false, revoked_at: new Date().toISOString() })
          .eq('purchase_id', purchase.id);

        console.log(`Revoked access for refunded purchase ${purchase.id}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
