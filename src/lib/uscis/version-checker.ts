/**
 * USCIS Form Version Checker
 *
 * Checks the USCIS website for form updates by scraping the edition dates
 * from each form's webpage.
 */

import { FORM_VERSIONS, updateLastChecked, updateFormVersion, type FormVersion } from './form-versions';

export interface FormUpdateInfo {
  formId: string;
  currentEdition: string;
  latestEdition: string;
  hasUpdate: boolean;
  uscisUrl: string;
  lastChecked: Date;
}

export interface VersionCheckResult {
  updatedForms: FormUpdateInfo[];
  upToDateForms: string[];
  errors: Array<{ formId: string; error: string }>;
  totalChecked: number;
  timestamp: Date;
}

/**
 * Extract edition date from USCIS form page HTML
 *
 * USCIS pages typically show: "Edition Date: 01/20/25"
 * This function looks for that pattern in the HTML.
 */
function extractEditionDate(html: string): string | null {
  // Pattern 1: "Edition Date: 01/20/25" or "Edition Date 01/20/25"
  const pattern1 = /Edition\s+Date:?\s+(\d{2}\/\d{2}\/\d{2})/i;
  const match1 = html.match(pattern1);
  if (match1) {
    return match1[1];
  }

  // Pattern 2: Look in form details section for date
  const pattern2 = /Edition\s+Date:?\s*<[^>]*>(\d{2}\/\d{2}\/\d{2})/i;
  const match2 = html.match(pattern2);
  if (match2) {
    return match2[1];
  }

  // Pattern 3: JSON-LD structured data (some USCIS pages use this)
  const jsonLdPattern = /"edition"\s*:\s*"(\d{2}\/\d{2}\/\d{2})"/i;
  const match3 = html.match(jsonLdPattern);
  if (match3) {
    return match3[1];
  }

  return null;
}

/**
 * Extract expiration date if present
 */
function extractExpirationDate(html: string): string | null {
  // Pattern: "Expiration Date: 05/31/2027" or similar
  const pattern = /(?:Expiration|Expires)\s+Date:?\s+(\d{2}\/\d{2}\/\d{4})/i;
  const match = html.match(pattern);
  return match ? match[1] : null;
}

/**
 * Check a single form for updates
 */
export async function checkFormVersion(formId: string): Promise<FormUpdateInfo | null> {
  const version = FORM_VERSIONS[formId];
  if (!version) {
    throw new Error(`Form ${formId} not found in FORM_VERSIONS`);
  }

  try {
    // Fetch the USCIS form page
    const response = await fetch(version.uscisUrl, {
      headers: {
        'User-Agent': 'DocFill Immigration Prep - Form Version Checker',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    // Extract the edition date
    const latestEdition = extractEditionDate(html);

    if (!latestEdition) {
      throw new Error('Could not extract edition date from page');
    }

    // Update the last checked timestamp
    updateLastChecked(formId);

    // Check if there's an update
    const hasUpdate = latestEdition !== version.edition;

    return {
      formId,
      currentEdition: version.edition,
      latestEdition,
      hasUpdate,
      uscisUrl: version.uscisUrl,
      lastChecked: new Date(),
    };
  } catch (error) {
    throw new Error(`Failed to check ${formId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Check all forms for updates
 */
export async function checkAllFormsForUpdates(
  options: {
    /** Only check forms that haven't been checked in this many days */
    minDaysSinceLastCheck?: number;
    /** Specific form IDs to check (if not provided, checks all) */
    formIds?: string[];
    /** Number of concurrent requests (default: 3 to avoid overwhelming USCIS) */
    concurrency?: number;
  } = {}
): Promise<VersionCheckResult> {
  const { minDaysSinceLastCheck = 0, formIds, concurrency = 3 } = options;

  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;

  // Determine which forms to check
  let formsToCheck = formIds || Object.keys(FORM_VERSIONS);

  // Filter by last check time if specified
  if (minDaysSinceLastCheck > 0) {
    formsToCheck = formsToCheck.filter((formId) => {
      const version = FORM_VERSIONS[formId];
      const daysSinceCheck = (now.getTime() - version.lastChecked.getTime()) / msPerDay;
      return daysSinceCheck >= minDaysSinceLastCheck;
    });
  }

  const updatedForms: FormUpdateInfo[] = [];
  const upToDateForms: string[] = [];
  const errors: Array<{ formId: string; error: string }> = [];

  // Process forms in batches to limit concurrency
  for (let i = 0; i < formsToCheck.length; i += concurrency) {
    const batch = formsToCheck.slice(i, i + concurrency);

    const results = await Promise.allSettled(
      batch.map((formId) => checkFormVersion(formId))
    );

    results.forEach((result, index) => {
      const formId = batch[index];

      if (result.status === 'fulfilled' && result.value) {
        const info = result.value;
        if (info.hasUpdate) {
          updatedForms.push(info);
        } else {
          upToDateForms.push(formId);
        }
      } else if (result.status === 'rejected') {
        errors.push({
          formId,
          error: result.reason instanceof Error ? result.reason.message : 'Unknown error',
        });
      }
    });
  }

  return {
    updatedForms,
    upToDateForms,
    errors,
    totalChecked: formsToCheck.length,
    timestamp: new Date(),
  };
}

/**
 * Get forms that are expiring soon (within specified days)
 */
export function getExpiringForms(daysThreshold: number = 30): Array<{
  formId: string;
  edition: string;
  expiresDate: string;
  daysRemaining: number;
}> {
  const now = new Date();
  const results: Array<{
    formId: string;
    edition: string;
    expiresDate: string;
    daysRemaining: number;
  }> = [];

  for (const [formId, version] of Object.entries(FORM_VERSIONS)) {
    if (version.expiresDate) {
      const expirationDate = new Date(version.expiresDate);
      const daysRemaining = Math.floor(
        (expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysRemaining <= daysThreshold && daysRemaining >= 0) {
        results.push({
          formId,
          edition: version.edition,
          expiresDate: version.expiresDate,
          daysRemaining,
        });
      }
    }
  }

  return results.sort((a, b) => a.daysRemaining - b.daysRemaining);
}

/**
 * Apply updates detected from version checking
 * This updates the FORM_VERSIONS in memory and flags for field remapping
 *
 * NOTE: To persist changes, you would need to write back to a database
 * or configuration file. This implementation keeps versions in memory.
 */
export function applyFormUpdate(formId: string, newEdition: string, newExpiresDate?: string): void {
  updateFormVersion(formId, newEdition, newExpiresDate || null);
  console.log(`Updated ${formId} to edition ${newEdition} - needs field remapping!`);
}

/**
 * Generate a human-readable report of version check results
 */
export function generateReport(result: VersionCheckResult): string {
  const lines: string[] = [];

  lines.push('=== USCIS Form Version Check Report ===');
  lines.push(`Timestamp: ${result.timestamp.toISOString()}`);
  lines.push(`Total Forms Checked: ${result.totalChecked}`);
  lines.push('');

  if (result.updatedForms.length > 0) {
    lines.push(`⚠️  UPDATES AVAILABLE (${result.updatedForms.length}):`);
    result.updatedForms.forEach((update) => {
      lines.push(`  - ${update.formId.toUpperCase()}: ${update.currentEdition} → ${update.latestEdition}`);
      lines.push(`    URL: ${update.uscisUrl}`);
    });
    lines.push('');
  } else {
    lines.push('✅ No updates found - all forms are current');
    lines.push('');
  }

  if (result.upToDateForms.length > 0) {
    lines.push(`✅ UP TO DATE (${result.upToDateForms.length}):`);
    lines.push(`  ${result.upToDateForms.map((id) => id.toUpperCase()).join(', ')}`);
    lines.push('');
  }

  if (result.errors.length > 0) {
    lines.push(`❌ ERRORS (${result.errors.length}):`);
    result.errors.forEach((err) => {
      lines.push(`  - ${err.formId.toUpperCase()}: ${err.error}`);
    });
    lines.push('');
  }

  // Check for expiring forms
  const expiring = getExpiringForms(30);
  if (expiring.length > 0) {
    lines.push(`⏰ EXPIRING SOON (within 30 days):`);
    expiring.forEach((form) => {
      lines.push(`  - ${form.formId.toUpperCase()}: expires ${form.expiresDate} (${form.daysRemaining} days)`);
    });
    lines.push('');
  }

  lines.push('=======================================');

  return lines.join('\n');
}
