/**
 * Auto-generated field mappings for I-821D
 *
 * Generated on: 2025-11-27T13:38:29.616Z
 * Mapped: 6/14 fields (43%)
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

export const I_821D_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part2.ssn', pdfField: 'form1[0].#subform[1].P1_Line8_SSN[0]', }, // Confidence: 10
  { questionId: 'part2.mailingCity', pdfField: 'form1[0].#subform[0].P1_Line4d_City[0]', }, // Confidence: 10
  { questionId: 'part2.mailingState', pdfField: 'form1[0].#subform[0].P1_Line4e_State[0]', }, // Confidence: 10
  { questionId: 'part2.mailingZip', pdfField: 'form1[0].#subform[0].P1_Line4f_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part2.countryOfBirth', pdfField: 'form1[0].#subform[1].P1_Line11b_CountryBirth[0]', }, // Confidence: 10
  { questionId: 'part2.countryOfCitizenship', pdfField: 'form1[0].#subform[1].P1_Line12_CountryRes[0]', }, // Confidence: 10
];

/**
 * Unmapped questions (8):
 * These need manual review and mapping.
 *
 * - part1.requestType: "Type of Request"
 * - part1.lastName: "Family Name (Last Name)"
 * - part1.firstName: "Given Name (First Name)"
 * - part1.middleName: "Middle Name"
 * - part1.dateOfBirth: "Date of Birth"
 * - part1.alienNumber: "Alien Registration Number (A-Number)"
 * - part1.expirationDate: "Current DACA Expiration Date"
 * - part2.mailingStreet: "Mailing Address - Street"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_821D_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 0 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_821D_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10];
  return confidences[i] < 10;
});
