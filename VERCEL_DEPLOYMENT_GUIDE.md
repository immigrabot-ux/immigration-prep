# Vercel Deployment Guide

Your GitHub repository is ready! **https://github.com/immigrabot-ux/immigration-prep**

## Quick Deploy to Vercel

### Step 1: Import Repository to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select **immigrabot-ux/immigration-prep** from the list
4. Click "Import"

### Step 2: Configure Environment Variables

In the Vercel deployment settings, add these environment variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://agveamlaoiufxhtcmhlg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndmVhbWxhb2l1ZnhodGNtaGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjUzODgsImV4cCI6MjA3OTgwMTM4OH0.WnImsR8FI08i4x1IxCg0SRrLapXexSPYRa6cZGkmQM4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndmVhbWxhb2l1ZnhodGNtaGxnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDIyNTM4OCwiZXhwIjoyMDc5ODAxMzg4fQ.OlccO0mNsUmfm2ZDPXRY4XEZpnJGMDuHE1WlupJ023s

# Stripe Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Optional: OpenAI for chat (if you want the chat feature)
OPENAI_API_KEY=your_openai_key_here
```

### Step 3: Deploy

1. Click "Deploy"
2. Wait for the build to complete (takes about 2-3 minutes)
3. Once deployed, you'll get a URL like: `https://immigration-prep-xyz.vercel.app`

### Step 4: Update Supabase Redirect URLs

After deployment, add your Vercel URL to Supabase:

1. Go to https://supabase.com/dashboard/project/agveamlaoiufxhtcmhlg/auth/url-configuration
2. Add these redirect URLs:
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for local development)

### Step 5: Set Up Stripe Webhook (for production)

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Set endpoint URL: `https://your-app.vercel.app/api/payments/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the webhook signing secret
6. Add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
7. Redeploy your app on Vercel

### Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Sign up for a new account
3. Check your email for verification
4. Browse packages and try a test purchase (use Stripe test card: `4242 4242 4242 4242`)
5. Verify the form access works

## Environment Variables Reference

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Supabase Dashboard → Settings → API |
| `STRIPE_SECRET_KEY` | Stripe secret key | Stripe Dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Stripe Dashboard → Developers → Webhooks |
| `NEXT_PUBLIC_APP_URL` | Your app's URL | Your Vercel deployment URL |
| `OPENAI_API_KEY` | OpenAI API key (optional) | OpenAI Dashboard |

## Database Setup

Before users can make purchases, you need to run the database migrations:

1. Go to https://supabase.com/dashboard/project/agveamlaoiufxhtcmhlg/sql/new
2. Run `src/db/migrations/001_create_purchases.sql`
3. Run `src/db/migrations/002_create_user_form_access.sql`

See `PAID_USER_FLOW_SETUP.md` for detailed instructions.

## Post-Deployment Checklist

- [ ] Vercel deployment successful
- [ ] Environment variables added
- [ ] Database migrations run in Supabase
- [ ] Supabase redirect URLs updated
- [ ] Stripe webhook endpoint configured
- [ ] Test signup flow works
- [ ] Test purchase flow works
- [ ] Test form access works
- [ ] Test PDF generation works

## Troubleshooting

### Build fails
- Check the build logs in Vercel
- Verify all environment variables are set
- Make sure TypeScript errors are fixed

### Authentication not working
- Verify Supabase URLs are correct
- Check that redirect URLs are added in Supabase
- Ensure service role key is set

### Payments not working
- Verify Stripe keys are in test mode (start with `sk_test` and `pk_test`)
- Check webhook endpoint is accessible
- View webhook delivery logs in Stripe Dashboard

### Forms not unlocking after payment
- Check webhook logs in Stripe Dashboard
- Verify database migrations were run
- Check server logs for webhook errors

## Next Steps

1. **Get Stripe credentials** - Sign up at https://stripe.com and get your test mode keys
2. **Test the complete flow** - Make a test purchase and verify everything works
3. **Go live** - Switch to Stripe live mode keys when ready
4. **Monitor** - Use Vercel Analytics and Stripe Dashboard to monitor usage

## Support

- GitHub Repository: https://github.com/immigrabot-ux/immigration-prep
- Vercel Documentation: https://vercel.com/docs
- Supabase Documentation: https://supabase.com/docs
- Stripe Documentation: https://stripe.com/docs
