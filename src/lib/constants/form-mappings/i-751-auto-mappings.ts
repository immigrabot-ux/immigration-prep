/**
 * Auto-generated field mappings for I-751
 *
 * Generated on: 2025-11-27T05:32:29.437Z
 * Mapped: 13/35 fields (37%)
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

export const I_751_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.mailingCity', pdfField: 'form1[0].#subform[1].Line17d_City_Town[0]', }, // Confidence: 10
  { questionId: 'part1.mailingState', pdfField: 'form1[0].#subform[0].AttorneyStateBarNumber[0]', }, // Confidence: 10
  { questionId: 'part1.mailingZip', pdfField: 'form1[0].#subform[1].Pt1Line15f_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part2.dob', pdfField: 'form1[0].#subform[0].P1_Line4_DateOfBirth[0]', }, // Confidence: 10
  { questionId: 'part2.countryOfBirth', pdfField: 'form1[0].#subform[0].P1_Line6_CountryOfCitizenship[0]', }, // Confidence: 10
  { questionId: 'part2.countryOfCitizenship', pdfField: 'form1[0].#subform[0].P1_Line5_CountryOfBirth[0]', }, // Confidence: 10
  { questionId: 'part2.ethnicity', pdfField: 'form1[0].#subform[1].Pt1Line17_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part4.spouseFamilyName', pdfField: 'form1[0].#subform[7].P5_Line6a_SignatureofSpouse[0]', }, // Confidence: 10
  { questionId: 'part4.spouseDob', pdfField: 'form1[0].#subform[2].Line3_DateOfBirth[0]', }, // Confidence: 10
  { questionId: 'part4.spouseSsn', pdfField: 'form1[0].#subform[0].P1_Line8_SSN[0]', }, // Confidence: 10
  { questionId: 'part1.mailingStreet', pdfField: 'form1[0].#subform[1].Pt1Line17_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part1.mailingAptType', pdfField: 'form1[0].#subform[1].Line17c_Apt_Ste_Flr_Number[0]', }, // Confidence: 9
  { questionId: 'part1.mailingAptNumber', pdfField: 'form1[0].#subform[1].Line17c_Unit[0]', type: 'checkbox', }, // Confidence: 9
];

/**
 * Unmapped questions (22):
 * These need manual review and mapping.
 *
 * - part1.familyName: "1.a. Family Name (Last Name)"
 * - part1.givenName: "1.b. Given Name (First Name)"
 * - part1.middleName: "1.c. Middle Name"
 * - part1.alienNumber: "2. A-Number (Alien Registration Number)"
 * - part1.uscisAccount: "3. USCIS Online Account Number"
 * - part1.dateConditionalResidence: "4. Date Conditional Residence Obtained"
 * - part1.expirationDate: "5. Conditional Residence Expires On"
 * - part2.race: "5. Race (Select all that apply)"
 * - part3.filingBasis: "I am filing this petition (select only one):"
 * - part3.marriageEnded: "If filing for a waiver: Is your marriage still legally valid?"
 * - part4.spouseGivenName: "1.b. Spouse's Given Name (First Name)"
 * - part4.spouseMiddleName: "1.c. Spouse's Middle Name"
 * - part4.spouseAlienNumber: "4. Spouse's A-Number (if any)"
 * - part4.dateOfMarriage: "5. Date of Marriage"
 * - part4.placeOfMarriage: "6. Place of Marriage (City, State/Province, Country)"
 * - part4.spouseStatus: "7. Spouse's Current Immigration Status"
 * - part5.totalChildren: "1. Total number of children"
 * - part5.childrenDetails: "2. List each child's information"
 * - part5.childrenIncludedInPetition: "3. How many children are listed on your conditional green card and included in this petition?"
 * - part7.certifyTruthfulness: "I certify, under penalty of perjury, that all information in this petition and any document submitted with it were provided or authorized by me, that I reviewed and understand all of the information contained in and submitted with my petition, and that all of this information is complete, true, and correct."
 * - part7.certifyGoodFaith: "I understand that I must establish that I entered into the marriage in good faith and provide evidence that the marriage was not entered into for the purpose of procuring an immigration benefit."
 * - part7.understoodConsequences: "I understand that if USCIS determines I entered the marriage solely to obtain immigration benefits, my conditional residence will not be removed and I may be subject to removal from the United States."
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_751_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 3 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_751_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9];
  return confidences[i] < 10;
});
