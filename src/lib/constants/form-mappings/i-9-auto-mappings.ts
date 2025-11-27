/**
 * Auto-generated field mappings for I-9
 *
 * Generated on: 2025-11-27T05:32:42.199Z
 * Mapped: 8/46 fields (17%)
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

export const I_9_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'section1.city', pdfField: 'Preparer or Translator City or Town 0', }, // Confidence: 10
  { questionId: 'section1.state', pdfField: 'Preparer State 0', }, // Confidence: 10
  { questionId: 'section2.employerCity', pdfField: 'Preparer or Translator City or Town 1', }, // Confidence: 10
  { questionId: 'section2.employerState', pdfField: 'Preparer State 1', }, // Confidence: 10
  { questionId: 'section1.streetAddress', pdfField: 'Preparer or Translator Address (Street Number and Name) 0', }, // Confidence: 9
  { questionId: 'section1.aptNumber', pdfField: 'Apt Number (if any)', }, // Confidence: 9
  { questionId: 'section1.telephone', pdfField: 'Telephone Number', }, // Confidence: 9
  { questionId: 'section1.foreignPassportNumber', pdfField: 'Foreign Passport Number and Country of IssuanceRow1', }, // Confidence: 9
];

/**
 * Unmapped questions (38):
 * These need manual review and mapping.
 *
 * - section1.lastName: "Last Name (Family Name)"
 * - section1.firstName: "First Name (Given Name)"
 * - section1.middleInitial: "Middle Initial"
 * - section1.otherLastNames: "Other Last Names Used (if any)"
 * - section1.zipCode: "ZIP Code"
 * - section1.dateOfBirth: "Date of Birth (mm/dd/yyyy)"
 * - section1.ssn: "U.S. Social Security Number"
 * - section1.email: "Employee's Email Address"
 * - section1.citizenshipStatus: "I attest, under penalty of perjury, that I am (check one of the following boxes):"
 * - section1.uscisNumber: "USCIS Number (for LPR or alien authorized to work)"
 * - section1.alienNumber: "Alien Registration Number/USCIS Number"
 * - section1.i94Number: "Form I-94 Admission Number"
 * - section1.passportCountry: "Country of Issuance"
 * - section1.workAuthorizationExpiration: "Employment Authorization Expiration Date (if any)"
 * - section2.employeeLastName: "Employee Last Name from Section 1"
 * - section2.employeeFirstName: "Employee First Name from Section 1"
 * - section2.employeeMiddleInitial: "Employee Middle Initial from Section 1"
 * - section2.citizenshipStatus: "Citizenship/Immigration Status from Section 1"
 * - section2.listA.documentTitle: "Document Title"
 * - section2.listA.issuingAuthority: "Issuing Authority"
 * - section2.listA.documentNumber: "Document Number"
 * - section2.listA.expirationDate: "Expiration Date (if any)"
 * - section2.listB.documentTitle: "Document Title"
 * - section2.listB.issuingAuthority: "Issuing Authority"
 * - section2.listB.documentNumber: "Document Number"
 * - section2.listB.expirationDate: "Expiration Date (if any)"
 * - section2.listC.documentTitle: "Document Title"
 * - section2.listC.issuingAuthority: "Issuing Authority"
 * - section2.listC.documentNumber: "Document Number"
 * - section2.listC.expirationDate: "Expiration Date (if any)"
 * - section2.additionalInformation: "Additional Information"
 * - section2.firstDayOfEmployment: "Employee's First Day of Employment (mm/dd/yyyy)"
 * - section2.employerLastName: "Last Name of Employer or Authorized Representative"
 * - section2.employerFirstName: "First Name of Employer or Authorized Representative"
 * - section2.employerTitle: "Title of Employer or Authorized Representative"
 * - section2.employerBusinessName: "Employer's Business or Organization Name"
 * - section2.employerAddress: "Employer's Business Address (Street Number and Name)"
 * - section2.employerZipCode: "ZIP Code"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_9_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 9, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 4 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_9_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 9, 9, 9, 9];
  return confidences[i] < 10;
});
