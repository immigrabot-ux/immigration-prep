/**
 * Auto-generated field mappings for N-400
 *
 * Generated on: 2025-11-27T00:57:07.974Z
 * Mapped: 12/50 fields (24%)
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

export const N_400_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part2.mailingCity', pdfField: 'form1[0].#subform[2].P7_Line1_Ethnicity[0]', type: 'checkbox', }, // Confidence: 10
  { questionId: 'part2.mailingState', pdfField: 'form1[0].#subform[2].P4_Line3_State1[0]', }, // Confidence: 10
  { questionId: 'part2.mailingZip', pdfField: 'form1[0].#subform[2].P4_Line3_ZipCode1[0]', }, // Confidence: 10
  { questionId: 'part3.dob', pdfField: 'form1[0].#subform[1].P2_Line8_DateOfBirth[0]', }, // Confidence: 10
  { questionId: 'part3.countryOfBirth', pdfField: 'form1[0].#subform[1].P2_Line11_CountryOfNationality[0]', }, // Confidence: 10
  { questionId: 'part3.countryOfCitizenship', pdfField: 'form1[0].#subform[1].P2_Line10_CountryOfBirth[0]', }, // Confidence: 10
  { questionId: 'part3.ethnicity', pdfField: 'form1[0].#subform[2].P7_Line1_Ethnicity[1]', type: 'checkbox', }, // Confidence: 10
  { questionId: 'part6.totalChildren', pdfField: 'form1[0].#subform[4].P11_Line1_TotalChildren[0]', }, // Confidence: 10
  { questionId: 'part6.childrenDetails', pdfField: 'form1[0].#subform[4].P6_ChildTwo[0]', type: 'checkbox', }, // Confidence: 10
  { questionId: 'part2.mailingStreet', pdfField: 'form1[0].#subform[2].P4_Line3_PhysicalAddress1[0]', }, // Confidence: 9
  { questionId: 'part2.mailingAptType', pdfField: 'form1[0].#subform[2].P4_Line1_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part2.mailingAptNumber', pdfField: 'form1[0].#subform[2].P4_Line1_Unit[1]', type: 'checkbox', }, // Confidence: 9
];

/**
 * Unmapped questions (38):
 * These need manual review and mapping.
 *
 * - part1.eligibilityCategory: "I am applying for naturalization based on (select one):"
 * - part2.familyName: "1.a. Family Name (Last Name)"
 * - part2.givenName: "1.b. Given Name (First Name)"
 * - part2.middleName: "1.c. Middle Name"
 * - part2.nameChange: "2. Do you want to legally change your name?"
 * - part2.alienNumber: "4. A-Number (Alien Registration Number)"
 * - part2.uscisAccount: "5. USCIS Online Account Number"
 * - part2.dateBecomePR: "6. Date You Became a Lawful Permanent Resident"
 * - part3.race: "5. Race (Select all that apply)"
 * - part3.height: "6. Height"
 * - part3.weight: "7. Weight"
 * - part3.eyeColor: "8. Eye Color"
 * - part3.hairColor: "9. Hair Color"
 * - part4.addressHistory: "List ALL addresses where you have lived during the past 5 years"
 * - part5.currentMaritalStatus: "1. What is your current marital status?"
 * - part5.timesMarried: "2. How many times have you been married (including annulled marriages)?"
 * - part5.currentSpouseName: "3. Current Spouse's Legal Name (if currently married)"
 * - part5.currentSpouseUSCitizen: "4. Is your current spouse a U.S. citizen?"
 * - part7.employmentHistory: "List ALL employment and education for the past 5 years"
 * - part8.totalTrips: "1. How many total days have you spent outside the United States during the last 5 years?"
 * - part8.totalTripsCount: "2. How many trips of 24 hours or more have you taken outside the United States during the last 5 years?"
 * - part8.tripDetails: "3. List all trips outside the United States"
 * - part12.taxes: "1. Have you EVER failed to file a required federal, state, or local tax return?"
 * - part12.oweTaxes: "2. Do you owe any federal, state, or local taxes that are overdue?"
 * - part12.nobilityTitle: "3. Do you have any title of nobility in any foreign country?"
 * - part12.arrestedEver: "4. Have you EVER been arrested, cited, or detained by any law enforcement officer?"
 * - part12.convictedCrime: "5. Have you EVER been convicted of a crime or offense?"
 * - part12.gambling: "6. Have you EVER been involved in illegal gambling?"
 * - part12.falseClaim: "7. Have you EVER falsely claimed to be a U.S. citizen (in writing or any other way)?"
 * - part12.votedIllegally: "8. Have you EVER voted in the United States in any federal, state, or local election when you were not a U.S. citizen?"
 * - part12.terroristOrg: "9. Have you EVER been a member of or associated with any organization, association, fund, foundation, party, club, or society?"
 * - part12.persecution: "10. Have you EVER persecuted anyone because of race, religion, national origin, membership in a social group, or political opinion?"
 * - part12.genocide: "11. Have you EVER committed, ordered, incited, assisted, or participated in genocide?"
 * - part12.torture: "12. Have you EVER committed, ordered, incited, assisted, or participated in torture?"
 * - part12.supportConstitution: "13. Do you support the Constitution and form of government of the United States?"
 * - part12.bearArms: "14. If the law requires it, are you willing to bear arms on behalf of the United States?"
 * - part12.performWork: "15. If the law requires it, are you willing to perform noncombatant service in the U.S. Armed Forces?"
 * - part12.performCivilian: "16. If the law requires it, are you willing to perform work of national importance under civilian direction?"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = N_400_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 3 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = N_400_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9];
  return confidences[i] < 10;
});
