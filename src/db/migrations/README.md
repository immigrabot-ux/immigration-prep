# Database Migrations

This directory contains SQL migration files for the ImmigrationPrep database schema.

## Running Migrations

These migrations should be run in your Supabase SQL Editor in order:

1. `001_create_purchases.sql` - Creates the purchases table
2. `002_create_user_form_access.sql` - Creates the user_form_access table

## Tables

### purchases
Tracks all user purchases including Stripe payment details, package information, and pricing.

**Key fields:**
- `user_id` - References auth.users
- `stripe_checkout_session_id` - Unique Stripe session ID
- `package_id` - Package identifier (e.g., 'family', 'marriage')
- `forms_included` - Array of form IDs included in purchase
- `amount_paid` - Amount in cents
- `status` - Payment status (pending, completed, failed, refunded)

**Row Level Security:**
- Users can only view their own purchases
- Service role can insert/update (for webhooks)

### user_form_access
Tracks which forms each user has access to, supporting multiple access sources.

**Key fields:**
- `user_id` - References auth.users
- `form_id` - Form identifier (e.g., 'i-130')
- `purchase_id` - References purchases table
- `granted_via` - How access was granted (purchase, admin_grant, promo)
- `expires_at` - Optional expiration date
- `is_active` - Whether access is currently active

**Row Level Security:**
- Users can only view their own form access
- Service role can manage all access

## Helper Functions

### user_has_form_access(user_id, form_id)
Checks if a user has active access to a specific form.

**Usage:**
```sql
SELECT user_has_form_access('user-uuid', 'i-130');
```

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy and paste the contents of `001_create_purchases.sql`
5. Run the query
6. Repeat for `002_create_user_form_access.sql`

## Notes

- All tables have Row Level Security (RLS) enabled
- Timestamps are automatically managed with triggers
- Foreign keys ensure referential integrity
- Indexes are created for optimal query performance
