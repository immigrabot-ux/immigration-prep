import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
import { FORM_PACKAGES } from '@/lib/constants/form-packages';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const { packageId } = await request.json();

    if (!packageId) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    // Find package
    const selectedPackage = FORM_PACKAGES.find((pkg) => pkg.id === packageId);

    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    // Create Stripe checkout session
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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/purchase/cancel`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
