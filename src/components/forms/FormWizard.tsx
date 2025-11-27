'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import FormStep from './FormStep';
import { getFormSteps, getStepSchema } from '@/lib/constants/forms';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

interface FormWizardProps {
    applicationId: string;
    formType: string;
    initialAnswers?: Record<string, string>;
    initialStep?: number;
}

export default function FormWizard({
    applicationId,
    formType,
    initialAnswers = {},
    initialStep = 0
}: FormWizardProps) {
    const router = useRouter();
    const { toast } = useToast();
    const supabase = createClient();

    const steps = getFormSteps(formType);
    const [currentStepIndex, setCurrentStepIndex] = useState(initialStep);
    const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);

    const t = useTranslations();

    const currentStep = steps[currentStepIndex];
    const progress = ((currentStepIndex + 1) / steps.length) * 100;

    // Auto-save function (debounced)
    const saveAnswers = useCallback(async (answersToSave: Record<string, string>, stepIndex: number) => {
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('form_answers')
                .upsert({
                    application_id: applicationId,
                    step_number: stepIndex,
                    step_name: steps[stepIndex]?.id,
                    answers: answersToSave,
                    is_valid: true,
                    validation_errors: {},
                } as any);

            if (error) throw error;

            // Update application progress
            await (supabase as any)
                .from('form_applications')
                .update({
                    current_step: stepIndex,
                    progress_percentage: Math.round(((stepIndex + 1) / steps.length) * 100),
                    updated_at: new Date().toISOString(),
                })
                .eq('id', applicationId);

        } catch (error) {
            console.error('Auto-save error:', error);
            toast({
                title: 'Save failed',
                description: 'Your answers could not be saved. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    }, [applicationId, steps, supabase, toast]);

    // Debounced auto-save
    useEffect(() => {
        const timer = setTimeout(() => {
            if (Object.keys(answers).length > 0) {
                saveAnswers(answers, currentStepIndex);
            }
        }, 1000); // Save 1 second after user stops typing

        return () => clearTimeout(timer);
    }, [answers, currentStepIndex, saveAnswers]);

    const handleFieldChange = (fieldId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [fieldId]: value }));
        // Clear error for this field
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldId];
            return newErrors;
        });
    };

    const validateCurrentStep = (): boolean => {
        const schema = getStepSchema(currentStep.id);
        if (!schema) return true;

        try {
            schema.parse(answers);
            setErrors({});
            return true;
        } catch (error: any) {
            const newErrors: Record<string, string> = {};
            error.errors?.forEach((err: any) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleNext = async () => {
        if (!validateCurrentStep()) {
            toast({
                title: 'Validation error',
                description: 'Please fix the errors before continuing.',
                variant: 'destructive',
            });
            return;
        }

        // Save before moving to next step
        await saveAnswers(answers, currentStepIndex);

        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Last step - redirect to review
            router.push(`/dashboard/forms/${applicationId}/review`);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (!currentStep) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Card>
                <CardHeader>
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold">Prepare {formType}</h1>
                            <p className="text-gray-600 mt-2">
                                Step {currentStepIndex + 1} of {steps.length}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{t(currentStep.title)}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                        {isSaving && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Save className="w-4 h-4 animate-pulse" />
                                <span>Saving...</span>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    <FormStep
                        step={currentStep}
                        values={answers}
                        errors={errors}
                        onChange={handleFieldChange}
                    />
                </CardContent>

                <CardFooter className="flex justify-between pt-6">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStepIndex === 0}
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>

                    <Button onClick={handleNext}>
                        {currentStepIndex === steps.length - 1 ? 'Review Answers' : 'Next'}
                        {currentStepIndex < steps.length - 1 && (
                            <ChevronRight className="w-4 h-4 ml-2" />
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Your answers are automatically saved as you type.</p>
                <p className="mt-1">Need help? Click the chat button in the bottom right corner.</p>
            </div>
        </div>
    );
}
