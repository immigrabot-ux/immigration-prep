// Field mappings for I-130 form
// Maps our internal field IDs to PDF form field names

export interface FieldMapping {
    source: string; // Our field ID
    target: string; // PDF field name
    transform?: (value: string) => string; // Optional transformation function
}

// In a real implementation, these would be actual USCIS PDF field names
// For this demo, we're using simplified names
export const I130_FIELD_MAPPINGS: FieldMapping[] = [
    // Petitioner Basic Information
    {
        source: 'petitioner.lastName',
        target: 'petitioner_last_name',
    },
    {
        source: 'petitioner.firstName',
        target: 'petitioner_first_name',
    },
    {
        source: 'petitioner.middleName',
        target: 'petitioner_middle_name',
    },
    {
        source: 'petitioner.dateOfBirth',
        target: 'petitioner_dob',
    },
    {
        source: 'petitioner.email',
        target: 'petitioner_email',
    },

    // Petitioner Address
    {
        source: 'petitioner.address.street',
        target: 'petitioner_street',
    },
    {
        source: 'petitioner.address.apt',
        target: 'petitioner_apt',
    },
    {
        source: 'petitioner.address.city',
        target: 'petitioner_city',
    },
    {
        source: 'petitioner.address.state',
        target: 'petitioner_state',
    },
    {
        source: 'petitioner.address.zipCode',
        target: 'petitioner_zip',
    },

    // Beneficiary Basic Information
    {
        source: 'beneficiary.lastName',
        target: 'beneficiary_last_name',
    },
    {
        source: 'beneficiary.firstName',
        target: 'beneficiary_first_name',
    },
    {
        source: 'beneficiary.middleName',
        target: 'beneficiary_middle_name',
    },
    {
        source: 'beneficiary.dateOfBirth',
        target: 'beneficiary_dob',
    },
    {
        source: 'beneficiary.countryOfBirth',
        target: 'beneficiary_country_of_birth',
    },

    // Marriage Information
    {
        source: 'marriage.dateOfMarriage',
        target: 'marriage_date',
    },
    {
        source: 'marriage.placeOfMarriage',
        target: 'marriage_place',
    },
    {
        source: 'marriage.previousMarriages',
        target: 'previous_marriages',
    },
];

// Helper function to get value from nested object path
export function getNestedValue(obj: Record<string, any>, path: string): string {
    return (path.split('.').reduce((current, key) => current?.[key], obj as any) as string) || '';
}

// Helper function to apply field mappings
export function applyFieldMappings(
    answers: Record<string, string>,
    mappings: FieldMapping[]
): Record<string, string> {
    const result: Record<string, string> = {};

    for (const mapping of mappings) {
        const value = answers[mapping.source] || '';
        const transformedValue = mapping.transform ? mapping.transform(value) : value;
        result[mapping.target] = transformedValue;
    }

    return result;
}
