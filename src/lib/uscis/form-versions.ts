/**
 * USCIS Form Version Tracking
 *
 * This file stores the current edition dates for all USCIS forms we support.
 * The edition date appears at the bottom of each USCIS form PDF.
 *
 * IMPORTANT: When a form is updated:
 * 1. Update the edition date here
 * 2. Download the new PDF template
 * 3. Set needsFieldRemapping: true
 * 4. Verify all PDF field mappings still work
 * 5. Test the form end-to-end
 * 6. Only then set needsFieldRemapping: false
 */

export interface FormVersion {
  /** Edition date from bottom of USCIS form (mm/dd/yy format) */
  edition: string;

  /**
   * Expiration date when this edition is no longer valid (if specified by USCIS)
   * Most forms don't have expiration dates - they're valid until superseded
   */
  expiresDate: string | null;

  /** Last time we checked USCIS website for updates */
  lastChecked: Date;

  /**
   * Flag indicating PDF field names may have changed
   * Set to true when form is updated, false after verification
   */
  needsFieldRemapping?: boolean;

  /** URL to the USCIS form page */
  uscisUrl: string;

  /** Direct PDF download URL */
  pdfUrl: string;
}

export const FORM_VERSIONS: Record<string, FormVersion> = {
  'i-130': {
    edition: '04/01/24',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-130',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-130.pdf',
  },

  'i-485': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-485',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-485.pdf',
  },

  'i-765': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-765',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-765.pdf',
  },

  'i-131': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-131',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-131.pdf',
  },

  'i-864': {
    edition: '10/17/24',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-864',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-864.pdf',
  },

  'n-400': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/n-400',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/n-400.pdf',
  },

  'i-751': {
    edition: '04/01/24',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-751',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-751.pdf',
  },

  'i-90': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-90',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-90.pdf',
  },

  'i-129': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-129',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-129.pdf',
  },

  'i-140': {
    edition: '06/07/24',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-140',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-140.pdf',
  },

  'i-539': {
    edition: '08/28/24',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-539',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-539.pdf',
  },

  'i-526': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-526',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-526.pdf',
  },

  'i-924': {
    edition: '07/23/20',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-924',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-924.pdf',
    // NOTE: USCIS is not currently accepting I-924 (repealed by EB-5 Reform Act 2022)
  },

  'i-821d': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-821d',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-821d.pdf',
  },

  'i-9': {
    edition: '01/20/25',
    expiresDate: '05/31/2027',
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-9',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-9.pdf',
  },

  'i-290b': {
    edition: '05/31/24',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-290b',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-290b.pdf',
  },

  'i-601': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-601',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-601.pdf',
  },

  'i-601a': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-601a',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-601a.pdf',
  },

  'i-212': {
    edition: '01/20/25',
    expiresDate: null,
    lastChecked: new Date('2025-11-26'),
    needsFieldRemapping: false,
    uscisUrl: 'https://www.uscis.gov/i-212',
    pdfUrl: 'https://www.uscis.gov/sites/default/files/document/forms/i-212.pdf',
  },
};

/**
 * Get version info for a specific form
 */
export function getFormVersion(formId: string): FormVersion | undefined {
  return FORM_VERSIONS[formId.toLowerCase()];
}

/**
 * Get all forms that need field remapping
 */
export function getFormsNeedingRemapping(): string[] {
  return Object.entries(FORM_VERSIONS)
    .filter(([_, version]) => version.needsFieldRemapping === true)
    .map(([formId]) => formId);
}

/**
 * Get forms expiring within the specified number of days
 */
export function getExpiringForms(daysThreshold: number = 30): Array<{
  formId: string;
  version: FormVersion;
  daysUntilExpiration: number;
}> {
  const now = new Date();
  const results: Array<{ formId: string; version: FormVersion; daysUntilExpiration: number }> = [];

  for (const [formId, version] of Object.entries(FORM_VERSIONS)) {
    if (version.expiresDate) {
      const expirationDate = new Date(version.expiresDate);
      const daysUntilExpiration = Math.floor(
        (expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysUntilExpiration <= daysThreshold && daysUntilExpiration >= 0) {
        results.push({ formId, version, daysUntilExpiration });
      }
    }
  }

  return results.sort((a, b) => a.daysUntilExpiration - b.daysUntilExpiration);
}

/**
 * Update the last checked timestamp for a form
 */
export function updateLastChecked(formId: string): void {
  const version = FORM_VERSIONS[formId.toLowerCase()];
  if (version) {
    version.lastChecked = new Date();
  }
}

/**
 * Update version info when a new edition is detected
 */
export function updateFormVersion(
  formId: string,
  newEdition: string,
  newExpiresDate: string | null = null
): void {
  const version = FORM_VERSIONS[formId.toLowerCase()];
  if (version) {
    version.edition = newEdition;
    version.expiresDate = newExpiresDate;
    version.lastChecked = new Date();
    version.needsFieldRemapping = true; // Always flag for remapping when updated
  }
}
