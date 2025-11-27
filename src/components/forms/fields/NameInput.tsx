'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface NameValue {
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface NameInputProps {
  value: NameValue;
  onChange: (value: NameValue) => void;
  error?: string;
}

export function NameInput({ value, onChange, error }: NameInputProps) {
  const handleFieldChange = (field: keyof NameValue, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-sm">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            value={value?.firstName || ''}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            placeholder="John"
            className={cn(error && 'border-destructive')}
            autoComplete="given-name"
          />
        </div>

        <div>
          <Label htmlFor="lastName" className="text-sm">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            value={value?.lastName || ''}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            placeholder="Doe"
            className={cn(error && 'border-destructive')}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="middleName" className="text-sm">
          Middle Name <span className="text-muted-foreground">(Optional)</span>
        </Label>
        <Input
          id="middleName"
          value={value?.middleName || ''}
          onChange={(e) => handleFieldChange('middleName', e.target.value)}
          placeholder="Michael"
          className={cn(error && 'border-destructive')}
          autoComplete="additional-name"
        />
      </div>
    </div>
  );
}
