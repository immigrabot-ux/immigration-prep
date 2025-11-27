'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField as FormFieldType } from '@/lib/constants/forms';
import { Info } from 'lucide-react';

interface FormFieldProps {
    field: FormFieldType;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function FormField({ field, value, onChange, error }: FormFieldProps) {
    const renderInput = () => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'date':
                return (
                    <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        className={error ? 'border-red-500' : ''}
                    />
                );

            case 'textarea':
                return (
                    <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        className={error ? 'border-red-500' : ''}
                        rows={4}
                    />
                );

            case 'select':
                return (
                    <Select value={value || ''} onValueChange={onChange}>
                        <SelectTrigger className={error ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case 'radio':
                return (
                    <RadioGroup value={value || ''} onValueChange={onChange}>
                        {field.options?.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                                <Label htmlFor={`${field.id}-${option.value}`} className="font-normal cursor-pointer">
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            case 'checkbox':
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={field.id}
                            checked={value === 'true'}
                            onCheckedChange={(checked) => onChange(checked ? 'true' : 'false')}
                        />
                        <Label htmlFor={field.id} className="font-normal cursor-pointer">
                            {field.label}
                        </Label>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-2">
            {field.type !== 'checkbox' && (
                <Label htmlFor={field.id}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
            )}

            {renderInput()}

            {field.helpText && (
                <div className="flex items-start gap-2 text-sm text-gray-500">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{field.helpText}</span>
                </div>
            )}

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
