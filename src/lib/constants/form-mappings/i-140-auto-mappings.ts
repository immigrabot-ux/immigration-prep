/**
 * Auto-generated field mappings for I-140
 *
 * Generated on: 2025-11-27T05:32:35.079Z
 * Mapped: 12/40 fields (30%)
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

export const I_140_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.3d.city', pdfField: 'form1[0].#subform[0].Line6d_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part1.3e.state', pdfField: 'form1[0].#subform[0].attyStateBarNumber[0]', }, // Confidence: 10
  { questionId: 'part1.3f.zipCode', pdfField: 'form1[0].#subform[0].Line6g_PostalCode[0]', }, // Confidence: 10
  { questionId: 'part3.4.cityOfBirth', pdfField: 'form1[0].#subform[1].Line2d_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part3.5.countryOfBirth', pdfField: 'form1[0].#subform[0].Line6i_Country[0]', }, // Confidence: 10
  { questionId: 'part3.6.countryOfCitizenship', pdfField: 'form1[0].#subform[1].Line2i_Country[0]', }, // Confidence: 10
  { questionId: 'part8.2.contactEmail', pdfField: 'form1[0].#subform[5].Part7_Item7_Email[0]', }, // Confidence: 10
  { questionId: 'part1.3a.street', pdfField: 'form1[0].#subform[0].Line6b_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part1.3b.aptSteFlr', pdfField: 'form1[0].#subform[0].Line6c_AptSteFlrNumber[0]', }, // Confidence: 9
  { questionId: 'part1.3c.unitNumber', pdfField: 'form1[0].#subform[0].Line6c_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part1.4.phone', pdfField: 'form1[0].#subform[5].Part7_Item6_MobilePhone[0]', }, // Confidence: 9
  { questionId: 'part8.3.contactPhone', pdfField: 'form1[0].#subform[5].Part7_Item5_DayPhone[0]', }, // Confidence: 9
];

/**
 * Unmapped questions (28):
 * These need manual review and mapping.
 *
 * - part1.1a.legalName: "1.a. Legal Name of Organization (or Your Full Name if Individual)"
 * - part1.1b.tradeName: "1.b. Trade Name/DBA (if any)"
 * - part1.2.taxId: "2. U.S. Employer Identification Number (EIN)"
 * - part2.classification: "This petition is being filed for (select one):"
 * - part2.selfPetition: "Is this a self-petition?"
 * - part3.1a.familyName: "1.a. Family Name (Last Name)"
 * - part3.1b.givenName: "1.b. Given Name (First Name)"
 * - part3.1c.middleName: "1.c. Middle Name"
 * - part3.2.alienNumber: "2. Alien Registration Number (A-Number) (if any)"
 * - part3.3.dateOfBirth: "3. Date of Birth"
 * - part4.1.beneficiaryInUS: "1. Is the beneficiary currently in the United States?"
 * - part4.2.currentStatus: "2. If yes, current nonimmigrant status"
 * - part4.3.statusExpiration: "3. Current Status Valid Until"
 * - part4.4.consularProcessing: "4. Will beneficiary apply for adjustment of status or consular processing?"
 * - part5.1.jobTitle: "1. Job Title"
 * - part5.2.socCode: "2. SOC Code"
 * - part5.3.salaryPerYear: "3. Salary Per Year"
 * - part5.4.educationRequired: "4. Minimum Education Required"
 * - part5.5.experienceRequired: "5. Months of Experience Required in Job Offered"
 * - part5.6.jobDuties: "6. Job Duties"
 * - part6.1.permRequired: "1. Is a PERM labor certification required for this petition?"
 * - part6.2.permCaseNumber: "2. PERM Case Number"
 * - part6.3.permFilingDate: "3. PERM Filing Date"
 * - part6.4.permApprovalDate: "4. PERM Approval Date"
 * - part7.1.maritalStatus: "1. Beneficiary's Current Marital Status"
 * - part7.2.numberOfChildren: "2. Total Number of Children (Unmarried and Under 21)"
 * - part8.1.contactName: "1. Contact Person Name"
 * - part8.4.certification: "I certify, under penalty of perjury, that all information in this petition is true and correct"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_140_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 5 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_140_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9];
  return confidences[i] < 10;
});
