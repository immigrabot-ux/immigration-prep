'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CheckboxInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  placeholder?: string;
}

export function CheckboxInput({ value, onChange, error, placeholder }: CheckboxInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="checkbox-input"
        checked={value || false}
        onCheckedChange={onChange}
        className={cn(error && 'border-destructive')}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {placeholder && (
        <Label
          htmlFor="checkbox-input"
          className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {placeholder}
        </Label>
      )}
    </div>
  );
}
