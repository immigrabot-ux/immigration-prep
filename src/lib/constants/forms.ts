import { z } from 'zod';

// Form Packages
export interface FormPackage {
    id: string;
    name: string;
    description: string;
    forms: string[];
    estimatedTime: string;
    price: number;
}

export const FORM_PACKAGES: FormPackage[] = [
    {
        id: 'marriage-green-card',
        name: 'Marriage Green Card Package',
        description: 'For spouses of U.S. citizens applying for a green card while in the United States',
        forms: ['I-130', 'I-485', 'I-765', 'I-131', 'I-864'],
        estimatedTime: '2-3 hours',
        price: 149,
    },
    {
        id: 'citizenship',
        name: 'Citizenship Application',
        description: 'For green card holders applying to become U.S. citizens',
        forms: ['N-400'],
        estimatedTime: '1-2 hours',
        price: 99,
    },
];

// Form Steps
export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'date' | 'select' | 'radio' | 'checkbox' | 'textarea';
    placeholder?: string;
    helpText?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
}

export interface FormStep {
    id: string;
    title: string;
    description?: string;
    fields: FormField[];
}

// I-130 Form Steps
export const I130_STEPS: FormStep[] = [
    {
        id: 'petitioner-basic',
        title: 'Your Basic Information',
        description: 'Tell us about yourself (the U.S. citizen petitioner)',
        fields: [
            {
                id: 'petitioner.lastName',
                label: 'Legal Last Name',
                type: 'text',
                placeholder: 'Smith',
                helpText: 'Enter your name exactly as it appears on your birth certificate or naturalization certificate',
                required: true,
            },
            {
                id: 'petitioner.firstName',
                label: 'Legal First Name',
                type: 'text',
                placeholder: 'John',
                required: true,
            },
            {
                id: 'petitioner.middleName',
                label: 'Middle Name',
                type: 'text',
                placeholder: 'Robert',
                helpText: 'Leave blank if you don\'t have a middle name',
            },
            {
                id: 'petitioner.dateOfBirth',
                label: 'Date of Birth',
                type: 'date',
                required: true,
            },
            {
                id: 'petitioner.email',
                label: 'Email Address',
                type: 'email',
                placeholder: 'john.smith@example.com',
                required: true,
            },
        ],
    },
    {
        id: 'petitioner-address',
        title: 'Your Current Address',
        description: 'Where do you currently live?',
        fields: [
            {
                id: 'petitioner.address.street',
                label: 'Street Address',
                type: 'text',
                placeholder: '123 Main Street',
                required: true,
            },
            {
                id: 'petitioner.address.apt',
                label: 'Apartment/Unit Number',
                type: 'text',
                placeholder: 'Apt 4B',
            },
            {
                id: 'petitioner.address.city',
                label: 'City',
                type: 'text',
                placeholder: 'New York',
                required: true,
            },
            {
                id: 'petitioner.address.state',
                label: 'State',
                type: 'select',
                options: [
                    { value: 'AL', label: 'Alabama' },
                    { value: 'AK', label: 'Alaska' },
                    { value: 'AZ', label: 'Arizona' },
                    { value: 'CA', label: 'California' },
                    { value: 'FL', label: 'Florida' },
                    { value: 'NY', label: 'New York' },
                    { value: 'TX', label: 'Texas' },
                    // Add more states as needed
                ],
                required: true,
            },
            {
                id: 'petitioner.address.zipCode',
                label: 'ZIP Code',
                type: 'text',
                placeholder: '10001',
                required: true,
            },
        ],
    },
    {
        id: 'beneficiary-basic',
        title: 'Your Spouse\'s Information',
        description: 'Tell us about your spouse (the beneficiary)',
        fields: [
            {
                id: 'beneficiary.lastName',
                label: 'Legal Last Name',
                type: 'text',
                placeholder: 'Garcia',
                required: true,
            },
            {
                id: 'beneficiary.firstName',
                label: 'Legal First Name',
                type: 'text',
                placeholder: 'Maria',
                required: true,
            },
            {
                id: 'beneficiary.middleName',
                label: 'Middle Name',
                type: 'text',
            },
            {
                id: 'beneficiary.dateOfBirth',
                label: 'Date of Birth',
                type: 'date',
                required: true,
            },
            {
                id: 'beneficiary.countryOfBirth',
                label: 'Country of Birth',
                type: 'text',
                placeholder: 'Mexico',
                required: true,
            },
        ],
    },
    {
        id: 'marriage-info',
        title: 'Marriage Information',
        description: 'Tell us about your marriage',
        fields: [
            {
                id: 'marriage.dateOfMarriage',
                label: 'Date of Marriage',
                type: 'date',
                required: true,
            },
            {
                id: 'marriage.placeOfMarriage',
                label: 'City and Country Where You Were Married',
                type: 'text',
                placeholder: 'Las Vegas, United States',
                required: true,
            },
            {
                id: 'marriage.previousMarriages',
                label: 'Have you or your spouse been married before?',
                type: 'radio',
                options: [
                    { value: 'no', label: 'No, this is the first marriage for both of us' },
                    { value: 'petitioner', label: 'Yes, I (petitioner) was married before' },
                    { value: 'beneficiary', label: 'Yes, my spouse (beneficiary) was married before' },
                    { value: 'both', label: 'Yes, we were both married before' },
                ],
                required: true,
            },
        ],
    },
];

// Validation Schemas
export const petitionerBasicSchema = z.object({
    'petitioner.lastName': z.string().min(1, 'Last name is required'),
    'petitioner.firstName': z.string().min(1, 'First name is required'),
    'petitioner.middleName': z.string().optional(),
    'petitioner.dateOfBirth': z.string().min(1, 'Date of birth is required'),
    'petitioner.email': z.string().email('Invalid email address'),
});

export const petitionerAddressSchema = z.object({
    'petitioner.address.street': z.string().min(1, 'Street address is required'),
    'petitioner.address.apt': z.string().optional(),
    'petitioner.address.city': z.string().min(1, 'City is required'),
    'petitioner.address.state': z.string().min(1, 'State is required'),
    'petitioner.address.zipCode': z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
});

export const beneficiaryBasicSchema = z.object({
    'beneficiary.lastName': z.string().min(1, 'Last name is required'),
    'beneficiary.firstName': z.string().min(1, 'First name is required'),
    'beneficiary.middleName': z.string().optional(),
    'beneficiary.dateOfBirth': z.string().min(1, 'Date of birth is required'),
    'beneficiary.countryOfBirth': z.string().min(1, 'Country of birth is required'),
});

export const marriageInfoSchema = z.object({
    'marriage.dateOfMarriage': z.string().min(1, 'Date of marriage is required'),
    'marriage.placeOfMarriage': z.string().min(1, 'Place of marriage is required'),
    'marriage.previousMarriages': z.string().min(1, 'Please select an option'),
});

export const STEP_SCHEMAS: Record<string, z.ZodObject<any>> = {
    'petitioner-basic': petitionerBasicSchema,
    'petitioner-address': petitionerAddressSchema,
    'beneficiary-basic': beneficiaryBasicSchema,
    'marriage-info': marriageInfoSchema,
};

// Helper to get steps for a form type
export function getFormSteps(formType: string): FormStep[] {
    switch (formType) {
        case 'I-130':
            return I130_STEPS;
        default:
            return [];
    }
}

// Helper to get schema for a step
export function getStepSchema(stepId: string): z.ZodObject<any> | null {
    return STEP_SCHEMAS[stepId] || null;
}
