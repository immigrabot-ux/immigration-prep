# Database Setup - Run These Migrations

## ⚠️ CRITICAL: You Must Run These Migrations Before Testing Purchases

The app needs two database tables to track purchases and form access. Without them, the webhook will fail when processing payments.

## How to Run Migrations

### Option 1: Supabase Dashboard (Easiest)

1. **Go to SQL Editor**: https://supabase.com/dashboard/project/agveamlaoiufxhtcmhlg/sql/new

2. **Run Migration 001** - Create purchases table:
   - Copy the contents of `src/db/migrations/001_create_purchases.sql`
   - Paste into SQL Editor
   - Click "Run"
   - Wait for success message

3. **Run Migration 002** - Create user_form_access table:
   - Copy the contents of `src/db/migrations/002_create_user_form_access.sql`
   - Paste into SQL Editor
   - Click "Run"
   - Wait for success message

4. **Verify Tables Created**:
   - Go to: https://supabase.com/dashboard/project/agveamlaoiufxhtcmhlg/editor
   - You should see two new tables:
     - `purchases`
     - `user_form_access`

### Option 2: Quick Copy-Paste

**Migration 001 - purchases table:**
```sql
-- Copy contents from: src/db/migrations/001_create_purchases.sql
```

**Migration 002 - user_form_access table:**
```sql
-- Copy contents from: src/db/migrations/002_create_user_form_access.sql
```

## What These Tables Do

### `purchases` table
- Stores all Stripe purchase records
- Tracks payment status (pending, completed, failed, refunded)
- Links purchases to users
- Stores package details and forms included

### `user_form_access` table
- Grants users access to specific forms
- Links to purchase that granted access
- Supports expiration dates (for time-limited access)
- Can be revoked (for refunds)

## After Running Migrations

Test the complete flow:

1. **Make a Test Purchase**:
   - Go to http://localhost:3000/dashboard
   - Click "Buy Now" on any package
   - Complete checkout (use real card with LIVE keys)

2. **Check Webhook Received**:
   - Stripe will call your webhook: `/api/payments/webhook`
   - This creates a purchase record and grants form access
   - Check server logs for: "Successfully processed payment for user..."

3. **Verify Access**:
   - After purchase, try accessing a form from the package
   - Should load without "Purchase Required" message

4. **Check Database**:
   - Go to Supabase Tables view
   - `purchases` should have your purchase
   - `user_form_access` should have records for each form

## Troubleshooting

### Migration fails with "relation already exists"
- Tables are already created! You're good to go.
- Skip to testing the purchase flow

### Migration fails with "permission denied"
- Make sure you're logged into the correct Supabase project
- URL should be: agveamlaoiufxhtcmhlg.supabase.co

### Webhook fails after purchase
- Check if tables exist in Supabase dashboard
- Check server logs for error messages
- Verify SUPABASE_SERVICE_ROLE_KEY in .env.local

### User can't access form after purchase
- Check `user_form_access` table for records
- Verify `is_active = true`
- Check that `form_id` matches form you're trying to access (should be lowercase)

## Next Steps After Migrations

1. ✅ Run both migrations in Supabase
2. ✅ Verify tables exist in dashboard
3. ✅ Test a purchase flow end-to-end
4. ✅ Verify webhook creates purchase record
5. ✅ Verify user can access purchased forms
6. ✅ Deploy to production with same migrations
