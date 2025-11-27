/**
 * Auto-generated field mappings for I-765
 *
 * Generated on: 2025-11-27T00:57:00.451Z
 * Mapped: 14/41 fields (34%)
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

export const I_765_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part2.mailingCity', pdfField: 'form1[0].Page2[0].Pt2Line7_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part2.mailingState', pdfField: 'form1[0].Page2[0].Pt2Line7_State[0]', }, // Confidence: 10
  { questionId: 'part2.mailingZip', pdfField: 'form1[0].Page2[0].Pt2Line7_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part2.hasSSN', pdfField: 'form1[0].Page2[0].Line12b_SSN[0]', }, // Confidence: 10
  { questionId: 'part2.ssn', pdfField: 'form1[0].Page5[0].Pt5Line2_BusinessName[0]', }, // Confidence: 10
  { questionId: 'part2.cityOfBirth', pdfField: 'form1[0].Page2[0].Pt2Line5_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part2.stateOfBirth', pdfField: 'form1[0].Page2[0].Pt2Line5_State[0]', }, // Confidence: 10
  { questionId: 'part2.countryOfBirth', pdfField: 'form1[0].Page2[0].Line17b_CountryOfBirth[0]', }, // Confidence: 10
  { questionId: 'part2.dob', pdfField: 'form1[0].Page3[0].Line19_DOB[0]', }, // Confidence: 10
  { questionId: 'part2.passportCountry', pdfField: 'form1[0].Page2[0].Line17a_CountryOfBirth[0]', }, // Confidence: 10
  { questionId: 'part2.mailingStreet', pdfField: 'form1[0].Page2[0].Pt2Line7_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part2.mailingAptType', pdfField: 'form1[0].Page2[0].Pt2Line7_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part2.mailingAptNumber', pdfField: 'form1[0].Page2[0].Pt2Line7_Unit[1]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part2.passportNumber', pdfField: 'form1[0].Page3[0].Line20b_Passport[0]', }, // Confidence: 9
];

/**
 * Unmapped questions (27):
 * These need manual review and mapping.
 *
 * - part1.reason: "I am applying for (select only one box):"
 * - part1.previouslyFiled: "2. Have you EVER filed Form I-765?"
 * - part2.familyName: "1.a. Family Name (Last Name)"
 * - part2.givenName: "1.b. Given Name (First Name)"
 * - part2.middleName: "1.c. Middle Name"
 * - part2.otherNamesUsed: "2. Have you used any other names since birth?"
 * - part2.mailingCareOfName: "5.a. In Care Of Name"
 * - part2.physicalAddressSameAsMailing: "6. Is your current physical address the same as your mailing address?"
 * - part2.alienNumber: "8. Alien Registration Number (A-Number)"
 * - part2.uscisAccount: "9. USCIS Online Account Number"
 * - part2.gender: "10. Gender"
 * - part2.maritalStatus: "11. Marital Status"
 * - part2.wantSSNCard: "14. Do you want the SSA to issue you a Social Security card?"
 * - part2.consentDisclosure: "15. Consent for Disclosure: I authorize disclosure of information from this application to the SSA as required for assigning me a Social Security number and issuing me a Social Security card"
 * - part2.fatherFamilyName: "16.a. Father's Family Name (Last Name)"
 * - part2.fatherGivenName: "16.b. Father's Given Name (First Name)"
 * - part2.motherFamilyName: "17.a. Mother's Family Name (Last Name)"
 * - part2.motherGivenName: "17.b. Mother's Given Name (First Name)"
 * - part2.countriesOfCitizenship: "18. Country or Countries of Citizenship or Nationality"
 * - part2.i94Number: "21. I-94 Arrival-Departure Record Number"
 * - part2.passportExpiration: "22.c. Passport Expiration Date"
 * - part2.dateOfLastEntry: "23. Date of Your Last Arrival into the United States"
 * - part2.placeOfLastEntry: "24. Place of Your Last Arrival into the United States"
 * - part2.immigrationStatusAtEntry: "25. Immigration Status at Your Last Arrival (for example, B-2 visitor, F-1 student)"
 * - part2.currentImmigrationStatus: "26. Your Current Immigration Status or Category"
 * - part2.sevisNumber: "27. Student and Exchange Visitor Information System (SEVIS) Number (if any)"
 * - part2.eligibilityCategory: "28. Eligibility Category"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_765_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 4 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_765_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9];
  return confidences[i] < 10;
});
