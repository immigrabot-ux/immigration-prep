// @ts-nocheck - Supabase generated types causing build issues
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { DownloadPDFButton } from '@/components/forms/DownloadPDFButton';

interface PageProps {
  params: Promise<{
    formId: string;
  }>;
  searchParams: Promise<{
    applicationId?: string;
  }>;
}

export default async function ReviewPage({ params, searchParams }: PageProps) {
  const { formId } = await params;
  const { applicationId } = await searchParams;
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // Get form definition from registry
  const formDefinition = FORM_REGISTRY[formId];
  if (!formDefinition) {
    redirect('/dashboard');
  }

  // Get application
  if (!applicationId) {
    redirect(`/dashboard/forms/${formId}`);
  }

  const { data: application, error: appError } = await supabase
    .from('form_applications')
    .select('*')
    .eq('id', applicationId)
    .eq('user_id', user.id)
    .single();

  if (appError || !application) {
    redirect('/dashboard');
  }

  // Fetch answers
  const { data: answersData } = await supabase
    .from('form_answers')
    .select('question_id, answer')
    .eq('application_id', application.id);

  // Convert answers array to object
  const answers: Record<string, any> = {};
  answersData?.forEach((row) => {
    answers[row.question_id] = row.answer;
  });

  // Organize answers by section
  const answersBySection = formDefinition.sections.map((section) => {
    const sectionAnswers = section.questions
      .filter((q) => answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '')
      .map((q) => ({
        question: q,
        answer: answers[q.id],
      }));

    return {
      section,
      answers: sectionAnswers,
    };
  });

  const formatAnswer = (answer: any, question: any): string => {
    if (answer === null || answer === undefined) return 'Not provided';
    if (typeof answer === 'boolean') return answer ? 'Yes' : 'No';
    if (typeof answer === 'object') {
      if (question.type === 'name') {
        return `${answer.firstName} ${answer.middleName || ''} ${answer.lastName}`.trim();
      }
      if (question.type === 'address') {
        return `${answer.street}, ${answer.city}, ${answer.state} ${answer.zip}`;
      }
      return JSON.stringify(answer);
    }
    return String(answer);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Application Complete!</CardTitle>
          <CardDescription>
            Your {formDefinition.name} application has been submitted for review.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review Your Answers</CardTitle>
          <CardDescription>
            Please review your submitted information below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {answersBySection.map(({ section, answers: sectionAnswers }) => (
            <div key={section.id}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <div className="space-y-4">
                {sectionAnswers.map(({ question, answer }) => (
                  <div
                    key={question.id}
                    className="border-l-2 border-primary/20 pl-4"
                  >
                    <p className="text-sm font-medium text-muted-foreground">
                      {question.label}
                    </p>
                    <p className="text-base mt-1">
                      {formatAnswer(answer, question)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-4 mt-8">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/dashboard/forms/${formId}?applicationId=${applicationId}`}>
            Edit Answers
          </Link>
        </Button>
        <DownloadPDFButton
          applicationId={applicationId}
          formTitle={formDefinition.name}
          className="flex-1"
        />
        <Button asChild className="flex-1">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
