/**
 * Auto-generated field mappings for I-539
 *
 * Generated on: 2025-11-27T05:32:41.915Z
 * Mapped: 14/37 fields (38%)
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

export const I_539_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.5.countryOfBirth', pdfField: 'form1[0].#subform[1].P1_Line7_CountryOfCitizenship[0]', }, // Confidence: 10
  { questionId: 'part1.6.countryOfCitizenship', pdfField: 'form1[0].#subform[1].P1_Line6_CountryOfBirth[0]', }, // Confidence: 10
  { questionId: 'part1.11.passportCountry', pdfField: 'form1[0].#subform[1].SupA_Line1m_CountryOfIssuance[0]', }, // Confidence: 10
  { questionId: 'part1.15d.city', pdfField: 'form1[0].#subform[0].Part2_Item11_City[0]', }, // Confidence: 10
  { questionId: 'part1.15e.state', pdfField: 'form1[0].#subform[0].AttorneyStateBarNumber[0]', }, // Confidence: 10
  { questionId: 'part1.15f.zipCode', pdfField: 'form1[0].#subform[0].Part2_Item11_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part5.3.email', pdfField: 'form1[0].#subform[4].P6_Line5_EmailAddress[0]', }, // Confidence: 10
  { questionId: 'part1.10.passportNumber', pdfField: 'form1[0].#subform[1].SupA_Line1k_Passport[0]', }, // Confidence: 9
  { questionId: 'part1.12.passportExpiration', pdfField: 'form1[0].#subform[1].SupA_Line1k_Passport[1]', }, // Confidence: 9
  { questionId: 'part1.15a.street', pdfField: 'form1[0].#subform[4].P5_Line5_EmailAddress[0]', }, // Confidence: 9
  { questionId: 'part1.15b.aptSteFlr', pdfField: 'form1[0].#subform[0].Part1_Item4_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part1.15c.unitNumber', pdfField: 'form1[0].#subform[0].Part1_Item4_Unit[1]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part5.1.daytimePhone', pdfField: 'form1[0].#subform[4].P5_Line3_DaytimePhoneNumber[0]', }, // Confidence: 9
  { questionId: 'part5.2.mobilePhone', pdfField: 'form1[0].#subform[4].P5_Line4_MobilePhoneNumber[0]', }, // Confidence: 9
];

/**
 * Unmapped questions (23):
 * These need manual review and mapping.
 *
 * - part1.1a.familyName: "1.a. Family Name (Last Name)"
 * - part1.1b.givenName: "1.b. Given Name (First Name)"
 * - part1.1c.middleName: "1.c. Middle Name"
 * - part1.2.alienNumber: "2. Alien Registration Number (A-Number) (if any)"
 * - part1.3.uscisOnlineNumber: "3. USCIS Online Account Number (if any)"
 * - part1.4.dateOfBirth: "4. Date of Birth"
 * - part1.7.currentNonimmigrantStatus: "7. Current Nonimmigrant Status"
 * - part1.8.i94Number: "8. I-94 Arrival-Departure Record Number"
 * - part1.9.statusExpirationDate: "9. Date Status Expires (as shown on I-94)"
 * - part1.13.dateOfLastEntry: "13. Date of Last Arrival into the United States"
 * - part1.14.placeOfLastEntry: "14. Place of Last Arrival (City, State)"
 * - part2.1.applicationType: "1. I am applying for (select only one):"
 * - part2.2.newStatusRequested: "2. If requesting change of status, enter the new status you are requesting"
 * - part2.3.numberOfApplicants: "3. Total number of people included in this application"
 * - part3.1.basedOnDependentStatus: "1. Is this application based on an extension or change of status already granted to your spouse, child, or parent?"
 * - part3.2.receiptNumber: "2. If yes, provide the receipt number of the petition or application"
 * - part3.3.requestedExtensionDate: "3. Date you want your extension or change of status to begin"
 * - part3.4.requestedEndDate: "4. Date you want your extended stay to end"
 * - part4.1.everWorkedUS: "1. Have you ever been employed in the United States without authorization?"
 * - part4.2.everViolatedStatus: "2. Have you ever failed to maintain your nonimmigrant status?"
 * - part4.3.everArrested: "3. Have you ever been arrested or convicted of any crime or offense?"
 * - part4.4.reasonForExtension: "4. Explain why you are requesting this extension or change of status"
 * - part5.4.certification: "I certify, under penalty of perjury, that all information in this application is true and correct"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_539_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 7 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_539_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9];
  return confidences[i] < 10;
});
