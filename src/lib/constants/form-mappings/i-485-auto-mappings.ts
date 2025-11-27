/**
 * Auto-generated field mappings for I-485
 *
 * Generated on: 2025-11-27T00:56:56.392Z
 * Mapped: 25/80 fields (31%)
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

export const I_485_AUTO_MAPPINGS: FieldMapping[] = [
  { questionId: 'part1.dob', pdfField: 'form1[0].#subform[0].Pt1Line3_DOB[0]', }, // Confidence: 10
  { questionId: 'part1.cityOfBirth', pdfField: 'form1[0].#subform[1].Pt1Line7_CityTownOfBirth[0]', }, // Confidence: 10
  { questionId: 'part1.countryOfBirth', pdfField: 'form1[0].#subform[1].Pt1Line7_CountryOfBirth[0]', }, // Confidence: 10
  { questionId: 'part1.countryOfCitizenship', pdfField: 'form1[0].#subform[1].Pt1Line8_CountryofCitizenshipNationality[0]', }, // Confidence: 10
  { questionId: 'part1.ssn', pdfField: 'form1[0].#subform[3].Pt1Line19_SSN[0]', }, // Confidence: 10
  { questionId: 'part1.mailingCity', pdfField: 'form1[0].#subform[1].Pt1Line10_CityTown[0]', }, // Confidence: 10
  { questionId: 'part1.mailingState', pdfField: 'form1[0].#subform[0].AttorneyStateBarNumber[0]', }, // Confidence: 10
  { questionId: 'part1.mailingZip', pdfField: 'form1[0].#subform[2].Pt1Line18_ZipCode[0]', }, // Confidence: 10
  { questionId: 'part1.passportCountry', pdfField: 'form1[0].#subform[3].Pt1Line18_PriorCountry[0]', }, // Confidence: 10
  { questionId: 'part1.entryCity', pdfField: 'form1[0].#subform[2].Pt1Line18_CityOrTown[0]', }, // Confidence: 10
  { questionId: 'part1.entryState', pdfField: 'form1[0].#subform[1].Pt1Line10_State[0]', }, // Confidence: 10
  { questionId: 'part4.parent1Dob', pdfField: 'form1[0].#subform[0].Pt1Line3A_OtherDOB[0]', }, // Confidence: 10
  { questionId: 'part4.parent1CountryOfBirth', pdfField: 'form1[0].#subform[3].Pt1Line18_RecentCountry[0]', }, // Confidence: 10
  { questionId: 'part4.parent1CityOfResidence', pdfField: 'form1[0].#subform[2].Pt1Line18_CurrentCityOrTown[0]', }, // Confidence: 10
  { questionId: 'part4.parent1CountryOfResidence', pdfField: 'form1[0].#subform[8].P4Line7_Country[0]', }, // Confidence: 10
  { questionId: 'part4.parent2Dob', pdfField: 'form1[0].#subform[0].Pt1Line3B_OtherDOB[0]', }, // Confidence: 10
  { questionId: 'part4.parent2CountryOfBirth', pdfField: 'form1[0].#subform[8].P4Line8_Country[0]', }, // Confidence: 10
  { questionId: 'part6.totalChildren', pdfField: 'form1[0].#subform[11].Pt6Line1_TotalChildren[0]', }, // Confidence: 10
  { questionId: 'part7.ethnicity', pdfField: 'form1[0].#subform[3].Pt1Line18_PriorCity[0]', }, // Confidence: 10
  { questionId: 'part1.mailingStreet', pdfField: 'form1[0].#subform[2].Pt1Line18_StreetNumberName[0]', }, // Confidence: 9
  { questionId: 'part1.mailingAptType', pdfField: 'form1[0].#subform[2].Pt1Line18US_Unit[0]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part1.mailingAptNumber', pdfField: 'form1[0].#subform[2].Pt1Line18US_Unit[1]', type: 'checkbox', }, // Confidence: 9
  { questionId: 'part1.passportNumber', pdfField: 'form1[0].#subform[1].Pt1Line10_PassportNum[0]', }, // Confidence: 9
  { questionId: 'part1.passportExpiration', pdfField: 'form1[0].#subform[1].Pt1Line10_Passport[0]', }, // Confidence: 9
  { questionId: 'part1.sex', pdfField: 'form1[0].#subform[1].Pt1Line6_CB_Sex[0]', type: 'checkbox', }, // Confidence: 8
];

/**
 * Unmapped questions (55):
 * These need manual review and mapping.
 *
 * - part1.familyName: "1.a. Family Name (Last Name)"
 * - part1.givenName: "1.b. Given Name (First Name)"
 * - part1.middleName: "1.c. Middle Name"
 * - part1.otherNameUsed: "2. Have you used any other names since birth?"
 * - part1.alienNumber: "10. Alien Registration Number (A-Number)"
 * - part1.uscisAccount: "11. USCIS Online Account Number"
 * - part1.mailingCareOfName: "13.a. In Care Of Name"
 * - part1.travelDocNumber: "16. Travel Document Number"
 * - part1.visaNumber: "19. Visa Number (from visa stamp in passport)"
 * - part1.dateOfLastEntry: "21. Date of Your Last Arrival into the United States"
 * - part1.inspected: "22.a. Were you inspected by a U.S. immigration officer?"
 * - part1.i94Number: "23.a. I-94 Arrival-Departure Record Number"
 * - part1.statusAtEntry: "23.c. Immigration Status at Your Last Arrival"
 * - part1.currentStatus: "24. Current Immigration Status"
 * - part2.filingCategory: "I am applying for adjustment of status because:"
 * - part2.section245i: "Are you applying for adjustment under Section 245(i)?"
 * - part3.addressHistory: "List ALL addresses where you have lived during the past 5 years"
 * - part3.employmentHistory: "List ALL employment and education for the past 5 years"
 * - part4.parent1FamilyName: "1.a. Parent 1's Family Name (Last Name)"
 * - part4.parent1GivenName: "1.b. Parent 1's Given Name (First Name)"
 * - part4.parent2FamilyName: "9.a. Parent 2's Family Name (Last Name)"
 * - part4.parent2GivenName: "9.b. Parent 2's Given Name (First Name)"
 * - part5.currentMaritalStatus: "1. What is your current marital status?"
 * - part5.timesMarried: "2. How many times have you been married (including annulled marriages)?"
 * - part5.currentSpouseFamilyName: "3.a. Current Spouse's Family Name (Last Name)"
 * - part5.currentSpouseGivenName: "3.b. Current Spouse's Given Name (First Name)"
 * - part5.dateOfMarriage: "4. Date of Marriage"
 * - part5.placeOfMarriage: "5. Place of Marriage (City/Town, State/Province, Country)"
 * - part5.spouseImmigrationStatus: "6. Current Spouse's Immigration Status"
 * - part6.childrenDetails: "List each child's information"
 * - part7.race: "2. Race (Select all that apply)"
 * - part7.height: "3. Height (feet and inches)"
 * - part7.weight: "4. Weight (pounds)"
 * - part7.eyeColor: "5. Eye Color"
 * - part7.hairColor: "6. Hair Color"
 * - part8.publicCharge: "Are you subject to the public charge ground of inadmissibility?"
 * - part8.healthRelated: "Have you been found to have a communicable disease of public health significance?"
 * - part8.criminalHistory: "Have you EVER been arrested, cited, charged, or detained for any reason by any law enforcement official?"
 * - part8.crimeConviction: "Have you EVER been convicted of a crime or offense?"
 * - part8.controlledSubstance: "Have you EVER violated any law related to possessing, using, or distributing illegal drugs?"
 * - part8.prostitution: "Have you EVER engaged in prostitution or procured anyone for prostitution?"
 * - part8.humanTrafficking: "Have you EVER been involved in human trafficking?"
 * - part8.moneyLaundering: "Have you EVER knowingly helped any person involved in money laundering?"
 * - part8.terroristActivity: "Have you EVER engaged in, conspired to engage in, or supported terrorist activity?"
 * - part8.totalitarianParty: "Have you EVER been a member of or affiliated with the Communist Party or any other totalitarian party?"
 * - part8.persecution: "Have you EVER persecuted any person because of race, religion, national origin, membership in a social group, or political opinion?"
 * - part8.torture: "Have you EVER committed, ordered, incited, assisted, or otherwise participated in torture?"
 * - part8.genocide: "Have you EVER committed, ordered, incited, assisted, or participated in genocide?"
 * - part8.childSoldier: "Have you EVER recruited, enlisted, conscripted, or used child soldiers?"
 * - part8.religiousFreedom: "Have you EVER been responsible for violations of religious freedom?"
 * - part8.immigrationFraud: "Have you EVER committed immigration fraud or helped anyone commit immigration fraud?"
 * - part8.falseUSCitizen: "Have you EVER falsely claimed to be a U.S. citizen?"
 * - part8.votedIllegally: "Have you EVER voted in the United States in violation of any law or regulation?"
 * - part8.renounced: "Have you EVER renounced U.S. citizenship to avoid taxation?"
 * - part8.unlawfullyPresent: "Have you EVER been unlawfully present in the United States for more than 180 days?"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_485_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 8];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 6 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_485_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 8];
  return confidences[i] < 10;
});
