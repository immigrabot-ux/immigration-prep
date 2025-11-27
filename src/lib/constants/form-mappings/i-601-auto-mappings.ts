/**
 * Auto-generated field mappings for I-601
 *
 * Generated on: 2025-11-27T13:38:41.436Z
 * Mapped: 1/11 fields (9%)
 *
 * ⚠️  IMPORTANT: Review all mappings before use in production!
 * Some mappings may be incorrect and require manual verification.
 */

export interface FieldMapping {
  questionId: string;
  pdfField: string;
  type?: string;
  value?: string;
}

export const I_601_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.countryOfBirth', pdfField: 'form1[0].#subform[0].p1Line5Country[0]', }, // Confidence: 10
];

/**
 * Unmapped questions (10):
 * These need manual review and mapping.
 *
 * - part1.lastName: "Family Name (Last Name)"
 * - part1.firstName: "Given Name (First Name)"
 * - part1.middleName: "Middle Name"
 * - part1.dateOfBirth: "Date of Birth"
 * - part1.alienNumber: "Alien Registration Number (A-Number)"
 * - part2.relativeType: "Your qualifying relative is your"
 * - part2.relativeName: "Relative's Full Name"
 * - part2.relativeStatus: "Relative's Status"
 * - part3.inadmissibilityGrounds: "Describe the grounds of inadmissibility"
 * - part3.extremeHardship: "Describe extreme hardship to qualifying relative"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_601_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 0 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_601_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10];
  return confidences[i] < 10;
});
