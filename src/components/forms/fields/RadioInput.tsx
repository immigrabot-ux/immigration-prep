'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface RadioInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export function RadioInput({ value, onChange, error, options }: RadioInputProps) {
  return (
    <RadioGroup
      value={value || ''}
      onValueChange={onChange}
      className={cn('space-y-3', error && 'border-destructive')}
      aria-invalid={!!error}
      aria-describedby={error ? 'error-message' : undefined}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label
            htmlFor={option.value}
            className="font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
