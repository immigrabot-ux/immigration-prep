/**
 * Auto-generated field mappings for I-360
 *
 * Generated on: 2025-11-27T13:56:57.540Z
 * Mapped: 13/53 fields (25%)
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

export const I_360_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.5.ssn', pdfField: 'form1[0].#subform[0].#area[1].Pt1Line3_SSN[0]', }, // Confidence: 10
  { questionId: 'part1.9.cityOrTown', pdfField: 'form1[0].#subform[0].Pt1Line6_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part1.10.state', pdfField: 'form1[0].#subform[0].Pt1Line6_State[0]', }, // Confidence: 10
  { questionId: 'part1.11.zipCode', pdfField: 'form1[0].#subform[0].Pt1Line6_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part3.4.cityOfBirth', pdfField: 'form1[0].#subform[1].Pt1Line7_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part3.5.countryOfBirth', pdfField: 'form1[0].#subform[0].Pt1Line6_Country[0]', }, // Confidence: 10
  { questionId: 'part7.4.spouseName', pdfField: 'form1[0].#subform[7].Pt7Line7_NumberofSpouseMarriages[0]', }, // Confidence: 10
  { questionId: 'part12.3.email', pdfField: 'form1[0].#subform[11].#subform[12].Pt9_Email[0]', }, // Confidence: 10
  { questionId: 'part1.8a.streetNumber', pdfField: 'form1[0].#subform[0].Pt1Line6_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part1.8b.aptSteFlr', pdfField: 'form1[0].#subform[0].Pt1Line6_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part1.8c.aptSteFlrNumber', pdfField: 'form1[0].#subform[0].Pt1Line6_Unit[1]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part12.1.daytimePhone', pdfField: 'form1[0].#subform[6].Pt6Line6e_WorkTelephoneNumber[0]', }, // Confidence: 9
  { questionId: 'part12.2.mobilePhone', pdfField: 'form1[0].#subform[6].Pt4Line6d_DaytimeTelephoneNumber[0]', }, // Confidence: 9
];

/**
 * Unmapped questions (40):
 * These need manual review and mapping.
 *
 * - part1.1a.familyName: "1.a. Family Name (Last Name)"
 * - part1.1b.givenName: "1.b. Given Name (First Name)"
 * - part1.1c.middleName: "1.c. Middle Name"
 * - part1.2.organizationName: "2. Name of Organization (if filing as an organization)"
 * - part1.3.alienNumber: "3. Alien Registration Number (A-Number) (if any)"
 * - part1.4.uscisAccountNumber: "4. USCIS Online Account Number (if any)"
 * - part1.6.dateOfBirth: "6. Date of Birth (mm/dd/yyyy)"
 * - part1.7.inCareOfName: "7. In Care Of Name (if any)"
 * - part2.classification: "I am filing this petition on behalf of:"
 * - part3.1a.familyName: "1.a. Family Name (Last Name)"
 * - part3.1b.givenName: "1.b. Given Name (First Name)"
 * - part3.1c.middleName: "1.c. Middle Name"
 * - part3.2.alienNumber: "2. Alien Registration Number (A-Number) (if any)"
 * - part3.3.dateOfBirth: "3. Date of Birth (mm/dd/yyyy)"
 * - part3.6.citizenship: "6. Country of Citizenship or Nationality"
 * - part7.1.dateOfMarriage: "1. Date of Marriage to U.S. Citizen (mm/dd/yyyy)"
 * - part7.2.placeOfMarriage: "2. Place of Marriage (City, State, Country)"
 * - part7.3.dateOfDeath: "3. Date of Death of U.S. Citizen Spouse (mm/dd/yyyy)"
 * - part7.5.priorMarriages: "5. Were you or your spouse previously married?"
 * - part8.1.courtOrder: "1. Do you have a court order from a juvenile court?"
 * - part8.2.courtName: "2. Name of Court"
 * - part8.3.courtOrderDate: "3. Date of Court Order (mm/dd/yyyy)"
 * - part8.4.dependencyDetermination: "4. Did the court determine you dependent on the court or placed in custody of state agency or individual?"
 * - part8.5.reunificationNotViable: "5. Did the court determine reunification with one or both parents is not viable?"
 * - part8.6.bestInterest: "6. Did the court determine it is not in your best interest to return to your country of nationality?"
 * - part9.1.religiousDenomination: "1. Name of Religious Denomination"
 * - part9.2.religiousOccupation: "2. Religious Occupation"
 * - part9.3.jobTitle: "3. Job Title or Position"
 * - part9.4.organizationName: "4. Name of Religious Organization"
 * - part9.5.organizationAddress: "5. Address of Religious Organization"
 * - part9.6.taxExemptStatus: "6. Does the organization have tax-exempt status?"
 * - part9.7.membershipYears: "7. How many years has the beneficiary been a member of this denomination?"
 * - part9.8.priorExperience: "8. Describe the beneficiary's religious work experience during the past 2 years"
 * - part10.1.abusiveRelative: "1. Your relationship to the abusive U.S. citizen or LPR"
 * - part10.2.abusiveRelativeName: "2. Full Name of Abusive Relative"
 * - part10.3.abusiveRelativeStatus: "3. Is the abusive relative a U.S. citizen or lawful permanent resident?"
 * - part10.4.marriageDate: "4. Date of Marriage (if applicable) (mm/dd/yyyy)"
 * - part10.5.currentlyLiving: "5. Are you currently living with the abusive relative?"
 * - part10.6.abuseSummary: "6. Brief description of the abuse"
 * - part12.4.certification: "I certify, under penalty of perjury, that all information in this petition and any supporting documents is true and correct"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_360_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 5 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_360_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9];
  return confidences[i] < 10;
});
