/**
 * Notification System for USCIS Form Updates
 *
 * This module handles sending notifications when forms are updated,
 * expiring soon, or need attention from administrators.
 */

export interface FormUpdateNotification {
  formId: string;
  formName: string;
  oldEdition: string;
  newEdition: string;
  updateDate: Date;
  needsAction: boolean;
}

export interface FormExpirationNotification {
  formId: string;
  formName: string;
  expiresDate: string;
  daysRemaining: number;
}

export interface EmailRecipient {
  email: string;
  name?: string;
  role: 'admin' | 'developer' | 'user';
}

/**
 * Send email notification for form updates
 *
 * TODO: Integrate with your email service (Resend, SendGrid, AWS SES, etc.)
 *
 * @example Using Resend:
 * ```typescript
 * import { Resend } from 'resend';
 * const resend = new Resend(process.env.RESEND_API_KEY);
 * await resend.emails.send({
 *   from: 'alerts@docfill.com',
 *   to: recipient.email,
 *   subject: subject,
 *   html: htmlContent,
 * });
 * ```
 */
export async function sendFormUpdateEmail(
  updates: FormUpdateNotification[],
  recipients: EmailRecipient[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const subject = `USCIS Form Update Alert: ${updates.length} form(s) updated`;

    const htmlContent = generateUpdateEmailHtml(updates);
    const textContent = generateUpdateEmailText(updates);

    // TODO: Replace with actual email sending
    console.log('📧 Email would be sent to:', recipients.map((r) => r.email).join(', '));
    console.log('Subject:', subject);
    console.log('Content:', textContent);

    // Placeholder for actual email sending
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // for (const recipient of recipients) {
    //   await resend.emails.send({
    //     from: 'alerts@docfill.com',
    //     to: recipient.email,
    //     subject,
    //     html: htmlContent,
    //     text: textContent,
    //   });
    // }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send email notification for expiring forms
 */
export async function sendFormExpirationEmail(
  expiring: FormExpirationNotification[],
  recipients: EmailRecipient[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const subject = `USCIS Form Expiration Alert: ${expiring.length} form(s) expiring soon`;

    const htmlContent = generateExpirationEmailHtml(expiring);
    const textContent = generateExpirationEmailText(expiring);

    // TODO: Replace with actual email sending
    console.log('📧 Email would be sent to:', recipients.map((r) => r.email).join(', '));
    console.log('Subject:', subject);
    console.log('Content:', textContent);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send in-app notification banner for users
 *
 * TODO: Store in database and display in UI
 */
export async function createInAppNotification(
  type: 'form_update' | 'form_expiration' | 'maintenance',
  message: string,
  affectedFormIds?: string[]
): Promise<{ success: boolean; notificationId?: string; error?: string }> {
  try {
    // TODO: Store in database
    // const notification = await db.notifications.create({
    //   data: {
    //     type,
    //     message,
    //     affectedFormIds,
    //     createdAt: new Date(),
    //     active: true,
    //   },
    // });

    console.log('📢 In-app notification created:', {
      type,
      message,
      affectedFormIds,
    });

    return {
      success: true,
      notificationId: `notif_${Date.now()}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Notify users with active applications about form updates
 */
export async function notifyAffectedUsers(
  formId: string,
  message: string
): Promise<{ success: boolean; usersNotified?: number; error?: string }> {
  try {
    // TODO: Query database for users with applications using this form
    // const applications = await db.applications.findMany({
    //   where: {
    //     formId,
    //     status: { in: ['in_progress', 'pending_review'] },
    //   },
    //   include: { user: true },
    // });

    // const uniqueUsers = [...new Set(applications.map((app) => app.user))];

    // for (const user of uniqueUsers) {
    //   await sendUserNotificationEmail(user.email, formId, message);
    // }

    console.log(`📧 Would notify users with active ${formId.toUpperCase()} applications`);
    console.log(`Message: ${message}`);

    return {
      success: true,
      usersNotified: 0, // Placeholder
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ==================== Email HTML Generators ====================

function generateUpdateEmailHtml(updates: FormUpdateNotification[]): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; }
    .form-update { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #2563eb; border-radius: 4px; }
    .form-name { font-weight: bold; color: #1f2937; }
    .editions { color: #6b7280; font-size: 14px; }
    .action-required { background: #fef3c7; border-left-color: #f59e0b; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">USCIS Form Update Alert</h1>
    </div>
    <div class="content">
      <p><strong>${updates.length} USCIS form(s)</strong> have been updated:</p>

      ${updates
        .map(
          (update) => `
        <div class="form-update ${update.needsAction ? 'action-required' : ''}">
          <div class="form-name">${update.formId.toUpperCase()} - ${update.formName}</div>
          <div class="editions">
            ${update.oldEdition} → ${update.newEdition}
          </div>
          ${update.needsAction ? '<p style="color: #f59e0b; margin: 5px 0 0 0; font-size: 14px;">⚠️ Action Required: Field mappings need verification</p>' : ''}
        </div>
      `
        )
        .join('')}

      <p style="margin-top: 20px;">
        <strong>Next Steps:</strong>
      </p>
      <ol>
        <li>Visit the admin dashboard to download new PDFs</li>
        <li>Verify all PDF field mappings still work correctly</li>
        <li>Test forms end-to-end before deploying</li>
        <li>Update the needsFieldRemapping flag once verified</li>
      </ol>

      <p style="text-align: center; margin-top: 30px;">
        <a href="https://docfill.com/admin/form-versions" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Go to Admin Dashboard
        </a>
      </p>
    </div>
    <div class="footer">
      Automated alert from DocFill Immigration Prep<br>
      <a href="https://docfill.com">docfill.com</a>
    </div>
  </div>
</body>
</html>
  `;
}

function generateUpdateEmailText(updates: FormUpdateNotification[]): string {
  const lines = [
    'USCIS FORM UPDATE ALERT',
    '======================',
    '',
    `${updates.length} USCIS form(s) have been updated:`,
    '',
  ];

  updates.forEach((update) => {
    lines.push(`- ${update.formId.toUpperCase()} - ${update.formName}`);
    lines.push(`  ${update.oldEdition} → ${update.newEdition}`);
    if (update.needsAction) {
      lines.push('  ⚠️ ACTION REQUIRED: Field mappings need verification');
    }
    lines.push('');
  });

  lines.push('Next Steps:');
  lines.push('1. Visit the admin dashboard to download new PDFs');
  lines.push('2. Verify all PDF field mappings still work correctly');
  lines.push('3. Test forms end-to-end before deploying');
  lines.push('4. Update the needsFieldRemapping flag once verified');
  lines.push('');
  lines.push('Admin Dashboard: https://docfill.com/admin/form-versions');

  return lines.join('\n');
}

function generateExpirationEmailHtml(expiring: FormExpirationNotification[]): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; }
    .form-expiring { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #dc2626; border-radius: 4px; }
    .form-name { font-weight: bold; color: #1f2937; }
    .expiration { color: #dc2626; font-size: 14px; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">⚠️ USCIS Form Expiration Alert</h1>
    </div>
    <div class="content">
      <p><strong>${expiring.length} USCIS form(s)</strong> are expiring soon:</p>

      ${expiring
        .map(
          (form) => `
        <div class="form-expiring">
          <div class="form-name">${form.formId.toUpperCase()} - ${form.formName}</div>
          <div class="expiration">
            Expires: ${form.expiresDate} (${form.daysRemaining} days remaining)
          </div>
        </div>
      `
        )
        .join('')}

      <p style="margin-top: 20px;">
        <strong>Action Required:</strong> Check USCIS for replacement forms.
      </p>
    </div>
    <div class="footer">
      Automated alert from DocFill Immigration Prep<br>
      <a href="https://docfill.com">docfill.com</a>
    </div>
  </div>
</body>
</html>
  `;
}

function generateExpirationEmailText(expiring: FormExpirationNotification[]): string {
  const lines = [
    'USCIS FORM EXPIRATION ALERT',
    '===========================',
    '',
    `${expiring.length} USCIS form(s) are expiring soon:`,
    '',
  ];

  expiring.forEach((form) => {
    lines.push(`- ${form.formId.toUpperCase()} - ${form.formName}`);
    lines.push(`  Expires: ${form.expiresDate} (${form.daysRemaining} days remaining)`);
    lines.push('');
  });

  lines.push('Action Required: Check USCIS for replacement forms.');

  return lines.join('\n');
}

/**
 * Get email recipients from environment variables or database
 */
export function getNotificationRecipients(): EmailRecipient[] {
  // TODO: Load from database or config
  const adminEmail = process.env.ADMIN_EMAIL;

  if (adminEmail) {
    return [
      {
        email: adminEmail,
        role: 'admin',
      },
    ];
  }

  // Default fallback
  return [];
}
