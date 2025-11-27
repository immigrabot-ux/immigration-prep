// Quiz question types
export interface QuizOption {
    value: string;
    label: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    type: 'single_choice' | 'multiple_choice';
    options: QuizOption[];
    showIf?: {
        [key: string]: string | string[];
    };
}

export interface QuizAnswers {
    [key: string]: string;
}

export interface FormRecommendation {
    form: string;
    name: string;
    required: boolean;
    description?: string;
}

export interface QuizResult {
    forms: FormRecommendation[];
    warning?: string;
    estimatedFees?: number;
    estimatedTimeline?: string;
}

// Quiz questions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 'current_status',
        question: 'What is your current immigration status?',
        type: 'single_choice',
        options: [
            { value: 'us_citizen', label: 'U.S. Citizen' },
            { value: 'green_card', label: 'Green Card Holder (Permanent Resident)' },
            { value: 'visa_holder', label: 'Visa Holder (F1, H1B, etc.)' },
            { value: 'no_status', label: 'No current status / Undocumented' },
            { value: 'other', label: 'Other' }
        ]
    },
    {
        id: 'location',
        question: 'Where are you currently located?',
        type: 'single_choice',
        options: [
            { value: 'inside_us', label: 'Inside the United States' },
            { value: 'outside_us', label: 'Outside the United States' }
        ]
    },
    {
        id: 'goal',
        question: 'What are you trying to do?',
        type: 'single_choice',
        options: [
            { value: 'spouse_greencard', label: 'Get a green card for my spouse' },
            { value: 'my_greencard', label: 'Get a green card for myself' },
            { value: 'citizenship', label: 'Become a U.S. citizen' },
            { value: 'work_permit', label: 'Get a work permit' },
            { value: 'travel_document', label: 'Get a travel document' },
            { value: 'other', label: 'Something else' }
        ]
    },
    {
        id: 'relationship',
        question: 'What is your relationship to the U.S. citizen or green card holder?',
        type: 'single_choice',
        showIf: { goal: ['spouse_greencard', 'my_greencard'] },
        options: [
            { value: 'spouse', label: 'Spouse (married)' },
            { value: 'fiance', label: 'Fiancé(e) (engaged, not yet married)' },
            { value: 'parent', label: 'Parent' },
            { value: 'child', label: 'Child' },
            { value: 'sibling', label: 'Sibling' }
        ]
    },
    {
        id: 'marriage_duration',
        question: 'How long have you been married?',
        type: 'single_choice',
        showIf: { relationship: 'spouse' },
        options: [
            { value: 'less_than_2_years', label: 'Less than 2 years' },
            { value: 'more_than_2_years', label: '2 years or more' }
        ]
    },
    {
        id: 'criminal_history',
        question: 'Have you ever been arrested, cited, or detained by law enforcement?',
        type: 'single_choice',
        options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
        ]
    },
    {
        id: 'immigration_violations',
        question: 'Have you ever overstayed a visa or been out of status?',
        type: 'single_choice',
        options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
            { value: 'not_sure', label: "I'm not sure" }
        ]
    },
    {
        id: 'previous_applications',
        question: 'Have you previously applied for any immigration benefits?',
        type: 'single_choice',
        options: [
            { value: 'no', label: 'No, this is my first time' },
            { value: 'yes', label: 'Yes, I have applied before' }
        ]
    }
];

// Logic to determine which questions to show
export function shouldShowQuestion(
    question: QuizQuestion,
    answers: QuizAnswers
): boolean {
    if (!question.showIf) return true;

    for (const [key, value] of Object.entries(question.showIf)) {
        const answer = answers[key];
        if (!answer) return false;

        if (Array.isArray(value)) {
            if (!value.includes(answer)) return false;
        } else {
            if (answer !== value) return false;
        }
    }

    return true;
}

// Logic to get recommended forms based on answers
export function getRecommendedForms(answers: QuizAnswers): QuizResult {
    const forms: FormRecommendation[] = [];
    let warning: string | undefined;
    let estimatedFees = 0;
    let estimatedTimeline = '';

    // Marriage-based green card (spouse of US citizen, inside US)
    if (
        answers.goal === 'spouse_greencard' &&
        answers.relationship === 'spouse' &&
        answers.location === 'inside_us'
    ) {
        forms.push(
            {
                form: 'I-130',
                name: 'Petition for Alien Relative',
                required: true,
                description: 'Establishes the family relationship between you and your spouse'
            },
            {
                form: 'I-485',
                name: 'Application to Adjust Status',
                required: true,
                description: 'Applies for permanent residence (green card)'
            },
            {
                form: 'I-765',
                name: 'Application for Employment Authorization',
                required: false,
                description: 'Allows work while waiting for green card'
            },
            {
                form: 'I-131',
                name: 'Application for Travel Document',
                required: false,
                description: 'Allows travel while waiting for green card'
            },
            {
                form: 'I-864',
                name: 'Affidavit of Support',
                required: true,
                description: 'Proves financial support for the immigrant'
            }
        );
        estimatedFees = 2820; // I-130 ($535) + I-485 ($1140) + I-765 ($410) + I-131 ($575) + I-864 ($0) + biometrics ($160)
        estimatedTimeline = '10-13 months';
    }

    // Marriage-based green card for my own green card
    if (
        answers.goal === 'my_greencard' &&
        answers.relationship === 'spouse' &&
        answers.location === 'inside_us'
    ) {
        forms.push(
            {
                form: 'I-130',
                name: 'Petition for Alien Relative',
                required: true,
                description: 'Your spouse files this to petition for you'
            },
            {
                form: 'I-485',
                name: 'Application to Adjust Status',
                required: true,
                description: 'Your application for permanent residence'
            },
            {
                form: 'I-765',
                name: 'Application for Employment Authorization',
                required: false,
                description: 'Allows you to work while waiting'
            },
            {
                form: 'I-131',
                name: 'Application for Travel Document',
                required: false,
                description: 'Allows you to travel while waiting'
            },
            {
                form: 'I-864',
                name: 'Affidavit of Support',
                required: true,
                description: 'Your spouse proves financial support'
            }
        );
        estimatedFees = 2820;
        estimatedTimeline = '10-13 months';
    }

    // Citizenship (N-400)
    if (answers.goal === 'citizenship') {
        forms.push(
            {
                form: 'N-400',
                name: 'Application for Naturalization',
                required: true,
                description: 'Application to become a U.S. citizen'
            }
        );
        estimatedFees = 760; // $640 + $80 biometrics
        estimatedTimeline = '8-12 months';
    }

    // Fiancé visa
    if (answers.relationship === 'fiance') {
        forms.push(
            {
                form: 'I-129F',
                name: 'Petition for Alien Fiancé(e)',
                required: true,
                description: 'Petition for fiancé(e) to enter the U.S. to marry'
            }
        );
        estimatedFees = 535;
        estimatedTimeline = '6-9 months';
    }

    // Work permit only
    if (answers.goal === 'work_permit') {
        forms.push(
            {
                form: 'I-765',
                name: 'Application for Employment Authorization',
                required: true,
                description: 'Application for work permit'
            }
        );
        estimatedFees = 410;
        estimatedTimeline = '3-5 months';
    }

    // Travel document only
    if (answers.goal === 'travel_document') {
        forms.push(
            {
                form: 'I-131',
                name: 'Application for Travel Document',
                required: true,
                description: 'Application for advance parole or re-entry permit'
            }
        );
        estimatedFees = 575;
        estimatedTimeline = '4-6 months';
    }

    // Add warnings if needed
    if (answers.criminal_history === 'yes' || answers.immigration_violations === 'yes') {
        warning = 'Based on your answers, your case may have complications. We strongly recommend consulting with an immigration attorney before proceeding.';
    }

    // Default case if no forms matched
    if (forms.length === 0) {
        warning = 'Based on your answers, we cannot provide specific form recommendations. Please consult with an immigration attorney to discuss your situation.';
    }

    return {
        forms,
        warning,
        estimatedFees: estimatedFees > 0 ? estimatedFees : undefined,
        estimatedTimeline: estimatedTimeline || undefined
    };
}
