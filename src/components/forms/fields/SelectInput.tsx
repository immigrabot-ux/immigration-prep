'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
}

export function SelectInput({
  value,
  onChange,
  error,
  placeholder = 'Select an option',
  options,
}: SelectInputProps) {
  return (
    <Select value={value || ''} onValueChange={onChange}>
      <SelectTrigger
        className={cn(error && 'border-destructive focus:ring-destructive')}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
