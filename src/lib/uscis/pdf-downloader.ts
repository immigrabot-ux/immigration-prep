/**
 * USCIS PDF Downloader
 *
 * Downloads the latest PDF templates from USCIS and saves them locally.
 */

import { FORM_VERSIONS } from './form-versions';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export interface DownloadResult {
  formId: string;
  success: boolean;
  filePath?: string;
  fileSize?: number;
  error?: string;
}

/**
 * Get the local path where PDF should be saved
 */
function getPdfPath(formId: string): string {
  // Save to public/pdf-templates/ so they're accessible via web
  const publicDir = join(process.cwd(), 'public', 'pdf-templates');
  return join(publicDir, `${formId}.pdf`);
}

/**
 * Ensure the pdf-templates directory exists
 */
async function ensurePdfDirectory(): Promise<void> {
  const pdfDir = join(process.cwd(), 'public', 'pdf-templates');
  if (!existsSync(pdfDir)) {
    await mkdir(pdfDir, { recursive: true });
  }
}

/**
 * Download a single PDF from USCIS
 */
export async function downloadFormPdf(formId: string): Promise<DownloadResult> {
  const version = FORM_VERSIONS[formId];

  if (!version) {
    return {
      formId,
      success: false,
      error: `Form ${formId} not found in FORM_VERSIONS`,
    };
  }

  try {
    // Ensure directory exists
    await ensurePdfDirectory();

    // Download PDF
    const response = await fetch(version.pdfUrl, {
      headers: {
        'User-Agent': 'DocFill Immigration Prep - PDF Downloader',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Verify content type
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('pdf')) {
      throw new Error(`Unexpected content type: ${contentType}`);
    }

    // Get the PDF as a buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to file
    const filePath = getPdfPath(formId);
    await writeFile(filePath, buffer);

    return {
      formId,
      success: true,
      filePath,
      fileSize: buffer.length,
    };
  } catch (error) {
    return {
      formId,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Download multiple PDFs concurrently
 */
export async function downloadMultiplePdfs(
  formIds: string[],
  options: {
    /** Number of concurrent downloads (default: 2 to be respectful to USCIS) */
    concurrency?: number;
    /** Callback for progress updates */
    onProgress?: (completed: number, total: number, formId: string) => void;
  } = {}
): Promise<DownloadResult[]> {
  const { concurrency = 2, onProgress } = options;

  const results: DownloadResult[] = [];
  let completed = 0;

  // Process in batches
  for (let i = 0; i < formIds.length; i += concurrency) {
    const batch = formIds.slice(i, i + concurrency);

    const batchResults = await Promise.all(
      batch.map(async (formId) => {
        const result = await downloadFormPdf(formId);
        completed++;
        onProgress?.(completed, formIds.length, formId);
        return result;
      })
    );

    results.push(...batchResults);
  }

  return results;
}

/**
 * Download all form PDFs
 */
export async function downloadAllPdfs(options?: {
  concurrency?: number;
  onProgress?: (completed: number, total: number, formId: string) => void;
}): Promise<DownloadResult[]> {
  const allFormIds = Object.keys(FORM_VERSIONS);
  return downloadMultiplePdfs(allFormIds, options);
}

/**
 * Download only forms that have been updated (needsFieldRemapping flag)
 */
export async function downloadUpdatedPdfs(options?: {
  concurrency?: number;
  onProgress?: (completed: number, total: number, formId: string) => void;
}): Promise<DownloadResult[]> {
  const updatedFormIds = Object.entries(FORM_VERSIONS)
    .filter(([_, version]) => version.needsFieldRemapping === true)
    .map(([formId]) => formId);

  if (updatedFormIds.length === 0) {
    return [];
  }

  return downloadMultiplePdfs(updatedFormIds, options);
}

/**
 * Generate a report of download results
 */
export function generateDownloadReport(results: DownloadResult[]): string {
  const lines: string[] = [];

  lines.push('=== PDF Download Report ===');

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  lines.push(`Total: ${results.length}`);
  lines.push(`Successful: ${successful.length}`);
  lines.push(`Failed: ${failed.length}`);
  lines.push('');

  if (successful.length > 0) {
    lines.push('✅ SUCCESSFUL DOWNLOADS:');
    successful.forEach((result) => {
      const sizeMB = result.fileSize ? (result.fileSize / 1024 / 1024).toFixed(2) : 'unknown';
      lines.push(`  - ${result.formId.toUpperCase()}: ${sizeMB} MB`);
      if (result.filePath) {
        lines.push(`    Saved to: ${result.filePath}`);
      }
    });
    lines.push('');
  }

  if (failed.length > 0) {
    lines.push('❌ FAILED DOWNLOADS:');
    failed.forEach((result) => {
      lines.push(`  - ${result.formId.toUpperCase()}: ${result.error}`);
    });
    lines.push('');
  }

  lines.push('===========================');

  return lines.join('\n');
}

/**
 * Check if a PDF file exists locally
 */
export function pdfExists(formId: string): boolean {
  return existsSync(getPdfPath(formId));
}

/**
 * Get the local file path for a form's PDF
 */
export function getPdfFilePath(formId: string): string {
  return getPdfPath(formId);
}

/**
 * Get the web URL for a form's PDF (for serving via Next.js)
 */
export function getPdfWebUrl(formId: string): string {
  return `/pdf-templates/${formId}.pdf`;
}
