#!/usr/bin/env tsx

/**
 * List PDF Fields Script
 *
 * This script extracts and lists all fillable form field names from a PDF.
 * Useful for mapping questionnaire answers to PDF fields.
 *
 * Usage:
 *   npx tsx src/scripts/list-pdf-fields.ts <path-to-pdf>
 *   npx tsx src/scripts/list-pdf-fields.ts public/pdf-templates/i-130.pdf
 *   npx tsx src/scripts/list-pdf-fields.ts public/pdf-templates/i-130.pdf --json
 */

import { PDFDocument } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

interface FieldInfo {
  name: string;
  type: string;
  value?: string;
  options?: string[];
}

async function listPdfFields(pdfPath: string, outputJson = false): Promise<void> {
  try {
    // Read the PDF file
    const pdfBytes = readFileSync(pdfPath);

    // Load the PDF (ignore encryption for reading field names)
    const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

    // Get the form
    const form = pdfDoc.getForm();

    // Get all fields
    const fields = form.getFields();

    console.log(`\n📄 PDF: ${pdfPath}`);
    console.log(`📊 Total Fields: ${fields.length}\n`);

    // Collect field information
    const fieldInfos: FieldInfo[] = [];

    for (const field of fields) {
      const fieldName = field.getName();
      const fieldType = field.constructor.name;

      const fieldInfo: FieldInfo = {
        name: fieldName,
        type: fieldType,
      };

      // Get field-specific information
      try {
        // Text fields
        if (fieldType === 'PDFTextField') {
          const textField = form.getTextField(fieldName);
          fieldInfo.value = textField.getText() || '';
        }

        // Checkboxes
        if (fieldType === 'PDFCheckBox') {
          const checkbox = form.getCheckBox(fieldName);
          fieldInfo.value = checkbox.isChecked() ? 'checked' : 'unchecked';
        }

        // Radio groups
        if (fieldType === 'PDFRadioGroup') {
          const radioGroup = form.getRadioGroup(fieldName);
          const options = radioGroup.getOptions();
          fieldInfo.options = options;
          fieldInfo.value = radioGroup.getSelected() || '';
        }

        // Dropdowns
        if (fieldType === 'PDFDropdown') {
          const dropdown = form.getDropdown(fieldName);
          const options = dropdown.getOptions();
          fieldInfo.options = options;
          fieldInfo.value = dropdown.getSelected() ? dropdown.getSelected()[0] : '';
        }
      } catch (error) {
        // Some fields might not support certain operations
      }

      fieldInfos.push(fieldInfo);
    }

    // Output as JSON if requested
    if (outputJson) {
      const jsonOutput = {
        pdfPath,
        totalFields: fields.length,
        fields: fieldInfos,
      };

      const outputPath = pdfPath.replace('.pdf', '_fields.json');
      writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));
      console.log(`✅ Field list saved to: ${outputPath}\n`);
      return;
    }

    // Output to console in readable format
    console.log('Fields by Type:\n');

    // Group by type
    const fieldsByType: Record<string, FieldInfo[]> = {};
    for (const field of fieldInfos) {
      if (!fieldsByType[field.type]) {
        fieldsByType[field.type] = [];
      }
      fieldsByType[field.type].push(field);
    }

    // Display grouped fields
    for (const [type, typeFields] of Object.entries(fieldsByType)) {
      console.log(`\n${type} (${typeFields.length}):`);
      console.log('─'.repeat(80));

      for (const field of typeFields) {
        console.log(`  ${field.name}`);

        if (field.value) {
          console.log(`    Current Value: ${field.value}`);
        }

        if (field.options && field.options.length > 0) {
          console.log(`    Options: ${field.options.join(', ')}`);
        }
      }
    }

    // Generate mapping template
    console.log('\n\n📝 TypeScript Mapping Template:\n');
    console.log('pdfFieldMappings: [');

    const textFields = fieldInfos.filter((f) => f.type === 'PDFTextField');
    for (let i = 0; i < Math.min(10, textFields.length); i++) {
      const field = textFields[i];
      console.log(`  { questionId: 'your_question_id', pdfField: '${field.name}' },`);
    }

    if (textFields.length > 10) {
      console.log(`  // ... ${textFields.length - 10} more text fields`);
    }

    console.log('],\n');
  } catch (error) {
    console.error('❌ Error reading PDF:', error);
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage: npx tsx src/scripts/list-pdf-fields.ts <path-to-pdf> [--json]

Examples:
  npx tsx src/scripts/list-pdf-fields.ts public/pdf-templates/i-130.pdf
  npx tsx src/scripts/list-pdf-fields.ts public/pdf-templates/i-130.pdf --json

Options:
  --json    Save output to JSON file instead of console
  `);
  process.exit(1);
}

const pdfPath = resolve(args[0]);
const outputJson = args.includes('--json');

listPdfFields(pdfPath, outputJson);
