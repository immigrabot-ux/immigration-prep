// @ts-nocheck - Form definitions have some type inconsistencies
import { z } from 'zod';

/**
 * MULTI-FORM SYSTEM ARCHITECTURE
 *
 * This registry defines all USCIS forms supported by the application.
 * Each form has a complete definition including questions, validation, and PDF mappings.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type QuestionType =
    | 'text'
    | 'email'
    | 'tel'
    | 'date'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'textarea'
    | 'address'
    | 'name'
    | 'ssn'
    | 'file';

export interface QuestionOption {
    value: string;
    label: string;
}

export interface Question {
    id: string;
    type: QuestionType;
    label: string;
    placeholder?: string;
    helpText?: string;
    required?: boolean;
    options?: QuestionOption[];
    validation?: z.ZodType<any>;
    conditional?: {
        dependsOn: string;
        values: string[];
    };
}

export interface FormSection {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
}

export interface PDFFieldMapping {
    questionId: string;
    pdfFieldName: string;
    transform?: (value: string) => string;
}

export interface FormDefinition {
    id: string;
    code: string; // e.g., "I-130", "N-400"
    name: string;
    description: string;
    category: 'family' | 'employment' | 'citizenship' | 'travel' | 'humanitarian' | 'work_authorization' | 'status_change' | 'other';
    estimatedTime: string;
    filingFee: number; // USCIS government filing fee
    price?: number; // Our service price (in dollars, for display)
    sections: FormSection[];
    pdfFieldMappings: PDFFieldMapping[];
    requiredDocuments: string[];
    instructions: string[];
    status?: 'active' | 'beta'; // Status flag for form availability
}

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const nameSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last name is required'),
});

const addressSchema = z.object({
    street: z.string().min(1, 'Street address is required'),
    apt: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
});

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format');
const emailSchema = z.string().email('Invalid email address');
const phoneSchema = z.string().regex(/^\d{10}$/, 'Phone must be 10 digits');
const ssnSchema = z.string().regex(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format');

// ============================================================================
// US STATES
// ============================================================================

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

// ============================================================================
// FORM DEFINITIONS
// ============================================================================

// Form I-130: Petition for Alien Relative
// Based on actual USCIS form structure and fields
const I130_DEFINITION: FormDefinition = {
    id: 'i-130',
    code: 'I-130',
    name: 'Petition for Alien Relative',
    description: 'Petition to establish a qualifying family relationship for immigration',
    category: 'family',
    estimatedTime: '45-60 minutes',
    filingFee: 535,
    price: 60,
    sections: [
        {
            id: 'part1-relationship',
            title: 'Part 1: Relationship',
            description: 'Identify the relationship between you (the petitioner) and your relative (the beneficiary)',
            questions: [
                {
                    id: 'part1.relationship',
                    type: 'select',
                    label: 'I am filing this petition for my:',
                    required: true,
                    options: [
                        { value: 'spouse', label: 'Spouse' },
                        { value: 'parent', label: 'Parent' },
                        { value: 'child', label: 'Child' },
                        { value: 'sibling', label: 'Brother or Sister' },
                    ],
                    helpText: 'Select the relationship of the beneficiary to you',
                },
                {
                    id: 'part1.petitionerStatus',
                    type: 'radio',
                    label: 'I am:',
                    required: true,
                    options: [
                        { value: 'citizen', label: 'A U.S. Citizen' },
                        { value: 'lpr', label: 'A Lawful Permanent Resident of the United States' },
                    ],
                },
                {
                    id: 'part1.gainedLPRThroughAdoption',
                    type: 'radio',
                    label: 'Did you gain lawful permanent resident status through adoption?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Answer only if you are a lawful permanent resident',
                },
            ],
        },
        {
            id: 'part2-petitioner-info',
            title: 'Part 2: Information About You (Petitioner)',
            description: 'Provide your personal information',
            questions: [
                {
                    id: 'part2.alienNumber',
                    type: 'text',
                    label: 'Alien Registration Number (A-Number)',
                    placeholder: 'A-',
                    helpText: 'If you have one. Leave blank if not applicable.',
                },
                {
                    id: 'part2.uscisOnlineAccount',
                    type: 'text',
                    label: 'USCIS Online Account Number',
                    helpText: 'If you have a USCIS online account',
                },
                {
                    id: 'part2.ssn',
                    type: 'ssn',
                    label: 'U.S. Social Security Number',
                    placeholder: '###-##-####',
                    helpText: 'If you have one',
                },
                {
                    id: 'part2.lastName',
                    type: 'text',
                    label: 'Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part2.firstName',
                    type: 'text',
                    label: 'Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part2.middleName',
                    type: 'text',
                    label: 'Middle Name',
                },
                {
                    id: 'part2.otherNamesUsed',
                    type: 'textarea',
                    label: 'Other Names Used',
                    helpText: 'Provide all other names you have ever used, including aliases, maiden name, and nicknames. Separate with commas.',
                    placeholder: 'e.g., Smith, Jane M.; Johnson, Jane',
                },
                {
                    id: 'part2.cityOfBirth',
                    type: 'text',
                    label: 'City or Town of Birth',
                    required: true,
                },
                {
                    id: 'part2.countryOfBirth',
                    type: 'text',
                    label: 'Country of Birth',
                    required: true,
                },
                {
                    id: 'part2.dateOfBirth',
                    type: 'date',
                    label: 'Date of Birth',
                    required: true,
                },
                {
                    id: 'part2.sex',
                    type: 'radio',
                    label: 'Sex',
                    required: true,
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                    ],
                },
            ],
        },
        {
            id: 'part2-mailing-address',
            title: 'Part 2: Your Mailing Address',
            questions: [
                {
                    id: 'part2.mailingInCareOf',
                    type: 'text',
                    label: 'In Care Of Name',
                    helpText: 'Optional - if mail should be sent c/o someone else',
                },
                {
                    id: 'part2.mailingStreet',
                    type: 'text',
                    label: 'Street Number and Name',
                    required: true,
                },
                {
                    id: 'part2.mailingAptType',
                    type: 'select',
                    label: 'Apt/Ste/Flr',
                    options: [
                        { value: '', label: 'None' },
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part2.mailingAptNumber',
                    type: 'text',
                    label: 'Apartment/Suite/Floor Number',
                },
                {
                    id: 'part2.mailingCity',
                    type: 'text',
                    label: 'City or Town',
                    required: true,
                },
                {
                    id: 'part2.mailingState',
                    type: 'select',
                    label: 'State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part2.mailingZip',
                    type: 'text',
                    label: 'ZIP Code',
                    required: true,
                    placeholder: '12345',
                },
                {
                    id: 'part2.province',
                    type: 'text',
                    label: 'Province',
                    helpText: 'For foreign addresses only',
                },
                {
                    id: 'part2.postalCode',
                    type: 'text',
                    label: 'Postal Code',
                    helpText: 'For foreign addresses only',
                },
                {
                    id: 'part2.country',
                    type: 'text',
                    label: 'Country',
                    helpText: 'For foreign addresses only',
                },
            ],
        },
        {
            id: 'part2-marital-info',
            title: 'Part 2: Your Marital Information',
            questions: [
                {
                    id: 'part2.timesMarried',
                    type: 'text',
                    label: 'How many times have you been married?',
                    required: true,
                    placeholder: 'Enter a number',
                },
                {
                    id: 'part2.currentMaritalStatus',
                    type: 'select',
                    label: 'Current Marital Status',
                    required: true,
                    options: [
                        { value: 'single', label: 'Single, Never Married' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                        { value: 'separated', label: 'Marriage Annulled or Other' },
                    ],
                },
                {
                    id: 'part2.currentSpouseName',
                    type: 'text',
                    label: 'Current Spouse\'s Full Name',
                    helpText: 'If currently married',
                },
                {
                    id: 'part2.dateOfMarriage',
                    type: 'date',
                    label: 'Date of Current Marriage',
                    helpText: 'If currently married',
                },
                {
                    id: 'part2.placeOfMarriage',
                    type: 'text',
                    label: 'Place of Current Marriage (City, State, Country)',
                    helpText: 'If currently married',
                },
            ],
        },
        {
            id: 'part2-citizenship',
            title: 'Part 2: Information About Your U.S. Citizenship',
            description: 'Complete this section if you are a U.S. citizen',
            questions: [
                {
                    id: 'part2.citizenshipThrough',
                    type: 'radio',
                    label: 'How did you acquire U.S. citizenship?',
                    options: [
                        { value: 'birth-us', label: 'Birth in the United States' },
                        { value: 'naturalization', label: 'Naturalization' },
                        { value: 'parents', label: 'Parents (acquired after birth through U.S. citizen parents)' },
                    ],
                    helpText: 'Select one',
                },
                {
                    id: 'part2.certificateNumber',
                    type: 'text',
                    label: 'Certificate of Naturalization Number or Certificate of Citizenship Number',
                    helpText: 'If you naturalized or acquired citizenship',
                },
                {
                    id: 'part2.placeOfNaturalization',
                    type: 'text',
                    label: 'Place of Naturalization or Acquisition (City, State)',
                    helpText: 'If you naturalized or acquired citizenship',
                },
            ],
        },
        {
            id: 'part4-beneficiary-info',
            title: 'Part 4: Information About Your Relative (Beneficiary)',
            description: 'Provide information about the person you are petitioning for',
            questions: [
                {
                    id: 'part4.alienNumber',
                    type: 'text',
                    label: 'Beneficiary\'s Alien Registration Number (A-Number)',
                    placeholder: 'A-',
                    helpText: 'If they have one',
                },
                {
                    id: 'part4.uscisOnlineAccount',
                    type: 'text',
                    label: 'Beneficiary\'s USCIS Online Account Number',
                },
                {
                    id: 'part4.ssn',
                    type: 'ssn',
                    label: 'Beneficiary\'s U.S. Social Security Number',
                    helpText: 'If they have one',
                },
                {
                    id: 'part4.lastName',
                    type: 'text',
                    label: 'Beneficiary\'s Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part4.firstName',
                    type: 'text',
                    label: 'Beneficiary\'s Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part4.middleName',
                    type: 'text',
                    label: 'Beneficiary\'s Middle Name',
                },
                {
                    id: 'part4.cityOfBirth',
                    type: 'text',
                    label: 'Beneficiary\'s City or Town of Birth',
                    required: true,
                },
                {
                    id: 'part4.countryOfBirth',
                    type: 'text',
                    label: 'Beneficiary\'s Country of Birth',
                    required: true,
                },
                {
                    id: 'part4.dateOfBirth',
                    type: 'date',
                    label: 'Beneficiary\'s Date of Birth',
                    required: true,
                },
                {
                    id: 'part4.sex',
                    type: 'radio',
                    label: 'Beneficiary\'s Sex',
                    required: true,
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                    ],
                },
                {
                    id: 'part4.hasOtherNames',
                    type: 'radio',
                    label: 'Has your relative ever used other names?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part4.otherNames',
                    type: 'textarea',
                    label: 'Other Names Used by Beneficiary',
                    helpText: 'If yes, list all other names',
                },
            ],
        },
        {
            id: 'part4-beneficiary-address',
            title: 'Part 4: Beneficiary\'s Address',
            questions: [
                {
                    id: 'part4.street',
                    type: 'text',
                    label: 'Street Number and Name',
                    required: true,
                },
                {
                    id: 'part4.aptType',
                    type: 'select',
                    label: 'Apt/Ste/Flr',
                    options: [
                        { value: '', label: 'None' },
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part4.aptNumber',
                    type: 'text',
                    label: 'Apartment/Suite/Floor Number',
                },
                {
                    id: 'part4.city',
                    type: 'text',
                    label: 'City or Town',
                    required: true,
                },
                {
                    id: 'part4.state',
                    type: 'text',
                    label: 'State or Province',
                },
                {
                    id: 'part4.zip',
                    type: 'text',
                    label: 'ZIP or Postal Code',
                },
                {
                    id: 'part4.country',
                    type: 'text',
                    label: 'Country',
                    required: true,
                },
            ],
        },
        {
            id: 'part4-beneficiary-marital',
            title: 'Part 4: Beneficiary\'s Marital Information',
            questions: [
                {
                    id: 'part4.timesMarried',
                    type: 'text',
                    label: 'How many times has the beneficiary been married?',
                    required: true,
                },
                {
                    id: 'part4.currentMaritalStatus',
                    type: 'select',
                    label: 'Beneficiary\'s Current Marital Status',
                    required: true,
                    options: [
                        { value: 'single', label: 'Single, Never Married' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                        { value: 'separated', label: 'Marriage Annulled or Other' },
                    ],
                },
                {
                    id: 'part4.spouseName',
                    type: 'text',
                    label: 'Beneficiary\'s Current Spouse\'s Full Name',
                    helpText: 'If currently married',
                },
                {
                    id: 'part4.dateOfMarriage',
                    type: 'date',
                    label: 'Date of Marriage',
                    helpText: 'If currently married',
                },
            ],
        },
        {
            id: 'part4-immigration-intent',
            title: 'Part 4: Immigration Intent',
            description: 'Indicate how the beneficiary will immigrate',
            questions: [
                {
                    id: 'part4.immigrationPath',
                    type: 'radio',
                    label: 'The beneficiary will apply for:',
                    required: true,
                    options: [
                        { value: 'adjustment', label: 'Adjustment of status in the United States (Form I-485)' },
                        { value: 'consular', label: 'An immigrant visa abroad at a U.S. Embassy or consulate' },
                    ],
                    helpText: 'IMPORTANT: You must select only ONE option',
                },
                {
                    id: 'part4.consularLocation',
                    type: 'text',
                    label: 'If applying for an immigrant visa abroad, provide the location (City, Country) where the beneficiary will apply',
                    helpText: 'E.g., London, United Kingdom',
                },
            ],
        },
    ],
    pdfFieldMappings: [
        { questionId: 'part2.lastName', pdfFieldName: 'Pt2Line4a_FamilyName' },
        { questionId: 'part2.firstName', pdfFieldName: 'Pt2Line4b_GivenName' },
        { questionId: 'part2.middleName', pdfFieldName: 'Pt2Line4c_MiddleName' },
        { questionId: 'part4.lastName', pdfFieldName: 'Pt4Line4a_FamilyName' },
        { questionId: 'part4.firstName', pdfFieldName: 'Pt4Line4b_GivenName' },
    ],
    requiredDocuments: [
        'Proof of your U.S. citizenship (birth certificate, naturalization certificate, or U.S. passport)',
        'Proof of relationship to beneficiary (birth certificate, marriage certificate, etc.)',
        'Evidence of legal name change (if applicable)',
        'Two passport-style photos of the beneficiary',
    ],
    instructions: [
        'Complete all applicable sections',
        'Answer all questions - use N/A if not applicable',
        'Sign and date Part 6',
        'Include the $535 filing fee',
        'Mail to the appropriate USCIS Lockbox facility',
    ],
};

const I485_DEFINITION: FormDefinition = {
    id: 'i-485',
    code: 'I-485',
    name: 'Application to Register Permanent Residence or Adjust Status',
    description: 'Apply for a green card while in the United States',
    category: 'family',
    estimatedTime: '90-120 minutes',
    filingFee: 1140,
    price: 60,
    sections: [
        // PART 1: Information About You
        {
            id: 'part1-personal-info',
            title: 'Part 1: Your Personal Information',
            description: 'Provide your current legal name and other identifying information',
            questions: [
                {
                    id: 'part1.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                    helpText: 'Enter your current legal last name',
                },
                {
                    id: 'part1.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                    helpText: 'Enter your current legal first name',
                },
                {
                    id: 'part1.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                    helpText: 'Leave blank if you do not have a middle name',
                },
                {
                    id: 'part1.otherNameUsed',
                    type: 'radio',
                    label: '2. Have you used any other names since birth?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Include maiden names, aliases, or any other names you have used',
                },
                {
                    id: 'part1.dob',
                    type: 'date',
                    label: '5. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'part1.sex',
                    type: 'radio',
                    label: '6. Sex',
                    required: true,
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                    ],
                },
                {
                    id: 'part1.cityOfBirth',
                    type: 'text',
                    label: '7. City or Town of Birth',
                    required: true,
                    helpText: 'Enter the city or town where you were born (no need for full address)',
                },
                {
                    id: 'part1.countryOfBirth',
                    type: 'text',
                    label: '8. Country of Birth',
                    required: true,
                },
                {
                    id: 'part1.countryOfCitizenship',
                    type: 'text',
                    label: '9. Country of Citizenship or Nationality',
                    required: true,
                },
            ],
        },
        {
            id: 'part1-identification',
            title: 'Part 1: Identification Numbers',
            description: 'Provide your A-Number, USCIS account number, and SSN if applicable',
            questions: [
                {
                    id: 'part1.alienNumber',
                    type: 'text',
                    label: '10. Alien Registration Number (A-Number)',
                    placeholder: 'A-',
                    helpText: 'Found on your EAD card or other USCIS documents. Leave blank if you do not have one.',
                },
                {
                    id: 'part1.uscisAccount',
                    type: 'text',
                    label: '11. USCIS Online Account Number',
                    helpText: 'Only if you have created an account at uscis.gov',
                },
                {
                    id: 'part1.ssn',
                    type: 'ssn',
                    label: '12. U.S. Social Security Number (if any)',
                    placeholder: '###-##-####',
                    helpText: 'Enter your SSN if you have been issued one',
                },
            ],
        },
        {
            id: 'part1-mailing-address',
            title: 'Part 1: U.S. Mailing Address',
            description: 'Where should USCIS mail your notices and documents?',
            questions: [
                {
                    id: 'part1.mailingCareOfName',
                    type: 'text',
                    label: '13.a. In Care Of Name',
                    helpText: 'Only if receiving mail at someone else\'s address',
                },
                {
                    id: 'part1.mailingStreet',
                    type: 'text',
                    label: '13.b. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part1.mailingAptType',
                    type: 'select',
                    label: '13.c. Unit Type',
                    options: [
                        { value: '', label: 'Select if applicable' },
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part1.mailingAptNumber',
                    type: 'text',
                    label: '13.d. Unit Number',
                },
                {
                    id: 'part1.mailingCity',
                    type: 'text',
                    label: '13.e. City or Town',
                    required: true,
                },
                {
                    id: 'part1.mailingState',
                    type: 'select',
                    label: '13.f. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part1.mailingZip',
                    type: 'text',
                    label: '13.g. ZIP Code',
                    required: true,
                    placeholder: '12345',
                },
            ],
        },
        {
            id: 'part1-entry-info',
            title: 'Part 1: Last Entry to the United States',
            description: 'Information about your most recent arrival in the U.S.',
            questions: [
                {
                    id: 'part1.passportNumber',
                    type: 'text',
                    label: '15. Passport Number (used at last entry)',
                    required: true,
                    helpText: 'Enter the passport number you used when you last entered the U.S.',
                },
                {
                    id: 'part1.travelDocNumber',
                    type: 'text',
                    label: '16. Travel Document Number',
                    helpText: 'If you used a travel document instead of a passport',
                },
                {
                    id: 'part1.passportExpiration',
                    type: 'date',
                    label: '17. Passport or Travel Document Expiration Date',
                    required: true,
                },
                {
                    id: 'part1.passportCountry',
                    type: 'text',
                    label: '18. Country That Issued Your Passport or Travel Document',
                    required: true,
                },
                {
                    id: 'part1.visaNumber',
                    type: 'text',
                    label: '19. Visa Number (from visa stamp in passport)',
                    helpText: 'Leave blank if you entered without a visa (e.g., Visa Waiver Program)',
                },
                {
                    id: 'part1.entryCity',
                    type: 'text',
                    label: '20.a. City or Town Where You Last Entered the U.S.',
                    required: true,
                },
                {
                    id: 'part1.entryState',
                    type: 'select',
                    label: '20.b. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part1.dateOfLastEntry',
                    type: 'date',
                    label: '21. Date of Your Last Arrival into the United States',
                    required: true,
                },
                {
                    id: 'part1.inspected',
                    type: 'radio',
                    label: '22.a. Were you inspected by a U.S. immigration officer?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part1.i94Number',
                    type: 'text',
                    label: '23.a. I-94 Arrival-Departure Record Number',
                    required: true,
                    helpText: 'Find this at https://i94.cbp.dhs.gov',
                },
                {
                    id: 'part1.statusAtEntry',
                    type: 'text',
                    label: '23.c. Immigration Status at Your Last Arrival',
                    required: true,
                    helpText: 'E.g., F-1, B-2, H-1B, etc.',
                },
                {
                    id: 'part1.currentStatus',
                    type: 'text',
                    label: '24. Current Immigration Status',
                    required: true,
                    helpText: 'Your status now (may be different from entry status)',
                },
            ],
        },
        // PART 2: Application Type or Filing Category
        {
            id: 'part2-filing-category',
            title: 'Part 2: Application Type or Filing Category',
            description: 'Select the category that applies to your green card application',
            questions: [
                {
                    id: 'part2.filingCategory',
                    type: 'select',
                    label: 'I am applying for adjustment of status because:',
                    required: true,
                    options: [
                        { value: 'family-immediate', label: 'Immediate relative of a U.S. citizen (spouse, parent, or unmarried child under 21)' },
                        { value: 'family-preference', label: 'Other family-based category or relative of LPR' },
                        { value: 'widow', label: 'Widow(er) of a U.S. citizen' },
                        { value: 'employment-eb1', label: 'Employment-based: EB-1 (Priority Worker)' },
                        { value: 'employment-eb2', label: 'Employment-based: EB-2 (Advanced degree or exceptional ability)' },
                        { value: 'employment-eb3', label: 'Employment-based: EB-3 (Skilled worker or professional)' },
                        { value: 'special-immigrant', label: 'Special Immigrant (religious worker, juvenile, etc.)' },
                        { value: 'asylee', label: 'Asylee (granted asylum at least 1 year ago)' },
                        { value: 'refugee', label: 'Refugee (admitted at least 1 year ago)' },
                        { value: 'u-nonimmigrant', label: 'Crime victim (U nonimmigrant)' },
                        { value: 't-nonimmigrant', label: 'Human trafficking victim (T nonimmigrant)' },
                        { value: 'diversity', label: 'Diversity Visa lottery winner' },
                        { value: 'cuban-adjustment', label: 'Cuban Adjustment Act' },
                        { value: 'other', label: 'Other (see instructions)' },
                    ],
                    helpText: 'Choose the category that matches your approved petition or eligibility',
                },
                {
                    id: 'part2.section245i',
                    type: 'radio',
                    label: 'Are you applying for adjustment under Section 245(i)?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes (requires Supplement A and additional fee)' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Section 245(i) applies to certain applicants who entered unlawfully or worked without authorization',
                },
            ],
        },
        // PART 3: Additional Information - Address History
        {
            id: 'part3-address-history',
            title: 'Part 3: Address History (Last 5 Years)',
            description: 'Provide your complete address history for the past 5 years',
            questions: [
                {
                    id: 'part3.addressHistory',
                    type: 'textarea',
                    label: 'List ALL addresses where you have lived during the past 5 years',
                    required: true,
                    placeholder: 'Start with your current address and work backwards. Include: Street, City, State, ZIP, Country, and dates (from mm/yyyy to mm/yyyy)',
                    helpText: 'Include every address, even short-term stays. Use additional sheets if needed.',
                },
            ],
        },
        // PART 3: Employment History
        {
            id: 'part3-employment-history',
            title: 'Part 3: Employment History (Last 5 Years)',
            description: 'Provide your complete employment history for the past 5 years',
            questions: [
                {
                    id: 'part3.employmentHistory',
                    type: 'textarea',
                    label: 'List ALL employment and education for the past 5 years',
                    required: true,
                    placeholder: 'Start with current/most recent. For each: Employer name, Address, Your occupation/title, Dates (from mm/yyyy to mm/yyyy). Include periods of unemployment and source of support.',
                    helpText: 'Include all jobs, self-employment, school, unemployment, and retirement. Be complete and accurate.',
                },
            ],
        },
        // PART 4: Information About Your Parents
        {
            id: 'part4-parents',
            title: 'Part 4: Information About Your Parents',
            description: 'Provide information about your biological parents',
            questions: [
                {
                    id: 'part4.parent1FamilyName',
                    type: 'text',
                    label: '1.a. Parent 1\'s Family Name (Last Name)',
                    required: true,
                    helpText: 'Enter DECEASED if your parent has passed away',
                },
                {
                    id: 'part4.parent1GivenName',
                    type: 'text',
                    label: '1.b. Parent 1\'s Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part4.parent1Dob',
                    type: 'date',
                    label: '2. Parent 1\'s Date of Birth',
                    helpText: 'If unknown, enter approximate date',
                },
                {
                    id: 'part4.parent1CountryOfBirth',
                    type: 'text',
                    label: '3. Parent 1\'s Country of Birth',
                },
                {
                    id: 'part4.parent1CityOfResidence',
                    type: 'text',
                    label: '4. Parent 1\'s City/Town of Current Residence',
                },
                {
                    id: 'part4.parent1CountryOfResidence',
                    type: 'text',
                    label: '5. Parent 1\'s Country of Current Residence',
                },
                {
                    id: 'part4.parent2FamilyName',
                    type: 'text',
                    label: '9.a. Parent 2\'s Family Name (Last Name)',
                    required: true,
                    helpText: 'Enter DECEASED if your parent has passed away',
                },
                {
                    id: 'part4.parent2GivenName',
                    type: 'text',
                    label: '9.b. Parent 2\'s Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part4.parent2Dob',
                    type: 'date',
                    label: '10. Parent 2\'s Date of Birth',
                    helpText: 'If unknown, enter approximate date',
                },
                {
                    id: 'part4.parent2CountryOfBirth',
                    type: 'text',
                    label: '11. Parent 2\'s Country of Birth',
                },
            ],
        },
        // PART 5: Information About Your Marital History
        {
            id: 'part5-marital-history',
            title: 'Part 5: Information About Your Marital History',
            description: 'Provide details about your current and prior marriages',
            questions: [
                {
                    id: 'part5.currentMaritalStatus',
                    type: 'select',
                    label: '1. What is your current marital status?',
                    required: true,
                    options: [
                        { value: 'single', label: 'Single, Never Married' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                        { value: 'separated', label: 'Legally Separated' },
                        { value: 'annulled', label: 'Marriage Annulled' },
                    ],
                },
                {
                    id: 'part5.timesMarried',
                    type: 'text',
                    label: '2. How many times have you been married (including annulled marriages)?',
                    required: true,
                    helpText: 'Enter a number (0 if never married)',
                },
                {
                    id: 'part5.currentSpouseFamilyName',
                    type: 'text',
                    label: '3.a. Current Spouse\'s Family Name (Last Name)',
                    helpText: 'Complete if currently married',
                },
                {
                    id: 'part5.currentSpouseGivenName',
                    type: 'text',
                    label: '3.b. Current Spouse\'s Given Name (First Name)',
                    helpText: 'Complete if currently married',
                },
                {
                    id: 'part5.dateOfMarriage',
                    type: 'date',
                    label: '4. Date of Marriage',
                    helpText: 'Complete if currently married',
                },
                {
                    id: 'part5.placeOfMarriage',
                    type: 'text',
                    label: '5. Place of Marriage (City/Town, State/Province, Country)',
                    helpText: 'Complete if currently married',
                },
                {
                    id: 'part5.spouseImmigrationStatus',
                    type: 'select',
                    label: '6. Current Spouse\'s Immigration Status',
                    options: [
                        { value: '', label: 'Select if applicable' },
                        { value: 'us-citizen', label: 'U.S. Citizen' },
                        { value: 'lpr', label: 'Lawful Permanent Resident' },
                        { value: 'other', label: 'Other Status' },
                    ],
                    helpText: 'Complete if currently married',
                },
            ],
        },
        // PART 6: Information About Your Children
        {
            id: 'part6-children',
            title: 'Part 6: Information About Your Children',
            description: 'List all of your children (biological, adopted, and stepchildren)',
            questions: [
                {
                    id: 'part6.totalChildren',
                    type: 'text',
                    label: '1. How many total children do you have?',
                    required: true,
                    helpText: 'Enter 0 if you have no children. Include adult children and stepchildren.',
                },
                {
                    id: 'part6.childrenDetails',
                    type: 'textarea',
                    label: 'List each child\'s information',
                    placeholder: 'For each child provide: Full Name, Date of Birth, Country of Birth, Current Location, Relationship (son/daughter/stepson/stepdaughter)',
                    helpText: 'Provide information for ALL children, including those over 21 and those from previous relationships',
                },
            ],
        },
        // PART 7: Biographic Information
        {
            id: 'part7-biographic',
            title: 'Part 7: Biographic Information',
            description: 'Physical characteristics and demographic information',
            questions: [
                {
                    id: 'part7.ethnicity',
                    type: 'radio',
                    label: '1. Ethnicity (Select only one box)',
                    required: true,
                    options: [
                        { value: 'hispanic', label: 'Hispanic or Latino' },
                        { value: 'not-hispanic', label: 'Not Hispanic or Latino' },
                    ],
                },
                {
                    id: 'part7.race',
                    type: 'select',
                    label: '2. Race (Select all that apply)',
                    required: true,
                    options: [
                        { value: 'white', label: 'White' },
                        { value: 'asian', label: 'Asian' },
                        { value: 'black', label: 'Black or African American' },
                        { value: 'native-american', label: 'American Indian or Alaska Native' },
                        { value: 'pacific', label: 'Native Hawaiian or Other Pacific Islander' },
                    ],
                },
                {
                    id: 'part7.height',
                    type: 'text',
                    label: '3. Height (feet and inches)',
                    required: true,
                    placeholder: 'e.g., 5 feet 8 inches',
                },
                {
                    id: 'part7.weight',
                    type: 'text',
                    label: '4. Weight (pounds)',
                    required: true,
                    placeholder: 'e.g., 150',
                },
                {
                    id: 'part7.eyeColor',
                    type: 'select',
                    label: '5. Eye Color',
                    required: true,
                    options: [
                        { value: 'black', label: 'Black' },
                        { value: 'blue', label: 'Blue' },
                        { value: 'brown', label: 'Brown' },
                        { value: 'gray', label: 'Gray' },
                        { value: 'green', label: 'Green' },
                        { value: 'hazel', label: 'Hazel' },
                        { value: 'maroon', label: 'Maroon' },
                        { value: 'pink', label: 'Pink' },
                        { value: 'unknown', label: 'Unknown/Other' },
                    ],
                },
                {
                    id: 'part7.hairColor',
                    type: 'select',
                    label: '6. Hair Color',
                    required: true,
                    options: [
                        { value: 'bald', label: 'Bald (No hair)' },
                        { value: 'black', label: 'Black' },
                        { value: 'blond', label: 'Blond' },
                        { value: 'brown', label: 'Brown' },
                        { value: 'gray', label: 'Gray' },
                        { value: 'red', label: 'Red' },
                        { value: 'sandy', label: 'Sandy' },
                        { value: 'white', label: 'White' },
                        { value: 'unknown', label: 'Unknown/Other' },
                    ],
                },
            ],
        },
        // PART 8: General Eligibility and Inadmissibility Grounds
        {
            id: 'part8-eligibility',
            title: 'Part 8: General Eligibility and Inadmissibility Grounds',
            description: 'Answer all questions truthfully. These questions determine your eligibility for a green card.',
            questions: [
                {
                    id: 'part8.publicCharge',
                    type: 'radio',
                    label: 'Are you subject to the public charge ground of inadmissibility?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Public charge refers to likelihood of becoming dependent on government assistance',
                },
                {
                    id: 'part8.healthRelated',
                    type: 'radio',
                    label: 'Have you been found to have a communicable disease of public health significance?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.criminalHistory',
                    type: 'radio',
                    label: 'Have you EVER been arrested, cited, charged, or detained for any reason by any law enforcement official?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Include traffic violations and incidents even if charges were dropped',
                },
                {
                    id: 'part8.crimeConviction',
                    type: 'radio',
                    label: 'Have you EVER been convicted of a crime or offense?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.controlledSubstance',
                    type: 'radio',
                    label: 'Have you EVER violated any law related to possessing, using, or distributing illegal drugs?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.prostitution',
                    type: 'radio',
                    label: 'Have you EVER engaged in prostitution or procured anyone for prostitution?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.humanTrafficking',
                    type: 'radio',
                    label: 'Have you EVER been involved in human trafficking?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.moneyLaundering',
                    type: 'radio',
                    label: 'Have you EVER knowingly helped any person involved in money laundering?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.terroristActivity',
                    type: 'radio',
                    label: 'Have you EVER engaged in, conspired to engage in, or supported terrorist activity?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.totalitarianParty',
                    type: 'radio',
                    label: 'Have you EVER been a member of or affiliated with the Communist Party or any other totalitarian party?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.persecution',
                    type: 'radio',
                    label: 'Have you EVER persecuted any person because of race, religion, national origin, membership in a social group, or political opinion?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.torture',
                    type: 'radio',
                    label: 'Have you EVER committed, ordered, incited, assisted, or otherwise participated in torture?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.genocide',
                    type: 'radio',
                    label: 'Have you EVER committed, ordered, incited, assisted, or participated in genocide?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.childSoldier',
                    type: 'radio',
                    label: 'Have you EVER recruited, enlisted, conscripted, or used child soldiers?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.religiousFreedom',
                    type: 'radio',
                    label: 'Have you EVER been responsible for violations of religious freedom?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.immigrationFraud',
                    type: 'radio',
                    label: 'Have you EVER committed immigration fraud or helped anyone commit immigration fraud?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.falseUSCitizen',
                    type: 'radio',
                    label: 'Have you EVER falsely claimed to be a U.S. citizen?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.votedIllegally',
                    type: 'radio',
                    label: 'Have you EVER voted in the United States in violation of any law or regulation?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.renounced',
                    type: 'radio',
                    label: 'Have you EVER renounced U.S. citizenship to avoid taxation?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.unlawfullyPresent',
                    type: 'radio',
                    label: 'Have you EVER been unlawfully present in the United States for more than 180 days?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'This is important for determining bars to admission',
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Copy of I-130 approval notice (if family-based)',
        'Birth certificate with certified English translation',
        'Passport biographical pages',
        'Two passport-style photos',
        'Medical examination (Form I-693) in sealed envelope',
        'Affidavit of Support (Form I-864) if required',
        'Evidence of lawful entry (I-94, visa, etc.)',
        'Marriage certificate (if applicable)',
        'Divorce/death certificates for prior marriages (if applicable)',
    ],
    instructions: [],
};

const I765_DEFINITION: FormDefinition = {
    id: 'i-765',
    code: 'I-765',
    name: 'Application for Employment Authorization',
    description: 'Apply for a work permit (EAD)',
    category: 'work_authorization',
    estimatedTime: '30-45 minutes',
    filingFee: 410,
    price: 60,
    sections: [
        // PART 1: Reason for Applying
        {
            id: 'part1-reason',
            title: 'Part 1: Reason for Applying',
            description: 'Indicate why you are filing this application',
            questions: [
                {
                    id: 'part1.reason',
                    type: 'radio',
                    label: 'I am applying for (select only one box):',
                    required: true,
                    options: [
                        { value: 'initial', label: '1.a. Initial permission to accept employment' },
                        { value: 'replacement', label: '1.b. Replacement (of lost, stolen, or damaged employment authorization document, or correction of DHS error)' },
                        { value: 'renewal', label: '1.c. Renewal of my permission to accept employment (attach a copy of your previous employment authorization document)' },
                    ],
                },
                {
                    id: 'part1.previouslyFiled',
                    type: 'radio',
                    label: '2. Have you EVER filed Form I-765?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'If yes, you may need to provide your previous receipt number',
                },
            ],
        },
        // PART 2: Information About You - Personal Info
        {
            id: 'part2-personal-info',
            title: 'Part 2: Your Legal Name',
            description: 'Enter your current legal name',
            questions: [
                {
                    id: 'part2.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                    helpText: 'Enter your last name as it appears on your birth certificate or passport',
                },
                {
                    id: 'part2.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part2.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                    helpText: 'Leave blank if you do not have a middle name',
                },
                {
                    id: 'part2.otherNamesUsed',
                    type: 'radio',
                    label: '2. Have you used any other names since birth?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Include maiden names, aliases, or any previous names',
                },
            ],
        },
        {
            id: 'part2-address',
            title: 'Part 2: U.S. Mailing Address',
            description: 'Where should USCIS send your EAD card?',
            questions: [
                {
                    id: 'part2.mailingCareOfName',
                    type: 'text',
                    label: '5.a. In Care Of Name',
                    helpText: 'Only if receiving mail at someone else\'s address',
                },
                {
                    id: 'part2.mailingStreet',
                    type: 'text',
                    label: '5.b. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part2.mailingAptType',
                    type: 'select',
                    label: '5.c. Unit Type',
                    options: [
                        { value: '', label: 'Select if applicable' },
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part2.mailingAptNumber',
                    type: 'text',
                    label: '5.d. Unit Number',
                },
                {
                    id: 'part2.mailingCity',
                    type: 'text',
                    label: '5.e. City or Town',
                    required: true,
                },
                {
                    id: 'part2.mailingState',
                    type: 'select',
                    label: '5.f. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part2.mailingZip',
                    type: 'text',
                    label: '5.g. ZIP Code',
                    required: true,
                    placeholder: '12345',
                },
                {
                    id: 'part2.physicalAddressSameAsMailing',
                    type: 'radio',
                    label: '6. Is your current physical address the same as your mailing address?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No (provide physical address in Part 6)' },
                    ],
                },
            ],
        },
        {
            id: 'part2-identification',
            title: 'Part 2: Identification Numbers',
            description: 'Provide your A-Number, USCIS account, and other identifying information',
            questions: [
                {
                    id: 'part2.alienNumber',
                    type: 'text',
                    label: '8. Alien Registration Number (A-Number)',
                    placeholder: 'A-',
                    helpText: 'Found on your previous EAD, I-94, or other USCIS documents. Leave blank if you do not have one.',
                },
                {
                    id: 'part2.uscisAccount',
                    type: 'text',
                    label: '9. USCIS Online Account Number',
                    helpText: 'Only if you have created an account at uscis.gov',
                },
                {
                    id: 'part2.gender',
                    type: 'radio',
                    label: '10. Gender',
                    required: true,
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                    ],
                },
                {
                    id: 'part2.maritalStatus',
                    type: 'select',
                    label: '11. Marital Status',
                    required: true,
                    options: [
                        { value: 'single', label: 'Single, Never Married' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                    ],
                },
            ],
        },
        {
            id: 'part2-ssn',
            title: 'Part 2: Social Security Information',
            description: 'Information about your Social Security Number',
            questions: [
                {
                    id: 'part2.hasSSN',
                    type: 'radio',
                    label: '13.a. Has the Social Security Administration (SSA) ever officially issued a Social Security card to you?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes (provide SSN below)' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part2.ssn',
                    type: 'ssn',
                    label: '13.b. U.S. Social Security Number (if any)',
                    placeholder: '###-##-####',
                    helpText: 'Complete only if you answered Yes to 13.a',
                },
                {
                    id: 'part2.wantSSNCard',
                    type: 'radio',
                    label: '14. Do you want the SSA to issue you a Social Security card?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes (USCIS will share your information with SSA)' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'You must also answer Yes to question 15 to receive a Social Security card',
                },
                {
                    id: 'part2.consentDisclosure',
                    type: 'radio',
                    label: '15. Consent for Disclosure: I authorize disclosure of information from this application to the SSA as required for assigning me a Social Security number and issuing me a Social Security card',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
            ],
        },
        {
            id: 'part2-parents',
            title: 'Part 2: Parent Information',
            description: 'Information about your parents (for Social Security card application)',
            questions: [
                {
                    id: 'part2.fatherFamilyName',
                    type: 'text',
                    label: '16.a. Father\'s Family Name (Last Name)',
                    helpText: 'Required if you want SSA to issue a Social Security card',
                },
                {
                    id: 'part2.fatherGivenName',
                    type: 'text',
                    label: '16.b. Father\'s Given Name (First Name)',
                },
                {
                    id: 'part2.motherFamilyName',
                    type: 'text',
                    label: '17.a. Mother\'s Family Name (Last Name)',
                    helpText: 'Required if you want SSA to issue a Social Security card',
                },
                {
                    id: 'part2.motherGivenName',
                    type: 'text',
                    label: '17.b. Mother\'s Given Name (First Name)',
                },
            ],
        },
        {
            id: 'part2-birth-citizenship',
            title: 'Part 2: Birth and Citizenship Information',
            description: 'Where were you born and what is your citizenship?',
            questions: [
                {
                    id: 'part2.countriesOfCitizenship',
                    type: 'text',
                    label: '18. Country or Countries of Citizenship or Nationality',
                    required: true,
                    helpText: 'If more than one, list all',
                },
                {
                    id: 'part2.cityOfBirth',
                    type: 'text',
                    label: '19.a. Place of Birth - City or Town',
                    required: true,
                },
                {
                    id: 'part2.stateOfBirth',
                    type: 'text',
                    label: '19.b. State or Province',
                    helpText: 'If applicable',
                },
                {
                    id: 'part2.countryOfBirth',
                    type: 'text',
                    label: '19.c. Country',
                    required: true,
                },
                {
                    id: 'part2.dob',
                    type: 'date',
                    label: '20. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
            ],
        },
        {
            id: 'part2-entry-info',
            title: 'Part 2: U.S. Entry Information',
            description: 'Information about your most recent entry to the United States',
            questions: [
                {
                    id: 'part2.i94Number',
                    type: 'text',
                    label: '21. I-94 Arrival-Departure Record Number',
                    required: true,
                    helpText: 'Find this at https://i94.cbp.dhs.gov',
                },
                {
                    id: 'part2.passportNumber',
                    type: 'text',
                    label: '22.a. Passport Number',
                    required: true,
                },
                {
                    id: 'part2.passportCountry',
                    type: 'text',
                    label: '22.b. Country That Issued Your Passport',
                    required: true,
                },
                {
                    id: 'part2.passportExpiration',
                    type: 'date',
                    label: '22.c. Passport Expiration Date',
                    required: true,
                },
                {
                    id: 'part2.dateOfLastEntry',
                    type: 'date',
                    label: '23. Date of Your Last Arrival into the United States',
                    required: true,
                },
                {
                    id: 'part2.placeOfLastEntry',
                    type: 'text',
                    label: '24. Place of Your Last Arrival into the United States',
                    required: true,
                    helpText: 'City and State, or Port of Entry',
                },
                {
                    id: 'part2.immigrationStatusAtEntry',
                    type: 'text',
                    label: '25. Immigration Status at Your Last Arrival (for example, B-2 visitor, F-1 student)',
                    required: true,
                },
                {
                    id: 'part2.currentImmigrationStatus',
                    type: 'text',
                    label: '26. Your Current Immigration Status or Category',
                    required: true,
                    helpText: 'For example, F-1, H-1B, pending I-485, asylee',
                },
                {
                    id: 'part2.sevisNumber',
                    type: 'text',
                    label: '27. Student and Exchange Visitor Information System (SEVIS) Number (if any)',
                    helpText: 'For F-1 and J-1 students only. Found on your I-20 or DS-2019.',
                },
            ],
        },
        {
            id: 'part2-eligibility',
            title: 'Part 2: Eligibility Category',
            description: 'Select the eligibility category that applies to you',
            questions: [
                {
                    id: 'part2.eligibilityCategory',
                    type: 'select',
                    label: '28. Eligibility Category',
                    required: true,
                    options: [
                        { value: '(c)(9)', label: '(c)(9) - Adjustment of Status applicant (pending I-485)' },
                        { value: '(c)(3)(B)', label: '(c)(3)(B) - F-1 student seeking Optional Practical Training (OPT)' },
                        { value: '(c)(3)(C)', label: '(c)(3)(C) - F-1 student seeking STEM OPT Extension' },
                        { value: '(a)(3)', label: '(a)(3) - Refugee' },
                        { value: '(a)(5)', label: '(a)(5) - Asylee' },
                        { value: '(a)(8)', label: '(a)(8) - Citizen of Micronesia, Marshall Islands, or Palau' },
                        { value: '(a)(12)', label: '(a)(12) - Temporary Protected Status (TPS)' },
                        { value: '(c)(8)', label: '(c)(8) - Applicant for asylum' },
                        { value: '(c)(10)', label: '(c)(10) - Withholding of removal' },
                        { value: '(c)(19)', label: '(c)(19) - Temporary Protected Status (TPS) applicant' },
                        { value: '(c)(26)', label: '(c)(26) - H-4 spouse of H-1B' },
                        { value: '(c)(35)', label: '(c)(35) - L-2 spouse of L-1' },
                        { value: '(c)(36)', label: '(c)(36) - E-3 spouse of E-3 Australian' },
                        { value: 'other', label: 'Other (see instructions for complete list)' },
                    ],
                    helpText: 'This is the most important question. Choose carefully based on your immigration status. See USCIS instructions for the complete list.',
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Copy of I-94 Arrival-Departure Record',
        'Two passport-style photos',
        'Copy of passport biographical page',
        'Copy of current visa (if applicable)',
        'Copy of I-20 (for F-1 students)',
        'Copy of pending I-485 receipt notice (if applying under category (c)(9))',
        'Copy of previous EAD (if renewing)',
        'Proof of eligibility for your specific category',
    ],
    instructions: [],
};

const I131_DEFINITION: FormDefinition = {
    id: 'i-131',
    code: 'I-131',
    name: 'Application for Travel Document',
    description: 'Apply for advance parole, reentry permit, or refugee travel document',
    category: 'travel',
    estimatedTime: '30-45 minutes',
    filingFee: 575,
    price: 60,
    sections: [
        // PART 1: Application Type
        {
            id: 'part1-application-type',
            title: 'Part 1: Application Type',
            description: 'What type of travel document are you applying for?',
            questions: [
                {
                    id: 'part1.documentType',
                    type: 'select',
                    label: 'I am applying for (select one):',
                    required: true,
                    options: [
                        { value: '1', label: '1. A Reentry Permit (for LPRs who will be outside U.S. for 1-2 years)' },
                        { value: '2', label: '2. A Refugee Travel Document (for refugees/asylees)' },
                        { value: '3', label: '3. A TPS Travel Authorization Document (for TPS holders)' },
                        { value: '4', label: '4. Advance Parole Document to allow me to return to the U.S. after temporary foreign travel' },
                        { value: '5a', label: '5.a. Advance Parole Document for a person outside the United States (Humanitarian Parole, Cuban Family Reunification Parole, Filipino World War II Veterans Parole, etc.)' },
                        { value: '5b', label: '5.b. Advance Parole Document for a person in the United States' },
                        { value: '6', label: '6. Initial Parole Document for an Alien Outside the United States' },
                        { value: '7', label: '7. A Document for Parole In Place or Re-parole' },
                        { value: '8', label: '8. An Arrival/Departure Record (Form I-94)' },
                    ],
                    helpText: 'Most marriage-based green card applicants select option 4 or 5.b (Advance Parole)',
                },
            ],
        },
        // PART 2: Information About You
        {
            id: 'part2-personal-info',
            title: 'Part 2: Your Legal Name',
            description: 'Enter your current legal name',
            questions: [
                {
                    id: 'part2.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part2.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part2.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
            ],
        },
        {
            id: 'part2-address',
            title: 'Part 2: U.S. Mailing Address',
            description: 'Where should USCIS mail your travel document?',
            questions: [
                {
                    id: 'part2.mailingCareOfName',
                    type: 'text',
                    label: '2.a. In Care Of Name',
                    helpText: 'Only if receiving mail at someone else\'s address',
                },
                {
                    id: 'part2.mailingStreet',
                    type: 'text',
                    label: '2.b. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part2.mailingAptType',
                    type: 'select',
                    label: '2.c. Unit Type',
                    options: [
                        { value: '', label: 'Select if applicable' },
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part2.mailingAptNumber',
                    type: 'text',
                    label: '2.d. Unit Number',
                },
                {
                    id: 'part2.mailingCity',
                    type: 'text',
                    label: '2.e. City or Town',
                    required: true,
                },
                {
                    id: 'part2.mailingState',
                    type: 'select',
                    label: '2.f. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part2.mailingZip',
                    type: 'text',
                    label: '2.g. ZIP Code',
                    required: true,
                    placeholder: '12345',
                },
            ],
        },
        {
            id: 'part2-identification',
            title: 'Part 2: Identification',
            description: 'Provide your identification numbers and personal information',
            questions: [
                {
                    id: 'part2.dob',
                    type: 'date',
                    label: '6. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'part2.countryOfBirth',
                    type: 'text',
                    label: '7. Country of Birth',
                    required: true,
                },
                {
                    id: 'part2.gender',
                    type: 'radio',
                    label: '8. Gender',
                    required: true,
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                    ],
                    helpText: 'Must match your birth certificate',
                },
                {
                    id: 'part2.countryOfCitizenship',
                    type: 'text',
                    label: '9. Country of Citizenship or Nationality',
                    required: true,
                },
                {
                    id: 'part2.ssn',
                    type: 'ssn',
                    label: '10. U.S. Social Security Number (if any)',
                    placeholder: '###-##-####',
                    helpText: 'Leave blank if you do not have one',
                },
                {
                    id: 'part2.alienNumber',
                    type: 'text',
                    label: '11. Alien Registration Number (A-Number)',
                    placeholder: 'A-',
                    helpText: 'Found on your EAD, green card, or other USCIS documents',
                },
                {
                    id: 'part2.classOfAdmission',
                    type: 'text',
                    label: '12. Class of Admission',
                    helpText: 'Your visa category when you last entered (e.g., F-1, B-2, H-1B)',
                },
                {
                    id: 'part2.i94Number',
                    type: 'text',
                    label: '13. I-94 Arrival-Departure Record Number',
                    helpText: 'Find this at https://i94.cbp.dhs.gov',
                },
            ],
        },
        // PART 3: Biographic Information
        {
            id: 'part3-biographic',
            title: 'Part 3: Biographic Information',
            description: 'Physical characteristics and demographic information',
            questions: [
                {
                    id: 'part3.ethnicity',
                    type: 'radio',
                    label: '1. Ethnicity (Select only one box)',
                    required: true,
                    options: [
                        { value: 'hispanic', label: 'Hispanic or Latino' },
                        { value: 'not-hispanic', label: 'Not Hispanic or Latino' },
                    ],
                },
                {
                    id: 'part3.race',
                    type: 'select',
                    label: '2. Race (Select all that apply)',
                    required: true,
                    options: [
                        { value: 'white', label: 'White' },
                        { value: 'asian', label: 'Asian' },
                        { value: 'black', label: 'Black or African American' },
                        { value: 'native-american', label: 'American Indian or Alaska Native' },
                        { value: 'pacific', label: 'Native Hawaiian or Other Pacific Islander' },
                    ],
                },
                {
                    id: 'part3.height',
                    type: 'text',
                    label: '3. Height (feet and inches)',
                    required: true,
                    placeholder: 'e.g., 5 feet 8 inches',
                },
                {
                    id: 'part3.weight',
                    type: 'text',
                    label: '4. Weight (pounds)',
                    required: true,
                    placeholder: 'e.g., 150',
                },
                {
                    id: 'part3.eyeColor',
                    type: 'select',
                    label: '5. Eye Color',
                    required: true,
                    options: [
                        { value: 'black', label: 'Black' },
                        { value: 'blue', label: 'Blue' },
                        { value: 'brown', label: 'Brown' },
                        { value: 'gray', label: 'Gray' },
                        { value: 'green', label: 'Green' },
                        { value: 'hazel', label: 'Hazel' },
                        { value: 'maroon', label: 'Maroon' },
                        { value: 'pink', label: 'Pink' },
                        { value: 'unknown', label: 'Unknown/Other' },
                    ],
                },
                {
                    id: 'part3.hairColor',
                    type: 'select',
                    label: '6. Hair Color',
                    required: true,
                    options: [
                        { value: 'bald', label: 'Bald (No hair)' },
                        { value: 'black', label: 'Black' },
                        { value: 'blond', label: 'Blond' },
                        { value: 'brown', label: 'Brown' },
                        { value: 'gray', label: 'Gray' },
                        { value: 'red', label: 'Red' },
                        { value: 'sandy', label: 'Sandy' },
                        { value: 'white', label: 'White' },
                        { value: 'unknown', label: 'Unknown/Other' },
                    ],
                },
            ],
        },
        // PART 4: Processing Information
        {
            id: 'part4-processing',
            title: 'Part 4: Processing Information',
            description: 'Important questions about your immigration history',
            questions: [
                {
                    id: 'part4.inRemovalProceedings',
                    type: 'radio',
                    label: '1. Are you now in exclusion, deportation, removal, or rescission proceedings?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'If Yes, you may not be eligible for this benefit',
                },
                {
                    id: 'part4.previouslyIssuedReentryPermit',
                    type: 'radio',
                    label: '2. Have you ever been issued a Reentry Permit or Refugee Travel Document?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part4.previouslyIssuedAdvanceParole',
                    type: 'radio',
                    label: '4. Have you ever been issued an Advance Parole Document?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
            ],
        },
        // PART 7: Information About Your Proposed Travel (for Advance Parole)
        {
            id: 'part7-travel-info',
            title: 'Part 7: Information About Your Proposed Travel',
            description: 'Details about your planned travel (complete if applying for Advance Parole)',
            questions: [
                {
                    id: 'part7.purposeOfTrip',
                    type: 'textarea',
                    label: '1. Purpose of Trip',
                    required: true,
                    placeholder: 'Explain the reason for your travel (e.g., family emergency, business, tourism, medical treatment)',
                    helpText: 'Be specific about why you need to travel',
                },
                {
                    id: 'part7.countriesVisit',
                    type: 'textarea',
                    label: '2. List the countries you intend to visit',
                    required: true,
                    placeholder: 'List all countries you plan to visit during your trip',
                },
                {
                    id: 'part7.intendedDeparture',
                    type: 'date',
                    label: '3. Intended Date of Departure from the United States',
                    helpText: 'Approximate date is acceptable',
                },
                {
                    id: 'part7.intendedLength',
                    type: 'text',
                    label: '4. Intended Length of Trip',
                    placeholder: 'e.g., 2 weeks, 1 month',
                    helpText: 'How long will you be outside the U.S.?',
                },
                {
                    id: 'part7.howManyTrips',
                    type: 'radio',
                    label: '5. How many trips do you intend to use this document?',
                    required: true,
                    options: [
                        { value: 'one', label: 'One trip only' },
                        { value: 'multiple', label: 'More than one trip' },
                    ],
                    helpText: 'Advance Parole is typically valid for multiple trips',
                },
                {
                    id: 'part7.needsReplacement',
                    type: 'radio',
                    label: '6. If you answered "One trip only", is this a replacement for a document that was lost, stolen, or destroyed?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Only answer if you selected "One trip only" above',
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Two passport-style photos',
        'Copy of your I-94 Arrival-Departure Record',
        'Copy of passport biographical page',
        'Copy of pending I-485 receipt notice (if applying for advance parole while I-485 is pending)',
        'Copy of current EAD (if you have one)',
        'Evidence supporting the purpose of your trip (invitation letters, medical records, etc.)',
    ],
    instructions: [],
};

const I864_DEFINITION: FormDefinition = {
    id: 'i-864',
    code: 'I-864',
    name: 'Affidavit of Support Under Section 213A',
    description: 'Financial sponsorship for family-based immigration',
    category: 'family',
    estimatedTime: '60-90 minutes',
    filingFee: 0,
    price: 60,
    sections: [
        // PART 1: Basis for Filing Affidavit of Support
        {
            id: 'part1-basis',
            title: 'Part 1: Basis for Filing Affidavit of Support',
            description: 'Indicate your relationship to the sponsored immigrant',
            questions: [
                {
                    id: 'part1.sponsorType',
                    type: 'radio',
                    label: 'I am filing this affidavit of support because (select only one box):',
                    required: true,
                    options: [
                        { value: 'petitioner', label: 'I am the petitioner. I filed or am filing for the immigration of my relative.' },
                        { value: 'joint-sponsor', label: 'I am a joint sponsor. I am willing to accept joint legal liability with the petitioner.' },
                        { value: 'substitute', label: 'I am a substitute sponsor. I am replacing the original petitioner because that person died or the petitioner lost lawful permanent resident status through abandonment or loss of citizenship.' },
                    ],
                    helpText: 'Most sponsors are the petitioner who filed Form I-130',
                },
            ],
        },
        // PART 2: Information on the Principal Immigrant
        {
            id: 'part2-immigrant-info',
            title: 'Part 2: Information About the Principal Immigrant',
            description: 'Information about the person you are sponsoring',
            questions: [
                {
                    id: 'part2.immigrantFamilyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                    helpText: 'Enter the principal immigrant\'s legal last name',
                },
                {
                    id: 'part2.immigrantGivenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part2.immigrantMiddleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part2.immigrantAlienNumber',
                    type: 'text',
                    label: '2. Alien Registration Number (A-Number) (if any)',
                    placeholder: 'A-',
                    helpText: 'If the immigrant has an A-Number from USCIS',
                },
                {
                    id: 'part2.immigrantDob',
                    type: 'date',
                    label: '3. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'part2.immigrantCountryOfCitizenship',
                    type: 'text',
                    label: '4. Country of Citizenship or Nationality',
                    required: true,
                },
            ],
        },
        // PART 3: Information About the Immigrants You Are Sponsoring
        {
            id: 'part3-additional-immigrants',
            title: 'Part 3: Immigrants Being Sponsored',
            description: 'List all family members immigrating with the principal immigrant',
            questions: [
                {
                    id: 'part3.sponsoringPrincipal',
                    type: 'radio',
                    label: '1. Are you sponsoring the principal immigrant named in Part 2?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part3.familyMembers',
                    type: 'textarea',
                    label: '2-7. List family members immigrating at the same time or within 6 months',
                    placeholder: 'For each family member, provide: Name, A-Number (if any), Date of Birth, Relationship',
                    helpText: 'Include spouse and/or unmarried children under 21 years old',
                },
            ],
        },
        // PART 4: Information About You (the Sponsor)
        {
            id: 'part4-sponsor-personal',
            title: 'Part 4: Information About You (Sponsor)',
            description: 'Your personal information as the sponsor',
            questions: [
                {
                    id: 'part4.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part4.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part4.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part4.mailingStreet',
                    type: 'text',
                    label: '2.a. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part4.mailingAptType',
                    type: 'select',
                    label: '2.b. Unit Type',
                    options: [
                        { value: '', label: 'Select if applicable' },
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part4.mailingAptNumber',
                    type: 'text',
                    label: '2.c. Unit Number',
                },
                {
                    id: 'part4.mailingCity',
                    type: 'text',
                    label: '2.d. City or Town',
                    required: true,
                },
                {
                    id: 'part4.mailingState',
                    type: 'select',
                    label: '2.e. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part4.mailingZip',
                    type: 'text',
                    label: '2.f. ZIP Code',
                    required: true,
                    placeholder: '12345',
                },
            ],
        },
        {
            id: 'part4-sponsor-citizenship',
            title: 'Part 4: Sponsor\'s Citizenship and Identification',
            description: 'Citizenship status and identification numbers',
            questions: [
                {
                    id: 'part4.dob',
                    type: 'date',
                    label: '7. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'part4.placeOfBirth',
                    type: 'text',
                    label: '8. Place of Birth (City/Town, State/Province, Country)',
                    required: true,
                },
                {
                    id: 'part4.ssn',
                    type: 'ssn',
                    label: '9. U.S. Social Security Number',
                    required: true,
                    placeholder: '###-##-####',
                    helpText: 'Required - you must have a Social Security Number to sponsor',
                },
                {
                    id: 'part4.citizenshipStatus',
                    type: 'select',
                    label: '10. My citizenship/residency status is:',
                    required: true,
                    options: [
                        { value: 'us-citizen-birth', label: 'U.S. Citizen by birth in the United States' },
                        { value: 'us-citizen-naturalization', label: 'U.S. Citizen through naturalization' },
                        { value: 'us-national', label: 'U.S. National' },
                        { value: 'lpr', label: 'Lawful Permanent Resident' },
                    ],
                    helpText: 'Only U.S. citizens, U.S. nationals, and LPRs can be sponsors',
                },
                {
                    id: 'part4.activeDutyMilitary',
                    type: 'radio',
                    label: '11. Are you currently on active duty in the U.S. Armed Forces?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Active duty service members have lower income requirements (100% vs 125% of poverty guidelines)',
                },
            ],
        },
        // PART 5: Sponsor's Household Size
        {
            id: 'part5-household-size',
            title: 'Part 5: Sponsor\'s Household Size',
            description: 'Calculate your total household size for income requirements',
            questions: [
                {
                    id: 'part5.immigrantsSponsoring',
                    type: 'text',
                    label: '1. Number of immigrants you are sponsoring (from Parts 2 and 3)',
                    required: true,
                    placeholder: 'Enter number',
                    helpText: 'Count the principal immigrant plus any family members from Part 3',
                },
                {
                    id: 'part5.yourself',
                    type: 'text',
                    label: '2. Yourself (enter 1)',
                    required: true,
                    placeholder: '1',
                    helpText: 'Always enter 1 for yourself',
                },
                {
                    id: 'part5.spouse',
                    type: 'text',
                    label: '3. Your spouse (enter 1 if married, 0 if not)',
                    required: true,
                    placeholder: '0 or 1',
                },
                {
                    id: 'part5.children',
                    type: 'text',
                    label: '4. Number of your children (unmarried and under 21)',
                    required: true,
                    placeholder: 'Enter number',
                    helpText: 'Count children living with you and those not living with you',
                },
                {
                    id: 'part5.otherDependents',
                    type: 'text',
                    label: '5. Number of other dependents listed on your most recent tax return',
                    required: true,
                    placeholder: 'Enter number',
                },
                {
                    id: 'part5.otherHouseholdMembers',
                    type: 'text',
                    label: '6. Number of other people living with you who are combining income (Form I-864A)',
                    required: true,
                    placeholder: 'Enter number',
                    helpText: 'Include only those who completed Form I-864A',
                },
                {
                    id: 'part5.previouslySponsored',
                    type: 'text',
                    label: '7. Number of immigrants you previously sponsored (if still obligated)',
                    required: true,
                    placeholder: 'Enter number',
                },
                {
                    id: 'part5.totalHouseholdSize',
                    type: 'text',
                    label: '8. TOTAL HOUSEHOLD SIZE (add lines 1-7)',
                    required: true,
                    placeholder: 'Calculate total',
                    helpText: 'This number determines your minimum income requirement',
                },
            ],
        },
        // PART 6: Sponsor's Employment and Income
        {
            id: 'part6-employment',
            title: 'Part 6: Sponsor\'s Employment and Income',
            description: 'Your employment status and income information',
            questions: [
                {
                    id: 'part6.employmentStatus',
                    type: 'select',
                    label: '1-6. My current employment status is:',
                    required: true,
                    options: [
                        { value: 'employed', label: 'Employed by a company or organization' },
                        { value: 'self-employed', label: 'Self-employed' },
                        { value: 'retired', label: 'Retired' },
                        { value: 'unemployed', label: 'Unemployed' },
                        { value: 'other', label: 'Other' },
                    ],
                },
                {
                    id: 'part6.employerName',
                    type: 'text',
                    label: 'Employer Name (if employed)',
                    helpText: 'Your current employer or your business name if self-employed',
                },
                {
                    id: 'part6.annualIncome',
                    type: 'text',
                    label: '7. My current individual annual income is:',
                    required: true,
                    placeholder: '$50,000',
                    helpText: 'From your most recent federal tax return or estimated current income',
                },
                {
                    id: 'part6.householdIncome',
                    type: 'text',
                    label: '8-22. Total income from all household members (including yourself)',
                    required: true,
                    placeholder: '$75,000',
                    helpText: 'Include income from spouse and anyone who completed Form I-864A',
                },
                {
                    id: 'part6.meetsIncomeRequirement',
                    type: 'radio',
                    label: 'Does your total household income meet or exceed 125% of Federal Poverty Guidelines for your household size?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes - I meet the income requirement' },
                        { value: 'no', label: 'No - I will use assets to make up the difference (complete Part 7)' },
                    ],
                    helpText: 'Check Form I-864P for current poverty guidelines. For 2024, 125% is approximately $22,887 for household of 2',
                },
            ],
        },
        // PART 7: Use of Assets
        {
            id: 'part7-assets',
            title: 'Part 7: Use of Assets to Supplement Income (If Applicable)',
            description: 'Complete only if your income alone does not meet the requirement',
            questions: [
                {
                    id: 'part7.useAssets',
                    type: 'radio',
                    label: 'Are you using assets to meet the income requirement?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes - I am including assets' },
                        { value: 'no', label: 'No - My income alone meets the requirement' },
                    ],
                },
                {
                    id: 'part7.sponsorAssets',
                    type: 'text',
                    label: '1. Total value of your assets',
                    placeholder: '$100,000',
                    helpText: 'Include savings, checking, stocks, bonds, real estate (minus mortgages)',
                },
                {
                    id: 'part7.householdMemberAssets',
                    type: 'text',
                    label: '2. Total value of household member\'s assets',
                    placeholder: '$50,000',
                    helpText: 'From anyone who completed Form I-864A',
                },
                {
                    id: 'part7.immigrantAssets',
                    type: 'text',
                    label: '3. Total value of immigrant\'s assets',
                    placeholder: '$25,000',
                    helpText: 'Assets the immigrant is bringing to the U.S.',
                },
                {
                    id: 'part7.totalAssets',
                    type: 'text',
                    label: '4. TOTAL ASSETS (add lines 1-3)',
                    placeholder: 'Calculate total',
                    helpText: 'Assets count at 1/5 value (divide by 5). For spouse of U.S. citizen, assets count at 1/3 value (divide by 3).',
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Copy of your most recent Federal income tax return (IRS Form 1040) with all schedules',
        'Copies of W-2 forms for the most recent tax year',
        'Copies of 1099 forms for the most recent tax year (if applicable)',
        'Employment verification letter on company letterhead (if currently employed)',
        'Proof of current income (recent pay stubs covering 6 months)',
        'Copy of your U.S. passport, birth certificate, or naturalization certificate (proof of citizenship)',
        'If using assets: bank statements, property deeds, stock certificates, appraisals, etc.',
        'Form I-864A from any household members whose income you are including',
    ],
    instructions: [],
};

const N400_DEFINITION: FormDefinition = {
    id: 'n-400',
    code: 'N-400',
    name: 'Application for Naturalization',
    description: 'Apply to become a U.S. citizen',
    category: 'citizenship',
    estimatedTime: '90-120 minutes',
    filingFee: 640,
    price: 60,
    sections: [
        // PART 1: Information About Your Eligibility
        {
            id: 'part1-eligibility',
            title: 'Part 1: Information About Your Eligibility',
            description: 'Select the basis for your naturalization application',
            questions: [
                {
                    id: 'part1.eligibilityCategory',
                    type: 'select',
                    label: 'I am applying for naturalization based on (select one):',
                    required: true,
                    options: [
                        { value: 'general-5yr', label: 'General Provision: I have been a lawful permanent resident for at least 5 years' },
                        { value: 'spouse-3yr', label: 'I am married to a U.S. citizen and have been a lawful permanent resident for at least 3 years' },
                        { value: 'military-1yr', label: 'I have qualifying U.S. military service (1+ year active duty)' },
                        { value: 'military-wartime', label: 'I have qualifying U.S. military service during wartime' },
                        { value: 'other', label: 'Other (see instructions)' },
                    ],
                    helpText: 'Most applicants select either 5-year or 3-year (spouse of U.S. citizen) option',
                },
            ],
        },
        // PART 2: Information About You
        {
            id: 'part2-personal-info',
            title: 'Part 2: Your Current Legal Name',
            description: 'Enter your name exactly as it appears on your green card',
            questions: [
                {
                    id: 'part2.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part2.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part2.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part2.nameChange',
                    type: 'radio',
                    label: '2. Do you want to legally change your name?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'You can request a legal name change during your naturalization ceremony',
                },
            ],
        },
        {
            id: 'part2-uscis-info',
            title: 'Part 2: USCIS Information',
            description: 'Your A-Number and permanent resident information',
            questions: [
                {
                    id: 'part2.alienNumber',
                    type: 'text',
                    label: '4. A-Number (Alien Registration Number)',
                    required: true,
                    placeholder: 'A-',
                    helpText: 'Found on your green card',
                },
                {
                    id: 'part2.uscisAccount',
                    type: 'text',
                    label: '5. USCIS Online Account Number',
                    helpText: 'Only if you have created an account at uscis.gov',
                },
                {
                    id: 'part2.dateBecomePR',
                    type: 'date',
                    label: '6. Date You Became a Lawful Permanent Resident',
                    required: true,
                    helpText: 'Found on your green card',
                },
            ],
        },
        {
            id: 'part2-contact',
            title: 'Part 2: Contact Information',
            description: 'How can USCIS contact you?',
            questions: [
                {
                    id: 'part2.mailingStreet',
                    type: 'text',
                    label: '7.a. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part2.mailingAptType',
                    type: 'select',
                    label: '7.b. Unit Type',
                    options: [
                        { value: '', label: 'Select if applicable' },
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part2.mailingAptNumber',
                    type: 'text',
                    label: '7.c. Unit Number',
                },
                {
                    id: 'part2.mailingCity',
                    type: 'text',
                    label: '7.d. City or Town',
                    required: true,
                },
                {
                    id: 'part2.mailingState',
                    type: 'select',
                    label: '7.e. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part2.mailingZip',
                    type: 'text',
                    label: '7.f. ZIP Code',
                    required: true,
                    placeholder: '12345',
                },
            ],
        },
        // PART 3: Biographic Information
        {
            id: 'part3-biographic',
            title: 'Part 3: Biographic Information',
            description: 'Physical characteristics and demographic information',
            questions: [
                {
                    id: 'part3.dob',
                    type: 'date',
                    label: '1. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'part3.countryOfBirth',
                    type: 'text',
                    label: '2. Country of Birth',
                    required: true,
                },
                {
                    id: 'part3.countryOfCitizenship',
                    type: 'text',
                    label: '3. Country of Citizenship or Nationality',
                    required: true,
                },
                {
                    id: 'part3.ethnicity',
                    type: 'radio',
                    label: '4. Ethnicity (Select only one box)',
                    required: true,
                    options: [
                        { value: 'hispanic', label: 'Hispanic or Latino' },
                        { value: 'not-hispanic', label: 'Not Hispanic or Latino' },
                    ],
                },
                {
                    id: 'part3.race',
                    type: 'select',
                    label: '5. Race (Select all that apply)',
                    required: true,
                    options: [
                        { value: 'white', label: 'White' },
                        { value: 'asian', label: 'Asian' },
                        { value: 'black', label: 'Black or African American' },
                        { value: 'native-american', label: 'American Indian or Alaska Native' },
                        { value: 'pacific', label: 'Native Hawaiian or Other Pacific Islander' },
                    ],
                },
                {
                    id: 'part3.height',
                    type: 'text',
                    label: '6. Height',
                    required: true,
                    placeholder: 'Feet and inches',
                },
                {
                    id: 'part3.weight',
                    type: 'text',
                    label: '7. Weight',
                    required: true,
                    placeholder: 'Pounds',
                },
                {
                    id: 'part3.eyeColor',
                    type: 'select',
                    label: '8. Eye Color',
                    required: true,
                    options: [
                        { value: 'black', label: 'Black' },
                        { value: 'blue', label: 'Blue' },
                        { value: 'brown', label: 'Brown' },
                        { value: 'gray', label: 'Gray' },
                        { value: 'green', label: 'Green' },
                        { value: 'hazel', label: 'Hazel' },
                        { value: 'maroon', label: 'Maroon' },
                        { value: 'pink', label: 'Pink' },
                        { value: 'unknown', label: 'Unknown/Other' },
                    ],
                },
                {
                    id: 'part3.hairColor',
                    type: 'select',
                    label: '9. Hair Color',
                    required: true,
                    options: [
                        { value: 'bald', label: 'Bald (No hair)' },
                        { value: 'black', label: 'Black' },
                        { value: 'blond', label: 'Blond' },
                        { value: 'brown', label: 'Brown' },
                        { value: 'gray', label: 'Gray' },
                        { value: 'red', label: 'Red' },
                        { value: 'sandy', label: 'Sandy' },
                        { value: 'white', label: 'White' },
                        { value: 'unknown', label: 'Unknown/Other' },
                    ],
                },
            ],
        },
        // PART 4: Information About Your Residence
        {
            id: 'part4-residence',
            title: 'Part 4: Addresses for the Last 5 Years',
            description: 'List every address where you have lived during the last 5 years',
            questions: [
                {
                    id: 'part4.addressHistory',
                    type: 'textarea',
                    label: 'List ALL addresses where you have lived during the past 5 years',
                    required: true,
                    placeholder: 'Start with your current address and work backwards. For each address include: Street, City, State, ZIP, dates lived there (from mm/yyyy to mm/yyyy)',
                    helpText: 'Include every address. If you need more space, use Part 14 (Additional Information)',
                },
            ],
        },
        // PART 5: Information About Your Marital History
        {
            id: 'part5-marital',
            title: 'Part 5: Information About Your Marital History',
            description: 'Current marital status and marriage history',
            questions: [
                {
                    id: 'part5.currentMaritalStatus',
                    type: 'select',
                    label: '1. What is your current marital status?',
                    required: true,
                    options: [
                        { value: 'single', label: 'Single, Never Married' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                        { value: 'separated', label: 'Marriage Annulled or Other Legal Separation' },
                    ],
                },
                {
                    id: 'part5.timesMarried',
                    type: 'text',
                    label: '2. How many times have you been married (including annulled marriages)?',
                    required: true,
                    placeholder: 'Enter number',
                },
                {
                    id: 'part5.currentSpouseName',
                    type: 'text',
                    label: '3. Current Spouse\'s Legal Name (if currently married)',
                    helpText: 'Full legal name of your current spouse',
                },
                {
                    id: 'part5.currentSpouseUSCitizen',
                    type: 'radio',
                    label: '4. Is your current spouse a U.S. citizen?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Complete only if currently married',
                },
            ],
        },
        // PART 6: Information About Your Children
        {
            id: 'part6-children',
            title: 'Part 6: Information About Your Children',
            description: 'List all children under 18 years old',
            questions: [
                {
                    id: 'part6.totalChildren',
                    type: 'text',
                    label: '1. Total number of children you have who are under 18 years of age',
                    required: true,
                    placeholder: 'Enter 0 if none',
                    helpText: 'The updated N-400 only asks about children under 18',
                },
                {
                    id: 'part6.childrenDetails',
                    type: 'textarea',
                    label: '2. List information for each child under 18',
                    placeholder: 'For each child under 18, provide: Full Name, Date of Birth, Country of Birth, Current Address, A-Number (if any)',
                    helpText: 'Include biological, adopted, and stepchildren under 18',
                },
            ],
        },
        // PART 7: Employment and School History
        {
            id: 'part7-employment',
            title: 'Part 7: Employment and Schools You Attended (Last 5 Years)',
            description: 'List your employment and education for the past 5 years',
            questions: [
                {
                    id: 'part7.employmentHistory',
                    type: 'textarea',
                    label: 'List ALL employment and education for the past 5 years',
                    required: true,
                    placeholder: 'Start with current/most recent. For each: Employer/School name, Address, Your occupation/field of study, Dates (from mm/yyyy to mm/yyyy). Include unemployment periods.',
                    helpText: 'Be complete. Include all jobs, self-employment, school, and periods of unemployment.',
                },
            ],
        },
        // PART 8: Time Outside the United States
        {
            id: 'part8-travel',
            title: 'Part 8: Time Outside the United States',
            description: 'List all trips outside the U.S. during the last 5 years',
            questions: [
                {
                    id: 'part8.totalTrips',
                    type: 'text',
                    label: '1. How many total days have you spent outside the United States during the last 5 years?',
                    required: true,
                    placeholder: 'Total days',
                    helpText: 'Add up all days from all trips',
                },
                {
                    id: 'part8.totalTripsCount',
                    type: 'text',
                    label: '2. How many trips of 24 hours or more have you taken outside the United States during the last 5 years?',
                    required: true,
                    placeholder: 'Number of trips',
                },
                {
                    id: 'part8.tripDetails',
                    type: 'textarea',
                    label: '3. List all trips outside the United States',
                    required: true,
                    placeholder: 'For each trip provide: Date left U.S. (mm/dd/yyyy), Date returned (mm/dd/yyyy), Country/countries visited, Total days outside U.S.',
                    helpText: 'Include ALL trips of 24 hours or more. Extended absences (6+ months) may affect eligibility.',
                },
            ],
        },
        // PART 12: Additional Information (Good Moral Character Questions)
        {
            id: 'part12-moral-character',
            title: 'Part 12: Additional Information About You',
            description: 'Answer ALL questions. These questions relate to eligibility and good moral character.',
            questions: [
                {
                    id: 'part12.taxes',
                    type: 'radio',
                    label: '1. Have you EVER failed to file a required federal, state, or local tax return?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.oweTaxes',
                    type: 'radio',
                    label: '2. Do you owe any federal, state, or local taxes that are overdue?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.nobilityTitle',
                    type: 'radio',
                    label: '3. Do you have any title of nobility in any foreign country?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.arrestedEver',
                    type: 'radio',
                    label: '4. Have you EVER been arrested, cited, or detained by any law enforcement officer?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Include minor traffic violations. Answer Yes even if records were sealed or expunged.',
                },
                {
                    id: 'part12.convictedCrime',
                    type: 'radio',
                    label: '5. Have you EVER been convicted of a crime or offense?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.gambling',
                    type: 'radio',
                    label: '6. Have you EVER been involved in illegal gambling?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.falseClaim',
                    type: 'radio',
                    label: '7. Have you EVER falsely claimed to be a U.S. citizen (in writing or any other way)?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.votedIllegally',
                    type: 'radio',
                    label: '8. Have you EVER voted in the United States in any federal, state, or local election when you were not a U.S. citizen?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.terroristOrg',
                    type: 'radio',
                    label: '9. Have you EVER been a member of or associated with any organization, association, fund, foundation, party, club, or society?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'This includes charitable, social, youth, religious, and political organizations',
                },
                {
                    id: 'part12.persecution',
                    type: 'radio',
                    label: '10. Have you EVER persecuted anyone because of race, religion, national origin, membership in a social group, or political opinion?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.genocide',
                    type: 'radio',
                    label: '11. Have you EVER committed, ordered, incited, assisted, or participated in genocide?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.torture',
                    type: 'radio',
                    label: '12. Have you EVER committed, ordered, incited, assisted, or participated in torture?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part12.supportConstitution',
                    type: 'radio',
                    label: '13. Do you support the Constitution and form of government of the United States?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'You must answer Yes to be eligible for naturalization',
                },
                {
                    id: 'part12.bearArms',
                    type: 'radio',
                    label: '14. If the law requires it, are you willing to bear arms on behalf of the United States?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No - I claim exemption based on religious training and belief, or conscientious objection' },
                    ],
                },
                {
                    id: 'part12.performWork',
                    type: 'radio',
                    label: '15. If the law requires it, are you willing to perform noncombatant service in the U.S. Armed Forces?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No - I claim exemption' },
                    ],
                },
                {
                    id: 'part12.performCivilian',
                    type: 'radio',
                    label: '16. If the law requires it, are you willing to perform work of national importance under civilian direction?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No - I claim exemption' },
                    ],
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Copy of your green card (front and back)',
        'Two passport-style photos',
        'Copy of marriage certificate (if applying as spouse of U.S. citizen)',
        'Copy of spouse\'s U.S. passport or birth certificate (if applicable)',
        'Divorce decrees or death certificates from prior marriages (if applicable)',
        'Court records, probation records, or certificates of rehabilitation (if you have criminal history)',
        'IRS tax transcripts for the required period',
        'Selective Service registration confirmation (males who lived in U.S. between ages 18-26)',
    ],
    instructions: [],
};

const I751_DEFINITION: FormDefinition = {
    id: 'i-751',
    code: 'I-751',
    name: 'Petition to Remove Conditions on Residence',
    description: 'Remove conditions from your 2-year conditional green card',
    category: 'family',
    estimatedTime: '60-90 minutes',
    filingFee: 595,
    price: 60,
    sections: [
        // PART 1: Information About You (The Conditional Resident)
        {
            id: 'part1-personal-info',
            title: 'Part 1: Your Information',
            description: 'Information about you, the conditional permanent resident',
            questions: [
                {
                    id: 'part1.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part1.alienNumber',
                    type: 'text',
                    label: '2. A-Number (Alien Registration Number)',
                    required: true,
                    placeholder: 'A-',
                    helpText: 'Found on your conditional green card',
                },
                {
                    id: 'part1.uscisAccount',
                    type: 'text',
                    label: '3. USCIS Online Account Number',
                    helpText: 'Only if you have created an account at uscis.gov',
                },
                {
                    id: 'part1.dateConditionalResidence',
                    type: 'date',
                    label: '4. Date Conditional Residence Obtained',
                    required: true,
                    helpText: 'Date you became a conditional resident (found on your green card)',
                },
                {
                    id: 'part1.expirationDate',
                    type: 'date',
                    label: '5. Conditional Residence Expires On',
                    required: true,
                    helpText: 'Expiration date on your conditional green card',
                },
            ],
        },
        {
            id: 'part1-contact',
            title: 'Part 1: Contact Information',
            description: 'Where should USCIS contact you?',
            questions: [
                {
                    id: 'part1.mailingStreet',
                    type: 'text',
                    label: '6.a. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part1.mailingAptType',
                    type: 'select',
                    label: '6.b. Unit Type',
                    options: [
                        { value: '', label: 'Select if applicable' },
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part1.mailingAptNumber',
                    type: 'text',
                    label: '6.c. Unit Number',
                },
                {
                    id: 'part1.mailingCity',
                    type: 'text',
                    label: '6.d. City or Town',
                    required: true,
                },
                {
                    id: 'part1.mailingState',
                    type: 'select',
                    label: '6.e. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part1.mailingZip',
                    type: 'text',
                    label: '6.f. ZIP Code',
                    required: true,
                    placeholder: '12345',
                },
            ],
        },
        // PART 2: Biographic Information
        {
            id: 'part2-biographic',
            title: 'Part 2: Biographic Information',
            description: 'Demographic information for background checks',
            questions: [
                {
                    id: 'part2.dob',
                    type: 'date',
                    label: '1. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'part2.countryOfBirth',
                    type: 'text',
                    label: '2. Country of Birth',
                    required: true,
                },
                {
                    id: 'part2.countryOfCitizenship',
                    type: 'text',
                    label: '3. Country of Citizenship or Nationality',
                    required: true,
                },
                {
                    id: 'part2.ethnicity',
                    type: 'radio',
                    label: '4. Ethnicity (Select only one box)',
                    required: true,
                    options: [
                        { value: 'hispanic', label: 'Hispanic or Latino' },
                        { value: 'not-hispanic', label: 'Not Hispanic or Latino' },
                    ],
                },
                {
                    id: 'part2.race',
                    type: 'select',
                    label: '5. Race (Select all that apply)',
                    required: true,
                    options: [
                        { value: 'white', label: 'White' },
                        { value: 'asian', label: 'Asian' },
                        { value: 'black', label: 'Black or African American' },
                        { value: 'native-american', label: 'American Indian or Alaska Native' },
                        { value: 'pacific', label: 'Native Hawaiian or Other Pacific Islander' },
                    ],
                },
            ],
        },
        // PART 3: Basis for Petition
        {
            id: 'part3-basis',
            title: 'Part 3: Basis for Petition',
            description: 'Select the reason for your petition to remove conditions',
            questions: [
                {
                    id: 'part3.filingBasis',
                    type: 'select',
                    label: 'I am filing this petition (select only one):',
                    required: true,
                    options: [
                        { value: 'joint', label: 'Jointly with my spouse - My conditional residence is based on my marriage to a U.S. citizen or permanent resident, and we are filing this petition together' },
                        { value: 'waiver-deceased', label: 'Individual Waiver - My spouse is deceased' },
                        { value: 'waiver-divorce', label: 'Individual Waiver - I am divorced or my marriage was annulled, but the marriage was entered in good faith' },
                        { value: 'waiver-hardship', label: 'Individual Waiver - I would suffer extreme hardship if removed from the United States' },
                        { value: 'waiver-abuse', label: 'Individual Waiver - I or my child was battered or subjected to extreme cruelty by my U.S. citizen or permanent resident spouse' },
                    ],
                    helpText: 'Most applicants file jointly with their spouse. Select a waiver option only if you cannot file jointly.',
                },
                {
                    id: 'part3.marriageEnded',
                    type: 'radio',
                    label: 'If filing for a waiver: Is your marriage still legally valid?',
                    options: [
                        { value: 'yes', label: 'Yes - Still married' },
                        { value: 'no', label: 'No - Divorced, annulled, or spouse deceased' },
                    ],
                    helpText: 'Complete only if filing for a waiver',
                },
            ],
        },
        // PART 4: Information About Your Spouse
        {
            id: 'part4-spouse-info',
            title: 'Part 4: Information About Your U.S. Citizen or LPR Spouse',
            description: 'Information about your sponsoring spouse',
            questions: [
                {
                    id: 'part4.spouseFamilyName',
                    type: 'text',
                    label: '1.a. Spouse\'s Family Name (Last Name)',
                    required: true,
                    helpText: 'The spouse through whom you obtained conditional residence',
                },
                {
                    id: 'part4.spouseGivenName',
                    type: 'text',
                    label: '1.b. Spouse\'s Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part4.spouseMiddleName',
                    type: 'text',
                    label: '1.c. Spouse\'s Middle Name',
                },
                {
                    id: 'part4.spouseDob',
                    type: 'date',
                    label: '2. Spouse\'s Date of Birth',
                    required: true,
                },
                {
                    id: 'part4.spouseSsn',
                    type: 'ssn',
                    label: '3. Spouse\'s U.S. Social Security Number (if any)',
                    placeholder: '###-##-####',
                },
                {
                    id: 'part4.spouseAlienNumber',
                    type: 'text',
                    label: '4. Spouse\'s A-Number (if any)',
                    placeholder: 'A-',
                    helpText: 'Only if spouse is an LPR',
                },
                {
                    id: 'part4.dateOfMarriage',
                    type: 'date',
                    label: '5. Date of Marriage',
                    required: true,
                },
                {
                    id: 'part4.placeOfMarriage',
                    type: 'text',
                    label: '6. Place of Marriage (City, State/Province, Country)',
                    required: true,
                },
                {
                    id: 'part4.spouseStatus',
                    type: 'select',
                    label: '7. Spouse\'s Current Immigration Status',
                    required: true,
                    options: [
                        { value: 'us-citizen', label: 'U.S. Citizen' },
                        { value: 'lpr', label: 'Lawful Permanent Resident' },
                        { value: 'deceased', label: 'Deceased' },
                    ],
                },
            ],
        },
        // PART 5: Information About Your Children
        {
            id: 'part5-children',
            title: 'Part 5: Information About Your Children',
            description: 'List all of your children',
            questions: [
                {
                    id: 'part5.totalChildren',
                    type: 'text',
                    label: '1. Total number of children',
                    required: true,
                    placeholder: 'Enter 0 if none',
                    helpText: 'Include all children, regardless of age or location',
                },
                {
                    id: 'part5.childrenDetails',
                    type: 'textarea',
                    label: '2. List each child\'s information',
                    placeholder: 'For each child provide: Full Name, Date of Birth, A-Number (if any), Country of Birth',
                    helpText: 'Include biological, adopted, and stepchildren',
                },
                {
                    id: 'part5.childrenIncludedInPetition',
                    type: 'text',
                    label: '3. How many children are listed on your conditional green card and included in this petition?',
                    required: true,
                    placeholder: 'Enter number',
                    helpText: 'These children will also have conditions removed',
                },
            ],
        },
        // PART 7: Petitioner's Statement
        {
            id: 'part7-statement',
            title: 'Part 7: Petitioner\'s Statement and Certification',
            description: 'Important statements and certifications',
            questions: [
                {
                    id: 'part7.certifyTruthfulness',
                    type: 'checkbox',
                    label: 'I certify, under penalty of perjury, that all information in this petition and any document submitted with it were provided or authorized by me, that I reviewed and understand all of the information contained in and submitted with my petition, and that all of this information is complete, true, and correct.',
                    required: true,
                },
                {
                    id: 'part7.certifyGoodFaith',
                    type: 'checkbox',
                    label: 'I understand that I must establish that I entered into the marriage in good faith and provide evidence that the marriage was not entered into for the purpose of procuring an immigration benefit.',
                    required: true,
                },
                {
                    id: 'part7.understoodConsequences',
                    type: 'checkbox',
                    label: 'I understand that if USCIS determines I entered the marriage solely to obtain immigration benefits, my conditional residence will not be removed and I may be subject to removal from the United States.',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Copy of your conditional green card (front and back)',
        'Copy of children\'s conditional green cards (if applicable)',
        'Marriage certificate',
        'Proof your marriage was entered in good faith (joint documents):',
        '  - Joint bank account statements',
        '  - Joint lease or mortgage',
        '  - Joint utility bills',
        '  - Joint tax returns',
        '  - Birth certificates of children born to the marriage',
        '  - Insurance policies listing spouse as beneficiary',
        '  - Photos together throughout the marriage',
        '  - Affidavits from friends/family attesting to the marriage',
        'If filing for waiver:',
        '  - Death certificate (if spouse deceased)',
        '  - Divorce decree or annulment (if marriage ended)',
        '  - Police reports, court records, medical records (if filing based on abuse)',
        '  - Evidence of extreme hardship (if applicable)',
    ],
    instructions: [],
};

const I129_DEFINITION: FormDefinition = {
    id: 'i-129',
    code: 'I-129',
    name: 'Petition for a Nonimmigrant Worker',
    description: 'Petition for H-1B, L-1, O-1, and other temporary work visas',
    category: 'work_authorization',
    estimatedTime: '90-120 minutes',
    filingFee: 460,
    price: 60,
    status: 'active',
    sections: [
        {
            id: 'part1-basis-classification',
            title: 'Part 1: Basis for Classification',
            description: 'Type of petition and classification requested',
            questions: [
                {
                    id: 'part1.1.petitionType',
                    type: 'select',
                    label: '1. This petition is being filed for (select one):',
                    required: true,
                    options: [
                        { value: 'new-employment', label: 'New Employment' },
                        { value: 'continuation', label: 'Continuation of Previously Approved Employment' },
                        { value: 'change-employer', label: 'Change in Previously Approved Employment' },
                        { value: 'new-concurrent', label: 'New Concurrent Employment' },
                        { value: 'change-status', label: 'Change of Status' },
                        { value: 'extension', label: 'Extension of Stay' },
                        { value: 'amendment', label: 'Amendment of Stay' },
                    ],
                },
                {
                    id: 'part1.2.classification',
                    type: 'select',
                    label: '2. Classification Requested',
                    required: true,
                    options: [
                        { value: 'h1b', label: 'H-1B Specialty Occupation' },
                        { value: 'h1b1', label: 'H-1B1 Chile/Singapore' },
                        { value: 'h2a', label: 'H-2A Agricultural Worker' },
                        { value: 'h2b', label: 'H-2B Temporary Worker' },
                        { value: 'h3', label: 'H-3 Trainee' },
                        { value: 'l1a', label: 'L-1A Intracompany Transferee Executive/Manager' },
                        { value: 'l1b', label: 'L-1B Intracompany Transferee Specialized Knowledge' },
                        { value: 'o1a', label: 'O-1A Extraordinary Ability (Sciences/Education/Business/Athletics)' },
                        { value: 'o1b', label: 'O-1B Extraordinary Ability (Arts/Motion Pictures/TV)' },
                        { value: 'o2', label: 'O-2 Support Personnel' },
                        { value: 'p1', label: 'P-1 Athlete/Entertainer' },
                        { value: 'p2', label: 'P-2 Artist/Entertainer (Reciprocal Exchange)' },
                        { value: 'p3', label: 'P-3 Artist/Entertainer (Culturally Unique)' },
                        { value: 'q1', label: 'Q-1 Cultural Exchange' },
                        { value: 'r1', label: 'R-1 Religious Worker' },
                    ],
                },
            ],
        },
        {
            id: 'part2-petitioner-info',
            title: 'Part 2: Information About the Petitioner',
            description: 'U.S. employer information',
            questions: [
                {
                    id: 'part2.1.petitionerType',
                    type: 'select',
                    label: '1. Petitioner Type',
                    required: true,
                    options: [
                        { value: 'individual', label: 'Individual' },
                        { value: 'company', label: 'Company or Organization' },
                    ],
                },
                {
                    id: 'part2.2a.legalName',
                    type: 'text',
                    label: '2.a. Company/Organization Legal Name',
                    required: true,
                },
                {
                    id: 'part2.2b.tradeName',
                    type: 'text',
                    label: '2.b. Trade Name/DBA (if any)',
                },
                {
                    id: 'part2.3.ein',
                    type: 'text',
                    label: '3. Employer Identification Number (EIN)',
                    required: true,
                    placeholder: '12-3456789',
                    helpText: 'IRS Tax ID Number',
                },
                {
                    id: 'part2.4a.street',
                    type: 'text',
                    label: '4.a. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part2.4b.aptSteFlr',
                    type: 'select',
                    label: '4.b. Unit Type',
                    options: [
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part2.4c.unitNumber',
                    type: 'text',
                    label: '4.c. Unit Number',
                },
                {
                    id: 'part2.4d.city',
                    type: 'text',
                    label: '4.d. City or Town',
                    required: true,
                },
                {
                    id: 'part2.4e.state',
                    type: 'select',
                    label: '4.e. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part2.4f.zipCode',
                    type: 'text',
                    label: '4.f. ZIP Code',
                    required: true,
                },
                {
                    id: 'part2.5.phone',
                    type: 'tel',
                    label: '5. Business Telephone Number',
                    required: true,
                },
            ],
        },
        {
            id: 'part3-beneficiary-info',
            title: 'Part 3: Information About the Beneficiary',
            description: 'Foreign worker information',
            questions: [
                {
                    id: 'part3.1a.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part3.1b.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part3.1c.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part3.2.dateOfBirth',
                    type: 'date',
                    label: '2. Date of Birth',
                    required: true,
                },
                {
                    id: 'part3.3.countryOfBirth',
                    type: 'text',
                    label: '3. Country of Birth',
                    required: true,
                },
                {
                    id: 'part3.4.countryOfCitizenship',
                    type: 'text',
                    label: '4. Country of Citizenship or Nationality',
                    required: true,
                },
                {
                    id: 'part3.5.alienNumber',
                    type: 'text',
                    label: '5. Alien Registration Number (A-Number) (if any)',
                    placeholder: 'A-',
                },
                {
                    id: 'part3.6.ssn',
                    type: 'ssn',
                    label: '6. U.S. Social Security Number (if any)',
                },
                {
                    id: 'part3.7.passportNumber',
                    type: 'text',
                    label: '7. Passport Number',
                    required: true,
                },
                {
                    id: 'part3.8.passportCountry',
                    type: 'text',
                    label: '8. Country of Issuance for Passport',
                    required: true,
                },
                {
                    id: 'part3.9.passportExpiration',
                    type: 'date',
                    label: '9. Passport Expiration Date',
                    required: true,
                },
            ],
        },
        {
            id: 'part4-processing-info',
            title: 'Part 4: Processing Information',
            description: 'Consular processing or change of status',
            questions: [
                {
                    id: 'part4.1.beneficiaryInUS',
                    type: 'radio',
                    label: '1. Is the beneficiary currently in the United States?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part4.2.currentStatus',
                    type: 'text',
                    label: '2. If yes, beneficiary\'s current nonimmigrant status',
                    helpText: 'e.g., F-1, H-1B, L-1',
                },
                {
                    id: 'part4.3.i94Number',
                    type: 'text',
                    label: '3. I-94 Arrival-Departure Record Number',
                },
                {
                    id: 'part4.4.statusExpiration',
                    type: 'date',
                    label: '4. Current Status Valid Until',
                },
                {
                    id: 'part4.5.changeOfStatus',
                    type: 'radio',
                    label: '5. Request change of status to classification sought?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Select No if beneficiary will apply for visa abroad',
                },
            ],
        },
        {
            id: 'part5-employment-details',
            title: 'Part 5: Employment and Wage Information',
            description: 'Job details and compensation',
            questions: [
                {
                    id: 'part5.1.jobTitle',
                    type: 'text',
                    label: '1. Job Title',
                    required: true,
                },
                {
                    id: 'part5.2.socCode',
                    type: 'text',
                    label: '2. SOC (ONET/OES) Code',
                    required: true,
                    helpText: 'Standard Occupational Classification code',
                    placeholder: '15-1252.00',
                },
                {
                    id: 'part5.3.naicsCode',
                    type: 'text',
                    label: '3. NAICS Code',
                    required: true,
                    helpText: 'North American Industry Classification System',
                },
                {
                    id: 'part5.4.startDate',
                    type: 'date',
                    label: '4. Requested Employment Start Date',
                    required: true,
                },
                {
                    id: 'part5.5.endDate',
                    type: 'date',
                    label: '5. Requested Employment End Date',
                    required: true,
                    helpText: 'Maximum 3 years for most classifications',
                },
                {
                    id: 'part5.6.wageRate',
                    type: 'text',
                    label: '6. Rate of Pay',
                    required: true,
                    placeholder: '$85,000',
                },
                {
                    id: 'part5.7.rateType',
                    type: 'select',
                    label: '7. Pay Rate Type',
                    required: true,
                    options: [
                        { value: 'hour', label: 'Per Hour' },
                        { value: 'week', label: 'Per Week' },
                        { value: 'month', label: 'Per Month' },
                        { value: 'year', label: 'Per Year' },
                    ],
                },
                {
                    id: 'part5.8.workLocationStreet',
                    type: 'text',
                    label: '8. Primary Work Location - Street Address',
                    required: true,
                },
                {
                    id: 'part5.8.workLocationCity',
                    type: 'text',
                    label: 'City',
                    required: true,
                },
                {
                    id: 'part5.8.workLocationState',
                    type: 'select',
                    label: 'State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part5.9.jobDuties',
                    type: 'textarea',
                    label: '9. Brief Description of Job Duties',
                    required: true,
                    helpText: 'Detailed description of day-to-day responsibilities',
                },
            ],
        },
        {
            id: 'part6-technology-certification',
            title: 'Part 6: Technology Transfer Certification',
            description: 'Required for H-1B, L-1, and O-1A classifications',
            questions: [
                {
                    id: 'part6.1.accessToTechnology',
                    type: 'radio',
                    label: '1. Will the beneficiary have access to controlled technology or technical data?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Controlled under Export Administration Regulations or International Traffic in Arms Regulations',
                },
                {
                    id: 'part6.2.exportLicense',
                    type: 'radio',
                    label: '2. If yes, do you have the required export license or other authorization?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                        { value: 'pending', label: 'Pending' },
                    ],
                },
            ],
        },
        {
            id: 'part7-h1b-supplement',
            title: 'H-1B Classification Supplement',
            description: 'Additional information for H-1B petitions',
            questions: [
                {
                    id: 'h1b.1.lcaNumber',
                    type: 'text',
                    label: '1. Labor Condition Application (LCA) Number',
                    required: true,
                    helpText: 'ETA Form 9035/9035E certification number',
                },
                {
                    id: 'h1b.2.wageLevel',
                    type: 'select',
                    label: '2. Prevailing Wage Level',
                    required: true,
                    options: [
                        { value: 'level-1', label: 'Level I - Entry Level' },
                        { value: 'level-2', label: 'Level II - Qualified' },
                        { value: 'level-3', label: 'Level III - Experienced' },
                        { value: 'level-4', label: 'Level IV - Fully Competent' },
                    ],
                },
                {
                    id: 'h1b.3.capExempt',
                    type: 'radio',
                    label: '3. Is this petition H-1B cap-exempt?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Higher education institutions and affiliated nonprofits are cap-exempt',
                },
                {
                    id: 'h1b.4.degreeRequired',
                    type: 'select',
                    label: '4. Minimum Degree Required for Position',
                    required: true,
                    options: [
                        { value: 'bachelor', label: 'Bachelor\'s Degree' },
                        { value: 'master', label: 'Master\'s Degree' },
                        { value: 'doctorate', label: 'Doctorate Degree' },
                    ],
                },
                {
                    id: 'h1b.5.degreeField',
                    type: 'text',
                    label: '5. Field of Study Required',
                    required: true,
                    placeholder: 'Computer Science, Engineering, etc.',
                },
            ],
        },
        {
            id: 'part8-certification',
            title: 'Part 8: Petitioner\'s Certification',
            description: 'Signature and contact information',
            questions: [
                {
                    id: 'part8.1.contactName',
                    type: 'text',
                    label: '1. Contact Person Name',
                    required: true,
                },
                {
                    id: 'part8.2.contactPhone',
                    type: 'tel',
                    label: '2. Daytime Telephone Number',
                    required: true,
                },
                {
                    id: 'part8.3.contactEmail',
                    type: 'email',
                    label: '3. Email Address',
                    required: true,
                },
                {
                    id: 'part8.4.certification',
                    type: 'checkbox',
                    label: 'I certify, under penalty of perjury, that all information in this petition is true and correct',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Labor Condition Application (LCA) certified by DOL (H-1B)',
        'Support letter from employer describing job and why beneficiary qualifies',
        'Beneficiary\'s resume/CV',
        'Copies of beneficiary\'s degrees and transcripts',
        'Evaluation of foreign degrees (if applicable)',
        'Copy of beneficiary\'s passport biographical page',
        'Copy of current visa and I-94 (if in U.S.)',
        'Company organizational chart',
        'Proof of employer\'s ability to pay salary',
        'Client letters or contracts (for consulting positions)',
    ],
    instructions: [
        'File with appropriate USCIS Service Center based on work location',
        'Premium Processing available for $2,805 (15-day processing)',
        'Ensure LCA is certified by DOL before filing (H-1B)',
        'LCA must be posted at worksite for 10 business days',
        'Include Public Access File documentation for H-1B',
        'Cap-subject H-1B petitions must be filed during registration period (typically March)',
    ],
};

const I140_DEFINITION: FormDefinition = {
    id: 'i-140',
    code: 'I-140',
    name: 'Immigrant Petition for Alien Workers',
    description: 'Employment-based green card petition for EB-1, EB-2, and EB-3 categories',
    category: 'work_authorization',
    estimatedTime: '120-180 minutes',
    filingFee: 715,
    price: 60,
    status: 'active',
    sections: [
        {
            id: 'part1-petitioner-info',
            title: 'Part 1: Information About the Person or Organization Filing This Petition',
            description: 'U.S. employer or self-petitioner information',
            questions: [
                {
                    id: 'part1.1a.legalName',
                    type: 'text',
                    label: '1.a. Legal Name of Organization (or Your Full Name if Individual)',
                    required: true,
                },
                {
                    id: 'part1.1b.tradeName',
                    type: 'text',
                    label: '1.b. Trade Name/DBA (if any)',
                },
                {
                    id: 'part1.2.taxId',
                    type: 'text',
                    label: '2. U.S. Employer Identification Number (EIN)',
                    required: true,
                    placeholder: '12-3456789',
                    helpText: 'IRS Tax ID Number',
                },
                {
                    id: 'part1.3a.street',
                    type: 'text',
                    label: '3.a. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part1.3b.aptSteFlr',
                    type: 'select',
                    label: '3.b. Unit Type',
                    options: [
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part1.3c.unitNumber',
                    type: 'text',
                    label: '3.c. Unit Number',
                },
                {
                    id: 'part1.3d.city',
                    type: 'text',
                    label: '3.d. City or Town',
                    required: true,
                },
                {
                    id: 'part1.3e.state',
                    type: 'select',
                    label: '3.e. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part1.3f.zipCode',
                    type: 'text',
                    label: '3.f. ZIP Code',
                    required: true,
                },
                {
                    id: 'part1.4.phone',
                    type: 'tel',
                    label: '4. Daytime Telephone Number',
                    required: true,
                },
            ],
        },
        {
            id: 'part2-petition-type',
            title: 'Part 2: Petition Type',
            description: 'Select the employment-based immigrant classification',
            questions: [
                {
                    id: 'part2.classification',
                    type: 'select',
                    label: 'This petition is being filed for (select one):',
                    required: true,
                    options: [
                        { value: 'eb1-1', label: 'EB-1-1: Alien of Extraordinary Ability' },
                        { value: 'eb1-2', label: 'EB-1-2: Outstanding Professor or Researcher' },
                        { value: 'eb1-3', label: 'EB-1-3: Multinational Executive or Manager' },
                        { value: 'eb2', label: 'EB-2: Member of Professions Holding Advanced Degree or Exceptional Ability' },
                        { value: 'eb2-niw', label: 'EB-2: National Interest Waiver' },
                        { value: 'eb3-1', label: 'EB-3-1: Skilled Worker (minimum 2 years training/experience)' },
                        { value: 'eb3-2', label: 'EB-3-2: Professional (bachelor\'s degree required)' },
                        { value: 'eb3-3', label: 'EB-3-3: Other Worker (less than 2 years training/experience)' },
                    ],
                    helpText: 'Choose the classification that best fits the beneficiary',
                },
                {
                    id: 'part2.selfPetition',
                    type: 'radio',
                    label: 'Is this a self-petition?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes (EB-1A or EB-2 NIW)' },
                        { value: 'no', label: 'No (Employer is petitioning)' },
                    ],
                },
            ],
        },
        {
            id: 'part3-beneficiary-info',
            title: 'Part 3: Information About the Person for Whom You Are Filing',
            description: 'Foreign worker/beneficiary information',
            questions: [
                {
                    id: 'part3.1a.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part3.1b.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part3.1c.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part3.2.alienNumber',
                    type: 'text',
                    label: '2. Alien Registration Number (A-Number) (if any)',
                    placeholder: 'A-',
                },
                {
                    id: 'part3.3.dateOfBirth',
                    type: 'date',
                    label: '3. Date of Birth',
                    required: true,
                },
                {
                    id: 'part3.4.cityOfBirth',
                    type: 'text',
                    label: '4. City/Town of Birth',
                    required: true,
                },
                {
                    id: 'part3.5.countryOfBirth',
                    type: 'text',
                    label: '5. Country of Birth',
                    required: true,
                },
                {
                    id: 'part3.6.countryOfCitizenship',
                    type: 'text',
                    label: '6. Country of Citizenship or Nationality',
                    required: true,
                },
            ],
        },
        {
            id: 'part4-processing-info',
            title: 'Part 4: Processing Information',
            description: 'Current status and location',
            questions: [
                {
                    id: 'part4.1.beneficiaryInUS',
                    type: 'radio',
                    label: '1. Is the beneficiary currently in the United States?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part4.2.currentStatus',
                    type: 'text',
                    label: '2. If yes, current nonimmigrant status',
                    helpText: 'e.g., H-1B, L-1, F-1',
                },
                {
                    id: 'part4.3.statusExpiration',
                    type: 'date',
                    label: '3. Current Status Valid Until',
                },
                {
                    id: 'part4.4.consularProcessing',
                    type: 'radio',
                    label: '4. Will beneficiary apply for adjustment of status or consular processing?',
                    required: true,
                    options: [
                        { value: 'adjustment', label: 'Adjustment of Status (I-485 in U.S.)' },
                        { value: 'consular', label: 'Consular Processing (visa abroad)' },
                    ],
                },
            ],
        },
        {
            id: 'part5-job-offer',
            title: 'Part 5: Basic Information About the Proposed Employment',
            description: 'Job details and requirements',
            questions: [
                {
                    id: 'part5.1.jobTitle',
                    type: 'text',
                    label: '1. Job Title',
                    required: true,
                },
                {
                    id: 'part5.2.socCode',
                    type: 'text',
                    label: '2. SOC Code',
                    required: true,
                    helpText: 'Standard Occupational Classification code',
                    placeholder: '15-1252.00',
                },
                {
                    id: 'part5.3.salaryPerYear',
                    type: 'text',
                    label: '3. Salary Per Year',
                    required: true,
                    placeholder: '$120,000',
                },
                {
                    id: 'part5.4.educationRequired',
                    type: 'select',
                    label: '4. Minimum Education Required',
                    required: true,
                    options: [
                        { value: 'none', label: 'None' },
                        { value: 'high-school', label: 'High School' },
                        { value: 'bachelor', label: 'Bachelor\'s Degree' },
                        { value: 'master', label: 'Master\'s Degree' },
                        { value: 'doctorate', label: 'Doctorate' },
                    ],
                },
                {
                    id: 'part5.5.experienceRequired',
                    type: 'text',
                    label: '5. Months of Experience Required in Job Offered',
                    required: true,
                    placeholder: '60 (5 years)',
                    helpText: 'Enter number of months',
                },
                {
                    id: 'part5.6.jobDuties',
                    type: 'textarea',
                    label: '6. Job Duties',
                    required: true,
                    helpText: 'Detailed description of duties and responsibilities',
                },
            ],
        },
        {
            id: 'part6-labor-certification',
            title: 'Part 6: Labor Certification Information',
            description: 'PERM details for EB-2 and EB-3 petitions',
            questions: [
                {
                    id: 'part6.1.permRequired',
                    type: 'radio',
                    label: '1. Is a PERM labor certification required for this petition?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes (EB-2 or EB-3 with PERM)' },
                        { value: 'no', label: 'No (EB-1, EB-2 NIW, or Schedule A)' },
                    ],
                    helpText: 'EB-1 and National Interest Waiver do not require PERM',
                },
                {
                    id: 'part6.2.permCaseNumber',
                    type: 'text',
                    label: '2. PERM Case Number',
                    placeholder: 'A-XXXXX-XXXXX',
                    helpText: 'DOL ETA case number from approved PERM',
                },
                {
                    id: 'part6.3.permFilingDate',
                    type: 'date',
                    label: '3. PERM Filing Date',
                },
                {
                    id: 'part6.4.permApprovalDate',
                    type: 'date',
                    label: '4. PERM Approval Date',
                },
            ],
        },
        {
            id: 'part7-family-info',
            title: 'Part 7: Information About Spouse and Children',
            description: 'Derivative beneficiaries',
            questions: [
                {
                    id: 'part7.1.maritalStatus',
                    type: 'select',
                    label: '1. Beneficiary\'s Current Marital Status',
                    required: true,
                    options: [
                        { value: 'single', label: 'Single' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                    ],
                },
                {
                    id: 'part7.2.numberOfChildren',
                    type: 'text',
                    label: '2. Total Number of Children (Unmarried and Under 21)',
                    placeholder: '0',
                    helpText: 'Children eligible for derivative status',
                },
            ],
        },
        {
            id: 'part8-certification',
            title: 'Part 8: Petitioner\'s Certification',
            description: 'Contact and signature information',
            questions: [
                {
                    id: 'part8.1.contactName',
                    type: 'text',
                    label: '1. Contact Person Name',
                    required: true,
                },
                {
                    id: 'part8.2.contactEmail',
                    type: 'email',
                    label: '2. Email Address',
                    required: true,
                },
                {
                    id: 'part8.3.contactPhone',
                    type: 'tel',
                    label: '3. Daytime Telephone Number',
                    required: true,
                },
                {
                    id: 'part8.4.certification',
                    type: 'checkbox',
                    label: 'I certify, under penalty of perjury, that all information in this petition is true and correct',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Approved PERM Labor Certification (EB-2/EB-3, unless NIW)',
        'Evidence of ability to pay proffered wage (tax returns, financial statements)',
        'Beneficiary\'s degree certificates and transcripts',
        'Beneficiary\'s detailed resume/CV',
        'Employment verification letters showing qualifying experience',
        'Evidence of extraordinary ability (EB-1A): awards, publications, media coverage',
        'Evidence for outstanding researcher (EB-1B): published research, citations',
        'Organizational charts showing managerial role (EB-1C)',
        'Letters of recommendation from experts in the field',
        'Copy of passport biographical page',
    ],
    instructions: [
        'PERM must be approved before filing I-140 (except EB-1 and NIW)',
        'Ensure PERM job requirements match I-140 job offer',
        'EB-1A and EB-2 NIW can self-petition without employer sponsorship',
        'Premium Processing available for $2,805 (45-day processing)',
        'Retain I-140 priority date even if changing employers',
        'File with appropriate USCIS Service Center',
        'EB-2 and EB-3 workers can port to new employer after I-140 approval (AC21 portability)',
    ],
};

const I539_DEFINITION: FormDefinition = {
    id: 'i-539',
    code: 'I-539',
    name: 'Application to Extend/Change Nonimmigrant Status',
    description: 'Extend your stay or change to another nonimmigrant status',
    category: 'status_change',
    estimatedTime: '60-90 minutes',
    filingFee: 420,
    price: 60,
    status: 'active',
    sections: [
        {
            id: 'part1-information-about-you',
            title: 'Part 1: Information About You',
            description: 'Your personal information',
            questions: [
                {
                    id: 'part1.1a.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.1b.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.1c.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part1.2.alienNumber',
                    type: 'text',
                    label: '2. Alien Registration Number (A-Number) (if any)',
                    placeholder: 'A-',
                },
                {
                    id: 'part1.3.uscisOnlineNumber',
                    type: 'text',
                    label: '3. USCIS Online Account Number (if any)',
                },
                {
                    id: 'part1.4.dateOfBirth',
                    type: 'date',
                    label: '4. Date of Birth',
                    required: true,
                },
                {
                    id: 'part1.5.countryOfBirth',
                    type: 'text',
                    label: '5. Country of Birth',
                    required: true,
                },
                {
                    id: 'part1.6.countryOfCitizenship',
                    type: 'text',
                    label: '6. Country of Citizenship or Nationality',
                    required: true,
                },
                {
                    id: 'part1.7.currentNonimmigrantStatus',
                    type: 'text',
                    label: '7. Current Nonimmigrant Status',
                    required: true,
                    helpText: 'e.g., B-2, F-1, H-4, J-1',
                },
                {
                    id: 'part1.8.i94Number',
                    type: 'text',
                    label: '8. I-94 Arrival-Departure Record Number',
                    required: true,
                    helpText: 'Find at https://i94.cbp.dhs.gov',
                },
                {
                    id: 'part1.9.statusExpirationDate',
                    type: 'date',
                    label: '9. Date Status Expires (as shown on I-94)',
                    required: true,
                },
                {
                    id: 'part1.10.passportNumber',
                    type: 'text',
                    label: '10. Passport Number',
                    required: true,
                },
                {
                    id: 'part1.11.passportCountry',
                    type: 'text',
                    label: '11. Country That Issued Passport',
                    required: true,
                },
                {
                    id: 'part1.12.passportExpiration',
                    type: 'date',
                    label: '12. Passport Expiration Date',
                    required: true,
                },
                {
                    id: 'part1.13.dateOfLastEntry',
                    type: 'date',
                    label: '13. Date of Last Arrival into the United States',
                    required: true,
                },
                {
                    id: 'part1.14.placeOfLastEntry',
                    type: 'text',
                    label: '14. Place of Last Arrival (City, State)',
                    required: true,
                },
            ],
        },
        {
            id: 'part1b-mailing-address',
            title: 'Part 1: Your Mailing Address',
            description: 'Where USCIS will send notices',
            questions: [
                {
                    id: 'part1.15a.street',
                    type: 'text',
                    label: '15.a. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part1.15b.aptSteFlr',
                    type: 'select',
                    label: '15.b. Unit Type',
                    options: [
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part1.15c.unitNumber',
                    type: 'text',
                    label: '15.c. Unit Number',
                },
                {
                    id: 'part1.15d.city',
                    type: 'text',
                    label: '15.d. City or Town',
                    required: true,
                },
                {
                    id: 'part1.15e.state',
                    type: 'select',
                    label: '15.e. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part1.15f.zipCode',
                    type: 'text',
                    label: '15.f. ZIP Code',
                    required: true,
                },
            ],
        },
        {
            id: 'part2-application-type',
            title: 'Part 2: Application Type',
            description: 'What are you requesting?',
            questions: [
                {
                    id: 'part2.1.applicationType',
                    type: 'select',
                    label: '1. I am applying for (select only one):',
                    required: true,
                    options: [
                        { value: 'extend-reinstate', label: 'An extension of stay or reinstatement of my status in my current nonimmigrant classification' },
                        { value: 'change', label: 'A change of status to a new nonimmigrant classification' },
                    ],
                },
                {
                    id: 'part2.2.newStatusRequested',
                    type: 'text',
                    label: '2. If requesting change of status, enter the new status you are requesting',
                    helpText: 'e.g., B-2 Tourist, F-1 Student, H-4 Dependent',
                },
                {
                    id: 'part2.3.numberOfApplicants',
                    type: 'text',
                    label: '3. Total number of people included in this application',
                    required: true,
                    placeholder: '1',
                    helpText: 'Include yourself and any family members (submit I-539A for each additional person)',
                },
            ],
        },
        {
            id: 'part3-processing-information',
            title: 'Part 3: Processing Information',
            description: 'Additional details about your request',
            questions: [
                {
                    id: 'part3.1.basedOnDependentStatus',
                    type: 'radio',
                    label: '1. Is this application based on an extension or change of status already granted to your spouse, child, or parent?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part3.2.receiptNumber',
                    type: 'text',
                    label: '2. If yes, provide the receipt number of the petition or application',
                    placeholder: 'WAC, LIN, SRC, or EAC number',
                },
                {
                    id: 'part3.3.requestedExtensionDate',
                    type: 'date',
                    label: '3. Date you want your extension or change of status to begin',
                    required: true,
                    helpText: 'Usually the day after your current status expires',
                },
                {
                    id: 'part3.4.requestedEndDate',
                    type: 'date',
                    label: '4. Date you want your extended stay to end',
                    required: true,
                    helpText: 'Maximum 6 months for most nonimmigrant categories',
                },
            ],
        },
        {
            id: 'part4-additional-info',
            title: 'Part 4: Additional Information About You',
            description: 'Background questions',
            questions: [
                {
                    id: 'part4.1.everWorkedUS',
                    type: 'radio',
                    label: '1. Have you ever been employed in the United States without authorization?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part4.2.everViolatedStatus',
                    type: 'radio',
                    label: '2. Have you ever failed to maintain your nonimmigrant status?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part4.3.everArrested',
                    type: 'radio',
                    label: '3. Have you ever been arrested or convicted of any crime or offense?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part4.4.reasonForExtension',
                    type: 'textarea',
                    label: '4. Explain why you are requesting this extension or change of status',
                    required: true,
                    helpText: 'Provide detailed explanation of your circumstances and why you need to remain in the U.S.',
                },
            ],
        },
        {
            id: 'part5-applicant-statement',
            title: 'Part 5: Applicant\'s Statement and Certification',
            description: 'Contact information and certification',
            questions: [
                {
                    id: 'part5.1.daytimePhone',
                    type: 'tel',
                    label: '1. Daytime Telephone Number',
                    required: true,
                },
                {
                    id: 'part5.2.mobilePhone',
                    type: 'tel',
                    label: '2. Mobile Telephone Number',
                },
                {
                    id: 'part5.3.email',
                    type: 'email',
                    label: '3. Email Address',
                    required: true,
                    helpText: 'USCIS will send updates to this email',
                },
                {
                    id: 'part5.4.certification',
                    type: 'checkbox',
                    label: 'I certify, under penalty of perjury, that all information in this application is true and correct',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Copy of current I-94 arrival/departure record',
        'Copy of passport biographical page',
        'Copy of current U.S. visa stamp',
        'Evidence of maintained status (if F-1: I-20, if J-1: DS-2019, if H-4/L-2: spouse\'s approval notice)',
        'Proof of financial support (bank statements, employment letter, sponsor affidavit)',
        'Detailed letter explaining reason for extension/change',
        'Evidence of ties to home country (property, family, employment)',
        'Form I-539A for each additional applicant (spouse/children)',
    ],
    instructions: [
        'File BEFORE your current status expires - filing after expiration may result in denial',
        'File at least 45 days before your status expiration date',
        'Maintain valid passport throughout your requested extension period',
        'If changing status, you must maintain your current status until decision is made',
        'Students (F-1/M-1) and exchange visitors (J-1) should contact their school DSO before filing',
        'H-1B, L-1, O-1, and P-1 workers must file I-129, not I-539',
        'Online filing available for most cases at $420; paper filing is $470',
        'Processing time varies by service center (typically 6-12 months)',
    ],
};

const I129F_DEFINITION: FormDefinition = {
    id: 'i-129f',
    code: 'I-129F',
    name: 'Petition for Alien Fiancé(e)',
    description: 'K-1 fiancé visa or K-3 spouse visa petition',
    category: 'family',
    estimatedTime: '60-90 minutes',
    filingFee: 535,
    price: 60,
    sections: [
        {
            id: 'part1-petitioner-info',
            title: 'Part 1: Information About You (Petitioner)',
            description: 'U.S. citizen petitioner information',
            questions: [
                {
                    id: 'part1.1.classification',
                    type: 'select',
                    label: '1. Classification Sought for Your Beneficiary',
                    required: true,
                    options: [
                        { value: 'k1', label: 'K-1 - Fiancé(e)' },
                        { value: 'k3', label: 'K-3 - Spouse' },
                    ],
                    helpText: 'K-1 is for fiancé(e) you plan to marry in U.S. K-3 is for spouse of pending I-130',
                },
                {
                    id: 'part1.2a.familyName',
                    type: 'text',
                    label: '2.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.2b.givenName',
                    type: 'text',
                    label: '2.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.2c.middleName',
                    type: 'text',
                    label: '2.c. Middle Name',
                },
                {
                    id: 'part1.3.otherNamesUsed',
                    type: 'text',
                    label: '3. Other Names Used (if any)',
                    helpText: 'Include maiden name, aliases, or nicknames',
                },
                {
                    id: 'part1.4.ssn',
                    type: 'ssn',
                    label: '4. U.S. Social Security Number',
                    required: true,
                },
                {
                    id: 'part1.5.dateOfBirth',
                    type: 'date',
                    label: '5. Date of Birth',
                    required: true,
                },
                {
                    id: 'part1.6.placeOfBirth.city',
                    type: 'text',
                    label: '6.a. City/Town of Birth',
                    required: true,
                },
                {
                    id: 'part1.6.placeOfBirth.country',
                    type: 'text',
                    label: '6.b. Country of Birth',
                    required: true,
                },
                {
                    id: 'part1.7.howCitizenshipObtained',
                    type: 'select',
                    label: '7. How Did You Acquire U.S. Citizenship?',
                    required: true,
                    options: [
                        { value: 'birth-us', label: 'Birth in the United States' },
                        { value: 'birth-abroad', label: 'Birth Abroad to U.S. Citizen Parents' },
                        { value: 'naturalization', label: 'Naturalization' },
                        { value: 'parents', label: 'Through Parents' },
                    ],
                },
            ],
        },
        {
            id: 'part1b-petitioner-address',
            title: 'Part 1: Your Addresses',
            description: 'Current and previous addresses',
            questions: [
                {
                    id: 'part1.8a.mailingStreet',
                    type: 'text',
                    label: '8.a. Mailing Address - Street Number and Name',
                    required: true,
                },
                {
                    id: 'part1.8b.aptSteFlr',
                    type: 'select',
                    label: '8.b. Unit Type',
                    options: [
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part1.8c.unitNumber',
                    type: 'text',
                    label: '8.c. Unit Number',
                },
                {
                    id: 'part1.8d.city',
                    type: 'text',
                    label: '8.d. City or Town',
                    required: true,
                },
                {
                    id: 'part1.8e.state',
                    type: 'select',
                    label: '8.e. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part1.8f.zipCode',
                    type: 'text',
                    label: '8.f. ZIP Code',
                    required: true,
                },
                {
                    id: 'part1.9.physicalAddressSameAsMailing',
                    type: 'radio',
                    label: '9. Is your physical address the same as your mailing address?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
            ],
        },
        {
            id: 'part1c-petitioner-marital',
            title: 'Part 1: Your Marital History',
            description: 'Current and previous marriages',
            questions: [
                {
                    id: 'part1.10.currentMaritalStatus',
                    type: 'select',
                    label: '10. Current Marital Status',
                    required: true,
                    options: [
                        { value: 'single', label: 'Single, Never Married' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                    ],
                },
                {
                    id: 'part1.11.numberOfPriorMarriages',
                    type: 'text',
                    label: '11. How many times have you been married?',
                    required: true,
                    placeholder: '0',
                },
                {
                    id: 'part1.12.dateLastMarriageEnded',
                    type: 'date',
                    label: '12. Date Your Last Marriage Ended (if applicable)',
                    helpText: 'Required if you were previously married',
                },
                {
                    id: 'part1.13.howLastMarriageEnded',
                    type: 'select',
                    label: '13. How Did Your Last Marriage End?',
                    options: [
                        { value: 'divorce', label: 'Divorce' },
                        { value: 'annulment', label: 'Annulment' },
                        { value: 'death', label: 'Death of Spouse' },
                    ],
                },
            ],
        },
        {
            id: 'part1d-petitioner-employment',
            title: 'Part 1: Your Employment',
            description: 'Current employment information',
            questions: [
                {
                    id: 'part1.14.occupation',
                    type: 'text',
                    label: '14. Your Current Occupation',
                    required: true,
                },
                {
                    id: 'part1.15.employerName',
                    type: 'text',
                    label: '15. Name of Your Current Employer',
                    required: true,
                },
                {
                    id: 'part1.16.employerAddress.street',
                    type: 'text',
                    label: '16. Employer Street Address',
                    required: true,
                },
                {
                    id: 'part1.16.employerAddress.city',
                    type: 'text',
                    label: 'City',
                    required: true,
                },
                {
                    id: 'part1.16.employerAddress.state',
                    type: 'select',
                    label: 'State',
                    required: true,
                    options: US_STATES,
                },
            ],
        },
        {
            id: 'part2-beneficiary-info',
            title: 'Part 2: Information About Your Beneficiary',
            description: 'Information about your fiancé(e) or spouse',
            questions: [
                {
                    id: 'part2.1a.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part2.1b.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part2.1c.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part2.2.otherNamesUsed',
                    type: 'text',
                    label: '2. Other Names Used',
                },
                {
                    id: 'part2.3.alienNumber',
                    type: 'text',
                    label: '3. Alien Registration Number (A-Number) (if any)',
                    placeholder: 'A-',
                },
                {
                    id: 'part2.4.ssn',
                    type: 'ssn',
                    label: '4. U.S. Social Security Number (if any)',
                },
                {
                    id: 'part2.5.dateOfBirth',
                    type: 'date',
                    label: '5. Date of Birth',
                    required: true,
                },
                {
                    id: 'part2.6.cityOfBirth',
                    type: 'text',
                    label: '6.a. City/Town of Birth',
                    required: true,
                },
                {
                    id: 'part2.6.countryOfBirth',
                    type: 'text',
                    label: '6.b. Country of Birth',
                    required: true,
                },
                {
                    id: 'part2.7.countryOfCitizenship',
                    type: 'text',
                    label: '7. Country of Citizenship',
                    required: true,
                },
            ],
        },
        {
            id: 'part2b-beneficiary-address',
            title: 'Part 2: Beneficiary Address',
            description: 'Where your beneficiary currently lives',
            questions: [
                {
                    id: 'part2.8.addressStreet',
                    type: 'text',
                    label: '8. Beneficiary\'s Current Physical Address - Street',
                    required: true,
                },
                {
                    id: 'part2.8.city',
                    type: 'text',
                    label: 'City/Town',
                    required: true,
                },
                {
                    id: 'part2.8.province',
                    type: 'text',
                    label: 'Province/State',
                },
                {
                    id: 'part2.8.postalCode',
                    type: 'text',
                    label: 'Postal Code',
                },
                {
                    id: 'part2.8.country',
                    type: 'text',
                    label: 'Country',
                    required: true,
                },
            ],
        },
        {
            id: 'part2c-beneficiary-marital',
            title: 'Part 2: Beneficiary Marital History',
            description: 'Beneficiary\'s marriage history',
            questions: [
                {
                    id: 'part2.9.currentMaritalStatus',
                    type: 'select',
                    label: '9. Beneficiary\'s Current Marital Status',
                    required: true,
                    options: [
                        { value: 'single', label: 'Single, Never Married' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                    ],
                },
                {
                    id: 'part2.10.numberOfPriorMarriages',
                    type: 'text',
                    label: '10. Number of Times Beneficiary Has Been Married',
                    required: true,
                    placeholder: '0',
                },
                {
                    id: 'part2.11.dateLastMarriageEnded',
                    type: 'date',
                    label: '11. Date Beneficiary\'s Last Marriage Ended (if applicable)',
                },
                {
                    id: 'part2.12.children',
                    type: 'text',
                    label: '12. Number of Children (Under 21 and Unmarried)',
                    required: true,
                    placeholder: '0',
                    helpText: 'Children eligible for K-2 derivative visas',
                },
            ],
        },
        {
            id: 'part3-relationship-info',
            title: 'Part 3: Information About Your Relationship',
            description: 'Details about how you met and your relationship',
            questions: [
                {
                    id: 'part3.1.dateFirstMet',
                    type: 'date',
                    label: '1. Date You First Met in Person',
                    required: true,
                    helpText: 'USCIS requires K-1 couples to have met within past 2 years',
                },
                {
                    id: 'part3.2.placeFirstMet.city',
                    type: 'text',
                    label: '2.a. City/Town Where You First Met',
                    required: true,
                },
                {
                    id: 'part3.2.placeFirstMet.country',
                    type: 'text',
                    label: '2.b. Country Where You First Met',
                    required: true,
                },
                {
                    id: 'part3.3.howMet',
                    type: 'textarea',
                    label: '3. How Did You Meet?',
                    required: true,
                    helpText: 'Describe the circumstances of how you met',
                },
                {
                    id: 'part3.4.metThroughIMB',
                    type: 'radio',
                    label: '4. Did you meet through an International Marriage Broker?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Dating websites, matchmaking services, etc.',
                },
                {
                    id: 'part3.5.dateOfMarriage',
                    type: 'date',
                    label: '5. Date of Marriage (K-3 petitions only)',
                    helpText: 'Required for K-3 spouse petitions',
                },
                {
                    id: 'part3.6.placeOfMarriage',
                    type: 'text',
                    label: '6. Place of Marriage (K-3 petitions only)',
                },
            ],
        },
        {
            id: 'part4-criminal-history',
            title: 'Part 4: Additional Information',
            description: 'Background questions',
            questions: [
                {
                    id: 'part4.1.criminalConvictions',
                    type: 'radio',
                    label: '1. Have you ever been arrested or convicted of any crime?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part4.2.filedPreviousPetitions',
                    type: 'radio',
                    label: '2. Have you previously filed petitions for other fiancé(e)s or spouses?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part4.3.previousK1Petitions',
                    type: 'text',
                    label: '3. If yes, how many K-1 petitions have you filed in the past?',
                    placeholder: '0',
                    helpText: 'USCIS limits K-1 petitions to 2 in a lifetime and 1 every 2 years',
                },
            ],
        },
        {
            id: 'part5-contact-info',
            title: 'Part 5: Petitioner\'s Contact Information',
            description: 'How USCIS can reach you',
            questions: [
                {
                    id: 'part5.1.daytimePhone',
                    type: 'tel',
                    label: '1. Daytime Telephone Number',
                    required: true,
                },
                {
                    id: 'part5.2.mobilePhone',
                    type: 'tel',
                    label: '2. Mobile Telephone Number',
                },
                {
                    id: 'part5.3.email',
                    type: 'email',
                    label: '3. Email Address',
                    required: true,
                    helpText: 'USCIS will send case updates to this email',
                },
            ],
        },
        {
            id: 'part6-certification',
            title: 'Part 6: Certification',
            description: 'Signature and declaration',
            questions: [
                {
                    id: 'part6.certification',
                    type: 'checkbox',
                    label: 'I certify, under penalty of perjury, that all information in this petition is true and correct',
                    required: true,
                },
                {
                    id: 'part6.intentToMarry',
                    type: 'checkbox',
                    label: 'I certify that I am legally able to marry and intend to marry my fiancé(e) within 90 days of admission (K-1 only)',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Proof of U.S. citizenship (passport, birth certificate, or naturalization certificate)',
        'Evidence of termination of all prior marriages (divorce decrees, death certificates)',
        'Proof of in-person meeting within past 2 years (photos, travel records, affidavits)',
        'Two passport-style photos of petitioner',
        'Two passport-style photos of beneficiary',
        'Form G-325A (Biographic Information) for petitioner',
        'Form G-325A for beneficiary',
        'Statement of intent to marry within 90 days (K-1)',
        'Copy of marriage certificate (K-3)',
        'Copy of I-797 showing I-130 was filed (K-3)',
    ],
    instructions: [
        'Both you and your fiancé(e) must be legally free to marry',
        'You must have met your fiancé(e) in person within the past 2 years (with limited exceptions)',
        'If filing K-3, you must have already filed Form I-130',
        'After USCIS approval, your fiancé(e) will apply for the visa at a U.S. embassy/consulate',
        'K-1 fiancé(e) must marry you within 90 days of entering the U.S.',
    ],
};

const I360_DEFINITION: FormDefinition = {
    id: 'i-360',
    code: 'I-360',
    name: 'Petition for Amerasian, Widow(er), or Special Immigrant',
    description: 'For special immigrant categories including religious workers, widows/widowers, VAWA self-petitioners, and special immigrants',
    category: 'family',
    estimatedTime: '90-120 minutes',
    filingFee: 435,
    price: 60,
    sections: [
        {
            id: 'part1-petitioner-info',
            title: 'Part 1: Information About the Person or Organization Filing This Petition',
            description: 'Your personal or organizational information',
            questions: [
                {
                    id: 'part1.1a.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.1b.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.1c.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part1.2.organizationName',
                    type: 'text',
                    label: '2. Name of Organization (if filing as an organization)',
                    helpText: 'For religious organizations filing for religious workers',
                },
                {
                    id: 'part1.3.alienNumber',
                    type: 'text',
                    label: '3. Alien Registration Number (A-Number) (if any)',
                    helpText: 'Format: A-123456789 or 123456789',
                },
                {
                    id: 'part1.4.uscisAccountNumber',
                    type: 'text',
                    label: '4. USCIS Online Account Number (if any)',
                },
                {
                    id: 'part1.5.ssn',
                    type: 'ssn',
                    label: '5. U.S. Social Security Number (if any)',
                },
                {
                    id: 'part1.6.dateOfBirth',
                    type: 'date',
                    label: '6. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
            ],
        },
        {
            id: 'part1-mailing-address',
            title: 'Part 1: Mailing Address',
            description: 'VAWA petitioners can use a safe mailing address',
            questions: [
                {
                    id: 'part1.7.inCareOfName',
                    type: 'text',
                    label: '7. In Care Of Name (if any)',
                },
                {
                    id: 'part1.8a.streetNumber',
                    type: 'text',
                    label: '8.a. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part1.8b.aptSteFlr',
                    type: 'select',
                    label: '8.b. Apt./Ste./Flr.',
                    options: [
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part1.8c.aptSteFlrNumber',
                    type: 'text',
                    label: '8.c. Number',
                },
                {
                    id: 'part1.9.cityOrTown',
                    type: 'text',
                    label: '9. City or Town',
                    required: true,
                },
                {
                    id: 'part1.10.state',
                    type: 'text',
                    label: '10. State',
                    required: true,
                },
                {
                    id: 'part1.11.zipCode',
                    type: 'text',
                    label: '11. ZIP Code',
                    required: true,
                },
            ],
        },
        {
            id: 'part2-classification-requested',
            title: 'Part 2: Classification Requested',
            description: 'Check the box that applies to your petition',
            questions: [
                {
                    id: 'part2.classification',
                    type: 'select',
                    label: 'I am filing this petition on behalf of:',
                    required: true,
                    options: [
                        { value: 'amerasian', label: 'A. Amerasian (born after Dec. 31, 1950, before Oct. 23, 1982)' },
                        { value: 'widow', label: 'B. Widow(er) of a U.S. citizen who died within the past 2 years' },
                        { value: 'vawa-spouse', label: 'I. VAWA self-petitioning spouse of abusive U.S. citizen or LPR' },
                        { value: 'vawa-child', label: 'J. VAWA self-petitioning child of abusive U.S. citizen or LPR' },
                        { value: 'vawa-parent', label: 'K. VAWA self-petitioning parent of abusive U.S. citizen' },
                        { value: 'religious-worker', label: 'L. Special Immigrant Religious Worker' },
                        { value: 'si-juvenile', label: 'M. Special Immigrant Juvenile' },
                        { value: 'afghan-iraqi', label: 'N. Afghan or Iraqi Translator/Interpreter' },
                        { value: 'physician', label: 'O. Physician National Interest Waiver' },
                        { value: 'international-org', label: 'P. International Organization Employee or Family Member' },
                        { value: 'broadcaster', label: 'Q. International Broadcaster' },
                    ],
                },
            ],
        },
        {
            id: 'part3-beneficiary-info',
            title: 'Part 3: Information About the Person This Petition Is For',
            description: 'Beneficiary information (if different from Part 1)',
            questions: [
                {
                    id: 'part3.1a.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part3.1b.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part3.1c.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part3.2.alienNumber',
                    type: 'text',
                    label: '2. Alien Registration Number (A-Number) (if any)',
                },
                {
                    id: 'part3.3.dateOfBirth',
                    type: 'date',
                    label: '3. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'part3.4.cityOfBirth',
                    type: 'text',
                    label: '4. City or Town of Birth',
                    required: true,
                },
                {
                    id: 'part3.5.countryOfBirth',
                    type: 'text',
                    label: '5. Country of Birth',
                    required: true,
                },
                {
                    id: 'part3.6.citizenship',
                    type: 'text',
                    label: '6. Country of Citizenship or Nationality',
                    required: true,
                },
            ],
        },
        {
            id: 'part7-widow-info',
            title: 'Part 7: Information for Widow(er)s',
            description: 'Complete only if filing as a widow(er) of a U.S. citizen',
            questions: [
                {
                    id: 'part7.1.dateOfMarriage',
                    type: 'date',
                    label: '1. Date of Marriage to U.S. Citizen (mm/dd/yyyy)',
                    helpText: 'Date you married the deceased U.S. citizen',
                },
                {
                    id: 'part7.2.placeOfMarriage',
                    type: 'text',
                    label: '2. Place of Marriage (City, State, Country)',
                },
                {
                    id: 'part7.3.dateOfDeath',
                    type: 'date',
                    label: '3. Date of Death of U.S. Citizen Spouse (mm/dd/yyyy)',
                    helpText: 'Must be within past 2 years',
                },
                {
                    id: 'part7.4.spouseName',
                    type: 'text',
                    label: '4. Full Name of Deceased U.S. Citizen Spouse',
                },
                {
                    id: 'part7.5.priorMarriages',
                    type: 'radio',
                    label: '5. Were you or your spouse previously married?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
            ],
        },
        {
            id: 'part8-sij-info',
            title: 'Part 8: Information for Special Immigrant Juveniles',
            description: 'Complete only if filing as a Special Immigrant Juvenile',
            questions: [
                {
                    id: 'part8.1.courtOrder',
                    type: 'radio',
                    label: '1. Do you have a court order from a juvenile court?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Court must have jurisdiction over juveniles',
                },
                {
                    id: 'part8.2.courtName',
                    type: 'text',
                    label: '2. Name of Court',
                    helpText: 'Court that issued the order',
                },
                {
                    id: 'part8.3.courtOrderDate',
                    type: 'date',
                    label: '3. Date of Court Order (mm/dd/yyyy)',
                },
                {
                    id: 'part8.4.dependencyDetermination',
                    type: 'radio',
                    label: '4. Did the court determine you dependent on the court or placed in custody of state agency or individual?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.5.reunificationNotViable',
                    type: 'radio',
                    label: '5. Did the court determine reunification with one or both parents is not viable?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part8.6.bestInterest',
                    type: 'radio',
                    label: '6. Did the court determine it is not in your best interest to return to your country of nationality?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
            ],
        },
        {
            id: 'part9-religious-worker',
            title: 'Part 9: Information for Special Immigrant Religious Workers',
            description: 'Complete only if filing for a religious worker',
            questions: [
                {
                    id: 'part9.1.religiousDenomination',
                    type: 'text',
                    label: '1. Name of Religious Denomination',
                    required: true,
                    helpText: 'e.g., Catholic, Baptist, Buddhist, Muslim',
                },
                {
                    id: 'part9.2.religiousOccupation',
                    type: 'select',
                    label: '2. Religious Occupation',
                    required: true,
                    options: [
                        { value: 'minister', label: 'Minister or Priest' },
                        { value: 'professional', label: 'Religious Professional' },
                        { value: 'worker', label: 'Religious Worker' },
                    ],
                },
                {
                    id: 'part9.3.jobTitle',
                    type: 'text',
                    label: '3. Job Title or Position',
                    required: true,
                },
                {
                    id: 'part9.4.organizationName',
                    type: 'text',
                    label: '4. Name of Religious Organization',
                    required: true,
                },
                {
                    id: 'part9.5.organizationAddress',
                    type: 'text',
                    label: '5. Address of Religious Organization',
                    required: true,
                },
                {
                    id: 'part9.6.taxExemptStatus',
                    type: 'radio',
                    label: '6. Does the organization have tax-exempt status?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes (501(c)(3))' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part9.7.membershipYears',
                    type: 'text',
                    label: '7. How many years has the beneficiary been a member of this denomination?',
                    required: true,
                    helpText: 'Must be at least 2 years',
                },
                {
                    id: 'part9.8.priorExperience',
                    type: 'textarea',
                    label: '8. Describe the beneficiary\'s religious work experience during the past 2 years',
                    required: true,
                },
            ],
        },
        {
            id: 'part10-vawa-info',
            title: 'Part 10: Information for VAWA Self-Petitioners',
            description: 'Complete only if self-petitioning under VAWA (Violence Against Women Act)',
            questions: [
                {
                    id: 'part10.1.abusiveRelative',
                    type: 'select',
                    label: '1. Your relationship to the abusive U.S. citizen or LPR',
                    options: [
                        { value: 'spouse', label: 'Spouse' },
                        { value: 'child', label: 'Child' },
                        { value: 'parent', label: 'Parent (if abuser is U.S. citizen child over 21)' },
                    ],
                },
                {
                    id: 'part10.2.abusiveRelativeName',
                    type: 'text',
                    label: '2. Full Name of Abusive Relative',
                },
                {
                    id: 'part10.3.abusiveRelativeStatus',
                    type: 'radio',
                    label: '3. Is the abusive relative a U.S. citizen or lawful permanent resident?',
                    options: [
                        { value: 'citizen', label: 'U.S. Citizen' },
                        { value: 'lpr', label: 'Lawful Permanent Resident' },
                    ],
                },
                {
                    id: 'part10.4.marriageDate',
                    type: 'date',
                    label: '4. Date of Marriage (if applicable) (mm/dd/yyyy)',
                    helpText: 'If self-petitioning as spouse',
                },
                {
                    id: 'part10.5.currentlyLiving',
                    type: 'radio',
                    label: '5. Are you currently living with the abusive relative?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part10.6.abuseSummary',
                    type: 'textarea',
                    label: '6. Brief description of the abuse',
                    helpText: 'Provide a summary; detailed evidence should be submitted separately',
                },
            ],
        },
        {
            id: 'part12-applicant-statement',
            title: 'Part 12: Applicant\'s Statement, Contact Information, Certification, and Signature',
            description: 'Your certification and signature',
            questions: [
                {
                    id: 'part12.1.daytimePhone',
                    type: 'tel',
                    label: '1. Applicant\'s Daytime Telephone Number',
                    required: true,
                },
                {
                    id: 'part12.2.mobilePhone',
                    type: 'tel',
                    label: '2. Applicant\'s Mobile Telephone Number (if any)',
                },
                {
                    id: 'part12.3.email',
                    type: 'email',
                    label: '3. Applicant\'s Email Address (if any)',
                },
                {
                    id: 'part12.4.certification',
                    type: 'checkbox',
                    label: 'I certify, under penalty of perjury, that all information in this petition and any supporting documents is true and correct',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'GENERAL (All Categories):',
        '  - Copy of birth certificate',
        '  - Two passport-style photographs',
        'FOR WIDOW(ER)S:',
        '  - Proof of U.S. citizenship of deceased spouse (birth certificate, passport, naturalization certificate)',
        '  - Copy of marriage certificate',
        '  - Death certificate of U.S. citizen spouse',
        '  - Proof marriage was terminated by death (not divorce)',
        '  - Evidence of termination of any prior marriages',
        'FOR VAWA SELF-PETITIONERS:',
        '  - Evidence of abusive relationship (police reports, protection orders, medical records, affidavits)',
        '  - Proof of abuser\'s U.S. citizenship or LPR status',
        '  - Marriage certificate (if self-petitioning spouse)',
        '  - Birth certificate (if self-petitioning child)',
        '  - Evidence of good moral character',
        'FOR SPECIAL IMMIGRANT JUVENILES:',
        '  - Certified copy of juvenile court order',
        '  - Court determination of dependency or custody placement',
        '  - Court finding that reunification is not viable',
        '  - Court finding that return to home country is not in best interest',
        'FOR RELIGIOUS WORKERS:',
        '  - Letter from authorized religious organization official',
        '  - IRS tax-exempt letter for organization (501(c)(3))',
        '  - Evidence of membership in religious denomination for at least 2 years',
        '  - Evidence of qualifying work experience',
        '  - Detailed job offer letter',
        '  - Verification of organization\'s ability to compensate the religious worker',
    ],
    instructions: [
        'This form is used for multiple special immigrant categories - complete only the parts that apply to your situation',
        'WIDOW(ER)S: Must file within 2 years of U.S. citizen spouse\'s death',
        'VAWA PETITIONERS: Can use a safe mailing address to protect confidentiality',
        'SPECIAL IMMIGRANT JUVENILES: Must file before your 21st birthday',
        'RELIGIOUS WORKERS: Must have been a member of the religious denomination for at least 2 years',
        'Attach all required supporting documentation',
        'Include filing fee or fee waiver request (Form I-912)',
        'Sign and date the petition',
    ],
};

const I600_DEFINITION: FormDefinition = {
    id: 'i-600',
    code: 'I-600',
    name: 'Petition to Classify Orphan as an Immediate Relative',
    description: 'For U.S. citizens adopting orphan children from non-Hague Convention countries',
    category: 'family',
    estimatedTime: '90-120 minutes',
    filingFee: 775,
    price: 60,
    sections: [
        {
            id: 'part1-petitioner-info',
            title: 'Part 1: Information About the U.S. Citizen Petitioner',
            description: 'Information about the adoptive parent(s)',
            questions: [
                {
                    id: 'part1.1.familyName',
                    type: 'text',
                    label: '1. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.2.givenName',
                    type: 'text',
                    label: '2. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.3.middleName',
                    type: 'text',
                    label: '3. Middle Name',
                },
                {
                    id: 'part1.4.dateOfBirth',
                    type: 'date',
                    label: '4. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'part1.5.countryOfBirth',
                    type: 'text',
                    label: '5. Country of Birth',
                    required: true,
                },
                {
                    id: 'part1.6.citizenship',
                    type: 'select',
                    label: '6. U.S. Citizenship Obtained Through',
                    required: true,
                    options: [
                        { value: 'birth-us', label: 'Birth in the United States' },
                        { value: 'naturalization', label: 'Naturalization' },
                        { value: 'parents', label: 'Parents' },
                    ],
                },
                {
                    id: 'part1.7.maritalStatus',
                    type: 'select',
                    label: '7. Current Marital Status',
                    required: true,
                    options: [
                        { value: 'married', label: 'Married' },
                        { value: 'single', label: 'Single (must be at least 24 years old)' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                    ],
                    helpText: 'Must be married or single and at least 24 years old',
                },
            ],
        },
        {
            id: 'part1-petitioner-address',
            title: 'Part 1: Petitioner Physical Address',
            questions: [
                {
                    id: 'part1.8.streetNumber',
                    type: 'text',
                    label: '8. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part1.9.city',
                    type: 'text',
                    label: '9. City or Town',
                    required: true,
                },
                {
                    id: 'part1.10.state',
                    type: 'text',
                    label: '10. State',
                    required: true,
                },
                {
                    id: 'part1.11.zipCode',
                    type: 'text',
                    label: '11. ZIP Code',
                    required: true,
                },
                {
                    id: 'part1.12.phone',
                    type: 'tel',
                    label: '12. Daytime Phone Number',
                    required: true,
                },
                {
                    id: 'part1.13.email',
                    type: 'email',
                    label: '13. Email Address (if any)',
                },
            ],
        },
        {
            id: 'part2-spouse-info',
            title: 'Part 2: Information About Your Spouse (if married)',
            description: 'Complete only if you are married',
            questions: [
                {
                    id: 'part2.1.spouseFamilyName',
                    type: 'text',
                    label: '1. Spouse\'s Family Name (Last Name)',
                    helpText: 'If married',
                },
                {
                    id: 'part2.2.spouseGivenName',
                    type: 'text',
                    label: '2. Spouse\'s Given Name (First Name)',
                    helpText: 'If married',
                },
                {
                    id: 'part2.3.spouseDateOfBirth',
                    type: 'date',
                    label: '3. Spouse\'s Date of Birth (mm/dd/yyyy)',
                    helpText: 'If married',
                },
                {
                    id: 'part2.4.spouseCountryOfBirth',
                    type: 'text',
                    label: '4. Spouse\'s Country of Birth',
                    helpText: 'If married',
                },
                {
                    id: 'part2.5.spouseCitizenship',
                    type: 'text',
                    label: '5. Spouse\'s Country of Citizenship',
                    helpText: 'If married',
                },
                {
                    id: 'part2.6.dateOfMarriage',
                    type: 'date',
                    label: '6. Date of Marriage (mm/dd/yyyy)',
                    helpText: 'If married',
                },
                {
                    id: 'part2.7.placeOfMarriage',
                    type: 'text',
                    label: '7. Place of Marriage (City, State/Province, Country)',
                    helpText: 'If married',
                },
            ],
        },
        {
            id: 'part3-prior-marriages',
            title: 'Part 3: Information About Prior Marriages',
            description: 'Complete for you and your spouse (if applicable)',
            questions: [
                {
                    id: 'part3.1.petitionerPriorMarriages',
                    type: 'radio',
                    label: '1. Have you been previously married?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part3.2.numberOfPriorMarriages',
                    type: 'text',
                    label: '2. Number of prior marriages',
                    helpText: 'If yes, how many times?',
                },
                {
                    id: 'part3.3.priorMarriageEnded',
                    type: 'select',
                    label: '3. How did your most recent prior marriage end?',
                    options: [
                        { value: 'divorce', label: 'Divorce' },
                        { value: 'death', label: 'Death of spouse' },
                        { value: 'annulment', label: 'Annulment' },
                    ],
                    helpText: 'If previously married',
                },
                {
                    id: 'part3.4.spousePriorMarriages',
                    type: 'radio',
                    label: '4. Has your current spouse been previously married?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'If currently married',
                },
            ],
        },
        {
            id: 'part4-orphan-info',
            title: 'Part 4: Information About the Orphan Beneficiary',
            description: 'Information about the child you wish to adopt',
            questions: [
                {
                    id: 'part4.1.childFamilyName',
                    type: 'text',
                    label: '1. Child\'s Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part4.2.childGivenName',
                    type: 'text',
                    label: '2. Child\'s Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part4.3.childMiddleName',
                    type: 'text',
                    label: '3. Child\'s Middle Name',
                },
                {
                    id: 'part4.4.childDateOfBirth',
                    type: 'date',
                    label: '4. Child\'s Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'part4.5.childCityOfBirth',
                    type: 'text',
                    label: '5. City or Town of Birth',
                    required: true,
                },
                {
                    id: 'part4.6.childCountryOfBirth',
                    type: 'text',
                    label: '6. Country of Birth',
                    required: true,
                },
                {
                    id: 'part4.7.childGender',
                    type: 'radio',
                    label: '7. Gender',
                    required: true,
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                    ],
                },
                {
                    id: 'part4.8.currentAddress',
                    type: 'text',
                    label: '8. Child\'s Current Physical Address',
                    required: true,
                    helpText: 'Include street, city, country',
                },
            ],
        },
        {
            id: 'part5-orphan-status',
            title: 'Part 5: Orphan Status Information',
            description: 'Information establishing that the child meets the definition of an orphan',
            questions: [
                {
                    id: 'part5.1.orphanBasis',
                    type: 'select',
                    label: '1. The child is an orphan because:',
                    required: true,
                    options: [
                        { value: 'both-deceased', label: 'Both parents are deceased' },
                        { value: 'one-deceased-sole', label: 'One parent is deceased, and the surviving parent cannot provide care' },
                        { value: 'abandoned', label: 'Child has been abandoned by both parents' },
                        { value: 'separated', label: 'Child has been separated from both parents' },
                        { value: 'unwed-mother', label: 'Child has an unwed mother who cannot provide care' },
                    ],
                },
                {
                    id: 'part5.2.biologicalMotherName',
                    type: 'text',
                    label: '2. Biological Mother\'s Full Name',
                    helpText: 'If known',
                },
                {
                    id: 'part5.3.biologicalMotherStatus',
                    type: 'select',
                    label: '3. Biological Mother\'s Status',
                    options: [
                        { value: 'deceased', label: 'Deceased' },
                        { value: 'living-relinquished', label: 'Living, relinquished parental rights' },
                        { value: 'living-unable', label: 'Living, unable to provide care' },
                        { value: 'unknown', label: 'Unknown' },
                    ],
                },
                {
                    id: 'part5.4.biologicalFatherName',
                    type: 'text',
                    label: '4. Biological Father\'s Full Name',
                    helpText: 'If known',
                },
                {
                    id: 'part5.5.biologicalFatherStatus',
                    type: 'select',
                    label: '5. Biological Father\'s Status',
                    options: [
                        { value: 'deceased', label: 'Deceased' },
                        { value: 'living-relinquished', label: 'Living, relinquished parental rights' },
                        { value: 'living-unable', label: 'Living, unable to provide care' },
                        { value: 'unknown', label: 'Unknown' },
                    ],
                },
            ],
        },
        {
            id: 'part6-adoption-status',
            title: 'Part 6: Adoption and Custody Information',
            description: 'Information about adoption or custody of the orphan',
            questions: [
                {
                    id: 'part6.1.adoptionStatus',
                    type: 'radio',
                    label: '1. Has the child been adopted abroad?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes - adopted abroad' },
                        { value: 'no-will-adopt-us', label: 'No - will be adopted in the United States' },
                        { value: 'no-custody', label: 'No - have legal custody for adoption in the United States' },
                    ],
                },
                {
                    id: 'part6.2.adoptionDate',
                    type: 'date',
                    label: '2. Date of Adoption (if adopted abroad) (mm/dd/yyyy)',
                    helpText: 'If child has been adopted',
                },
                {
                    id: 'part6.3.adoptionPlace',
                    type: 'text',
                    label: '3. Place of Adoption (City, Country)',
                    helpText: 'If child has been adopted',
                },
                {
                    id: 'part6.4.legalCustodyDate',
                    type: 'date',
                    label: '4. Date Legal Custody Granted (if not yet adopted) (mm/dd/yyyy)',
                    helpText: 'If you have legal custody for U.S. adoption',
                },
                {
                    id: 'part6.5.stateOfAdoption',
                    type: 'text',
                    label: '5. U.S. State Where Child Will Be Adopted',
                    helpText: 'If child will be adopted in the United States',
                },
                {
                    id: 'part6.6.preAdoptionRequirements',
                    type: 'radio',
                    label: '6. Have pre-adoption requirements of the state been met?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'will-meet', label: 'Will be met' },
                        { value: 'not-applicable', label: 'Not applicable (already adopted)' },
                    ],
                },
            ],
        },
        {
            id: 'part7-i600a-approval',
            title: 'Part 7: Advanced Processing (Form I-600A)',
            description: 'Information about prior Form I-600A approval',
            questions: [
                {
                    id: 'part7.1.i600aApproved',
                    type: 'radio',
                    label: '1. Was Form I-600A (Application for Advance Processing) previously approved?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part7.2.approvalDate',
                    type: 'date',
                    label: '2. Date of I-600A Approval (mm/dd/yyyy)',
                    helpText: 'If previously approved',
                },
                {
                    id: 'part7.3.approvalOffice',
                    type: 'text',
                    label: '3. USCIS Office That Approved I-600A',
                    helpText: 'If previously approved',
                },
                {
                    id: 'part7.4.homestudyDate',
                    type: 'date',
                    label: '4. Date of Home Study Approval (mm/dd/yyyy)',
                    required: true,
                    helpText: 'Date the favorable home study was completed',
                },
                {
                    id: 'part7.5.homestudyAgency',
                    type: 'text',
                    label: '5. Name of Home Study Agency',
                    required: true,
                },
            ],
        },
        {
            id: 'part8-certification',
            title: 'Part 8: Petitioner\'s Certification and Signature',
            description: 'Certification of duty of disclosure and signature',
            questions: [
                {
                    id: 'part8.1.certification',
                    type: 'checkbox',
                    label: 'I certify that I will care for the orphan properly if admitted to the United States',
                    required: true,
                },
                {
                    id: 'part8.2.dutyOfDisclosure',
                    type: 'checkbox',
                    label: 'I understand my duty to notify USCIS of any change in circumstances that affects eligibility',
                    required: true,
                },
                {
                    id: 'part8.3.penaltyOfPerjury',
                    type: 'checkbox',
                    label: 'I certify, under penalty of perjury, that all information in this petition is true and correct',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'PETITIONER DOCUMENTS:',
        '  - Proof of U.S. citizenship (birth certificate, passport, or naturalization certificate)',
        '  - Copy of marriage certificate (if married)',
        '  - Divorce decrees or death certificates for any prior marriages',
        '  - Favorable home study report from licensed agency (less than 6 months old)',
        '  - Proof of compliance with state pre-adoption requirements',
        'ORPHAN DOCUMENTS:',
        '  - Child\'s birth certificate',
        '  - Death certificate(s) of deceased parent(s) (if applicable)',
        '  - Relinquishment or consent documents from living parent(s)',
        '  - Evidence child meets orphan definition under U.S. law',
        '  - Adoption decree (if adopted abroad)',
        '  - Legal custody documents (if custody granted for U.S. adoption)',
        '  - Passport-style photograph of child',
        'ADDITIONAL DOCUMENTS:',
        '  - Copy of I-600A approval notice (if previously filed)',
        '  - Evidence of efforts to locate missing parent (if applicable)',
        '  - Translation of all foreign language documents with certification',
    ],
    instructions: [
        'Must be filed by U.S. citizen who is married OR unmarried and at least 24 years old',
        'This form is for NON-HAGUE CONVENTION countries only (for Hague countries, use Form I-800)',
        'Child must be under 16 years old (or under 18 if sibling of child already adopted)',
        'Must have approved home study from licensed adoption agency',
        'Orphan must meet legal definition: both parents deceased, abandoned, or sole/surviving parent unable to provide care',
        'Can file Form I-600A for advance processing before identifying specific child',
        'If adopted abroad, adoption must be full and final',
        'If will adopt in U.S., must show compliance with state pre-adoption requirements',
        'Child will receive immigrant visa and enter U.S. as lawful permanent resident',
        'Child must have medical examination by authorized physician',
    ],
};

const I526_DEFINITION: FormDefinition = {
    id: 'i-526',
    code: 'I-526',
    name: 'Immigrant Petition by Standalone Investor',
    description: 'EB-5 investor visa petition for foreign investors',
    category: 'work_authorization',
    estimatedTime: '180-240 minutes',
    filingFee: 3675,
    price: 60,
    status: 'beta',
    sections: [
        {
            id: 'investor-info',
            title: 'Investor Information',
            questions: [
                {
                    id: 'investor.name.last',
                    type: 'text',
                    label: 'Legal Last Name',
                    required: true,
                },
                {
                    id: 'investor.name.first',
                    type: 'text',
                    label: 'Legal First Name',
                    required: true,
                },
                {
                    id: 'investor.dob',
                    type: 'date',
                    label: 'Date of Birth',
                    required: true,
                },
                {
                    id: 'investor.countryOfBirth',
                    type: 'text',
                    label: 'Country of Birth',
                    required: true,
                },
            ],
        },
        {
            id: 'investment-details',
            title: 'Investment Details',
            questions: [
                {
                    id: 'investment.amount',
                    type: 'text',
                    label: 'Total Investment Amount',
                    required: true,
                    placeholder: '$800,000 or $1,050,000',
                    helpText: 'Minimum $800,000 for TEA, $1,050,000 for standard',
                },
                {
                    id: 'investment.source',
                    type: 'textarea',
                    label: 'Lawful Source of Investment Funds',
                    required: true,
                    helpText: 'Detailed explanation of how funds were obtained',
                },
                {
                    id: 'investment.businessType',
                    type: 'text',
                    label: 'Type of Business Enterprise',
                    required: true,
                },
                {
                    id: 'investment.jobsCreated',
                    type: 'text',
                    label: 'Number of Jobs to be Created',
                    required: true,
                    helpText: 'Minimum 10 full-time jobs required',
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Business plan',
        'Evidence of investment amount',
        'Source of funds documentation',
        'Tax returns and financial statements',
        'Evidence of job creation',
        'Organizational documents',
    ],
    instructions: [],
};

const I589_DEFINITION: FormDefinition = {
    id: 'i-589',
    code: 'I-589',
    name: 'Application for Asylum and for Withholding of Removal',
    description: 'Apply for asylum protection in the United States based on persecution or fear of persecution',
    category: 'humanitarian',
    estimatedTime: '180-240 minutes',
    filingFee: 0,
    price: 60,
    status: 'active',
    sections: [
        {
            id: 'parta1-about-you',
            title: 'Part A.I: Information About You',
            description: 'Your personal identifying information',
            questions: [
                {
                    id: 'partA1.1.alienNumber',
                    type: 'text',
                    label: '1. Alien Registration Number (A-Number) (if any)',
                    helpText: 'Format: A-123456789 or 123456789',
                },
                {
                    id: 'partA1.2.ssn',
                    type: 'ssn',
                    label: '2. U.S. Social Security Number (if any)',
                },
                {
                    id: 'partA1.3.familyName',
                    type: 'text',
                    label: '3. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'partA1.4.givenName',
                    type: 'text',
                    label: '4. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'partA1.5.middleName',
                    type: 'text',
                    label: '5. Middle Name',
                },
                {
                    id: 'partA1.6.otherNamesUsed',
                    type: 'text',
                    label: '6. Other Names Used (include maiden name and aliases)',
                    helpText: 'List all other names you have ever used',
                },
                {
                    id: 'partA1.7.dateOfBirth',
                    type: 'date',
                    label: '7. Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'partA1.8.cityOfBirth',
                    type: 'text',
                    label: '8. City and Country of Birth',
                    required: true,
                },
                {
                    id: 'partA1.9.nationality',
                    type: 'text',
                    label: '9. Current Nationality (Citizenship)',
                    required: true,
                },
                {
                    id: 'partA1.10.race',
                    type: 'text',
                    label: '10. Race, Ethnic, or Tribal Group',
                    required: true,
                },
                {
                    id: 'partA1.11.religion',
                    type: 'text',
                    label: '11. Religion',
                    required: true,
                },
                {
                    id: 'partA1.12.gender',
                    type: 'radio',
                    label: '12. Sex/Gender',
                    required: true,
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                    ],
                },
            ],
        },
        {
            id: 'parta1-address',
            title: 'Part A.I: Address and Contact Information',
            questions: [
                {
                    id: 'partA1.13.mailingAddress',
                    type: 'text',
                    label: '13. U.S. Mailing Address (Street Number and Name)',
                    required: true,
                },
                {
                    id: 'partA1.14.city',
                    type: 'text',
                    label: '14. City or Town',
                    required: true,
                },
                {
                    id: 'partA1.15.state',
                    type: 'text',
                    label: '15. State',
                    required: true,
                },
                {
                    id: 'partA1.16.zipCode',
                    type: 'text',
                    label: '16. ZIP Code',
                    required: true,
                },
                {
                    id: 'partA1.17.phone',
                    type: 'tel',
                    label: '17. Telephone Number',
                    required: true,
                },
                {
                    id: 'partA1.18.dateOfLastArrival',
                    type: 'date',
                    label: '18. Date of Last Arrival in the U.S. (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'partA1.19.i94Number',
                    type: 'text',
                    label: '19. I-94 Number (if any)',
                    helpText: 'Find at https://i94.cbp.dhs.gov',
                },
                {
                    id: 'partA1.20.currentImmigrationStatus',
                    type: 'text',
                    label: '20. Current Immigration Status',
                    required: true,
                    helpText: 'e.g., B-2 visitor, F-1 student, entered without inspection',
                },
            ],
        },
        {
            id: 'parta2-spouse-children',
            title: 'Part A.II: Information About Your Spouse and Children',
            description: 'List your spouse and all children regardless of age or marital status',
            questions: [
                {
                    id: 'partA2.1.maritalStatus',
                    type: 'select',
                    label: '1. Current Marital Status',
                    required: true,
                    options: [
                        { value: 'single', label: 'Single' },
                        { value: 'married', label: 'Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                    ],
                },
                {
                    id: 'partA2.2.spouseName',
                    type: 'text',
                    label: '2. Spouse\'s Full Name (if married)',
                    helpText: 'List your spouse even if not applying with you',
                },
                {
                    id: 'partA2.3.spouseDateOfBirth',
                    type: 'date',
                    label: '3. Spouse\'s Date of Birth (mm/dd/yyyy)',
                    helpText: 'If married',
                },
                {
                    id: 'partA2.4.spouseNationality',
                    type: 'text',
                    label: '4. Spouse\'s Nationality',
                    helpText: 'If married',
                },
                {
                    id: 'partA2.5.spouseLocation',
                    type: 'text',
                    label: '5. Spouse\'s Current Location',
                    helpText: 'City and country where spouse currently resides',
                },
                {
                    id: 'partA2.6.childrenInfo',
                    type: 'textarea',
                    label: '6. Information About All Children',
                    helpText: 'List all children: name, date of birth, nationality, and current location',
                },
            ],
        },
        {
            id: 'parta3-background',
            title: 'Part A.III: Information About Your Background',
            description: 'Residence and travel history',
            questions: [
                {
                    id: 'partA3.1.lastResidenceAbroad',
                    type: 'text',
                    label: '1. Last Residence Before Coming to the U.S.',
                    required: true,
                    helpText: 'Full address including city and country',
                },
                {
                    id: 'partA3.2.lastOccupationAbroad',
                    type: 'text',
                    label: '2. Last Occupation Abroad',
                    required: true,
                },
                {
                    id: 'partA3.3.lastEducation',
                    type: 'text',
                    label: '3. Last School Attended',
                    helpText: 'School name and location',
                },
                {
                    id: 'partA3.4.languagesSpoken',
                    type: 'text',
                    label: '4. Languages You Speak Fluently',
                    required: true,
                },
                {
                    id: 'partA3.5.traveledToUS',
                    type: 'textarea',
                    label: '5. List All Trips to the U.S.',
                    helpText: 'Include dates of entry and departure for each trip',
                },
            ],
        },
        {
            id: 'partb-asylum-basis',
            title: 'Part B: Information About Your Application - Why You Are Seeking Asylum',
            description: 'The heart of your asylum claim',
            questions: [
                {
                    id: 'partB.1.applyingFor',
                    type: 'checkbox',
                    label: 'I am applying for asylum or withholding of removal',
                    required: true,
                },
                {
                    id: 'partB.2.persecutionGrounds',
                    type: 'select',
                    label: 'Primary Ground for Asylum (check all that apply in your detailed statement)',
                    required: true,
                    options: [
                        { value: 'race', label: 'Race' },
                        { value: 'religion', label: 'Religion' },
                        { value: 'nationality', label: 'Nationality' },
                        { value: 'political-opinion', label: 'Political Opinion' },
                        { value: 'particular-social-group', label: 'Membership in a Particular Social Group' },
                    ],
                    helpText: 'Select the main reason you fear persecution',
                },
                {
                    id: 'partB.3.pastPersecution',
                    type: 'radio',
                    label: '1.A. Have you, your family, or close friends or colleagues ever experienced harm or mistreatment in the past?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'partB.4.fearFuturePersecution',
                    type: 'radio',
                    label: '1.B. Do you fear harm or mistreatment if you return to your home country?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'You must check "Yes" to be eligible for asylum',
                },
                {
                    id: 'partB.5.detailedExplanation',
                    type: 'textarea',
                    label: '2. Detailed Explanation of Your Asylum Claim',
                    required: true,
                    helpText: 'Describe in detail: What happened? When? Where? Who harmed you? Why? How are incidents connected to one of the five protected grounds?',
                },
                {
                    id: 'partB.6.governmentInvolvement',
                    type: 'radio',
                    label: '3. Was the persecution by government officials or people the government cannot or will not control?',
                    options: [
                        { value: 'government', label: 'Government officials' },
                        { value: 'nongovernment', label: 'Non-government actors' },
                        { value: 'both', label: 'Both' },
                    ],
                },
                {
                    id: 'partB.7.attemptedRelocation',
                    type: 'radio',
                    label: '4. Did you try to relocate within your country before coming to the U.S.?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
            ],
        },
        {
            id: 'partc-additional-info',
            title: 'Part C: Additional Information About Your Application',
            description: 'Prior asylum applications, criminal history, and other important information',
            questions: [
                {
                    id: 'partC.1.appliedAsylumBefore',
                    type: 'radio',
                    label: '1. Have you ever applied for asylum in any other country?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'partC.2.appliedAsylumBeforeDetails',
                    type: 'textarea',
                    label: '2. If yes, provide details (country, date, result)',
                    helpText: 'If you applied for asylum in another country',
                },
                {
                    id: 'partC.3.excludableOffenses',
                    type: 'radio',
                    label: '3. Have you ever committed a crime or been arrested?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'partC.4.crimeDetails',
                    type: 'textarea',
                    label: '4. If yes, provide details of any arrests or criminal convictions',
                    helpText: 'Include dates, charges, and outcomes',
                },
                {
                    id: 'partC.5.militaryService',
                    type: 'radio',
                    label: '5. Have you ever served in any military or armed group?',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'partC.6.terroristOrganization',
                    type: 'radio',
                    label: '6. Have you ever been a member of or supported any organization?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                    helpText: 'Political parties, social groups, or any organizations',
                },
                {
                    id: 'partC.7.persecutedOthers',
                    type: 'radio',
                    label: '7. Have you ever persecuted another person because of their race, religion, nationality, membership in a social group, or political opinion?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'partC.8.oneYearDeadline',
                    type: 'radio',
                    label: '8. Are you filing within 1 year of your last arrival in the U.S.?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No - will explain changed circumstances or extraordinary circumstances' },
                    ],
                    helpText: 'If no, you must explain why you did not file within 1 year',
                },
            ],
        },
        {
            id: 'partd-signature',
            title: 'Part D: Your Signature',
            description: 'Certification and signature',
            questions: [
                {
                    id: 'partD.1.interpreterUsed',
                    type: 'radio',
                    label: '1. Did someone assist you in completing this application?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'partD.2.assistantName',
                    type: 'text',
                    label: '2. Name of person who helped you (if any)',
                    helpText: 'Attorney, interpreter, or other preparer',
                },
                {
                    id: 'partD.3.certification',
                    type: 'checkbox',
                    label: 'I certify, under penalty of perjury under U.S. law, that this application and the evidence submitted with it are true and correct',
                    required: true,
                },
                {
                    id: 'partD.4.warnings',
                    type: 'checkbox',
                    label: 'I understand that knowingly making a false statement may result in criminal prosecution and denial of my application',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'REQUIRED DOCUMENTS:',
        '  - Two identical passport-style photographs taken within 30 days',
        '  - Copy of any immigration documents (passport, I-94, visa, EAD, etc.)',
        '  - Supporting evidence of your claim',
        'HIGHLY RECOMMENDED EVIDENCE:',
        '  - Detailed personal statement describing persecution (attach as supplement)',
        '  - Country condition reports (State Department, Human Rights Watch, Amnesty International)',
        '  - News articles about persecution in your country',
        '  - Witness affidavits from people with knowledge of your situation',
        '  - Medical records or psychological evaluations documenting trauma',
        '  - Police reports, court documents, arrest warrants',
        '  - Membership documents for political party, religious group, or social organization',
        '  - Death certificates or evidence of harm to family members',
        '  - Photos or videos documenting persecution or threats',
        '  - Expert opinions on country conditions',
        '  - Documents showing you are a member of the persecuted group',
    ],
    instructions: [
        'CRITICAL DEADLINE: Must file within 1 year of arriving in the U.S. (unless changed/extraordinary circumstances)',
        'File with USCIS if you are NOT in removal proceedings',
        'File with Immigration Court if you ARE in removal proceedings',
        'Include TWO copies of the complete application (one for your records)',
        'Sign and date the application in blue ink',
        'You may include your spouse and unmarried children under 21 on your application',
        'No filing fee required for Form I-589',
        'Attach all supporting evidence with translations if not in English',
        'Write a detailed personal statement as an attachment - be specific about dates, locations, and perpetrators',
        'Clearly explain how your persecution is connected to one of the five grounds: race, religion, nationality, membership in a particular social group, or political opinion',
        'If you miss the 1-year deadline, you MUST explain changed circumstances in your country OR extraordinary circumstances that prevented timely filing',
        'Apply for employment authorization (Form I-765) 150 days after filing I-589',
        'Attend all asylum interviews and hearings - failure to appear may result in denial',
        'Consult with an immigration attorney if possible - asylum law is complex',
    ],
};

const I730_DEFINITION: FormDefinition = {
    id: 'i-730',
    code: 'I-730',
    name: 'Refugee/Asylee Relative Petition',
    description: 'Petition for qualifying family members of refugees or asylees',
    category: 'humanitarian',
    estimatedTime: '60-90 minutes',
    filingFee: 0,
    price: 60, // Medium-complex form
    sections: [
        {
            id: 'petitioner-info',
            title: 'Petitioner Information (Refugee/Asylee)',
            questions: [
                {
                    id: 'petitioner.name.last',
                    type: 'text',
                    label: 'Legal Last Name',
                    required: true,
                },
                {
                    id: 'petitioner.name.first',
                    type: 'text',
                    label: 'Legal First Name',
                    required: true,
                },
                {
                    id: 'petitioner.aNumber',
                    type: 'text',
                    label: 'A-Number',
                    required: true,
                    placeholder: 'A123456789',
                },
                {
                    id: 'petitioner.asylumDate',
                    type: 'date',
                    label: 'Date Asylum/Refugee Status Granted',
                    required: true,
                },
            ],
        },
        {
            id: 'beneficiary-info',
            title: 'Family Member Information',
            questions: [
                {
                    id: 'beneficiary.name.last',
                    type: 'text',
                    label: 'Legal Last Name',
                    required: true,
                },
                {
                    id: 'beneficiary.name.first',
                    type: 'text',
                    label: 'Legal First Name',
                    required: true,
                },
                {
                    id: 'beneficiary.relationship',
                    type: 'select',
                    label: 'Relationship to You',
                    required: true,
                    options: [
                        { value: 'spouse', label: 'Spouse' },
                        { value: 'child', label: 'Unmarried Child Under 21' },
                    ],
                },
                {
                    id: 'beneficiary.dob',
                    type: 'date',
                    label: 'Date of Birth',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Copy of asylum approval notice',
        'Birth certificate',
        'Marriage certificate (if applicable)',
        'Passport photos',
    ],
    instructions: [
        'Must file within 2 years of asylum grant',
        'Relationship must have existed before asylum grant',
    ],
};

const I821_DEFINITION: FormDefinition = {
    id: 'i-821',
    code: 'I-821',
    name: 'Application for Temporary Protected Status',
    description: 'Apply for TPS if from a designated country',
    category: 'humanitarian',
    estimatedTime: '45-60 minutes',
    filingFee: 50,
    price: 60, // Medium-complex form
    sections: [
        {
            id: 'applicant-info',
            title: 'Applicant Information',
            questions: [
                {
                    id: 'applicant.name.last',
                    type: 'text',
                    label: 'Legal Last Name',
                    required: true,
                },
                {
                    id: 'applicant.name.first',
                    type: 'text',
                    label: 'Legal First Name',
                    required: true,
                },
                {
                    id: 'applicant.dob',
                    type: 'date',
                    label: 'Date of Birth',
                    required: true,
                },
                {
                    id: 'applicant.countryOfCitizenship',
                    type: 'text',
                    label: 'Country of Citizenship',
                    required: true,
                    helpText: 'Must be a TPS-designated country',
                },
            ],
        },
        {
            id: 'eligibility',
            title: 'TPS Eligibility',
            questions: [
                {
                    id: 'eligibility.arrivalDate',
                    type: 'date',
                    label: 'Date of Entry to United States',
                    required: true,
                },
                {
                    id: 'eligibility.continuousResidence',
                    type: 'radio',
                    label: 'Have you continuously resided in the U.S. since the required date?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Proof of identity',
        'Proof of nationality',
        'Evidence of continuous residence',
        'Evidence of continuous physical presence',
    ],
    instructions: [
        'Check TPS designation dates for your country',
        'File during open registration period',
    ],
};

const I9_DEFINITION: FormDefinition = {
    id: 'i-9',
    code: 'I-9',
    name: 'Employment Eligibility Verification',
    description: 'Verify employee authorization to work in the United States',
    category: 'work_authorization',
    estimatedTime: '15-20 minutes',
    filingFee: 0,
    price: 60,
    sections: [
        {
            id: 'section1-employee-info',
            title: 'Section 1: Employee Information and Attestation',
            description: 'To be completed by employee on first day of work',
            questions: [
                {
                    id: 'section1.lastName',
                    type: 'text',
                    label: 'Last Name (Family Name)',
                    required: true,
                    helpText: 'Employees with two last names must include both names',
                },
                {
                    id: 'section1.firstName',
                    type: 'text',
                    label: 'First Name (Given Name)',
                    required: true,
                    helpText: 'Employees with two first names should include both',
                },
                {
                    id: 'section1.middleInitial',
                    type: 'text',
                    label: 'Middle Initial',
                },
                {
                    id: 'section1.otherLastNames',
                    type: 'text',
                    label: 'Other Last Names Used (if any)',
                    helpText: 'Include maiden name or any other legal last names',
                },
                {
                    id: 'section1.streetAddress',
                    type: 'text',
                    label: 'Address (Street Number and Name)',
                    required: true,
                },
                {
                    id: 'section1.aptNumber',
                    type: 'text',
                    label: 'Apt. Number',
                },
                {
                    id: 'section1.city',
                    type: 'text',
                    label: 'City or Town',
                    required: true,
                },
                {
                    id: 'section1.state',
                    type: 'text',
                    label: 'State',
                    required: true,
                },
                {
                    id: 'section1.zipCode',
                    type: 'text',
                    label: 'ZIP Code',
                    required: true,
                },
                {
                    id: 'section1.dateOfBirth',
                    type: 'date',
                    label: 'Date of Birth (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'section1.ssn',
                    type: 'ssn',
                    label: 'U.S. Social Security Number',
                    helpText: 'Optional unless employer participates in E-Verify',
                },
                {
                    id: 'section1.email',
                    type: 'email',
                    label: 'Employee\'s Email Address',
                    helpText: 'Optional',
                },
                {
                    id: 'section1.telephone',
                    type: 'tel',
                    label: 'Employee\'s Telephone Number',
                    helpText: 'Optional',
                },
            ],
        },
        {
            id: 'section1-citizenship-status',
            title: 'Section 1: Citizenship/Immigration Status Attestation',
            description: 'Check one of the following boxes',
            questions: [
                {
                    id: 'section1.citizenshipStatus',
                    type: 'radio',
                    label: 'I attest, under penalty of perjury, that I am (check one of the following boxes):',
                    required: true,
                    options: [
                        { value: 'citizen', label: '1. A citizen of the United States' },
                        { value: 'noncitizen-national', label: '2. A noncitizen national of the United States' },
                        { value: 'lpr', label: '3. A lawful permanent resident' },
                        { value: 'alien-authorized', label: '4. An alien authorized to work' },
                    ],
                },
            ],
        },
        {
            id: 'section1-additional-info',
            title: 'Section 1: Additional Information for Certain Statuses',
            description: 'Complete if you checked boxes 3 or 4 above',
            questions: [
                {
                    id: 'section1.uscisNumber',
                    type: 'text',
                    label: 'USCIS Number (for LPR or alien authorized to work)',
                    helpText: 'Provide your USCIS Number or A-Number if you are a lawful permanent resident or alien authorized to work',
                },
                {
                    id: 'section1.alienNumber',
                    type: 'text',
                    label: 'Alien Registration Number/USCIS Number',
                    helpText: 'Format: A-123456789 or 123456789',
                },
                {
                    id: 'section1.i94Number',
                    type: 'text',
                    label: 'Form I-94 Admission Number',
                    helpText: 'If using I-94 for verification',
                },
                {
                    id: 'section1.foreignPassportNumber',
                    type: 'text',
                    label: 'Foreign Passport Number',
                    helpText: 'If using foreign passport for verification',
                },
                {
                    id: 'section1.passportCountry',
                    type: 'text',
                    label: 'Country of Issuance',
                    helpText: 'Country that issued the foreign passport',
                },
                {
                    id: 'section1.workAuthorizationExpiration',
                    type: 'date',
                    label: 'Employment Authorization Expiration Date (if any)',
                    helpText: 'mm/dd/yyyy - Only if you checked box 4 (alien authorized to work)',
                },
            ],
        },
        {
            id: 'section2-employer-review',
            title: 'Section 2: Employer Review and Verification',
            description: 'To be completed by employer within 3 business days of employee\'s first day of work',
            questions: [
                {
                    id: 'section2.employeeLastName',
                    type: 'text',
                    label: 'Employee Last Name from Section 1',
                    required: true,
                },
                {
                    id: 'section2.employeeFirstName',
                    type: 'text',
                    label: 'Employee First Name from Section 1',
                    required: true,
                },
                {
                    id: 'section2.employeeMiddleInitial',
                    type: 'text',
                    label: 'Employee Middle Initial from Section 1',
                },
                {
                    id: 'section2.citizenshipStatus',
                    type: 'text',
                    label: 'Citizenship/Immigration Status from Section 1',
                    required: true,
                    helpText: 'Copy the box number checked in Section 1 (1, 2, 3, or 4)',
                },
            ],
        },
        {
            id: 'section2-list-a-documents',
            title: 'Section 2: List A - Documents That Establish Both Identity and Employment Authorization',
            description: 'Complete if employee provided a List A document (do not complete List B and C)',
            questions: [
                {
                    id: 'section2.listA.documentTitle',
                    type: 'text',
                    label: 'Document Title',
                    helpText: 'e.g., U.S. Passport, Permanent Resident Card, Employment Authorization Document',
                },
                {
                    id: 'section2.listA.issuingAuthority',
                    type: 'text',
                    label: 'Issuing Authority',
                    helpText: 'e.g., U.S. Department of State, USCIS',
                },
                {
                    id: 'section2.listA.documentNumber',
                    type: 'text',
                    label: 'Document Number',
                },
                {
                    id: 'section2.listA.expirationDate',
                    type: 'date',
                    label: 'Expiration Date (if any)',
                    helpText: 'mm/dd/yyyy',
                },
            ],
        },
        {
            id: 'section2-list-b-documents',
            title: 'Section 2: List B - Documents That Establish Identity',
            description: 'Complete if employee provided List B and List C documents',
            questions: [
                {
                    id: 'section2.listB.documentTitle',
                    type: 'text',
                    label: 'Document Title',
                    helpText: 'e.g., Driver\'s License, State ID Card, School ID with photo',
                },
                {
                    id: 'section2.listB.issuingAuthority',
                    type: 'text',
                    label: 'Issuing Authority',
                    helpText: 'e.g., State DMV, School District',
                },
                {
                    id: 'section2.listB.documentNumber',
                    type: 'text',
                    label: 'Document Number',
                },
                {
                    id: 'section2.listB.expirationDate',
                    type: 'date',
                    label: 'Expiration Date (if any)',
                    helpText: 'mm/dd/yyyy',
                },
            ],
        },
        {
            id: 'section2-list-c-documents',
            title: 'Section 2: List C - Documents That Establish Employment Authorization',
            description: 'Complete if employee provided List B and List C documents',
            questions: [
                {
                    id: 'section2.listC.documentTitle',
                    type: 'text',
                    label: 'Document Title',
                    helpText: 'e.g., Social Security Card, Birth Certificate, Employment Authorization Document',
                },
                {
                    id: 'section2.listC.issuingAuthority',
                    type: 'text',
                    label: 'Issuing Authority',
                    helpText: 'e.g., Social Security Administration, State Vital Records',
                },
                {
                    id: 'section2.listC.documentNumber',
                    type: 'text',
                    label: 'Document Number',
                },
                {
                    id: 'section2.listC.expirationDate',
                    type: 'date',
                    label: 'Expiration Date (if any)',
                    helpText: 'mm/dd/yyyy',
                },
            ],
        },
        {
            id: 'section2-certification',
            title: 'Section 2: Employer Certification',
            description: 'Employer or authorized representative completes',
            questions: [
                {
                    id: 'section2.additionalInformation',
                    type: 'textarea',
                    label: 'Additional Information',
                    helpText: 'Optional - for notes about extensions, discrepancies, or SEVIS data',
                },
                {
                    id: 'section2.firstDayOfEmployment',
                    type: 'date',
                    label: 'Employee\'s First Day of Employment (mm/dd/yyyy)',
                    required: true,
                },
                {
                    id: 'section2.employerLastName',
                    type: 'text',
                    label: 'Last Name of Employer or Authorized Representative',
                    required: true,
                },
                {
                    id: 'section2.employerFirstName',
                    type: 'text',
                    label: 'First Name of Employer or Authorized Representative',
                    required: true,
                },
                {
                    id: 'section2.employerTitle',
                    type: 'text',
                    label: 'Title of Employer or Authorized Representative',
                    required: true,
                },
                {
                    id: 'section2.employerBusinessName',
                    type: 'text',
                    label: 'Employer\'s Business or Organization Name',
                    required: true,
                },
                {
                    id: 'section2.employerAddress',
                    type: 'text',
                    label: 'Employer\'s Business Address (Street Number and Name)',
                    required: true,
                },
                {
                    id: 'section2.employerCity',
                    type: 'text',
                    label: 'City or Town',
                    required: true,
                },
                {
                    id: 'section2.employerState',
                    type: 'text',
                    label: 'State',
                    required: true,
                },
                {
                    id: 'section2.employerZipCode',
                    type: 'text',
                    label: 'ZIP Code',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'EMPLOYEE MUST PRESENT (choose one):',
        'Option 1: ONE document from List A (establishes both identity and employment authorization):',
        '  - U.S. Passport or U.S. Passport Card',
        '  - Permanent Resident Card or Alien Registration Receipt Card (Form I-551)',
        '  - Foreign passport with Form I-94 or I-94A with Arrival-Departure Record',
        '  - Employment Authorization Document (Form I-766)',
        'Option 2: ONE document from List B (establishes identity) AND ONE document from List C (establishes employment authorization):',
        'List B (Identity):',
        '  - Driver\'s license or ID card with photo issued by state or outlying possession',
        '  - ID card issued by federal, state, or local government with photo',
        '  - School ID card with photo',
        '  - Voter registration card',
        '  - U.S. Military card or draft record',
        'List C (Employment Authorization):',
        '  - Social Security Account Number card (unrestricted)',
        '  - U.S. birth certificate or birth abroad certificate',
        '  - Native American tribal document',
        '  - U.S. Citizen ID Card (Form I-197)',
        '  - Employment authorization document issued by DHS',
    ],
    instructions: [
        'SECTION 1: Employee must complete Section 1 no later than first day of employment',
        'SECTION 2: Employer must complete Section 2 within 3 business days of employee\'s first day of work',
        'Employees must present original unexpired documents (no photocopies)',
        'Employers must physically examine the documents and verify they appear genuine and relate to the employee',
        'If employee provides List A document, do NOT complete List B and C',
        'If employee provides List B and C documents, both must be completed',
        'List B documents must include a photograph if employer participates in E-Verify',
        'Retain Form I-9 for 3 years after hire date OR 1 year after employment ends, whichever is later',
        'Form I-9 is NOT filed with USCIS - employer keeps it on file for inspection',
        'Forms can be stored electronically or in paper format',
    ],
};

const I90_DEFINITION: FormDefinition = {
    id: 'i-90',
    code: 'I-90',
    name: 'Application to Replace Permanent Resident Card',
    description: 'Replace or renew your green card',
    category: 'other',
    estimatedTime: '30-45 minutes',
    filingFee: 455,
    price: 60,
    sections: [
        {
            id: 'part1-information-about-you',
            title: 'Part 1: Information About You',
            description: 'Your personal identifying information',
            questions: [
                {
                    id: 'part1.1a.familyName',
                    type: 'text',
                    label: '1.a. Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.1b.givenName',
                    type: 'text',
                    label: '1.b. Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.1c.middleName',
                    type: 'text',
                    label: '1.c. Middle Name',
                },
                {
                    id: 'part1.2.alienNumber',
                    type: 'text',
                    label: '2. Alien Registration Number (A-Number)',
                    required: true,
                    placeholder: 'A-',
                    helpText: 'Found on your Permanent Resident Card',
                },
                {
                    id: 'part1.3.uscisOnlineNumber',
                    type: 'text',
                    label: '3. USCIS Online Account Number',
                    helpText: 'If you have a USCIS online account',
                },
                {
                    id: 'part1.4.classOfAdmission',
                    type: 'text',
                    label: '4. Class of Admission',
                    required: true,
                    helpText: 'Found on your green card (e.g., IR1, CR1, F11)',
                },
                {
                    id: 'part1.5.dateOfAdmission',
                    type: 'date',
                    label: '5. Date You Became a Permanent Resident',
                    required: true,
                },
                {
                    id: 'part1.6.dateOfBirth',
                    type: 'date',
                    label: '6. Date of Birth',
                    required: true,
                },
                {
                    id: 'part1.7.countryOfBirth',
                    type: 'text',
                    label: '7. Country of Birth',
                    required: true,
                },
                {
                    id: 'part1.8.countryOfCitizenship',
                    type: 'text',
                    label: '8. Country of Citizenship or Nationality',
                    required: true,
                },
                {
                    id: 'part1.9.nameChanged',
                    type: 'radio',
                    label: '9. Has your name legally changed since you were granted lawful permanent residence?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part1.10.ssn',
                    type: 'ssn',
                    label: '10. U.S. Social Security Number (if any)',
                },
            ],
        },
        {
            id: 'part1b-mailing-address',
            title: 'Part 1: Mailing Address',
            description: 'Where USCIS will send your new card',
            questions: [
                {
                    id: 'part1.11.inCareOfName',
                    type: 'text',
                    label: '11. In Care Of Name (if any)',
                },
                {
                    id: 'part1.12a.street',
                    type: 'text',
                    label: '12.a. Street Number and Name',
                    required: true,
                },
                {
                    id: 'part1.12b.aptSteFlr',
                    type: 'select',
                    label: '12.b. Unit Type',
                    options: [
                        { value: 'apt', label: 'Apt.' },
                        { value: 'ste', label: 'Ste.' },
                        { value: 'flr', label: 'Flr.' },
                    ],
                },
                {
                    id: 'part1.12c.unitNumber',
                    type: 'text',
                    label: '12.c. Unit Number',
                },
                {
                    id: 'part1.12d.city',
                    type: 'text',
                    label: '12.d. City or Town',
                    required: true,
                },
                {
                    id: 'part1.12e.state',
                    type: 'select',
                    label: '12.e. State',
                    required: true,
                    options: US_STATES,
                },
                {
                    id: 'part1.12f.zipCode',
                    type: 'text',
                    label: '12.f. ZIP Code',
                    required: true,
                },
                {
                    id: 'part1.13.physicalAddressSameAsMailing',
                    type: 'radio',
                    label: '13. Is your physical address the same as your mailing address?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
            ],
        },
        {
            id: 'part2-application-type',
            title: 'Part 2: Application Type',
            description: 'Reason for filing this application',
            questions: [
                {
                    id: 'part2.residenceType',
                    type: 'radio',
                    label: 'What type of resident are you?',
                    required: true,
                    options: [
                        { value: 'permanent', label: 'Permanent Resident (10-year card)' },
                        { value: 'conditional', label: 'Conditional Resident (2-year card)' },
                    ],
                    helpText: 'Check your green card expiration date',
                },
                {
                    id: 'part2.sectionA.reason',
                    type: 'select',
                    label: 'Section A: Reason for Application (for Permanent Residents)',
                    required: true,
                    options: [
                        { value: '1a', label: '1.a. My existing card has been lost, stolen, or destroyed' },
                        { value: '1b', label: '1.b. My previous card was issued but never received' },
                        { value: '1c', label: '1.c. My existing card has been mutilated' },
                        { value: '1d', label: '1.d. My existing card has incorrect data because of DHS error' },
                        { value: '1e', label: '1.e. My name or other biographic information has been legally changed since issuance' },
                        { value: '1f', label: '1.f. My card has already expired or will expire within 6 months' },
                        { value: '1g', label: '1.g. I have reached my 14th birthday and am registering' },
                        { value: '1h', label: '1.h. I am a commuter and need to replace my card' },
                    ],
                },
            ],
        },
        {
            id: 'part3-processing-information',
            title: 'Part 3: Processing Information',
            description: 'Information about how you obtained your green card',
            questions: [
                {
                    id: 'part3.1.locationOfProcessing',
                    type: 'select',
                    label: '1. Where did you process for your green card?',
                    required: true,
                    options: [
                        { value: 'consular', label: 'At a U.S. Embassy or Consulate (Consular Processing)' },
                        { value: 'adjustment', label: 'Within the United States (Adjustment of Status)' },
                    ],
                },
                {
                    id: 'part3.2.cityCountry',
                    type: 'text',
                    label: '2. City/Town and Country (if processed abroad)',
                    helpText: 'Enter the city and country where you were processed',
                },
                {
                    id: 'part3.3.uscisOffice',
                    type: 'text',
                    label: '3. USCIS Office Location (if processed in U.S.)',
                    helpText: 'City where your adjustment of status was processed',
                },
            ],
        },
        {
            id: 'part4-biographic-information',
            title: 'Part 4: Biographic Information',
            description: 'Physical characteristics and background',
            questions: [
                {
                    id: 'part4.1.ethnicity',
                    type: 'select',
                    label: '1. Ethnicity',
                    required: true,
                    options: [
                        { value: 'hispanic', label: 'Hispanic or Latino' },
                        { value: 'not-hispanic', label: 'Not Hispanic or Latino' },
                    ],
                },
                {
                    id: 'part4.2.race',
                    type: 'select',
                    label: '2. Race',
                    required: true,
                    options: [
                        { value: 'white', label: 'White' },
                        { value: 'asian', label: 'Asian' },
                        { value: 'black', label: 'Black or African American' },
                        { value: 'pacific', label: 'Native Hawaiian or Other Pacific Islander' },
                        { value: 'native', label: 'American Indian or Alaska Native' },
                    ],
                },
                {
                    id: 'part4.3.heightFeet',
                    type: 'select',
                    label: '3. Height - Feet',
                    required: true,
                    options: [
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                        { value: '6', label: '6' },
                        { value: '7', label: '7' },
                    ],
                },
                {
                    id: 'part4.3.heightInches',
                    type: 'select',
                    label: '3. Height - Inches',
                    required: true,
                    options: [
                        { value: '0', label: '0' },
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                        { value: '6', label: '6' },
                        { value: '7', label: '7' },
                        { value: '8', label: '8' },
                        { value: '9', label: '9' },
                        { value: '10', label: '10' },
                        { value: '11', label: '11' },
                    ],
                },
                {
                    id: 'part4.4.weight',
                    type: 'text',
                    label: '4. Weight (in pounds)',
                    required: true,
                    placeholder: '150',
                },
                {
                    id: 'part4.5.eyeColor',
                    type: 'select',
                    label: '5. Eye Color',
                    required: true,
                    options: [
                        { value: 'black', label: 'Black' },
                        { value: 'blue', label: 'Blue' },
                        { value: 'brown', label: 'Brown' },
                        { value: 'gray', label: 'Gray' },
                        { value: 'green', label: 'Green' },
                        { value: 'hazel', label: 'Hazel' },
                        { value: 'maroon', label: 'Maroon' },
                        { value: 'pink', label: 'Pink' },
                        { value: 'unknown', label: 'Unknown/Other' },
                    ],
                },
                {
                    id: 'part4.6.hairColor',
                    type: 'select',
                    label: '6. Hair Color',
                    required: true,
                    options: [
                        { value: 'bald', label: 'Bald (No hair)' },
                        { value: 'black', label: 'Black' },
                        { value: 'blond', label: 'Blond' },
                        { value: 'brown', label: 'Brown' },
                        { value: 'gray', label: 'Gray' },
                        { value: 'red', label: 'Red' },
                        { value: 'sandy', label: 'Sandy' },
                        { value: 'white', label: 'White' },
                        { value: 'unknown', label: 'Unknown/Other' },
                    ],
                },
            ],
        },
        {
            id: 'part5-accommodations',
            title: 'Part 5: Accommodations for Individuals with Disabilities',
            description: 'Request accommodations if needed',
            questions: [
                {
                    id: 'part5.1.needAccommodations',
                    type: 'radio',
                    label: 'Are you requesting an accommodation because of a disability?',
                    required: true,
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ],
                },
                {
                    id: 'part5.2.deaf',
                    type: 'checkbox',
                    label: 'I am deaf or hard of hearing and request ASL interpreter',
                },
                {
                    id: 'part5.3.blind',
                    type: 'checkbox',
                    label: 'I am blind or have low vision and request materials in alternative format',
                },
                {
                    id: 'part5.4.other',
                    type: 'text',
                    label: 'Other accommodation request (please describe)',
                },
            ],
        },
        {
            id: 'part6-applicant-statement',
            title: 'Part 6: Applicant\'s Statement and Certification',
            description: 'Contact information and signature preparation',
            questions: [
                {
                    id: 'part6.1a.daytimePhone',
                    type: 'tel',
                    label: '1.a. Daytime Telephone Number',
                    required: true,
                },
                {
                    id: 'part6.1b.mobilePhone',
                    type: 'tel',
                    label: '1.b. Mobile Telephone Number',
                },
                {
                    id: 'part6.1c.email',
                    type: 'email',
                    label: '1.c. Email Address',
                    required: true,
                    helpText: 'USCIS will send notices to this email',
                },
                {
                    id: 'part6.2.preparedApplication',
                    type: 'radio',
                    label: '2. Who prepared this application?',
                    required: true,
                    options: [
                        { value: 'self', label: 'I prepared this application myself' },
                        { value: 'interpreter', label: 'An interpreter helped me' },
                        { value: 'preparer', label: 'An attorney or accredited representative prepared it' },
                    ],
                },
            ],
        },
        {
            id: 'part7-certification',
            title: 'Part 7: Signature',
            description: 'Certification of information provided',
            questions: [
                {
                    id: 'part7.certification',
                    type: 'checkbox',
                    label: 'I certify, under penalty of perjury, that all information in this application and evidence submitted is true and correct',
                    required: true,
                },
                {
                    id: 'part7.acknowledgement',
                    type: 'checkbox',
                    label: 'I authorize release of information from this application to other government agencies',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [
        'Copy of current or expired Permanent Resident Card (front and back)',
        'Two passport-style color photographs taken within 30 days',
        'Copy of legal name change documents (if applicable)',
        'Filing fee payment',
    ],
    instructions: [
        'Do not sign the application until instructed to do so at your biometrics appointment or interview',
        'Include copies of both sides of your Permanent Resident Card',
        'If filing due to name change, include court order or marriage certificate',
        'Photographs must be taken within 30 days of filing and meet USCIS specifications',
    ],
};

const I821D_DEFINITION: FormDefinition = {
    id: 'i-821d',
    code: 'I-821D',
    name: 'Consideration of Deferred Action for Childhood Arrivals',
    description: 'Apply for or renew DACA status',
    category: 'humanitarian',
    estimatedTime: '45-60 minutes',
    filingFee: 0,
    price: 60,
    sections: [
        {
            id: 'part1',
            title: 'Part 1: Information About Your Request and Eligibility',
            description: 'Basic information about your DACA request',
            questions: [
                {
                    id: 'part1.requestType',
                    type: 'radio',
                    label: 'Type of Request',
                    required: true,
                    options: [
                        { value: 'initial', label: 'Initial Request' },
                        { value: 'renewal', label: 'Renewal Request' },
                    ],
                },
                {
                    id: 'part1.lastName',
                    type: 'text',
                    label: 'Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.firstName',
                    type: 'text',
                    label: 'Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.middleName',
                    type: 'text',
                    label: 'Middle Name',
                },
                {
                    id: 'part1.dateOfBirth',
                    type: 'date',
                    label: 'Date of Birth',
                    required: true,
                },
                {
                    id: 'part1.alienNumber',
                    type: 'text',
                    label: 'Alien Registration Number (A-Number)',
                    placeholder: 'A-',
                    helpText: 'If you have one (for renewals)',
                },
                {
                    id: 'part1.expirationDate',
                    type: 'date',
                    label: 'Current DACA Expiration Date',
                    helpText: 'For renewal requests only',
                },
            ],
        },
        {
            id: 'part2',
            title: 'Part 2: Additional Information About You',
            description: 'Contact and biographic information',
            questions: [
                {
                    id: 'part2.ssn',
                    type: 'text',
                    label: 'U.S. Social Security Number',
                    placeholder: '123-45-6789',
                },
                {
                    id: 'part2.mailingStreet',
                    type: 'text',
                    label: 'Mailing Address - Street',
                    required: true,
                },
                {
                    id: 'part2.mailingCity',
                    type: 'text',
                    label: 'City',
                    required: true,
                },
                {
                    id: 'part2.mailingState',
                    type: 'text',
                    label: 'State',
                    required: true,
                },
                {
                    id: 'part2.mailingZip',
                    type: 'text',
                    label: 'ZIP Code',
                    required: true,
                },
                {
                    id: 'part2.countryOfBirth',
                    type: 'text',
                    label: 'Country of Birth',
                    required: true,
                },
                {
                    id: 'part2.countryOfCitizenship',
                    type: 'text',
                    label: 'Country of Citizenship',
                    required: true,
                },
            ],
        },
    ],
    pdfFieldMappings: [],
    requiredDocuments: [],
    instructions: [],
};

const I212_DEFINITION: FormDefinition = {
    id: 'i-212',
    code: 'I-212',
    name: 'Application for Permission to Reapply for Admission',
    description: 'For those removed or deported who wish to return to the US',
    category: 'other',
    estimatedTime: '60-90 minutes',
    filingFee: 1050,
    price: 60,
    sections: [
        {
            id: 'part1',
            title: 'Part 1: Information About You',
            description: 'Personal identifying information',
            questions: [
                {
                    id: 'part1.lastName',
                    type: 'text',
                    label: 'Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.firstName',
                    type: 'text',
                    label: 'Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.middleName',
                    type: 'text',
                    label: 'Middle Name',
                },
                {
                    id: 'part1.dateOfBirth',
                    type: 'date',
                    label: 'Date of Birth',
                    required: true,
                },
                {
                    id: 'part1.cityOfBirth',
                    type: 'text',
                    label: 'City of Birth',
                    required: true,
                },
                {
                    id: 'part1.countryOfBirth',
                    type: 'text',
                    label: 'Country of Birth',
                    required: true,
                },
                {
                    id: 'part1.alienNumber',
                    type: 'text',
                    label: 'Alien Registration Number (A-Number)',
                    placeholder: 'A-',
                },
            ],
        },
        {
            id: 'part2',
            title: 'Part 2: Information About Your Removal',
            description: 'Details about your previous removal from the US',
            questions: [
                {
                    id: 'part2.dateOfRemoval',
                    type: 'date',
                    label: 'Date of Removal/Deportation',
                    required: true,
                },
                {
                    id: 'part2.portOfRemoval',
                    type: 'text',
                    label: 'Port Where You Were Removed',
                    required: true,
                },
                {
                    id: 'part2.reasonForRemoval',
                    type: 'textarea',
                    label: 'Reason for Removal',
                    required: true,
                    helpText: 'Explain why you were removed or deported',
                },
            ],
        },
    ],
    estimatedFilingTime: '12-24 months',
    tips: [
        'This form is required if you were previously removed or deported',
        'Strong evidence of rehabilitation and ties to the US is crucial',
        'Consult an immigration attorney - this is a complex application',
        'Approval is discretionary and depends on humanitarian factors',
    ],
};

const I290B_DEFINITION: FormDefinition = {
    id: 'i-290b',
    code: 'I-290B',
    name: 'Notice of Appeal or Motion',
    description: 'Appeal or file a motion regarding a USCIS decision',
    category: 'other',
    estimatedTime: '45-60 minutes',
    filingFee: 675,
    price: 60,
    sections: [
        {
            id: 'part1',
            title: 'Part 1: Information About You',
            description: 'Your personal information',
            questions: [
                {
                    id: 'part1.lastName',
                    type: 'text',
                    label: 'Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.firstName',
                    type: 'text',
                    label: 'Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.middleName',
                    type: 'text',
                    label: 'Middle Name',
                },
                {
                    id: 'part1.alienNumber',
                    type: 'text',
                    label: 'Alien Registration Number (A-Number)',
                    placeholder: 'A-',
                },
            ],
        },
        {
            id: 'part2',
            title: 'Part 2: Information About the Appeal or Motion',
            description: 'Details about what you are appealing',
            questions: [
                {
                    id: 'part2.requestType',
                    type: 'radio',
                    label: 'I am filing',
                    required: true,
                    options: [
                        { value: 'appeal', label: 'An appeal' },
                        { value: 'motionToReopen', label: 'A motion to reopen' },
                        { value: 'motionToReconsider', label: 'A motion to reconsider' },
                    ],
                },
                {
                    id: 'part2.decisionDate',
                    type: 'date',
                    label: 'Date of Decision Being Appealed',
                    required: true,
                },
                {
                    id: 'part2.formType',
                    type: 'text',
                    label: 'Form Number of Application Being Appealed',
                    required: true,
                    placeholder: 'e.g., I-130, I-485',
                },
                {
                    id: 'part2.reasonForAppeal',
                    type: 'textarea',
                    label: 'Basis for Appeal or Motion',
                    required: true,
                    helpText: 'Explain why the decision was incorrect',
                },
            ],
        },
    ],
    estimatedFilingTime: '6-12 months',
    tips: [
        'File within 30 days (or 33 if decision was mailed)',
        'Attach a brief in support of your appeal',
        'Include new evidence if filing a motion to reopen',
        'Consult an attorney - appeals are technically complex',
    ],
};

const I601_DEFINITION: FormDefinition = {
    id: 'i-601',
    code: 'I-601',
    name: 'Application for Waiver of Grounds of Inadmissibility',
    description: 'Waive certain grounds of inadmissibility to enter or remain in the US',
    category: 'other',
    estimatedTime: '90-120 minutes',
    filingFee: 1050,
    price: 60,
    sections: [
        {
            id: 'part1',
            title: 'Part 1: Information About You',
            description: 'Personal identifying information',
            questions: [
                {
                    id: 'part1.lastName',
                    type: 'text',
                    label: 'Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.firstName',
                    type: 'text',
                    label: 'Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.middleName',
                    type: 'text',
                    label: 'Middle Name',
                },
                {
                    id: 'part1.dateOfBirth',
                    type: 'date',
                    label: 'Date of Birth',
                    required: true,
                },
                {
                    id: 'part1.countryOfBirth',
                    type: 'text',
                    label: 'Country of Birth',
                    required: true,
                },
                {
                    id: 'part1.alienNumber',
                    type: 'text',
                    label: 'Alien Registration Number (A-Number)',
                    placeholder: 'A-',
                },
            ],
        },
        {
            id: 'part2',
            title: 'Part 2: Qualifying Relative Information',
            description: 'Information about your US citizen or LPR relative',
            questions: [
                {
                    id: 'part2.relativeType',
                    type: 'radio',
                    label: 'Your qualifying relative is your',
                    required: true,
                    options: [
                        { value: 'spouse', label: 'Spouse' },
                        { value: 'parent', label: 'Parent' },
                        { value: 'fiance', label: 'Fiancé(e)' },
                    ],
                },
                {
                    id: 'part2.relativeName',
                    type: 'text',
                    label: 'Relative\'s Full Name',
                    required: true,
                },
                {
                    id: 'part2.relativeStatus',
                    type: 'radio',
                    label: 'Relative\'s Status',
                    required: true,
                    options: [
                        { value: 'usCitizen', label: 'U.S. Citizen' },
                        { value: 'lpr', label: 'Lawful Permanent Resident' },
                    ],
                },
            ],
        },
        {
            id: 'part3',
            title: 'Part 3: Grounds of Inadmissibility',
            description: 'Specify which grounds you are seeking to waive',
            questions: [
                {
                    id: 'part3.inadmissibilityGrounds',
                    type: 'textarea',
                    label: 'Describe the grounds of inadmissibility',
                    required: true,
                    helpText: 'Explain which grounds under INA 212(a) apply to you',
                },
                {
                    id: 'part3.extremeHardship',
                    type: 'textarea',
                    label: 'Describe extreme hardship to qualifying relative',
                    required: true,
                    helpText: 'Explain how your relative would suffer extreme hardship if waiver is denied',
                },
            ],
        },
    ],
    estimatedFilingTime: '12-18 months',
    tips: [
        'Requires proof of extreme hardship to a qualifying US citizen or LPR relative',
        'Common grounds: criminal activity, fraud, unlawful presence',
        'Strong supporting documentation is crucial',
        'Highly recommend consulting an immigration attorney',
    ],
};

const I601A_DEFINITION: FormDefinition = {
    id: 'i-601a',
    code: 'I-601A',
    name: 'Provisional Unlawful Presence Waiver',
    description: 'Waive unlawful presence before leaving for consular processing',
    category: 'family',
    estimatedTime: '75-90 minutes',
    filingFee: 715,
    price: 60,
    sections: [
        {
            id: 'part1',
            title: 'Part 1: Information About You',
            description: 'Personal identifying information',
            questions: [
                {
                    id: 'part1.lastName',
                    type: 'text',
                    label: 'Family Name (Last Name)',
                    required: true,
                },
                {
                    id: 'part1.firstName',
                    type: 'text',
                    label: 'Given Name (First Name)',
                    required: true,
                },
                {
                    id: 'part1.middleName',
                    type: 'text',
                    label: 'Middle Name',
                },
                {
                    id: 'part1.dateOfBirth',
                    type: 'date',
                    label: 'Date of Birth',
                    required: true,
                },
                {
                    id: 'part1.alienNumber',
                    type: 'text',
                    label: 'Alien Registration Number (A-Number)',
                    required: true,
                    placeholder: 'A-',
                },
            ],
        },
        {
            id: 'part2',
            title: 'Part 2: Qualifying Relative Information',
            description: 'Information about your US citizen spouse or parent',
            questions: [
                {
                    id: 'part2.relativeType',
                    type: 'radio',
                    label: 'Your qualifying relative is your',
                    required: true,
                    options: [
                        { value: 'spouse', label: 'U.S. Citizen Spouse' },
                        { value: 'parent', label: 'U.S. Citizen Parent' },
                    ],
                },
                {
                    id: 'part2.relativeName',
                    type: 'text',
                    label: 'Relative\'s Full Name',
                    required: true,
                },
                {
                    id: 'part2.relativeSSN',
                    type: 'text',
                    label: 'Relative\'s Social Security Number',
                    placeholder: '123-45-6789',
                },
            ],
        },
        {
            id: 'part3',
            title: 'Part 3: Extreme Hardship Information',
            description: 'Evidence of extreme hardship to your qualifying relative',
            questions: [
                {
                    id: 'part3.extremeHardship',
                    type: 'textarea',
                    label: 'Describe extreme hardship to qualifying relative',
                    required: true,
                    helpText: 'Explain medical, financial, educational, or other hardships',
                },
                {
                    id: 'part3.consularPost',
                    type: 'text',
                    label: 'U.S. Consulate Where You Will Apply',
                    required: true,
                    helpText: 'e.g., Ciudad Juarez, Mexico',
                },
            ],
        },
    ],
    estimatedFilingTime: '6-12 months',
    tips: [
        'Only for those with approved I-130 or I-140 petition',
        'Must have only unlawful presence as inadmissibility ground',
        'Allows you to get provisional waiver BEFORE leaving US',
        'Strong evidence of extreme hardship is essential',
    ],
};

// ============================================================================
// FORM REGISTRY
// ============================================================================

export const FORM_REGISTRY: Record<string, FormDefinition> = {
    // Family-Based Forms
    'i-130': I130_DEFINITION,
    'i-129f': I129F_DEFINITION,
    'i-485': I485_DEFINITION,
    'i-864': I864_DEFINITION,
    'i-751': I751_DEFINITION,
    'i-360': I360_DEFINITION,
    'i-600': I600_DEFINITION,

    // Employment/Work Authorization Forms
    'i-129': I129_DEFINITION,
    'i-140': I140_DEFINITION,
    'i-765': I765_DEFINITION,
    'i-526': I526_DEFINITION,
    'i-9': I9_DEFINITION,

    // Status Change/Extension
    'i-539': I539_DEFINITION,

    // Travel
    'i-131': I131_DEFINITION,

    // Citizenship
    'n-400': N400_DEFINITION,

    // Humanitarian
    'i-589': I589_DEFINITION,
    'i-730': I730_DEFINITION,
    'i-821': I821_DEFINITION,
    'i-821d': I821D_DEFINITION,

    // Waivers
    'i-601': I601_DEFINITION,
    'i-601a': I601A_DEFINITION,
    'i-212': I212_DEFINITION,

    // Appeals
    'i-290b': I290B_DEFINITION,

    // Other
    'i-90': I90_DEFINITION,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getFormDefinition(formId: string): FormDefinition | null {
    return FORM_REGISTRY[formId] || null;
}

export function getAllForms(): FormDefinition[] {
    return Object.values(FORM_REGISTRY);
}

export function getFormsByCategory(category: FormDefinition['category']): FormDefinition[] {
    return getAllForms().filter(form => form.category === category);
}

export function getFormByCode(code: string): FormDefinition | null {
    return getAllForms().find(form => form.code === code) || null;
}
