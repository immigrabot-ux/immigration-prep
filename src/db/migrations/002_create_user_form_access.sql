-- Create user_form_access table to track which forms users can access
CREATE TABLE IF NOT EXISTS user_form_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Form access
  form_id TEXT NOT NULL, -- e.g., 'i-130', 'i-485'

  -- Source of access
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  granted_via TEXT NOT NULL, -- 'purchase', 'admin_grant', 'promo', etc.

  -- Access control
  expires_at TIMESTAMPTZ, -- NULL for lifetime access
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

-- Create index for fast user lookup
CREATE INDEX IF NOT EXISTS idx_user_form_access_user_id ON user_form_access(user_id);

-- Create index for form lookup
CREATE INDEX IF NOT EXISTS idx_user_form_access_form_id ON user_form_access(form_id);

-- Create index for active access lookup
CREATE INDEX IF NOT EXISTS idx_user_form_access_active ON user_form_access(user_id, form_id) WHERE is_active = true;

-- Create index for purchase lookup
CREATE INDEX IF NOT EXISTS idx_user_form_access_purchase_id ON user_form_access(purchase_id);

-- Enable Row Level Security
ALTER TABLE user_form_access ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own access
CREATE POLICY "Users can view own form access"
  ON user_form_access
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Service role can manage all access
CREATE POLICY "Service role can manage form access"
  ON user_form_access
  FOR ALL
  USING (true);

-- Create updated_at trigger
CREATE TRIGGER update_user_form_access_updated_at
  BEFORE UPDATE ON user_form_access
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create helper function to check if user has access to a form
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
