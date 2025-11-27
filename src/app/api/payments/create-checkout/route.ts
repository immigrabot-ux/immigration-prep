import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
import { FORM_PACKAGES } from '@/lib/constants/form-packages';

export async function POST(request: NextRequest) {
  try {
    console.log('🛒 Create checkout session request received');

    // Verify authentication
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('❌ Auth error:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('✅ User authenticated:', user.id);

    // Parse request body
    const { packageId } = await request.json();
    console.log('📦 Package ID:', packageId);

    if (!packageId) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    // Find package
    const selectedPackage = FORM_PACKAGES.find((pkg) => pkg.id === packageId);

    if (!selectedPackage) {
      console.error('❌ Package not found:', packageId);
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    console.log('✅ Package found:', selectedPackage.name, '$' + selectedPackage.price);

    // Check environment variables
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      console.error('❌ NEXT_PUBLIC_APP_URL is not set!');
      return NextResponse.json(
        { error: 'Server configuration error: APP_URL not set' },
        { status: 500 }
      );
    }

    console.log('🔗 App URL:', appUrl);

    // Create Stripe checkout session
    console.log('💳 Creating Stripe session...');
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPackage.name,
              description: `Access to ${selectedPackage.formIds.length} immigration forms: ${selectedPackage.formIds.join(', ')}`,
            },
            unit_amount: selectedPackage.price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        formsIncluded: JSON.stringify(selectedPackage.formIds),
      },
      success_url: `${appUrl}/dashboard/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard/purchase/cancel`,
    });

    console.log('✅ Stripe session created:', session.id);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('💥 Error creating checkout session:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
