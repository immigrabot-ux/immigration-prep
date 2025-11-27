import { createClient } from '@/lib/supabase/server';

export interface AccessCheckResult {
  hasAccess: boolean;
  reason?: 'not_authenticated' | 'no_purchase' | 'access_revoked' | 'expired';
}

/**
 * Check if a user has access to a specific form
 */
export async function checkFormAccess(formId: string): Promise<AccessCheckResult> {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { hasAccess: false, reason: 'not_authenticated' };
  }

  // Check if user has active access to this form
  const { data: access, error: accessError } = await supabase
    .from('user_form_access')
    .select('*')
    .eq('user_id', user.id)
    .eq('form_id', formId.toLowerCase())
    .eq('is_active', true)
    .is('revoked_at', null)
    .single();

  if (accessError || !access) {
    return { hasAccess: false, reason: 'no_purchase' };
  }

  // Check if access has expired
  if (access.expires_at && new Date(access.expires_at) < new Date()) {
    return { hasAccess: false, reason: 'expired' };
  }

  return { hasAccess: true };
}

/**
 * Get all forms a user has access to
 */
export async function getUserFormAccess(): Promise<string[]> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  const { data: accessRecords, error: accessError } = await supabase
    .from('user_form_access')
    .select('form_id')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .is('revoked_at', null);

  if (accessError || !accessRecords) {
    return [];
  }

  // Filter out expired access
  const now = new Date();
  return accessRecords
    .filter((record) => !record.expires_at || new Date(record.expires_at) > now)
    .map((record) => record.form_id);
}
