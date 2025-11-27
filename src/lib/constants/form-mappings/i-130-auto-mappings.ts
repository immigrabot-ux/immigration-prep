/**
 * Auto-generated field mappings for I-130
 *
 * Generated on: 2025-11-27T00:29:33.833Z
 * Mapped: 23/57 fields (40%)
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

export const I_130_AUTO_MAPPINGS: FieldMapping[] = [
  // Part 1: Relationship Info
  { questionId: 'part1.relationship', pdfField: 'form1[0].#subform[0].Pt1Line1_Spouse[0]', type: 'checkbox', value: 'spouse' },
  { questionId: 'part1.relationship', pdfField: 'form1[0].#subform[0].Pt1Line1_Parent[0]', type: 'checkbox', value: 'parent' },
  { questionId: 'part1.relationship', pdfField: 'form1[0].#subform[0].Pt1Line1_Child[0]', type: 'checkbox', value: 'child' },
  { questionId: 'part1.relationship', pdfField: 'form1[0].#subform[0].Pt1Line1_Siblings[0]', type: 'checkbox', value: 'sibling' },

  // Part 2: Beneficiary Info
  { questionId: 'part2.alienNumber', pdfField: 'form1[0].#subform[0].#area[4].Pt2Line1_AlienNumber[0]' },
  { questionId: 'part2.uscisOnlineAccount', pdfField: 'form1[0].#subform[0].#area[5].Pt2Line2_USCISOnlineActNumber[0]' },
  { questionId: 'part2.ssn', pdfField: 'form1[0].#subform[0].Pt2Line11_SSN[0]' },
  { questionId: 'part2.lastName', pdfField: 'form1[0].#subform[0].Pt2Line4a_FamilyName[0]' },
  { questionId: 'part2.firstName', pdfField: 'form1[0].#subform[0].Pt2Line4b_GivenName[0]' },
  { questionId: 'part2.middleName', pdfField: 'form1[0].#subform[0].Pt2Line4c_MiddleName[0]' },
  { questionId: 'part2.dateOfBirth', pdfField: 'form1[0].#subform[1].Pt2Line8_DateofBirth[0]' },
  { questionId: 'part2.sex', pdfField: 'form1[0].#subform[1].Pt2Line9_Male[0]', type: 'checkbox', value: 'male' },
  { questionId: 'part2.sex', pdfField: 'form1[0].#subform[1].Pt2Line9_Female[0]', type: 'checkbox', value: 'female' },
  { questionId: 'part2.cityOfBirth', pdfField: 'form1[0].#subform[1].Pt2Line10_CityOrTown[0]' },
  { questionId: 'part2.countryOfBirth', pdfField: 'form1[0].#subform[1].Pt2Line7_CountryofBirth[0]' },
  { questionId: 'part2.mailingInCareOf', pdfField: 'form1[0].#subform[1].Pt2Line10_InCareofName[0]' },
  { questionId: 'part2.mailingStreet', pdfField: 'form1[0].#subform[1].Pt2Line10_StreetNumberName[0]' },
  { questionId: 'part2.mailingAptType', pdfField: 'form1[0].#subform[1].Pt2Line10_Unit[0]', type: 'checkbox' },
  { questionId: 'part2.mailingAptNumber', pdfField: 'form1[0].#subform[1].Pt2Line10_AptSteFlrNumber[0]' },
  { questionId: 'part2.mailingCity', pdfField: 'form1[0].#subform[1].Pt2Line10_CityOrTown[0]' },
  { questionId: 'part2.mailingState', pdfField: 'form1[0].#subform[1].Pt2Line10_State[0]' },
  { questionId: 'part2.mailingZip', pdfField: 'form1[0].#subform[1].Pt2Line10_ZipCode[0]' },
  { questionId: 'part2.province', pdfField: 'form1[0].#subform[1].Pt2Line10_Province[0]' },
  { questionId: 'part2.postalCode', pdfField: 'form1[0].#subform[1].Pt2Line10_PostalCode[0]' },
  { questionId: 'part2.country', pdfField: 'form1[0].#subform[1].Pt2Line10_Country[0]' },

  // Part 4: Petitioner Info
  { questionId: 'part4.alienNumber', pdfField: 'form1[0].#subform[4].#area[6].Pt4Line1_AlienNumber[0]' },
  { questionId: 'part4.uscisOnlineAccount', pdfField: 'form1[0].#subform[4].#area[7].Pt4Line2_USCISOnlineActNumber[0]' },
  { questionId: 'part4.ssn', pdfField: 'form1[0].#subform[4].Pt4Line3_SSN[0]' },
  { questionId: 'part4.lastName', pdfField: 'form1[0].#subform[4].Pt4Line4a_FamilyName[0]' },
  { questionId: 'part4.firstName', pdfField: 'form1[0].#subform[4].Pt4Line4b_GivenName[0]' },
  { questionId: 'part4.middleName', pdfField: 'form1[0].#subform[4].Pt4Line4c_MiddleName[0]' },
  { questionId: 'part4.sex', pdfField: 'form1[0].#subform[1].Pt2Line9_Male[0]', type: 'checkbox', value: 'male' },
  { questionId: 'part4.sex', pdfField: 'form1[0].#subform[1].Pt2Line9_Female[0]', type: 'checkbox', value: 'female' },
  { questionId: 'part4.cityOfBirth', pdfField: 'form1[0].#subform[1].Pt2Line12_CityOrTown[0]' },
  { questionId: 'part4.countryOfBirth', pdfField: 'form1[0].#subform[1].Pt2Line14_Country[0]' },
  { questionId: 'part4.street', pdfField: 'form1[0].#subform[1].Pt2Line14_StreetNumberName[0]' },
  { questionId: 'part4.aptType', pdfField: 'form1[0].#subform[1].Pt2Line14_Unit[0]', type: 'checkbox' },
  { questionId: 'part4.aptNumber', pdfField: 'form1[0].#subform[1].Pt2Line14_AptSteFlrNumber[0]' },
  { questionId: 'part4.city', pdfField: 'form1[0].#subform[1].Pt2Line14_CityOrTown[0]' },
  { questionId: 'part4.state', pdfField: 'form1[0].#subform[1].Pt2Line14_State[0]' },
  { questionId: 'part4.zip', pdfField: 'form1[0].#subform[1].Pt2Line14_ZipCode[0]' },
  { questionId: 'part4.country', pdfField: 'form1[0].#subform[1].Pt2Line14_Country[0]' },
];

/**
 * Unmapped questions (34):
 * These need manual review and mapping.
 *
 * - part1.relationship: "I am filing this petition for my:"
 * - part1.petitionerStatus: "I am:"
 * - part1.gainedLPRThroughAdoption: "Did you gain lawful permanent resident status through adoption?"
 * - part2.alienNumber: "Alien Registration Number (A-Number)"
 * - part2.uscisOnlineAccount: "USCIS Online Account Number"
 * - part2.lastName: "Family Name (Last Name)"
 * - part2.firstName: "Given Name (First Name)"
 * - part2.middleName: "Middle Name"
 * - part2.otherNamesUsed: "Other Names Used"
 * - part2.dateOfBirth: "Date of Birth"
 * - part2.mailingInCareOf: "In Care Of Name"
 * - part2.province: "Province"
 * - part2.postalCode: "Postal Code"
 * - part2.timesMarried: "How many times have you been married?"
 * - part2.currentMaritalStatus: "Current Marital Status"
 * - part2.dateOfMarriage: "Date of Current Marriage"
 * - part2.placeOfMarriage: "Place of Current Marriage (City, State, Country)"
 * - part2.citizenshipThrough: "How did you acquire U.S. citizenship?"
 * - part2.certificateNumber: "Certificate of Naturalization Number or Certificate of Citizenship Number"
 * - part2.placeOfNaturalization: "Place of Naturalization or Acquisition (City, State)"
 * - part4.alienNumber: "Beneficiary's Alien Registration Number (A-Number)"
 * - part4.uscisOnlineAccount: "Beneficiary's USCIS Online Account Number"
 * - part4.lastName: "Beneficiary's Family Name (Last Name)"
 * - part4.firstName: "Beneficiary's Given Name (First Name)"
 * - part4.middleName: "Beneficiary's Middle Name"
 * - part4.dateOfBirth: "Beneficiary's Date of Birth"
 * - part4.hasOtherNames: "Has your relative ever used other names?"
 * - part4.otherNames: "Other Names Used by Beneficiary"
 * - part4.timesMarried: "How many times has the beneficiary been married?"
 * - part4.currentMaritalStatus: "Beneficiary's Current Marital Status"
 * - part4.spouseName: "Beneficiary's Current Spouse's Full Name"
 * - part4.dateOfMarriage: "Date of Marriage"
 * - part4.immigrationPath: "The beneficiary will apply for:"
 * - part4.consularLocation: "If applying for an immigrant visa abroad, provide the location (City, Country) where the beneficiary will apply"
 */

/**
 * High-confidence mappings (score >= 15):
 * 0 mappings
 */
export const HIGH_CONFIDENCE_MAPPINGS = I_130_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 8, 8];
  return confidences[i] >= 15;
});

/**
 * Manual review needed (score < 10):
 * 8 mappings
 */
export const NEEDS_REVIEW_MAPPINGS = I_130_AUTO_MAPPINGS.filter((_, i) => {
  const confidences = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 8, 8];
  return confidences[i] < 10;
});
