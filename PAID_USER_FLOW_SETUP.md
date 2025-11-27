# Paid User Flow - Setup Guide

This guide explains how to complete the setup of the paid user flow: Sign up → Purchase Package → Fill Forms → Download PDFs.

## What Has Been Implemented

All code has been written and is ready to use. You just need to add your credentials to `.env.local` and run the database migrations.

### 1. Authentication System
- ✅ Login page (`/auth/login`)
- ✅ Signup page (`/auth/signup`)
- ✅ Email confirmation callback (`/auth/callback`)
- ✅ Auth button component (shows login/signup when logged out, user menu when logged in)
- ✅ Added to landing page and dashboard navigation

### 2. Database Schema
- ✅ `purchases` table - tracks user purchases with Stripe details
- ✅ `user_form_access` table - tracks which forms users can access
- ✅ Row Level Security (RLS) policies for both tables
- ✅ Helper function `user_has_form_access(user_id, form_id)`

### 3. Stripe Integration
- ✅ Server-side Stripe client (`src/lib/stripe.ts`)
- ✅ Create checkout session API (`/api/payments/create-checkout`)
- ✅ Webhook handler (`/api/payments/webhook`)
- ✅ Payment verification API (`/api/payments/verify`)

### 4. Purchase Flow UI
- ✅ "Buy Now" buttons on package cards
- ✅ Success page (`/dashboard/purchase/success`)
- ✅ Cancel page (`/dashboard/purchase/cancel`)
- ✅ My Purchases page (`/dashboard/my-purchases`)

### 5. Access Control
- ✅ Access check helper functions (`src/lib/access-control.ts`)
- ✅ Form page gating (shows "Purchase Required" if no access)
- ✅ PDF download gating (returns 403 if no access)
- ✅ "Purchase Required" component with package recommendations

### 6. Middleware & Route Protection
- ✅ Enabled Supabase session updates
- ✅ Protected `/dashboard/*` routes (require auth)
- ✅ Protected payment API routes
- ✅ Auto-redirect to login for unauthenticated users
- ✅ Auto-redirect to dashboard for authenticated users on auth pages

## Setup Instructions

### Step 1: Environment Variables

Copy the credentials from your Supabase and Stripe dashboards to `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Where to find these:**

**Supabase:**
1. Go to https://app.supabase.com
2. Select your project
3. Go to Settings → API
4. Copy `URL`, `anon/public`, and `service_role` keys

**Stripe:**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your test mode keys
3. For webhook secret, you'll set this up in Step 3

### Step 2: Run Database Migrations

Open your Supabase SQL Editor and run these migration files in order:

1. **Create purchases table:**
   ```
   src/db/migrations/001_create_purchases.sql
   ```
   - Copy the entire contents
   - Paste into Supabase SQL Editor
   - Run the query

2. **Create user_form_access table:**
   ```
   src/db/migrations/002_create_user_form_access.sql
   ```
   - Copy the entire contents
   - Paste into Supabase SQL Editor
   - Run the query

**Verify migrations:**
```sql
-- Check that tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('purchases', 'user_form_access');

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('purchases', 'user_form_access');
```

### Step 3: Set Up Stripe Webhook (for production)

For local development, you can skip this step initially. For production:

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Set endpoint URL: `https://yourdomain.com/api/payments/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the webhook signing secret to `.env.local` as `STRIPE_WEBHOOK_SECRET`

**For local testing with Stripe CLI:**
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/payments/webhook

# The CLI will output a webhook signing secret - use this in .env.local
```

### Step 4: Configure Supabase Auth

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

3. Go to Authentication → Email Templates
4. Customize the confirmation email template (optional)

### Step 5: Test the Flow

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Sign up:**
   - Visit http://localhost:3000/auth/signup
   - Create a new account
   - Check your email for confirmation link
   - Click the link to verify your account

3. **Purchase a package:**
   - Go to http://localhost:3000/dashboard
   - Click "Buy Now" on any package
   - Use Stripe test card: `4242 4242 4242 4242`
   - Use any future expiry date and any CVC
   - Complete the purchase

4. **Verify access:**
   - You should be redirected to the success page
   - Go to "My Purchases" to see your purchase
   - Click on a form to fill it out
   - Download the PDF when complete

## Testing Checklist

- [ ] User can sign up and receive confirmation email
- [ ] User can log in with email/password
- [ ] User sees "Log in" / "Sign Up" buttons when logged out
- [ ] User sees email dropdown menu when logged in
- [ ] User can click "Buy Now" on a package
- [ ] Stripe Checkout opens successfully
- [ ] Test payment succeeds (use card `4242 4242 4242 4242`)
- [ ] User is redirected to success page
- [ ] Purchase appears in "My Purchases"
- [ ] User can access purchased forms
- [ ] User CANNOT access forms they haven't purchased (sees "Purchase Required")
- [ ] User can fill out purchased forms
- [ ] User can download PDFs for purchased forms
- [ ] User CANNOT download PDFs for non-purchased forms (gets 403 error)
- [ ] User can log out successfully

## Troubleshooting

### "Unauthorized" errors
- Check that Supabase credentials are correct in `.env.local`
- Verify you're logged in (check cookies in browser dev tools)
- Make sure RLS policies are created (run migrations)

### Stripe checkout not opening
- Verify `STRIPE_SECRET_KEY` is correct
- Check browser console for errors
- Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set

### Webhook not working
- For local development, use Stripe CLI to forward webhooks
- Check webhook secret matches in `.env.local`
- Verify webhook endpoint is accessible
- Check Stripe Dashboard → Developers → Webhooks for delivery logs

### Forms not unlocking after purchase
- Check that webhook is working (see above)
- Verify purchase was created in database:
  ```sql
  SELECT * FROM purchases ORDER BY created_at DESC LIMIT 5;
  ```
- Verify form access was granted:
  ```sql
  SELECT * FROM user_form_access ORDER BY created_at DESC LIMIT 10;
  ```
- Check webhook logs in your server console

### "Purchase Required" showing for purchased forms
- Verify user is logged in
- Check user_form_access table:
  ```sql
  SELECT * FROM user_form_access
  WHERE user_id = 'your-user-id'
  AND form_id = 'form-id-lowercase';
  ```
- Ensure `is_active = true` and `revoked_at IS NULL`

## Next Steps

1. **Add Credentials** - Add your Supabase and Stripe credentials to `.env.local`
2. **Run Migrations** - Execute both SQL migration files in Supabase
3. **Test Locally** - Run through the complete user flow
4. **Customize** - Adjust pricing, package names, form descriptions as needed
5. **Deploy** - When ready, deploy to production and update environment variables

## File Reference

### Configuration
- `.env.example` - Template for environment variables
- `src/db/migrations/` - Database migration files

### Authentication
- `src/app/auth/login/page.tsx` - Login page
- `src/app/auth/signup/page.tsx` - Signup page
- `src/app/auth/callback/route.ts` - OAuth callback
- `src/components/auth/LoginForm.tsx` - Login form component
- `src/components/auth/SignupForm.tsx` - Signup form component
- `src/components/auth/AuthButton.tsx` - Auth state button

### Payments
- `src/lib/stripe.ts` - Stripe client setup
- `src/app/api/payments/create-checkout/route.ts` - Create checkout session
- `src/app/api/payments/webhook/route.ts` - Stripe webhook handler
- `src/app/api/payments/verify/route.ts` - Verify purchase

### Purchase Flow
- `src/components/dashboard/FormPackageCard.tsx` - Package card with "Buy Now"
- `src/app/dashboard/purchase/success/page.tsx` - Purchase success page
- `src/app/dashboard/purchase/cancel/page.tsx` - Purchase cancelled page
- `src/app/dashboard/my-purchases/page.tsx` - My purchases page

### Access Control
- `src/lib/access-control.ts` - Access check helpers
- `src/components/access/PurchaseRequired.tsx` - Purchase required component
- `src/app/dashboard/forms/[formId]/page.tsx` - Form page with access gating
- `src/app/api/applications/[applicationId]/generate/route.ts` - PDF download with gating

### Middleware
- `src/middleware.ts` - Route protection and session management

## Architecture Notes

**Payment Flow:**
1. User clicks "Buy Now" → Creates Stripe Checkout session
2. User completes payment on Stripe → Stripe sends webhook
3. Webhook creates `purchase` record and grants `user_form_access`
4. User can now access forms included in package

**Access Control:**
- Forms check `user_form_access` table before loading
- PDF downloads check `user_form_access` before generating
- Access is granted per-form, supports multiple sources (purchase, promo, admin)
- RLS ensures users only see their own data

**Security:**
- All sensitive operations use service role key
- RLS policies protect database access
- Middleware protects routes
- Form access checked on every page load and PDF generation
