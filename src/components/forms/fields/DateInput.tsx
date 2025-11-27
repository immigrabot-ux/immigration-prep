'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export function DateInput({ value, onChange, error, placeholder }: DateInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <Input
        type="date"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'pr-10',
          error && 'border-destructive focus-visible:ring-destructive'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />
      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}
