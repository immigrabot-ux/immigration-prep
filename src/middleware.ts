import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    // Update Supabase session
    const response = await updateSession(request);

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard', '/api/applications', '/api/payments/create-checkout', '/api/payments/verify'];
    const authRoutes = ['/auth/login', '/auth/signup'];

    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isAuthRoute = authRoutes.some(route => path.startsWith(route));

    // Check if user is authenticated by looking for session cookie
    const sessionCookie = request.cookies.get('sb-access-token');
    const isAuthenticated = !!sessionCookie;

    // Redirect unauthenticated users from protected routes to login
    if (isProtectedRoute && !isAuthenticated) {
        const redirectUrl = new URL('/auth/login', request.url);
        redirectUrl.searchParams.set('redirect', path);
        return NextResponse.redirect(redirectUrl);
    }

    // Redirect authenticated users from auth routes to dashboard
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
