/**
 * Auto-generated field mappings for I-212
 *
 * Generated on: 2025-11-27T13:38:33.272Z
 * Mapped: 2/10 fields (20%)
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

export const I_212_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.cityOfBirth', pdfField: 'form1[0].Page1[0].p1Line5CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part1.countryOfBirth', pdfField: 'form1[0].Page1[0].p1Line5Country[0]', }, // Confidence: 10
];

/**
 * Unmapped questions (8):
 * These need manual review and mapping.
 *
 * - part1.lastName: "Family Name (Last Name)"
 * - part1.firstName: "Given Name (First Name)"
 * - part1.middleName: "Middle Name"
 * - part1.dateOfBirth: "Date of Birth"
 * - part1.alienNumber: "Alien Registration Number (A-Number)"
 * - part2.dateOfRemoval: "Date of Removal/Deportation"
 * - part2.portOfRemoval: "Port Where You Were Removed"
 * - part2.reasonForRemoval: "Reason for Removal"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_212_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 0 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_212_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10];
  return confidences[i] < 10;
});
