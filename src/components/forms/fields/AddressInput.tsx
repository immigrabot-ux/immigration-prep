'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface AddressValue {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressInputProps {
  value: AddressValue;
  onChange: (value: AddressValue) => void;
  error?: string;
}

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export function AddressInput({ value, onChange, error }: AddressInputProps) {
  const handleFieldChange = (field: keyof AddressValue, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  const formatZipCode = (zipValue: string) => {
    const cleaned = zipValue.replace(/\D/g, '');
    if (cleaned.length <= 5) {
      return cleaned;
    }
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 9)}`;
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="street" className="text-sm">
          Street Address
        </Label>
        <Input
          id="street"
          value={value?.street || ''}
          onChange={(e) => handleFieldChange('street', e.target.value)}
          placeholder="123 Main St"
          className={cn(error && 'border-destructive')}
          autoComplete="street-address"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="text-sm">
            City
          </Label>
          <Input
            id="city"
            value={value?.city || ''}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            placeholder="New York"
            className={cn(error && 'border-destructive')}
            autoComplete="address-level2"
          />
        </div>

        <div>
          <Label htmlFor="state" className="text-sm">
            State
          </Label>
          <Select
            value={value?.state || ''}
            onValueChange={(val) => handleFieldChange('state', val)}
          >
            <SelectTrigger
              id="state"
              className={cn(error && 'border-destructive')}
            >
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="zip" className="text-sm">
          ZIP Code
        </Label>
        <Input
          id="zip"
          value={value?.zip || ''}
          onChange={(e) =>
            handleFieldChange('zip', formatZipCode(e.target.value))
          }
          placeholder="12345"
          maxLength={10}
          className={cn(error && 'border-destructive')}
          autoComplete="postal-code"
        />
      </div>
    </div>
  );
}
