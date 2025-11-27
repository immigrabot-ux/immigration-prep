'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'phone' | 'ssn';
}

export function TextInput({
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Format phone numbers
    if (type === 'phone') {
      inputValue = formatPhoneNumber(inputValue);
    }

    // Format SSN
    if (type === 'ssn') {
      inputValue = formatSSN(inputValue);
    }

    onChange(inputValue);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      if (parts.length === 1) return parts[0];
      if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
      if (parts.length === 3) return `(${parts[0]}) ${parts[1]}-${parts[2]}`;
    }
    return value;
  };

  const formatSSN = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      if (parts.length === 1) return parts[0];
      if (parts.length === 2) return `${parts[0]}-${parts[1]}`;
      if (parts.length === 3) return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }
    return value;
  };

  const inputType = type === 'phone' || type === 'ssn' ? 'text' : type;
  const inputMode =
    type === 'phone' || type === 'ssn' ? 'numeric' : type === 'email' ? 'email' : 'text';

  return (
    <Input
      type={inputType}
      inputMode={inputMode}
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(error && 'border-destructive focus-visible:ring-destructive')}
      aria-invalid={!!error}
      aria-describedby={error ? 'error-message' : undefined}
      autoComplete={
        type === 'email'
          ? 'email'
          : type === 'phone'
          ? 'tel'
          : type === 'ssn'
          ? 'off'
          : undefined
      }
    />
  );
}
