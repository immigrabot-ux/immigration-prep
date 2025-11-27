#!/usr/bin/env tsx

/**
 * Unlock PDF Script
 *
 * Removes encryption/restrictions from a PDF file using qpdf.
 * This allows us to access and fill form fields in protected USCIS PDFs.
 *
 * Usage:
 *   npx tsx src/scripts/unlock-pdf.ts <input.pdf> <output.pdf>
 *   npx tsx src/scripts/unlock-pdf.ts public/pdf-templates/i-130.pdf public/pdf-templates/i-130-unlocked.pdf
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';

async function unlockPDF(inputPath: string, outputPath: string): Promise<void> {
  // Resolve paths
  const input = resolve(inputPath);
  const output = resolve(outputPath);

  // Check if input file exists
  if (!existsSync(input)) {
    console.error(`❌ Error: Input file not found: ${input}`);
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

  try {
    console.log(`\n🔓 Unlocking PDF...`);
    console.log(`   Input:  ${input}`);
    console.log(`   Output: ${output}`);

    // Run qpdf to decrypt the PDF
    const command = `qpdf --decrypt "${input}" "${output}"`;

    execSync(command, { stdio: 'inherit' });

    console.log(`\n✅ PDF unlocked successfully!`);
    console.log(`   Saved to: ${output}\n`);
  } catch (error) {
    console.error(`\n❌ Error unlocking PDF:`, error);
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
Usage: npx tsx src/scripts/unlock-pdf.ts <input.pdf> <output.pdf>

Examples:
  npx tsx src/scripts/unlock-pdf.ts public/pdf-templates/i-130.pdf public/pdf-templates/i-130-unlocked.pdf
  npx tsx src/scripts/unlock-pdf.ts i-130.pdf i-130-unlocked.pdf

This script removes encryption/restrictions from PDF files using qpdf,
allowing access to fillable form fields in protected USCIS PDFs.
  `);
  process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1];

unlockPDF(inputPath, outputPath);
