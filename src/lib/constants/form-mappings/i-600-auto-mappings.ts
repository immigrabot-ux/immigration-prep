/**
 * Auto-generated field mappings for I-600
 *
 * Generated on: 2025-11-27T13:57:01.541Z
 * Mapped: 21/51 fields (41%)
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

export const I_600_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.5.countryOfBirth', pdfField: 'form1[0].#subform[2].Pt1Line6g_Country[0]', }, // Confidence: 10
  { questionId: 'part1.9.city', pdfField: 'form1[0].#subform[1].Pt1Line3d_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part1.10.state', pdfField: 'form1[0].#subform[0].AttorneyStateBarNumber[0]', }, // Confidence: 10
  { questionId: 'part1.11.zipCode', pdfField: 'form1[0].#subform[1].Pt1Line3f_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part1.13.email', pdfField: 'form1[0].#subform[2].Pt3Line5_Email[0]', }, // Confidence: 10
  { questionId: 'part2.1.spouseFamilyName', pdfField: 'form1[0].#subform[3].Pt1Line23_SpouseUSCISOnlineActNum[0]', }, // Confidence: 10
  { questionId: 'part2.2.spouseGivenName', pdfField: 'form1[0].#subform[3].Pt1Line23_SpouseImmigrationStatus[0]', }, // Confidence: 10
  { questionId: 'part2.3.spouseDateOfBirth', pdfField: 'form1[0].#subform[4].P7_Line6_SpousesEmailAddress[0]', }, // Confidence: 10
  { questionId: 'part2.4.spouseCountryOfBirth', pdfField: 'form1[0].#subform[2].Pt1Line10_CountryOfBirth[0]', }, // Confidence: 10
  { questionId: 'part2.5.spouseCitizenship', pdfField: 'form1[0].#subform[4].P7_Line4_SpousesDaytimePhoneNumber[0]', }, // Confidence: 10
  { questionId: 'part3.4.spousePriorMarriages', pdfField: 'form1[0].#subform[4].P7_Line5_SpousesMobileNumber[0]', }, // Confidence: 10
  { questionId: 'part4.1.childFamilyName', pdfField: 'form1[0].#subform[14].Table3[0].Row1[0].Pt4Line1_Row1RelationshiptoChild[0]', }, // Confidence: 10
  { questionId: 'part4.2.childGivenName', pdfField: 'form1[0].#subform[14].Table3[0].Row2[0].Pt4Line1_Row2RelationshiptoChild[0]', }, // Confidence: 10
  { questionId: 'part4.3.childMiddleName', pdfField: 'form1[0].#subform[14].Table3[0].Row3[0].Pt4Line1_Row3RelationshiptoChild[0]', }, // Confidence: 10
  { questionId: 'part4.4.childDateOfBirth', pdfField: 'form1[0].#subform[14].Table3[0].Row4[0].Pt4Line1_Row4RelationshiptoChild[0]', }, // Confidence: 10
  { questionId: 'part4.5.childCityOfBirth', pdfField: 'form1[0].#subform[1].Pt1Line5c_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part4.6.childCountryOfBirth', pdfField: 'form1[0].#subform[3].Pt1Line23_CountryOfBirth[0]', }, // Confidence: 10
  { questionId: 'part4.7.childGender', pdfField: 'form1[0].#subform[14].Table3[1].Row1[0].Pt4Line2_Row1RelationshiptoChild[0]', }, // Confidence: 10
  { questionId: 'part6.5.stateOfAdoption', pdfField: 'form1[0].#subform[1].Pt1Line3e_State[0]', }, // Confidence: 10
  { questionId: 'part1.8.streetNumber', pdfField: 'form1[0].#subform[1].Pt1Line3b_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part1.12.phone', pdfField: 'form1[0].#subform[2].Pt3Line3_DaytimePhoneNumber1[0]', }, // Confidence: 9
];

/**
 * Unmapped questions (30):
 * These need manual review and mapping.
 *
 * - part1.1.familyName: "1. Family Name (Last Name)"
 * - part1.2.givenName: "2. Given Name (First Name)"
 * - part1.3.middleName: "3. Middle Name"
 * - part1.4.dateOfBirth: "4. Date of Birth (mm/dd/yyyy)"
 * - part1.6.citizenship: "6. U.S. Citizenship Obtained Through"
 * - part1.7.maritalStatus: "7. Current Marital Status"
 * - part2.6.dateOfMarriage: "6. Date of Marriage (mm/dd/yyyy)"
 * - part2.7.placeOfMarriage: "7. Place of Marriage (City, State/Province, Country)"
 * - part3.1.petitionerPriorMarriages: "1. Have you been previously married?"
 * - part3.2.numberOfPriorMarriages: "2. Number of prior marriages"
 * - part3.3.priorMarriageEnded: "3. How did your most recent prior marriage end?"
 * - part4.8.currentAddress: "8. Child's Current Physical Address"
 * - part5.1.orphanBasis: "1. The child is an orphan because:"
 * - part5.2.biologicalMotherName: "2. Biological Mother's Full Name"
 * - part5.3.biologicalMotherStatus: "3. Biological Mother's Status"
 * - part5.4.biologicalFatherName: "4. Biological Father's Full Name"
 * - part5.5.biologicalFatherStatus: "5. Biological Father's Status"
 * - part6.1.adoptionStatus: "1. Has the child been adopted abroad?"
 * - part6.2.adoptionDate: "2. Date of Adoption (if adopted abroad) (mm/dd/yyyy)"
 * - part6.3.adoptionPlace: "3. Place of Adoption (City, Country)"
 * - part6.4.legalCustodyDate: "4. Date Legal Custody Granted (if not yet adopted) (mm/dd/yyyy)"
 * - part6.6.preAdoptionRequirements: "6. Have pre-adoption requirements of the state been met?"
 * - part7.1.i600aApproved: "1. Was Form I-600A (Application for Advance Processing) previously approved?"
 * - part7.2.approvalDate: "2. Date of I-600A Approval (mm/dd/yyyy)"
 * - part7.3.approvalOffice: "3. USCIS Office That Approved I-600A"
 * - part7.4.homestudyDate: "4. Date of Home Study Approval (mm/dd/yyyy)"
 * - part7.5.homestudyAgency: "5. Name of Home Study Agency"
 * - part8.1.certification: "I certify that I will care for the orphan properly if admitted to the United States"
 * - part8.2.dutyOfDisclosure: "I understand my duty to notify USCIS of any change in circumstances that affects eligibility"
 * - part8.3.penaltyOfPerjury: "I certify, under penalty of perjury, that all information in this petition is true and correct"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_600_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 2 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_600_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9];
  return confidences[i] < 10;
});
