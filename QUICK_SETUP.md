# Quick Setup Guide - 3 Steps to Go Live

Your app is deployed and almost ready! Complete these 3 steps to enable purchases.

---

## Step 1: Run Database Migrations (5 minutes)

### Option A: Run via Supabase Dashboard (Recommended)

1. **Open Supabase SQL Editor**:
   https://supabase.com/dashboard/project/agveamlaoiufxhtcmhlg/sql/new

2. **Copy and run migration 1** - Create purchases table:

```sql
-- Create purchases table to track user purchases
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Stripe payment details
  stripe_checkout_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,

  -- Package details
  package_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  forms_included TEXT[] NOT NULL,

  -- Pricing
  amount_paid INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',

  -- Status
  status TEXT NOT NULL DEFAULT 'pending',

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session ON purchases(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases"
  ON purchases
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert purchases"
  ON purchases
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update purchases"
  ON purchases
  FOR UPDATE
  USING (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON purchases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

3. Click **"Run"** and wait for success message

4. **Copy and run migration 2** - Create form access table:

```sql
-- Create user_form_access table to track which forms users can access
CREATE TABLE IF NOT EXISTS user_form_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Form access
  form_id TEXT NOT NULL,

  -- Source of access
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  granted_via TEXT NOT NULL,

  -- Access control
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Ensure no duplicate active access for same user+form
  UNIQUE(user_id, form_id, is_active)
);

CREATE INDEX IF NOT EXISTS idx_user_form_access_user_id ON user_form_access(user_id);
CREATE INDEX IF NOT EXISTS idx_user_form_access_form_id ON user_form_access(form_id);
CREATE INDEX IF NOT EXISTS idx_user_form_access_active ON user_form_access(user_id, form_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_user_form_access_purchase_id ON user_form_access(purchase_id);

ALTER TABLE user_form_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own form access"
  ON user_form_access
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage form access"
  ON user_form_access
  FOR ALL
  USING (true);

CREATE TRIGGER update_user_form_access_updated_at
  BEFORE UPDATE ON user_form_access
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION user_has_form_access(p_user_id UUID, p_form_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_form_access
    WHERE user_id = p_user_id
      AND form_id = p_form_id
      AND is_active = true
      AND (expires_at IS NULL OR expires_at > NOW())
      AND revoked_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

5. Click **"Run"** and wait for success message

6. **Verify migrations** - Run this check:

```sql
-- Should return 2 rows (purchases and user_form_access)
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('purchases', 'user_form_access');
```

✅ If you see 2 rows, migrations are complete!

### Option B: Run via Local Files

If you prefer, you can copy the content from the migration files:
- `src/db/migrations/001_create_purchases.sql`
- `src/db/migrations/002_create_user_form_access.sql`

---

## Step 2: Add Supabase Redirect URL (2 minutes)

1. **Open Supabase Auth Configuration**:
   https://supabase.com/dashboard/project/agveamlaoiufxhtcmhlg/auth/url-configuration

2. **Add these redirect URLs**:
   ```
   https://immigration-prep-7osxc9v6x-minafaltas-projects.vercel.app/auth/callback
   http://localhost:3000/auth/callback
   ```

3. Click **"Save"**

✅ Users can now complete email verification!

---

## Step 3: Test the Complete Flow (10 minutes)

### Test User Signup
1. Visit: https://immigration-prep-7osxc9v6x-minafaltas-projects.vercel.app/auth/signup
2. Create account with your email
3. Check email for verification link
4. Click link to verify account
5. You should be redirected to dashboard

### Test Purchase
1. Log in to your account
2. Click "Buy Now" on any package
3. Use Stripe test card:
   - **Card**: `4242 4242 4242 4242`
   - **Expiry**: `12/34` (any future date)
   - **CVC**: `123` (any 3 digits)
   - **ZIP**: `12345` (any 5 digits)
4. Complete payment
5. You should see success page
6. Check "My Purchases" - purchase should appear

### Test Form Access
1. Click on a form from your purchase
2. Form should load and be fillable
3. Fill out the form
4. Download PDF
5. Verify PDF contains your answers

✅ If all steps work, your platform is fully functional!

---

## Optional: Configure Stripe Webhook (5 minutes)

Without a webhook, purchases work but may take a few seconds to unlock forms.
With a webhook, forms unlock instantly.

### Setup Instructions

1. **Open Stripe Dashboard**:
   https://dashboard.stripe.com/webhooks

2. Click **"Add endpoint"**

3. **Set endpoint URL**:
   ```
   https://immigration-prep-7osxc9v6x-minafaltas-projects.vercel.app/api/payments/webhook
   ```

4. **Select events**:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`

5. Click **"Add endpoint"**

6. **Copy webhook secret** (starts with `whsec_...`)

7. **Add to Vercel**:
   ```bash
   vercel env add STRIPE_WEBHOOK_SECRET production
   # Paste the webhook secret when prompted
   ```

8. **Redeploy**:
   ```bash
   vercel --prod
   ```

✅ Webhook configured! Forms now unlock instantly after payment.

---

## Summary

**Required Steps** (7 minutes):
- ✅ Run database migrations
- ✅ Add Supabase redirect URL
- ✅ Test the flow

**Optional Step** (5 minutes):
- ⭐ Configure Stripe webhook for instant unlocking

**After Setup**:
- ✅ Users can sign up and verify email
- ✅ Users can purchase form packages
- ✅ Forms unlock automatically after payment
- ✅ Users can fill forms and download PDFs
- ✅ Platform is ready for production use

---

## Need Help?

**Check detailed guide**: `DEPLOYMENT_STATUS.md`

**Common Issues**:
- If auth doesn't work → Check Supabase redirect URLs
- If purchases don't work → Check database migrations
- If PDFs don't download → Check form access in database

**Resources**:
- GitHub: https://github.com/immigrabot-ux/immigration-prep
- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs
