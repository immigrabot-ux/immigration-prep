/**
 * Auto-generated field mappings for I-589
 *
 * Generated on: 2025-11-27T13:57:05.302Z
 * Mapped: 9/50 fields (18%)
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

export const I_589_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'partA1.2.ssn', pdfField: 'form1[0].#subform[1].ChildSSN1[0]', }, // Confidence: 10
  { questionId: 'partA1.8.cityOfBirth', pdfField: 'form1[0].#subform[0].PtAILine9_City[0]', }, // Confidence: 10
  { questionId: 'partA1.14.city', pdfField: 'form1[0].#subform[1].ChildCity1[0]', }, // Confidence: 10
  { questionId: 'partA1.15.state', pdfField: 'form1[0].#subform[0].PtAILine8_State[0]', }, // Confidence: 10
  { questionId: 'partA1.16.zipCode', pdfField: 'form1[0].#subform[0].PtAILine8_Zipcode[0]', }, // Confidence: 10
  { questionId: 'partA2.2.spouseName', pdfField: 'form1[0].#subform[1].NotMarried[0].PtAIILine20_SpouseCurrentStatus[0]', }, // Confidence: 10
  { questionId: 'partA2.6.childrenInfo', pdfField: 'form1[0].#subform[1].ChildrenCheckbox[0]', type: 'checkbox', }, // Confidence: 10
  { questionId: 'partA1.17.phone', pdfField: 'form1[0].#subform[0].PtAILine8_TelephoneNumber[0]', }, // Confidence: 9
  { questionId: 'partA1.12.gender', pdfField: 'form1[0].#subform[0].PartALine9Sex[0]', type: 'checkbox', }, // Confidence: 8
];

/**
 * Unmapped questions (41):
 * These need manual review and mapping.
 *
 * - partA1.1.alienNumber: "1. Alien Registration Number (A-Number) (if any)"
 * - partA1.3.familyName: "3. Family Name (Last Name)"
 * - partA1.4.givenName: "4. Given Name (First Name)"
 * - partA1.5.middleName: "5. Middle Name"
 * - partA1.6.otherNamesUsed: "6. Other Names Used (include maiden name and aliases)"
 * - partA1.7.dateOfBirth: "7. Date of Birth (mm/dd/yyyy)"
 * - partA1.9.nationality: "9. Current Nationality (Citizenship)"
 * - partA1.10.race: "10. Race, Ethnic, or Tribal Group"
 * - partA1.11.religion: "11. Religion"
 * - partA1.13.mailingAddress: "13. U.S. Mailing Address (Street Number and Name)"
 * - partA1.18.dateOfLastArrival: "18. Date of Last Arrival in the U.S. (mm/dd/yyyy)"
 * - partA1.19.i94Number: "19. I-94 Number (if any)"
 * - partA1.20.currentImmigrationStatus: "20. Current Immigration Status"
 * - partA2.1.maritalStatus: "1. Current Marital Status"
 * - partA2.3.spouseDateOfBirth: "3. Spouse's Date of Birth (mm/dd/yyyy)"
 * - partA2.4.spouseNationality: "4. Spouse's Nationality"
 * - partA2.5.spouseLocation: "5. Spouse's Current Location"
 * - partA3.1.lastResidenceAbroad: "1. Last Residence Before Coming to the U.S."
 * - partA3.2.lastOccupationAbroad: "2. Last Occupation Abroad"
 * - partA3.3.lastEducation: "3. Last School Attended"
 * - partA3.4.languagesSpoken: "4. Languages You Speak Fluently"
 * - partA3.5.traveledToUS: "5. List All Trips to the U.S."
 * - partB.1.applyingFor: "I am applying for asylum or withholding of removal"
 * - partB.2.persecutionGrounds: "Primary Ground for Asylum (check all that apply in your detailed statement)"
 * - partB.3.pastPersecution: "1.A. Have you, your family, or close friends or colleagues ever experienced harm or mistreatment in the past?"
 * - partB.4.fearFuturePersecution: "1.B. Do you fear harm or mistreatment if you return to your home country?"
 * - partB.5.detailedExplanation: "2. Detailed Explanation of Your Asylum Claim"
 * - partB.6.governmentInvolvement: "3. Was the persecution by government officials or people the government cannot or will not control?"
 * - partB.7.attemptedRelocation: "4. Did you try to relocate within your country before coming to the U.S.?"
 * - partC.1.appliedAsylumBefore: "1. Have you ever applied for asylum in any other country?"
 * - partC.2.appliedAsylumBeforeDetails: "2. If yes, provide details (country, date, result)"
 * - partC.3.excludableOffenses: "3. Have you ever committed a crime or been arrested?"
 * - partC.4.crimeDetails: "4. If yes, provide details of any arrests or criminal convictions"
 * - partC.5.militaryService: "5. Have you ever served in any military or armed group?"
 * - partC.6.terroristOrganization: "6. Have you ever been a member of or supported any organization?"
 * - partC.7.persecutedOthers: "7. Have you ever persecuted another person because of their race, religion, nationality, membership in a social group, or political opinion?"
 * - partC.8.oneYearDeadline: "8. Are you filing within 1 year of your last arrival in the U.S.?"
 * - partD.1.interpreterUsed: "1. Did someone assist you in completing this application?"
 * - partD.2.assistantName: "2. Name of person who helped you (if any)"
 * - partD.3.certification: "I certify, under penalty of perjury under U.S. law, that this application and the evidence submitted with it are true and correct"
 * - partD.4.warnings: "I understand that knowingly making a false statement may result in criminal prosecution and denial of my application"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_589_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 9, 8];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 2 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_589_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 9, 8];
  return confidences[i] < 10;
});
