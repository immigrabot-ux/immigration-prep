'use client';

import { useState } from 'react';
import { FormDefinition } from '@/lib/constants/forms-registry';
import { UniversalFormWizard } from '@/components/forms/UniversalFormWizard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PreviewFormClientProps {
  formDefinition: FormDefinition;
}

export function PreviewFormClient({ formDefinition }: PreviewFormClientProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleComplete = () => {
    console.log('Preview form completed:', answers);
    alert('Preview Mode: Form completed! In production, this would save to your account.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Preview Mode Banner */}
      <div className="bg-amber-100 border-b border-amber-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-amber-700" />
              <span className="font-semibold text-amber-900">Preview Mode</span>
              <span className="text-amber-700">
                - Your answers won't be saved. Sign up to save your progress.
              </span>
            </div>
            <Button asChild variant="outline" size="sm" className="bg-white">
              <Link href="/signup">Sign Up to Save</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/browse">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Link>
          </Button>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{formDefinition.code}</h1>
              {formDefinition.status === 'beta' && (
                <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                  BETA
                </span>
              )}
            </div>
            <p className="text-xl text-muted-foreground">{formDefinition.name}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {formDefinition.description}
            </p>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="container mx-auto px-4 py-6">
        <Alert>
          <Eye className="h-4 w-4" />
          <AlertTitle>Preview Mode</AlertTitle>
          <AlertDescription>
            You're testing this form without an account. Your answers will not be saved.
            To save your progress and generate PDFs, please sign up for an account.
          </AlertDescription>
        </Alert>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 pb-12">
        <UniversalFormWizard
          formDefinition={formDefinition}
          applicationId={null}
          initialAnswers={{}}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
