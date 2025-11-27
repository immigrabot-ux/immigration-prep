import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { UniversalFormWizard } from '@/components/forms/UniversalFormWizard';
import { checkFormAccess } from '@/lib/access-control';
import { PurchaseRequired } from '@/components/access/PurchaseRequired';

interface PageProps {
  params: Promise<{
    formId: string;
  }>;
}

export default async function FormPage({ params }: PageProps) {
  const { formId } = await params;
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/auth/login');
  }

  // Get form definition from registry
  const formDefinition = FORM_REGISTRY[formId];
  if (!formDefinition) {
    redirect('/dashboard');
  }

  // Check if user has access to this form
  const accessCheck = await checkFormAccess(formId);
  if (!accessCheck.hasAccess) {
    // Show purchase required page
    return <PurchaseRequired formId={formId} reason={accessCheck.reason} />;
  }

  // Find or create application for this form
  let { data: application, error: fetchError } = await supabase
    .from('form_applications')
    .select('*')
    .eq('user_id', user.id)
    .eq('form_id', formId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // If no application exists, create one
  if (fetchError || !application) {
    const { data: newApplication, error: createError } = await supabase
      .from('form_applications')
      .insert({
        user_id: user.id,
        form_id: formId,
        status: 'draft',
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating application:', createError);
      redirect('/dashboard');
    }

    application = newApplication;
  }

  // Fetch existing answers
  const { data: answersData } = await supabase
    .from('form_answers')
    .select('question_id, answer')
    .eq('application_id', application.id);

  // Convert answers array to object
  const initialAnswers: Record<string, any> = {};
  answersData?.forEach((row) => {
    initialAnswers[row.question_id] = row.answer;
  });

  return (
    <UniversalFormWizard
      formDefinition={formDefinition}
      applicationId={application.id}
      initialAnswers={initialAnswers}
    />
  );
}
