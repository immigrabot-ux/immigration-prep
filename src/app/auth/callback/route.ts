import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  console.log('🔗 Auth callback received:', {
    hasCode: !!code,
    origin,
    fullUrl: requestUrl.toString()
  });

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('❌ Error exchanging code for session:', error);
        return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`);
      }

      console.log('✅ Session exchange successful:', {
        userId: data.user?.id,
        email: data.user?.email,
      });
    } catch (err) {
      console.error('💥 Unexpected error in callback:', err);
      return NextResponse.redirect(`${origin}/auth/login?error=unexpected_error`);
    }
  } else {
    console.warn('⚠️ No code provided in callback');
  }

  // URL to redirect to after sign in process completes
  console.log('🔄 Redirecting to dashboard');
  return NextResponse.redirect(`${origin}/dashboard`);
}
