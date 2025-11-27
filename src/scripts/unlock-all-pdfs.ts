#!/usr/bin/env tsx

/**
 * Unlock All PDFs Script
 *
 * Removes encryption/restrictions from all PDF files in the pdf-templates directory.
 * Creates unlocked versions that can be used for field mapping and PDF generation.
 *
 * Usage:
 *   npx tsx src/scripts/unlock-all-pdfs.ts
 *   npx tsx src/scripts/unlock-all-pdfs.ts --overwrite
 */

import { execSync } from 'child_process';
import { readdirSync, existsSync, renameSync } from 'fs';
import { join, basename, extname } from 'path';

async function unlockAllPDFs(overwrite: boolean = false): Promise<void> {
  const pdfDir = join(process.cwd(), 'public', 'pdf-templates');

  // Check if directory exists
  if (!existsSync(pdfDir)) {
    console.error(`❌ Error: Directory not found: ${pdfDir}`);
    process.exit(1);
  }

  // Check if qpdf is installed
  try {
    execSync('which qpdf', { stdio: 'ignore' });
  } catch (error) {
    console.error(`❌ Error: qpdf is not installed`);
    console.log(`\nInstall qpdf:`);
    console.log(`  Mac:     brew install qpdf`);
    console.log(`  Ubuntu:  sudo apt-get install qpdf`);
    console.log(`  Windows: choco install qpdf`);
    process.exit(1);
  }

  // Get all PDF files
  const files = readdirSync(pdfDir).filter((file) => file.endsWith('.pdf'));

  if (files.length === 0) {
    console.log(`⚠️  No PDF files found in ${pdfDir}`);
    return;
  }

  console.log(`\n🔓 Unlocking ${files.length} PDF file(s)...`);
  console.log(`   Directory: ${pdfDir}\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const file of files) {
    // Skip already unlocked files
    if (file.includes('-unlocked')) {
      skipCount++;
      continue;
    }

    // Skip field list JSON files
    if (file.includes('_fields.json')) {
      skipCount++;
      continue;
    }

    const inputPath = join(pdfDir, file);
    const baseName = basename(file, extname(file));
    const outputPath = join(pdfDir, `${baseName}-unlocked.pdf`);
    const tempPath = join(pdfDir, `${baseName}-temp.pdf`);

    try {
      console.log(`Processing: ${file}`);

      // Unlock the PDF
      const command = `qpdf --decrypt "${inputPath}" "${tempPath}"`;
      execSync(command, { stdio: 'pipe' });

      if (overwrite) {
        // Overwrite original file
        renameSync(tempPath, inputPath);
        console.log(`  ✅ Unlocked and replaced original`);
      } else {
        // Save as separate unlocked file
        renameSync(tempPath, outputPath);
        console.log(`  ✅ Saved to: ${baseName}-unlocked.pdf`);
      }

      successCount++;
    } catch (error) {
      console.error(`  ❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      errorCount++;

      // Clean up temp file if it exists
      if (existsSync(tempPath)) {
        try {
          execSync(`rm "${tempPath}"`);
        } catch (cleanupError) {
          // Ignore cleanup errors
        }
      }
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Summary:`);
  console.log(`  ✅ Successfully unlocked: ${successCount}`);
  console.log(`  ⏭️  Skipped: ${skipCount}`);
  console.log(`  ❌ Failed: ${errorCount}`);
  console.log(`${'='.repeat(60)}\n`);

  if (overwrite) {
    console.log(`Original PDFs have been replaced with unlocked versions.`);
  } else {
    console.log(`Unlocked PDFs saved with '-unlocked.pdf' suffix.`);
  }

  console.log(`\nNext steps:`);
  console.log(`  1. Run list-pdf-fields.ts on unlocked PDFs`);
  console.log(`  2. Create field mappings`);
  console.log(`  3. Implement fillable PDF generation\n`);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const overwrite = args.includes('--overwrite');

  if (overwrite) {
    console.log(`\n⚠️  WARNING: This will OVERWRITE original PDF files!`);
    console.log(`Original files will be replaced with unlocked versions.`);
    console.log(`Press Ctrl+C to cancel, or wait 3 seconds to continue...\n`);

    // Give user time to cancel
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  unlockAllPDFs(overwrite);
}

main();
