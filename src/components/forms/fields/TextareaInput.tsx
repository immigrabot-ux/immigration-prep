'use client';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface TextareaInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export function TextareaInput({
  value,
  onChange,
  error,
  placeholder,
}: TextareaInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Textarea
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder}
      rows={4}
      className={cn(
        'resize-none',
        error && 'border-destructive focus-visible:ring-destructive'
      )}
      aria-invalid={!!error}
      aria-describedby={error ? 'error-message' : undefined}
    />
  );
}
