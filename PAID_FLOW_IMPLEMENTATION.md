# Paid User Flow Implementation Plan

## Status: READY TO IMPLEMENT

This document outlines the complete implementation of the paid user flow for the Immigration Prep platform.

## Current State Analysis

✅ **Already Configured:**
- Supabase client/server setup exists
- Middleware file exists (currently disabled)
- Database types defined
- Project structure ready

❌ **Missing:**
- Auth pages (/auth/login, /auth/signup, /auth/callback)
- Auth components (LoginForm, SignupForm, AuthButton)
- Stripe integration
- Payment API endpoints
- Purchase database tables
- Payment flow UI
- PDF download gating

## Implementation Steps

### PART 1: Authentication (Supabase Auth) ✅ READY

#### 1.1 Enable Middleware
```typescript
// src/middleware.ts
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}
```

#### 1.2 Create Auth Pages
- `src/app/auth/login/page.tsx` - Login page
- `src/app/auth/signup/page.tsx` - Signup page
- `src/app/auth/callback/route.ts` - OAuth callback handler

#### 1.3 Create Auth Components
- `src/components/auth/LoginForm.tsx` - Email/password login
- `src/components/auth/SignupForm.tsx` - Registration form
- `src/components/auth/AuthButton.tsx` - Conditional auth button

#### 1.4 Update Navigation
- Show auth state in header
- Add sign in/sign up buttons
- Add user menu with logout

### PART 2: Stripe Integration 💳

#### 2.1 Install Dependencies
```bash
npm install stripe @stripe/stripe-js
```

#### 2.2 Environment Variables
```env
# .env.local
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

#### 2.3 Create Stripe Products
Set up in Stripe Dashboard:
1. Marriage Green Card Package - $199 (price_marriage_greencard)
2. Employment Green Card - $249 (price_employment_greencard)
3. H-1B Worker - $149 (price_h1b_worker)
4. Citizenship - $99 (price_citizenship)
5. Remove Conditions - $99 (price_remove_conditions)
6. Extend/Change Status - $79 (price_extend_change)
7. Replace Green Card - $49 (price_replace_greencard)
8. EB-5 Investor - $499 (price_eb5_investor)

#### 2.4 Create Stripe Library
`src/lib/stripe.ts` - Stripe client initialization

#### 2.5 Create Payment API Endpoints
- `src/app/api/payments/create-checkout/route.ts`
- `src/app/api/payments/webhook/route.ts`
- `src/app/api/payments/verify/route.ts`

### PART 3: Database Schema 🗄️

#### 3.1 Create Purchases Table
```sql
create table purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  package_id text not null,
  stripe_session_id text,
  stripe_payment_intent text,
  status text not null check (status in ('pending', 'completed', 'refunded')),
  amount integer not null,
  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);

-- Add RLS policies
alter table purchases enable row level security;

create policy "Users can view own purchases"
  on purchases for select
  using (auth.uid() = user_id);

create policy "Service role can insert purchases"
  on purchases for insert
  with check (true);

create policy "Service role can update purchases"
  on purchases for update
  using (true);
```

### PART 4: Purchase Flow UI 🛒

#### 4.1 Update Package Cards
- Add "Buy Now" button for unpurchased packages
- Show "Access Forms" for purchased packages
- Display purchase status

#### 4.2 Create Purchase Pages
- `src/app/dashboard/purchase/success/page.tsx` - Success page
- `src/app/dashboard/purchase/cancel/page.tsx` - Cancellation page
- `src/app/dashboard/my-purchases/page.tsx` - Purchase history

#### 4.3 Create Purchase Components
- `src/components/payments/PurchaseButton.tsx` - Checkout button
- `src/components/payments/PurchaseStatus.tsx` - Show purchase state

### PART 5: Access Control 🔒

#### 5.1 Create Access Check Utilities
`src/lib/access-control.ts` - Check if user has access to forms

#### 5.2 Gate Form Access
Update form pages to check purchase status before allowing access

#### 5.3 Gate PDF Downloads
Update PDF API to verify purchase before generating

### PART 6: Testing Plan ✅

1. Create test user account
2. Verify dashboard redirect to login when not authenticated
3. Purchase package using Stripe test card (4242 4242 4242 4242)
4. Verify webhook properly updates purchase status
5. Verify form access granted after purchase
6. Fill out form and generate PDF
7. Verify PDF downloads work

## File Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts
│   ├── api/
│   │   └── payments/
│   │       ├── create-checkout/route.ts
│   │       ├── webhook/route.ts
│   │       └── verify/route.ts
│   └── dashboard/
│       ├── purchase/
│       │   ├── success/page.tsx
│       │   └── cancel/page.tsx
│       └── my-purchases/page.tsx
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AuthButton.tsx
│   └── payments/
│       ├── PurchaseButton.tsx
│       └── PurchaseStatus.tsx
├── lib/
│   ├── stripe.ts
│   └── access-control.ts
└── middleware.ts (update)
```

## Package to Price ID Mapping

```typescript
export const PACKAGE_PRICES = {
  'marriage_greencard': {
    priceId: 'price_marriage_greencard',
    amount: 19900, // cents
  },
  'employment_greencard': {
    priceId: 'price_employment_greencard',
    amount: 24900,
  },
  'h1b_worker': {
    priceId: 'price_h1b_worker',
    amount: 14900,
  },
  'citizenship': {
    priceId: 'price_citizenship',
    amount: 9900,
  },
  'remove_conditions': {
    priceId: 'price_remove_conditions',
    amount: 9900,
  },
  'extend_change': {
    priceId: 'price_extend_change',
    amount: 7900,
  },
  'replace_greencard': {
    priceId: 'price_replace_greencard',
    amount: 4900,
  },
  'eb5_investor': {
    priceId: 'price_eb5_investor',
    amount: 49900,
  },
} as const;
```

## Environment Setup Required

User must provide:
1. Supabase credentials (if not already in .env.local)
2. Stripe API keys (test mode for development)
3. Stripe webhook signing secret

## Security Considerations

- ✅ All dashboard routes protected by middleware
- ✅ API endpoints verify user authentication
- ✅ Webhook endpoint verifies Stripe signature
- ✅ Database RLS policies protect user data
- ✅ PDF downloads check purchase before generating

## Next Steps

1. Confirm user has Stripe account set up
2. Get Stripe API keys from user
3. Implement authentication pages and components
4. Implement Stripe integration
5. Create database tables
6. Update UI for purchase flow
7. Test complete flow end-to-end

## Notes

- Using Stripe Checkout (hosted) for PCI compliance
- Not storing payment methods (handled by Stripe)
- Using webhooks for reliable payment confirmation
- Supabase Auth for user management
- Row Level Security for data protection

---

**Status:** Ready to implement
**Estimated Time:** 2-3 hours for complete implementation
**Prerequisites:** Stripe account, API keys
