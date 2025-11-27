import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import createIntlMiddleware from 'next-intl/middleware';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localePrefix: 'never'
});

export async function middleware(request: NextRequest) {
    // First, handle internationalization
    const intlResponse = intlMiddleware(request);

    // Then update Supabase session
    const response = await updateSession(request);

    // Merge headers from intl response into supabase response
    if (intlResponse.headers) {
        intlResponse.headers.forEach((value, key) => {
            response.headers.set(key, value);
        });
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next|fonts|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
