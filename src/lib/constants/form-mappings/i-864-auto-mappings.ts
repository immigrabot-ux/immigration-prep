/**
 * Auto-generated field mappings for I-864
 *
 * Generated on: 2025-11-27T00:57:04.788Z
 * Mapped: 11/41 fields (27%)
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

export const I_864_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part2.immigrantDob', pdfField: 'form1[0].#subform[1].P4_Line6_DateOfBirth[0]', }, // Confidence: 10
  { questionId: 'part2.immigrantCountryOfCitizenship', pdfField: 'form1[0].#subform[1].P4_Line2j_Country[0]', }, // Confidence: 10
  { questionId: 'part4.mailingCity', pdfField: 'form1[0].#subform[1].P4_Line2e_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part4.mailingState', pdfField: 'form1[0].#subform[0].AttorneyStateBarNumber[0]', }, // Confidence: 10
  { questionId: 'part4.mailingZip', pdfField: 'form1[0].#subform[1].P4_Line2g_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part4.dob', pdfField: 'form1[0].#subform[2].P2_Line4_DateOfBirth[0]', }, // Confidence: 10
  { questionId: 'part4.ssn', pdfField: 'form1[0].#subform[1].P4_Line10_SocialSecurityNumber[0]', }, // Confidence: 10
  { questionId: 'part5.children', pdfField: 'form1[0].#subform[4].P5_Line4_DependentChildren[0]', }, // Confidence: 10
  { questionId: 'part4.mailingStreet', pdfField: 'form1[0].#subform[1].P4_Line2b_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part4.mailingAptType', pdfField: 'form1[0].#subform[1].P4_Line2c_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part4.mailingAptNumber', pdfField: 'form1[0].#subform[1].P4_Line2c_Unit[1]', type: 'checkbox', }, // Confidence: 9
];

/**
 * Unmapped questions (30):
 * These need manual review and mapping.
 *
 * - part1.sponsorType: "I am filing this affidavit of support because (select only one box):"
 * - part2.immigrantFamilyName: "1.a. Family Name (Last Name)"
 * - part2.immigrantGivenName: "1.b. Given Name (First Name)"
 * - part2.immigrantMiddleName: "1.c. Middle Name"
 * - part2.immigrantAlienNumber: "2. Alien Registration Number (A-Number) (if any)"
 * - part3.sponsoringPrincipal: "1. Are you sponsoring the principal immigrant named in Part 2?"
 * - part3.familyMembers: "2-7. List family members immigrating at the same time or within 6 months"
 * - part4.familyName: "1.a. Family Name (Last Name)"
 * - part4.givenName: "1.b. Given Name (First Name)"
 * - part4.middleName: "1.c. Middle Name"
 * - part4.placeOfBirth: "8. Place of Birth (City/Town, State/Province, Country)"
 * - part4.citizenshipStatus: "10. My citizenship/residency status is:"
 * - part4.activeDutyMilitary: "11. Are you currently on active duty in the U.S. Armed Forces?"
 * - part5.immigrantsSponsoring: "1. Number of immigrants you are sponsoring (from Parts 2 and 3)"
 * - part5.yourself: "2. Yourself (enter 1)"
 * - part5.spouse: "3. Your spouse (enter 1 if married, 0 if not)"
 * - part5.otherDependents: "5. Number of other dependents listed on your most recent tax return"
 * - part5.otherHouseholdMembers: "6. Number of other people living with you who are combining income (Form I-864A)"
 * - part5.previouslySponsored: "7. Number of immigrants you previously sponsored (if still obligated)"
 * - part5.totalHouseholdSize: "8. TOTAL HOUSEHOLD SIZE (add lines 1-7)"
 * - part6.employmentStatus: "1-6. My current employment status is:"
 * - part6.employerName: "Employer Name (if employed)"
 * - part6.annualIncome: "7. My current individual annual income is:"
 * - part6.householdIncome: "8-22. Total income from all household members (including yourself)"
 * - part6.meetsIncomeRequirement: "Does your total household income meet or exceed 125% of Federal Poverty Guidelines for your household size?"
 * - part7.useAssets: "Are you using assets to meet the income requirement?"
 * - part7.sponsorAssets: "1. Total value of your assets"
 * - part7.householdMemberAssets: "2. Total value of household member's assets"
 * - part7.immigrantAssets: "3. Total value of immigrant's assets"
 * - part7.totalAssets: "4. TOTAL ASSETS (add lines 1-3)"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_864_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 3 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_864_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9];
  return confidences[i] < 10;
});
