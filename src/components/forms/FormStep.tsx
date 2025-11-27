'use client';

import { FormStep as FormStepType } from '@/lib/constants/forms';
import FormField from './FormField';
import { useTranslations } from 'next-intl';

interface FormStepProps {
    step: FormStepType;
    values: Record<string, string>;
    errors: Record<string, string>;
    onChange: (fieldId: string, value: string) => void;
}

export default function FormStep({ step, values, errors, onChange }: FormStepProps) {
    const t = useTranslations();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">{t(step.title)}</h2>
                {step.description && (
                    <p className="mt-2 text-gray-600">{t(step.description)}</p>
                )}
            </div>

            <div className="space-y-6">
                {step.fields.map((field) => (
                    <FormField
                        key={field.id}
                        field={field}
                        value={values[field.id] || ''}
                        onChange={(value) => onChange(field.id, value)}
                        error={errors[field.id]}
                    />
                ))}
            </div>
        </div>
    );
}
