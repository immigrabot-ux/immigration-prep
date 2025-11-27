'use client';

import { useFormContext } from 'react-hook-form';
import { Question } from '@/lib/constants/forms-registry';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface QuestionRendererProps {
  question: Question;
}

export function QuestionRenderer({ question }: QuestionRendererProps) {
  const { register, setValue, watch } = useFormContext();
  const value = watch(question.id);

  const renderField = () => {
    switch (question.type) {
      case 'text':
      case 'email':
        return (
          <Input
            {...register(question.id)}
            type={question.type}
            placeholder={question.placeholder}
          />
        );

      case 'tel':
      case 'ssn':
        return (
          <Input
            {...register(question.id)}
            type="tel"
            placeholder={question.placeholder}
          />
        );

      case 'date':
        return (
          <Input
            {...register(question.id)}
            type="date"
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...register(question.id)}
            placeholder={question.placeholder}
            rows={4}
          />
        );

      case 'select':
        return (
          <Select
            value={value || ''}
            onValueChange={(val) => setValue(question.id, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={question.placeholder || 'Select...'} />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup
            value={value || ''}
            onValueChange={(val) => setValue(question.id, val)}
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                <Label htmlFor={`${question.id}-${option.value}`} className="font-normal cursor-pointer">
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
              id={question.id}
              checked={value || false}
              onCheckedChange={(checked) => setValue(question.id, checked)}
            />
            <Label htmlFor={question.id} className="font-normal cursor-pointer">
              {question.label}
            </Label>
          </div>
        );

      case 'file':
        return (
          <Input
            {...register(question.id)}
            type="file"
          />
        );

      default:
        return (
          <Input
            {...register(question.id)}
            placeholder={question.placeholder}
          />
        );
    }
  };

  // For checkbox, we don't show the label separately since it's part of the field
  if (question.type === 'checkbox') {
    return (
      <div className="space-y-2">
        {question.helpText && (
          <p className="text-sm text-muted-foreground">{question.helpText}</p>
        )}
        {renderField()}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={question.id} className="text-base font-medium">
        {question.label}
        {question.required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {question.helpText && (
        <p className="text-sm text-muted-foreground">{question.helpText}</p>
      )}

      {renderField()}
    </div>
  );
}
