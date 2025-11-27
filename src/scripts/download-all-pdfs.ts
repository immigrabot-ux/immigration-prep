#!/usr/bin/env tsx

/**
 * Download All USCIS PDFs
 *
 * Downloads all USCIS form PDFs from the URLs in form-versions.ts
 *
 * Usage:
 *   npx tsx src/scripts/download-all-pdfs.ts
 */

import { FORM_VERSIONS } from '@/lib/uscis/form-versions';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

async function downloadPDF(url: string, outputPath: string): Promise<boolean> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`  ❌ HTTP ${response.status}: ${response.statusText}`);
      return false;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    writeFileSync(outputPath, buffer);
    return true;
  } catch (error) {
    console.error(`  ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

async function downloadAllPDFs() {
  console.log('\n📥 Downloading all USCIS PDFs...\n');

  const templatesDir = join(process.cwd(), 'public', 'pdf-templates');

  // Ensure directory exists
  if (!existsSync(templatesDir)) {
    mkdirSync(templatesDir, { recursive: true });
  }

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  const forms = Object.entries(FORM_VERSIONS);
  console.log(`Found ${forms.length} forms to download\n`);

  for (const [formId, formInfo] of forms) {
    const outputPath = join(templatesDir, `${formId}.pdf`);

    // Skip if already exists
    if (existsSync(outputPath)) {
      console.log(`⏭️  ${formId.toUpperCase()}: Already exists`);
      skipCount++;
      continue;
    }

    console.log(`📄 ${formId.toUpperCase()}: Downloading from ${formInfo.pdfUrl}`);

    const success = await downloadPDF(formInfo.pdfUrl, outputPath);

    if (success) {
      console.log(`  ✅ Saved to: ${formId}.pdf\n`);
      successCount++;
    } else {
      failCount++;
      console.log();
    }

    // Add a small delay to be nice to USCIS servers
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Summary:`);
  console.log(`  ✅ Downloaded: ${successCount}`);
  console.log(`  ⏭️  Skipped (already exist): ${skipCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`${'='.repeat(60)}\n`);

  if (successCount > 0) {
    console.log(`Next steps:`);
    console.log(`  1. Unlock PDFs: npx tsx src/scripts/unlock-all-pdfs.ts`);
    console.log(`  2. Extract fields: npx tsx src/scripts/list-pdf-fields.ts <pdf> --json`);
    console.log(`  3. Auto-map fields: npx tsx src/scripts/auto-map-fields.ts <formId> <fields.json>\n`);
  }
}

downloadAllPDFs();
