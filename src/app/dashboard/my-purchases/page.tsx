import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MyPurchasesClient } from './MyPurchasesClient';

export default async function MyPurchasesPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/auth/login');
  }

  // Fetch user's purchases
  const { data: purchases } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch user's form access
  const { data: formAccess } = await supabase
    .from('user_form_access')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true);

  return <MyPurchasesClient purchases={purchases || []} formAccess={formAccess || []} />;
}
