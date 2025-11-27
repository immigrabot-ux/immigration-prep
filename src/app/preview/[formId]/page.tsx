import { PreviewFormClient } from './PreviewFormClient';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { redirect } from 'next/navigation';

interface PreviewFormPageProps {
  params: Promise<{
    formId: string;
  }>;
}

export default async function PreviewFormPage({ params }: PreviewFormPageProps) {
  const { formId } = await params;

  // Get form definition
  const formDefinition = FORM_REGISTRY[formId.toLowerCase()];

  if (!formDefinition) {
    redirect('/browse');
  }

  return <PreviewFormClient formDefinition={formDefinition} />;
}
