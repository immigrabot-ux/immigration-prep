# USCIS Form Auto-Update System

## Overview

This system automatically monitors USCIS forms for updates, downloads new PDFs, and alerts administrators when forms are updated or expiring.

## Components

### 1. Form Version Tracking (`src/lib/uscis/form-versions.ts`)

Stores the current edition dates for all 19 USCIS forms we support.

```typescript
import { FORM_VERSIONS, getFormVersion } from '@/lib/uscis/form-versions';

// Get version info for a specific form
const i130Version = getFormVersion('i-130');
console.log(i130Version.edition); // "04/01/24"

// Get forms that need field remapping after updates
const needsRemapping = getFormsNeedingRemapping();

// Get forms expiring within 30 days
const expiring = getExpiringForms(30);
```

**Each form version includes:**
- `edition`: Edition date from USCIS (mm/dd/yy format)
- `expiresDate`: When this edition expires (if specified)
- `lastChecked`: Last time we checked USCIS for updates
- `needsFieldRemapping`: Flag indicating PDF field names may have changed
- `uscisUrl`: Link to the USCIS form page
- `pdfUrl`: Direct download link for the PDF

### 2. Version Checker (`src/lib/uscis/version-checker.ts`)

Scrapes USCIS website to detect form updates.

```typescript
import { checkAllFormsForUpdates, checkFormVersion } from '@/lib/uscis/version-checker';

// Check all forms
const result = await checkAllFormsForUpdates();

// Check specific form
const i130Update = await checkFormVersion('i-130');
if (i130Update.hasUpdate) {
  console.log(`I-130 updated: ${i130Update.currentEdition} → ${i130Update.latestEdition}`);
}

// Generate report
const report = generateReport(result);
console.log(report);
```

### 3. PDF Downloader (`src/lib/uscis/pdf-downloader.ts`)

Downloads PDF templates from USCIS and saves to `public/pdf-templates/`.

```typescript
import { downloadFormPdf, downloadAllPdfs, downloadUpdatedPdfs } from '@/lib/uscis/pdf-downloader';

// Download a single PDF
const result = await downloadFormPdf('i-130');

// Download all PDFs (for initial setup)
const allResults = await downloadAllPdfs({
  onProgress: (completed, total, formId) => {
    console.log(`Downloaded ${formId}: ${completed}/${total}`);
  }
});

// Download only updated forms
const updatedResults = await downloadUpdatedPdfs();
```

### 4. Admin API Endpoint (`src/app/api/admin/check-updates/route.ts`)

Protected endpoint for manual version checks and PDF downloads.

**GET /api/admin/check-updates**
```bash
# Check all forms
curl http://localhost:3000/api/admin/check-updates

# Check specific forms
curl http://localhost:3000/api/admin/check-updates?forms=i-130,i-485
```

**POST /api/admin/check-updates**
```bash
# Check and download all PDFs
curl -X POST http://localhost:3000/api/admin/check-updates \
  -H "Content-Type: application/json" \
  -d '{"downloadPdfs": true}'

# Download only updated forms
curl -X POST http://localhost:3000/api/admin/check-updates \
  -H "Content-Type: application/json" \
  -d '{"autoDownloadUpdates": true}'
```

### 5. Daily Cron Job (`src/app/api/cron/daily-update/route.ts`)

Runs daily at 6 AM UTC via Vercel Cron to check for updates.

**Configuration in `vercel.json`:**
```json
{
  "crons": [{
    "path": "/api/cron/daily-update",
    "schedule": "0 6 * * *"
  }]
}
```

**What it does:**
1. Checks all forms for updates
2. Detects forms expiring within 30 days
3. Sends email alerts if updates found
4. Logs results for audit trail

**Security:**
Set `CRON_SECRET` environment variable in Vercel to secure the endpoint.

### 6. Admin Dashboard (`/admin/form-versions`)

Visual interface for monitoring and managing form versions.

**Features:**
- View current vs latest edition for all forms
- See which forms need field remapping
- Check for expiring forms
- Download PDFs directly from USCIS
- One-click update checking
- Status badges (up-to-date, update available, needs remapping)

**Access:**
```
http://localhost:3000/admin/form-versions
```

### 7. Notification System (`src/lib/uscis/notifications.ts`)

Sends alerts when forms are updated or expiring.

```typescript
import { sendFormUpdateEmail, createInAppNotification } from '@/lib/uscis/notifications';

// Send email alert
await sendFormUpdateEmail(updates, recipients);

// Create in-app banner
await createInAppNotification(
  'form_update',
  'Form I-130 has been updated by USCIS',
  ['i-130']
);

// Notify affected users
await notifyAffectedUsers('i-130', 'Please re-download your I-130 application');
```

## Setup Instructions

### 1. Environment Variables

Add to `.env.local`:

```bash
# Admin email for alerts
ADMIN_EMAIL=admin@docfill.com

# Cron job security (for Vercel deployment)
CRON_SECRET=your-secret-key-here

# Email service (optional - choose one)
RESEND_API_KEY=re_xxxxx
SENDGRID_API_KEY=SG.xxxxx
```

### 2. Initial PDF Download

Download all PDFs for the first time:

```bash
curl -X POST http://localhost:3000/api/admin/check-updates \
  -H "Content-Type: application/json" \
  -d '{"downloadPdfs": true}'
```

Or use the admin dashboard:
1. Go to `/admin/form-versions`
2. Click "Download All PDFs"

### 3. Deploy to Vercel

The cron job will automatically run daily once deployed to Vercel.

```bash
vercel deploy --prod
```

### 4. Configure Email Service (Optional)

To enable email alerts, uncomment the email sending code in:
- `src/lib/uscis/notifications.ts`
- `src/app/api/cron/daily-update/route.ts`

**Example with Resend:**
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: 'alerts@docfill.com',
  to: 'admin@docfill.com',
  subject: 'USCIS Form Update Alert',
  html: emailHtml,
});
```

## Workflow When Form is Updated

1. **Daily Cron Detects Update**
   - Cron job runs at 6 AM UTC
   - Finds I-130 has new edition: `04/01/24` → `07/15/25`
   - Sets `needsFieldRemapping: true`

2. **Admin Receives Alert**
   - Email sent to `ADMIN_EMAIL`
   - In-app banner shown: "Form I-130 has been updated"

3. **Admin Takes Action**
   - Goes to `/admin/form-versions`
   - Sees I-130 flagged with "Needs Remapping"
   - Clicks "Download Updates"

4. **Verification Process**
   - Admin downloads new I-130 PDF
   - Tests the form end-to-end
   - Verifies all PDF field mappings work
   - Updates `needsFieldRemapping: false` in code

5. **User Notification**
   - System notifies users with active I-130 applications
   - Banner: "Form I-130 has been updated by USCIS. Please re-download."

## Manual Testing

### Check for Updates
```bash
curl http://localhost:3000/api/admin/check-updates
```

### Trigger Cron Job Manually
```bash
curl http://localhost:3000/api/cron/daily-update
```

### Test Single Form Version Check
```typescript
import { checkFormVersion } from '@/lib/uscis/version-checker';

const result = await checkFormVersion('i-130');
console.log(result);
```

## Current Form Editions

As of November 26, 2025:

| Form ID | Edition | Expires | Status |
|---------|---------|---------|--------|
| I-130 | 04/01/24 | - | Active |
| I-485 | 01/20/25 | - | Active |
| I-765 | 01/20/25 | - | Active |
| I-131 | 01/20/25 | - | Active |
| I-864 | 10/17/24 | - | Active |
| N-400 | 01/20/25 | - | Active |
| I-751 | 04/01/24 | - | Active |
| I-90 | 01/20/25 | - | Active |
| I-129 | 01/20/25 | - | Active |
| I-140 | 06/07/24 | - | Active |
| I-539 | 08/28/24 | - | Active |
| I-526 | 01/20/25 | - | Active |
| I-924 | 07/23/20 | - | Not Accepting |
| I-821D | 01/20/25 | - | Active |
| I-9 | 01/20/25 | 05/31/2027 | Active |
| I-290B | 05/31/24 | - | Active |
| I-601 | 01/20/25 | - | Active |
| I-601A | 01/20/25 | - | Active |
| I-212 | 01/20/25 | - | Active |

## Troubleshooting

### Cron Job Not Running
- Ensure `vercel.json` is deployed
- Check Vercel dashboard → Project → Cron Jobs
- Verify `CRON_SECRET` is set in environment variables

### PDF Downloads Failing
- Check USCIS website is accessible
- Verify PDF URLs in `form-versions.ts` are correct
- Ensure `public/pdf-templates/` directory exists

### Version Detection Not Working
- USCIS may have changed their HTML structure
- Update regex patterns in `version-checker.ts`
- Check browser DevTools on USCIS page for new element IDs

### Emails Not Sending
- Verify email service API key is set
- Check email service dashboard for errors
- Ensure `ADMIN_EMAIL` is configured

## Future Enhancements

- [ ] Store check results in database for history/analytics
- [ ] Add Slack notifications in addition to email
- [ ] Auto-test PDF field mappings after download
- [ ] Support for form instructions PDFs (not just forms)
- [ ] Webhook integration for real-time alerts
- [ ] Admin dashboard charts showing update frequency
- [ ] Automated rollback if field mappings break

## Support

For issues or questions:
- Check logs in Vercel dashboard
- Review `src/lib/uscis/` for implementation details
- Contact: admin@docfill.com
