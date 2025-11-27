export interface FormPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  formIds: string[];
  popular?: boolean;
}

export const FORM_PACKAGES: FormPackage[] = [
  {
    id: 'marriage_greencard',
    name: 'Marriage-Based Green Card Package',
    description: 'Complete package for marriage-based green card application including work permit and travel document',
    price: 199,
    formIds: ['i-130', 'i-485', 'i-765', 'i-131', 'i-864'],
    popular: true,
  },
  {
    id: 'employment_greencard',
    name: 'Employment-Based Green Card Package',
    description: 'Complete package for employment-based permanent residence with work permit and travel document',
    price: 249,
    formIds: ['i-140', 'i-485', 'i-765', 'i-131'],
    popular: true,
  },
  {
    id: 'h1b_worker',
    name: 'H-1B Worker Package',
    description: 'Petition for H-1B specialty occupation work visa',
    price: 149,
    formIds: ['i-129'],
    popular: true,
  },
  {
    id: 'citizenship',
    name: 'U.S. Citizenship Application',
    description: 'Application for naturalization to become a U.S. citizen',
    price: 99,
    formIds: ['n-400'],
    popular: true,
  },
  {
    id: 'remove_conditions',
    name: 'Remove Conditions on Green Card',
    description: 'Petition to remove conditions on permanent residence (2-year green card)',
    price: 99,
    formIds: ['i-751'],
  },
  {
    id: 'extend_change_status',
    name: 'Extend or Change Status Package',
    description: 'Extend your current visa or change to a different nonimmigrant status',
    price: 79,
    formIds: ['i-539'],
  },
  {
    id: 'eb5_investor',
    name: 'EB-5 Investor Package',
    description: 'Premium package for EB-5 investor visa including green card application',
    price: 499,
    formIds: ['i-526', 'i-485'],
  },
  {
    id: 'replace_greencard',
    name: 'Replace Green Card',
    description: 'Application to replace permanent resident card',
    price: 49,
    formIds: ['i-90'],
  },
];

export function getFormPackage(packageId: string): FormPackage | undefined {
  return FORM_PACKAGES.find((pkg) => pkg.id === packageId);
}

export function getPackageByFormId(formId: string): FormPackage | undefined {
  return FORM_PACKAGES.find((pkg) => pkg.formIds.includes(formId));
}
