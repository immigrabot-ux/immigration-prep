# Stripe Setup Instructions

## Problem
The Buy Now button is failing because the Stripe API key is set to a placeholder value.

**Error**: "An error occurred with our connection to Stripe. Request was retried 2 times."

## Solution

You need a REAL Stripe API key. Here's how to get one:

### Step 1: Get Your Stripe Test API Key

1. **Sign up or log in to Stripe**: https://dashboard.stripe.com/register
2. **Go to API Keys page**: https://dashboard.stripe.com/test/apikeys
3. **Copy your "Secret key"** (it starts with `sk_test_...`)
   - Click "Reveal test key" if it's hidden
   - It looks like: `sk_test_51Abc123...`

### Step 2: Update Your .env.local File

Replace the placeholder in `.env.local`:

```bash
# BEFORE (placeholder - won't work):
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# AFTER (real test key):
STRIPE_SECRET_KEY=sk_test_51Abc123YourActualKeyHere
```

### Step 3: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 4: Test the Buy Now Button

1. Go to http://localhost:3000/dashboard
2. Click "Buy Now" on any package
3. You should be redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)

## Test Card Numbers

Stripe provides test cards for different scenarios:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires authentication**: 4000 0025 0000 3155

Full list: https://stripe.com/docs/testing

## Environment Variables Checklist

Your `.env.local` should have:

```bash
# Supabase (already configured ✅)
NEXT_PUBLIC_SUPABASE_URL=https://agveamlaoiufxhtcmhlg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (needs update ⚠️)
STRIPE_SECRET_KEY=sk_test_51Abc123YourActualKeyHere  # ← UPDATE THIS

# App URL (already configured ✅)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OpenAI (already configured ✅)
OPENAI_API_KEY=sk-...
```

## Production Deployment

When you're ready to go live:

1. Switch to **Live mode** in Stripe dashboard
2. Get your **live secret key** (starts with `sk_live_`)
3. Add it to your Vercel environment variables:
   - Go to: https://vercel.com/immigrabot-ux/immigration-prep/settings/environment-variables
   - Add: `STRIPE_SECRET_KEY` = `sk_live_YourLiveKey`
4. Redeploy your app

## Troubleshooting

### Still getting 500 error after updating key?

Check server logs:
```bash
# In terminal where npm run dev is running
# Look for emoji logs: 🛒 📤 📥 ✅ ❌
```

### Key not working?

- Make sure it starts with `sk_test_` (test mode) or `sk_live_` (production)
- Make sure there are no spaces or quotes around the key
- Restart dev server after changing .env.local

### Want to verify your key?

```bash
# Test your Stripe key
curl https://api.stripe.com/v1/balance \
  -u your_stripe_secret_key_here:
```

If it returns balance info, your key is valid!
