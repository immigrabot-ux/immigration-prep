import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { FormsListingClient } from './FormsListingClient';

export default async function FormsListingPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // Fetch all user's applications
  const { data: applications } = await supabase
    .from('form_applications')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  // Fetch answer counts for progress calculation
  const applicationsWithProgress = await Promise.all(
    (applications || []).map(async (app) => {
      const { count } = await supabase
        .from('form_answers')
        .select('*', { count: 'exact', head: true })
        .eq('application_id', app.id);

      return {
        ...app,
        answeredQuestions: count || 0,
      };
    })
  );

  return <FormsListingClient applications={applicationsWithProgress} />;
}
