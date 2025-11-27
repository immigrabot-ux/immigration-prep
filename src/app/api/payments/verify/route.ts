// @ts-nocheck - Supabase generated types causing build issues
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Check if purchase exists
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .select('*')
      .eq('stripe_checkout_session_id', sessionId)
      .eq('user_id', user.id)
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json({ verified: false, error: 'Purchase not found' }, { status: 404 });
    }

    return NextResponse.json({
      verified: true,
      purchase: {
        id: purchase.id,
        packageId: purchase.package_id,
        packageName: purchase.package_name,
        formsIncluded: purchase.forms_included,
        status: purchase.status,
        completedAt: purchase.completed_at,
      },
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
