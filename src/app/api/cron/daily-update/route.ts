/**
 * Cron Job: Daily USCIS Form Update Check
 *
 * This endpoint is called by Vercel Cron once daily at 6 AM UTC.
 * It checks all forms for updates and sends alerts if any are found.
 *
 * Vercel Cron Configuration (in vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/daily-update",
 *     "schedule": "0 6 * * *"
 *   }]
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkAllFormsForUpdates, generateReport, getExpiringForms } from '@/lib/uscis/version-checker';
import { getFormsNeedingRemapping } from '@/lib/uscis/form-versions';

/**
 * Verify the request is from Vercel Cron
 * https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
 */
function isValidCronRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');

  // In production, Vercel sends: Authorization: Bearer <CRON_SECRET>
  // Set CRON_SECRET in your Vercel environment variables
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret) {
    return authHeader === `Bearer ${cronSecret}`;
  }

  // In development, allow without auth (or check for localhost)
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  return false;
}

/**
 * Send email alert when forms are updated
 * TODO: Implement actual email sending (e.g., using SendGrid, Resend, or AWS SES)
 */
async function sendUpdateAlert(updates: Array<{ formId: string; currentEdition: string; latestEdition: string }>) {
  // Placeholder for email sending logic
  console.log('📧 SENDING EMAIL ALERT:');
  console.log(`${updates.length} form(s) have been updated by USCIS:`);
  updates.forEach((update) => {
    console.log(`  - ${update.formId.toUpperCase()}: ${update.currentEdition} → ${update.latestEdition}`);
  });

  // TODO: Implement email sending
  // Example with Resend:
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'alerts@docfill.com',
  //   to: process.env.ADMIN_EMAIL,
  //   subject: `USCIS Form Update Alert: ${updates.length} form(s) updated`,
  //   html: generateEmailHtml(updates),
  // });
}

/**
 * Send alert for forms expiring soon
 */
async function sendExpirationAlert(expiring: Array<{ formId: string; daysRemaining: number; expiresDate: string }>) {
  console.log('⚠️  SENDING EXPIRATION ALERT:');
  console.log(`${expiring.length} form(s) are expiring soon:`);
  expiring.forEach((form) => {
    console.log(`  - ${form.formId.toUpperCase()}: expires ${form.expiresDate} (${form.daysRemaining} days)`);
  });

  // TODO: Implement email sending
}

/**
 * Log results to database (optional)
 */
async function logCheckResult(result: any) {
  // TODO: Store check results in database for history/audit trail
  // Example:
  // await db.formVersionChecks.create({
  //   data: {
  //     timestamp: new Date(),
  //     totalChecked: result.totalChecked,
  //     updatesFound: result.updatedForms.length,
  //     errors: result.errors,
  //     details: JSON.stringify(result),
  //   },
  // });

  console.log('📝 Logged check result to database (placeholder)');
}

export async function GET(request: NextRequest) {
  // Verify this is a legitimate cron request
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🔄 Starting daily USCIS form update check...');

    // Check all forms for updates
    const result = await checkAllFormsForUpdates({
      concurrency: 3,
    });

    // Generate report
    const report = generateReport(result);
    console.log(report);

    // Send alerts if updates found
    if (result.updatedForms.length > 0) {
      await sendUpdateAlert(result.updatedForms);
    }

    // Check for expiring forms
    const expiring = getExpiringForms(30);
    if (expiring.length > 0) {
      await sendExpirationAlert(expiring);
    }

    // Check for forms needing field remapping
    const needsRemapping = getFormsNeedingRemapping();
    if (needsRemapping.length > 0) {
      console.log(`⚠️  ${needsRemapping.length} form(s) need field remapping: ${needsRemapping.join(', ')}`);
    }

    // Log to database
    await logCheckResult(result);

    // Return success response
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalChecked: result.totalChecked,
        updatesFound: result.updatedForms.length,
        errors: result.errors.length,
        expiringForms: expiring.length,
        needsRemapping: needsRemapping.length,
      },
      result,
      report,
    });
  } catch (error) {
    console.error('❌ Error in daily update check:', error);

    // TODO: Send error alert to admin
    console.log('📧 Should send error alert email here');

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Vercel Cron uses GET, but allow POST for manual testing
export async function POST(request: NextRequest) {
  return GET(request);
}
