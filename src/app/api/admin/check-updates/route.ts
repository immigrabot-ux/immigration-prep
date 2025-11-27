/**
 * Admin API Endpoint: Check for USCIS Form Updates
 *
 * Protected endpoint that checks USCIS website for form updates
 * and optionally downloads new PDFs.
 *
 * Usage:
 *   GET  /api/admin/check-updates - Check all forms
 *   GET  /api/admin/check-updates?forms=i-130,i-485 - Check specific forms
 *   POST /api/admin/check-updates - Check and download updates
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkAllFormsForUpdates, generateReport } from '@/lib/uscis/version-checker';
import { downloadMultiplePdfs, generateDownloadReport } from '@/lib/uscis/pdf-downloader';

/**
 * TODO: Add authentication middleware
 *
 * This endpoint should be protected and only accessible to admins.
 * You'll want to add something like:
 *
 * import { auth } from '@/lib/auth';
 * const session = await auth();
 * if (!session || session.user.role !== 'admin') {
 *   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 * }
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Get form IDs from query params (optional)
    const formsParam = searchParams.get('forms');
    const formIds = formsParam ? formsParam.split(',').map((id) => id.trim().toLowerCase()) : undefined;

    // Check for updates
    const result = await checkAllFormsForUpdates({
      formIds,
      concurrency: 3,
    });

    // Generate human-readable report
    const report = generateReport(result);

    return NextResponse.json({
      success: true,
      result,
      report,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error checking for updates:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const {
      formIds,
      downloadPdfs = false,
      autoDownloadUpdates = false,
    } = body;

    // Check for updates
    const checkResult = await checkAllFormsForUpdates({
      formIds,
      concurrency: 3,
    });

    let downloadResult = null;

    // Download PDFs if requested
    if (downloadPdfs) {
      const idsToDownload = formIds || Object.keys(checkResult.updatedForms);

      if (idsToDownload.length > 0) {
        const downloads = await downloadMultiplePdfs(idsToDownload, {
          concurrency: 2,
        });
        downloadResult = {
          downloads,
          report: generateDownloadReport(downloads),
        };
      }
    }

    // Auto-download only updated forms if requested
    if (autoDownloadUpdates && checkResult.updatedForms.length > 0) {
      const updatedIds = checkResult.updatedForms.map((f) => f.formId);
      const downloads = await downloadMultiplePdfs(updatedIds, {
        concurrency: 2,
      });
      downloadResult = {
        downloads,
        report: generateDownloadReport(downloads),
      };
    }

    return NextResponse.json({
      success: true,
      checkResult,
      checkReport: generateReport(checkResult),
      downloadResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in check-updates POST:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
