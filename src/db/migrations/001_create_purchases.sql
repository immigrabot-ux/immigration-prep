-- Create purchases table to track user purchases
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Stripe payment details
  stripe_checkout_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,

  -- Package details
  package_id TEXT NOT NULL, -- e.g., 'family', 'marriage', 'single-form-i-130'
  package_name TEXT NOT NULL,
  forms_included TEXT[] NOT NULL, -- Array of form IDs, e.g., ['i-130', 'i-485']

  -- Pricing
  amount_paid INTEGER NOT NULL, -- in cents, e.g., 4900 for $49
  currency TEXT NOT NULL DEFAULT 'usd',

  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for fast user lookup
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);

-- Create index for Stripe session lookup
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session ON purchases(stripe_checkout_session_id);

-- Create index for status lookup
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);

-- Enable Row Level Security
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own purchases
CREATE POLICY "Users can view own purchases"
  ON purchases
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Service role can insert purchases (via webhook)
CREATE POLICY "Service role can insert purchases"
  ON purchases
  FOR INSERT
  WITH CHECK (true);

-- Policy: Service role can update purchases (via webhook)
CREATE POLICY "Service role can update purchases"
  ON purchases
  FOR UPDATE
  USING (true);

-- Create updated_at trigger
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
