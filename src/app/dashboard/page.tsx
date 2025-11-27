import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardClient } from './DashboardClient';

interface DashboardPageProps {
  searchParams: Promise<{
    package?: string;
    category?: string;
    form?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // Fetch user's in-progress applications
  const { data: applications } = await supabase
    .from('form_applications')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  // Await searchParams to get the actual values
  const params = await searchParams;

  return (
    <DashboardClient
      applications={applications || []}
      user={user}
      highlightPackage={params.package}
      highlightCategory={params.category}
      highlightForm={params.form}
    />
  );
}
