/**
 * Auto-generated field mappings for I-131
 *
 * Generated on: 2025-11-27T00:57:04.510Z
 * Mapped: 12/34 fields (35%)
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

export const I_131_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part2.mailingCity', pdfField: 'form1[0].P5[0].Part2_Line3_CityTown[0]', }, // Confidence: 10
  { questionId: 'part2.mailingState', pdfField: 'form1[0].P5[0].Part2_Line3_State[0]', }, // Confidence: 10
  { questionId: 'part2.mailingZip', pdfField: 'form1[0].P5[0].Part2_Line3_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part2.dob', pdfField: 'form1[0].P5[0].Part2_Line9_DateOfBirth[0]', }, // Confidence: 10
  { questionId: 'part2.countryOfBirth', pdfField: 'form1[0].P5[0].Part2_Line3_Country[0]', }, // Confidence: 10
  { questionId: 'part2.countryOfCitizenship', pdfField: 'form1[0].P5[0].Part2_Line4_Country[0]', }, // Confidence: 10
  { questionId: 'part2.ssn', pdfField: 'form1[0].P5[0].#area[1].Part2_Line10_SSN[0]', }, // Confidence: 10
  { questionId: 'part3.ethnicity', pdfField: 'form1[0].P5[0].Part2_Line4_CityTown[0]', }, // Confidence: 10
  { questionId: 'part2.mailingStreet', pdfField: 'form1[0].P5[0].Part2_Line3_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part2.mailingAptType', pdfField: 'form1[0].P5[0].Part2_Line3_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part2.mailingAptNumber', pdfField: 'form1[0].P5[0].Part2_Line3_Unit[1]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part2.gender', pdfField: 'form1[0].P5[0].Part2_Line8_Gender[0]', type: 'checkbox', }, // Confidence: 8
];

/**
 * Unmapped questions (22):
 * These need manual review and mapping.
 *
 * - part1.documentType: "I am applying for (select one):"
 * - part2.familyName: "1.a. Family Name (Last Name)"
 * - part2.givenName: "1.b. Given Name (First Name)"
 * - part2.middleName: "1.c. Middle Name"
 * - part2.mailingCareOfName: "2.a. In Care Of Name"
 * - part2.alienNumber: "11. Alien Registration Number (A-Number)"
 * - part2.classOfAdmission: "12. Class of Admission"
 * - part2.i94Number: "13. I-94 Arrival-Departure Record Number"
 * - part3.race: "2. Race (Select all that apply)"
 * - part3.height: "3. Height (feet and inches)"
 * - part3.weight: "4. Weight (pounds)"
 * - part3.eyeColor: "5. Eye Color"
 * - part3.hairColor: "6. Hair Color"
 * - part4.inRemovalProceedings: "1. Are you now in exclusion, deportation, removal, or rescission proceedings?"
 * - part4.previouslyIssuedReentryPermit: "2. Have you ever been issued a Reentry Permit or Refugee Travel Document?"
 * - part4.previouslyIssuedAdvanceParole: "4. Have you ever been issued an Advance Parole Document?"
 * - part7.purposeOfTrip: "1. Purpose of Trip"
 * - part7.countriesVisit: "2. List the countries you intend to visit"
 * - part7.intendedDeparture: "3. Intended Date of Departure from the United States"
 * - part7.intendedLength: "4. Intended Length of Trip"
 * - part7.howManyTrips: "5. How many trips do you intend to use this document?"
 * - part7.needsReplacement: "6. If you answered "One trip only", is this a replacement for a document that was lost, stolen, or destroyed?"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_131_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 8];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 4 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_131_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 8];
  return confidences[i] < 10;
});
