/**
 * Auto-generated field mappings for I-129
 *
 * Generated on: 2025-11-27T05:32:34.779Z
 * Mapped: 19/51 fields (37%)
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

export const I_129_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part2.4d.city', pdfField: 'form1[0].#subform[0].Line_CityTown[0]', }, // Confidence: 10
  { questionId: 'part2.4e.state', pdfField: 'form1[0].#subform[0].P1_Line3_State[0]', }, // Confidence: 10
  { questionId: 'part2.4f.zipCode', pdfField: 'form1[0].#subform[0].P1_Line3_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part3.3.countryOfBirth', pdfField: 'form1[0].#subform[0].P1_Line3_Country[0]', }, // Confidence: 10
  { questionId: 'part3.4.countryOfCitizenship', pdfField: 'form1[0].#subform[2].Line_CountryOfIssuance[0]', }, // Confidence: 10
  { questionId: 'part3.6.ssn', pdfField: 'form1[0].#subform[1].Line4_SSN[0]', }, // Confidence: 10
  { questionId: 'part3.8.passportCountry', pdfField: 'form1[0].#subform[2].Part4_1c_State_or_Country[0]', }, // Confidence: 10
  { questionId: 'part5.8.workLocationCity', pdfField: 'form1[0].#subform[2].Line8d_CityTown[0]', }, // Confidence: 10
  { questionId: 'part5.8.workLocationState', pdfField: 'form1[0].#subform[2].Line8e_State[0]', }, // Confidence: 10
  { questionId: 'part8.3.contactEmail', pdfField: 'form1[0].#subform[6].Pt7Line3_EmailAddress[0]', }, // Confidence: 10
  { questionId: 'part2.4a.street', pdfField: 'form1[0].#subform[0].Line7b_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part2.4b.aptSteFlr', pdfField: 'form1[0].#subform[0].Line3_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part2.4c.unitNumber', pdfField: 'form1[0].#subform[0].Line3_Unit[1]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part2.5.phone', pdfField: 'form1[0].#subform[0].Line2_DaytimePhoneNumber1_Part8[0]', }, // Confidence: 9
  { questionId: 'part3.7.passportNumber', pdfField: 'form1[0].#subform[2].Part3Line5_PassportorTravDoc[0]', }, // Confidence: 9
  { questionId: 'part3.9.passportExpiration', pdfField: 'form1[0].#subform[15].ClassHLine5b_PassportorTravDoc[0]', }, // Confidence: 9
  { questionId: 'part5.8.workLocationStreet', pdfField: 'form1[0].#subform[0].Line9_EmailAddress[0]', }, // Confidence: 9
  { questionId: 'part8.2.contactPhone', pdfField: 'form1[0].#subform[0].Line3_MobilePhoneNumber1_Part8[0]', }, // Confidence: 9
  { questionId: 'part4.4.statusExpiration', pdfField: 'form1[0].#subform[2].Line11h_DateStatusExpires[0]', }, // Confidence: 8
];

/**
 * Unmapped questions (32):
 * These need manual review and mapping.
 *
 * - part1.1.petitionType: "1. This petition is being filed for (select one):"
 * - part1.2.classification: "2. Classification Requested"
 * - part2.1.petitionerType: "1. Petitioner Type"
 * - part2.2a.legalName: "2.a. Company/Organization Legal Name"
 * - part2.2b.tradeName: "2.b. Trade Name/DBA (if any)"
 * - part2.3.ein: "3. Employer Identification Number (EIN)"
 * - part3.1a.familyName: "1.a. Family Name (Last Name)"
 * - part3.1b.givenName: "1.b. Given Name (First Name)"
 * - part3.1c.middleName: "1.c. Middle Name"
 * - part3.2.dateOfBirth: "2. Date of Birth"
 * - part3.5.alienNumber: "5. Alien Registration Number (A-Number) (if any)"
 * - part4.1.beneficiaryInUS: "1. Is the beneficiary currently in the United States?"
 * - part4.2.currentStatus: "2. If yes, beneficiary's current nonimmigrant status"
 * - part4.3.i94Number: "3. I-94 Arrival-Departure Record Number"
 * - part4.5.changeOfStatus: "5. Request change of status to classification sought?"
 * - part5.1.jobTitle: "1. Job Title"
 * - part5.2.socCode: "2. SOC (ONET/OES) Code"
 * - part5.3.naicsCode: "3. NAICS Code"
 * - part5.4.startDate: "4. Requested Employment Start Date"
 * - part5.5.endDate: "5. Requested Employment End Date"
 * - part5.6.wageRate: "6. Rate of Pay"
 * - part5.7.rateType: "7. Pay Rate Type"
 * - part5.9.jobDuties: "9. Brief Description of Job Duties"
 * - part6.1.accessToTechnology: "1. Will the beneficiary have access to controlled technology or technical data?"
 * - part6.2.exportLicense: "2. If yes, do you have the required export license or other authorization?"
 * - h1b.1.lcaNumber: "1. Labor Condition Application (LCA) Number"
 * - h1b.2.wageLevel: "2. Prevailing Wage Level"
 * - h1b.3.capExempt: "3. Is this petition H-1B cap-exempt?"
 * - h1b.4.degreeRequired: "4. Minimum Degree Required for Position"
 * - h1b.5.degreeField: "5. Field of Study Required"
 * - part8.1.contactName: "1. Contact Person Name"
 * - part8.4.certification: "I certify, under penalty of perjury, that all information in this petition is true and correct"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_129_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 8];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 9 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_129_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 8];
  return confidences[i] < 10;
});
