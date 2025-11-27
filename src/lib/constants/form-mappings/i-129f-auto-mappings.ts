/**
 * Auto-generated field mappings for I-129F
 *
 * Generated on: 2025-11-27T13:56:53.178Z
 * Mapped: 24/60 fields (40%)
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

export const I_129F_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.4.ssn', pdfField: 'form1[0].#subform[0].Pt1Line3_SSN[0]', }, // Confidence: 10
  { questionId: 'part1.6.placeOfBirth.city', pdfField: 'form1[0].#subform[0].Pt1Line8_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part1.6.placeOfBirth.country', pdfField: 'form1[0].#subform[0].Pt1Line8_Country[0]', }, // Confidence: 10
  { questionId: 'part1.8d.city', pdfField: 'form1[0].#subform[1].Pt1Line9_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part1.8e.state', pdfField: 'form1[0].#subform[0].Pt1Line8_State[0]', }, // Confidence: 10
  { questionId: 'part1.8f.zipCode', pdfField: 'form1[0].#subform[0].Pt1Line8_PostalCode[0]', }, // Confidence: 10
  { questionId: 'part1.16.employerAddress.city', pdfField: 'form1[0].#subform[1].Pt1Line11_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part1.16.employerAddress.state', pdfField: 'form1[0].#subform[1].Pt1Line9_State[0]', }, // Confidence: 10
  { questionId: 'part2.4.ssn', pdfField: 'form1[0].#subform[3].Pt2Line3_SSN[0]', }, // Confidence: 10
  { questionId: 'part2.6.cityOfBirth', pdfField: 'form1[0].#subform[1].Pt1Line14_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part2.6.countryOfBirth', pdfField: 'form1[0].#subform[1].Pt1Line9_Country[0]', }, // Confidence: 10
  { questionId: 'part2.7.countryOfCitizenship', pdfField: 'form1[0].#subform[1].Pt1Line11_Country[0]', }, // Confidence: 10
  { questionId: 'part2.8.city', pdfField: 'form1[0].#subform[1].Pt1Line18_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part2.8.country', pdfField: 'form1[0].#subform[1].Pt1Line14_Country[0]', }, // Confidence: 10
  { questionId: 'part3.2.placeFirstMet.city', pdfField: 'form1[0].#subform[2].Pt1Line24_CityTownOfBirth[0]', }, // Confidence: 10
  { questionId: 'part3.2.placeFirstMet.country', pdfField: 'form1[0].#subform[1].Pt1Line18_Country[0]', }, // Confidence: 10
  { questionId: 'part5.3.email', pdfField: 'form1[0].#subform[9].Pt5Line3_Email[0]', }, // Confidence: 10
  { questionId: 'part1.8a.mailingStreet', pdfField: 'form1[0].#subform[0].Pt1Line8_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part1.8b.aptSteFlr', pdfField: 'form1[0].#subform[0].Pt1Line8_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part1.8c.unitNumber', pdfField: 'form1[0].#subform[0].Pt1Line8_Unit[1]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part1.16.employerAddress.street', pdfField: 'form1[0].#subform[1].Pt1Line9_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part2.8.addressStreet', pdfField: 'form1[0].#subform[1].Pt1Line11_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part5.1.daytimePhone', pdfField: 'form1[0].#subform[6].Pt2Line46_DayTimeTelephoneNumber[0]', }, // Confidence: 9
  { questionId: 'part5.2.mobilePhone', pdfField: 'form1[0].#subform[6].Pt2Line48_DaytimeTelephoneNum[0]', }, // Confidence: 9
];

/**
 * Unmapped questions (36):
 * These need manual review and mapping.
 *
 * - part1.1.classification: "1. Classification Sought for Your Beneficiary"
 * - part1.2a.familyName: "2.a. Family Name (Last Name)"
 * - part1.2b.givenName: "2.b. Given Name (First Name)"
 * - part1.2c.middleName: "2.c. Middle Name"
 * - part1.3.otherNamesUsed: "3. Other Names Used (if any)"
 * - part1.5.dateOfBirth: "5. Date of Birth"
 * - part1.7.howCitizenshipObtained: "7. How Did You Acquire U.S. Citizenship?"
 * - part1.9.physicalAddressSameAsMailing: "9. Is your physical address the same as your mailing address?"
 * - part1.10.currentMaritalStatus: "10. Current Marital Status"
 * - part1.11.numberOfPriorMarriages: "11. How many times have you been married?"
 * - part1.12.dateLastMarriageEnded: "12. Date Your Last Marriage Ended (if applicable)"
 * - part1.13.howLastMarriageEnded: "13. How Did Your Last Marriage End?"
 * - part1.14.occupation: "14. Your Current Occupation"
 * - part1.15.employerName: "15. Name of Your Current Employer"
 * - part2.1a.familyName: "1.a. Family Name (Last Name)"
 * - part2.1b.givenName: "1.b. Given Name (First Name)"
 * - part2.1c.middleName: "1.c. Middle Name"
 * - part2.2.otherNamesUsed: "2. Other Names Used"
 * - part2.3.alienNumber: "3. Alien Registration Number (A-Number) (if any)"
 * - part2.5.dateOfBirth: "5. Date of Birth"
 * - part2.8.province: "Province/State"
 * - part2.8.postalCode: "Postal Code"
 * - part2.9.currentMaritalStatus: "9. Beneficiary's Current Marital Status"
 * - part2.10.numberOfPriorMarriages: "10. Number of Times Beneficiary Has Been Married"
 * - part2.11.dateLastMarriageEnded: "11. Date Beneficiary's Last Marriage Ended (if applicable)"
 * - part2.12.children: "12. Number of Children (Under 21 and Unmarried)"
 * - part3.1.dateFirstMet: "1. Date You First Met in Person"
 * - part3.3.howMet: "3. How Did You Meet?"
 * - part3.4.metThroughIMB: "4. Did you meet through an International Marriage Broker?"
 * - part3.5.dateOfMarriage: "5. Date of Marriage (K-3 petitions only)"
 * - part3.6.placeOfMarriage: "6. Place of Marriage (K-3 petitions only)"
 * - part4.1.criminalConvictions: "1. Have you ever been arrested or convicted of any crime?"
 * - part4.2.filedPreviousPetitions: "2. Have you previously filed petitions for other fiancé(e)s or spouses?"
 * - part4.3.previousK1Petitions: "3. If yes, how many K-1 petitions have you filed in the past?"
 * - part6.certification: "I certify, under penalty of perjury, that all information in this petition is true and correct"
 * - part6.intentToMarry: "I certify that I am legally able to marry and intend to marry my fiancé(e) within 90 days of admission (K-1 only)"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_129F_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 7 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_129F_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9];
  return confidences[i] < 10;
});
