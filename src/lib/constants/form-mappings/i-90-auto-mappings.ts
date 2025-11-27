/**
 * Auto-generated field mappings for I-90
 *
 * Generated on: 2025-11-27T05:32:34.464Z
 * Mapped: 14/42 fields (33%)
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

export const I_90_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.7.countryOfBirth', pdfField: 'form1[0].#subform[0].P1_Line6i_Country[0]', }, // Confidence: 10
  { questionId: 'part1.8.countryOfCitizenship', pdfField: 'form1[0].#subform[0].P1_Line7h_Country[0]', }, // Confidence: 10
  { questionId: 'part1.10.ssn', pdfField: 'form1[0].#subform[1].P1_Line16_SSN[0]', }, // Confidence: 10
  { questionId: 'part1.12d.city', pdfField: 'form1[0].#subform[0].P1_Line6d_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part1.12e.state', pdfField: 'form1[0].#subform[0].P1_Line6e_State[0]', }, // Confidence: 10
  { questionId: 'part1.12f.zipCode', pdfField: 'form1[0].#subform[0].P1_Line6h_PostalCode[0]', }, // Confidence: 10
  { questionId: 'part3.2.cityCountry', pdfField: 'form1[0].#subform[0].P1_Line7c_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part4.1.ethnicity', pdfField: 'form1[0].#subform[1].P1_Line10_CityTownOfBirth[0]', }, // Confidence: 10
  { questionId: 'part6.1c.email', pdfField: 'form1[0].#subform[3].P5_Line5_EmailAddress[0]', }, // Confidence: 10
  { questionId: 'part1.12a.street', pdfField: 'form1[0].#subform[0].P1_Line6b_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part1.12b.aptSteFlr', pdfField: 'form1[0].#subform[0].P1_Line6c_AptSteFlrNumber[0]', }, // Confidence: 9
  { questionId: 'part1.12c.unitNumber', pdfField: 'form1[0].#subform[0].P1_checkbox6c_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part6.1a.daytimePhone', pdfField: 'form1[0].#subform[3].P5_Line3_DaytimePhoneNumber[0]', }, // Confidence: 9
  { questionId: 'part6.1b.mobilePhone', pdfField: 'form1[0].#subform[3].P5_Line4_MobilePhoneNumber[0]', }, // Confidence: 9
];

/**
 * Unmapped questions (28):
 * These need manual review and mapping.
 *
 * - part1.1a.familyName: "1.a. Family Name (Last Name)"
 * - part1.1b.givenName: "1.b. Given Name (First Name)"
 * - part1.1c.middleName: "1.c. Middle Name"
 * - part1.2.alienNumber: "2. Alien Registration Number (A-Number)"
 * - part1.3.uscisOnlineNumber: "3. USCIS Online Account Number"
 * - part1.4.classOfAdmission: "4. Class of Admission"
 * - part1.5.dateOfAdmission: "5. Date You Became a Permanent Resident"
 * - part1.6.dateOfBirth: "6. Date of Birth"
 * - part1.9.nameChanged: "9. Has your name legally changed since you were granted lawful permanent residence?"
 * - part1.11.inCareOfName: "11. In Care Of Name (if any)"
 * - part1.13.physicalAddressSameAsMailing: "13. Is your physical address the same as your mailing address?"
 * - part2.residenceType: "What type of resident are you?"
 * - part2.sectionA.reason: "Section A: Reason for Application (for Permanent Residents)"
 * - part3.1.locationOfProcessing: "1. Where did you process for your green card?"
 * - part3.3.uscisOffice: "3. USCIS Office Location (if processed in U.S.)"
 * - part4.2.race: "2. Race"
 * - part4.3.heightFeet: "3. Height - Feet"
 * - part4.3.heightInches: "3. Height - Inches"
 * - part4.4.weight: "4. Weight (in pounds)"
 * - part4.5.eyeColor: "5. Eye Color"
 * - part4.6.hairColor: "6. Hair Color"
 * - part5.1.needAccommodations: "Are you requesting an accommodation because of a disability?"
 * - part5.2.deaf: "I am deaf or hard of hearing and request ASL interpreter"
 * - part5.3.blind: "I am blind or have low vision and request materials in alternative format"
 * - part5.4.other: "Other accommodation request (please describe)"
 * - part6.2.preparedApplication: "2. Who prepared this application?"
 * - part7.certification: "I certify, under penalty of perjury, that all information in this application and evidence submitted is true and correct"
 * - part7.acknowledgement: "I authorize release of information from this application to other government agencies"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_90_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 5 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_90_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9];
  return confidences[i] < 10;
});
