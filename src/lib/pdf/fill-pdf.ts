// @ts-nocheck - PDF lib type issues
/**
 * PDF Fill Service
 *
 * Fills USCIS PDF forms with user answers using field mappings.
 */

import { PDFDocument } from 'pdf-lib';
import { readFileSync } from 'fs';
import { join } from 'path';
import { I_130_AUTO_MAPPINGS, type FieldMapping } from '@/lib/constants/form-mappings/i-130-auto-mappings';
import { I_485_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-485-auto-mappings';
import { I_765_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-765-auto-mappings';
import { I_131_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-131-auto-mappings';
import { I_864_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-864-auto-mappings';
import { N_400_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/n-400-auto-mappings';
import { I_751_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-751-auto-mappings';
import { I_90_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-90-auto-mappings';
import { I_129_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-129-auto-mappings';
import { I_140_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-140-auto-mappings';
import { I_539_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-539-auto-mappings';
import { I_9_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-9-auto-mappings';
import { I_526_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-526-auto-mappings';
import { I_821D_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-821d-auto-mappings';
import { I_212_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-212-auto-mappings';
import { I_290B_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-290b-auto-mappings';
import { I_601_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-601-auto-mappings';
import { I_601A_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-601a-auto-mappings';
import { I_129F_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-129f-auto-mappings';
import { I_360_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-360-auto-mappings';
import { I_600_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-600-auto-mappings';
import { I_589_AUTO_MAPPINGS } from '@/lib/constants/form-mappings/i-589-auto-mappings';

/**
 * Get field mappings for a specific form
 */
function getFormMappings(formId: string): FieldMapping[] {
  switch (formId.toLowerCase()) {
    case 'i-130':
      return I_130_AUTO_MAPPINGS;
    case 'i-485':
      return I_485_AUTO_MAPPINGS;
    case 'i-765':
      return I_765_AUTO_MAPPINGS;
    case 'i-131':
      return I_131_AUTO_MAPPINGS;
    case 'i-864':
      return I_864_AUTO_MAPPINGS;
    case 'n-400':
      return N_400_AUTO_MAPPINGS;
    case 'i-751':
      return I_751_AUTO_MAPPINGS;
    case 'i-90':
      return I_90_AUTO_MAPPINGS;
    case 'i-129':
      return I_129_AUTO_MAPPINGS;
    case 'i-140':
      return I_140_AUTO_MAPPINGS;
    case 'i-539':
      return I_539_AUTO_MAPPINGS;
    case 'i-9':
      return I_9_AUTO_MAPPINGS;
    case 'i-526':
      return I_526_AUTO_MAPPINGS;
    case 'i-821d':
      return I_821D_AUTO_MAPPINGS;
    case 'i-212':
      return I_212_AUTO_MAPPINGS;
    case 'i-290b':
      return I_290B_AUTO_MAPPINGS;
    case 'i-601':
      return I_601_AUTO_MAPPINGS;
    case 'i-601a':
      return I_601A_AUTO_MAPPINGS;
    case 'i-129f':
      return I_129F_AUTO_MAPPINGS;
    case 'i-360':
      return I_360_AUTO_MAPPINGS;
    case 'i-600':
      return I_600_AUTO_MAPPINGS;
    case 'i-589':
      return I_589_AUTO_MAPPINGS;
    default:
      throw new Error(`No mappings available for form: ${formId}`);
  }
}

/**
 * Get PDF template path for a form
 */
function getTemplatePath(formId: string): string {
  const templatesDir = join(process.cwd(), 'public', 'pdf-templates');
  return join(templatesDir, `${formId.toLowerCase()}-unlocked.pdf`);
}

/**
 * Format date for PDF (MM/DD/YYYY)
 */
function formatDate(dateValue: any): string {
  if (!dateValue) return '';

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return String(dateValue);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  } catch (error) {
    return String(dateValue);
  }
}

/**
 * Format SSN for PDF (remove dashes)
 */
function formatSSN(ssn: any): string {
  if (!ssn) return '';
  return String(ssn).replace(/\D/g, ''); // Remove all non-digit characters
}

/**
 * Format Alien Number for PDF (remove 'A' prefix and dashes)
 */
function formatAlienNumber(alienNumber: any): string {
  if (!alienNumber) return '';
  return String(alienNumber).replace(/[^0-9]/g, ''); // Remove all non-digit characters
}

/**
 * Fill a PDF form with user answers
 */
export async function fillPDF(
  formId: string,
  answers: Record<string, any>
): Promise<Uint8Array> {
  // Get template path
  const templatePath = getTemplatePath(formId);

  // Load PDF
  const pdfBytes = readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  // Get field mappings
  const mappings = getFormMappings(formId);

  // Track filled fields for debugging
  const filledFields: string[] = [];
  const failedFields: Array<{ field: string; error: string }> = [];

  // Fill each field
  for (const mapping of mappings) {
    try {
      const value = answers[mapping.questionId];

      // Skip if no value provided
      if (value === undefined || value === null || value === '') {
        continue;
      }

      // Handle different field types
      if (mapping.type === 'checkbox') {
        // Checkbox field
        const checkbox = form.getCheckBox(mapping.pdfField);

        // Check if this is a conditional checkbox (e.g., relationship type)
        if (mapping.value) {
          // Only check if the answer matches the mapping's value
          if (value === mapping.value || value === mapping.value.toLowerCase()) {
            checkbox.check();
            filledFields.push(`${mapping.pdfField} = checked`);
          }
        } else {
          // Simple boolean checkbox
          if (value === true || value === 'yes' || value === 'Yes') {
            checkbox.check();
            filledFields.push(`${mapping.pdfField} = checked`);
          } else {
            checkbox.uncheck();
            filledFields.push(`${mapping.pdfField} = unchecked`);
          }
        }
      } else {
        // Try to get the field and determine its type
        try {
          // Try as dropdown first
          const field = form.getField(mapping.pdfField);
          const fieldType = field.constructor.name;

          if (fieldType === 'PDFDropdown') {
            const dropdown = form.getDropdown(mapping.pdfField);
            dropdown.select(String(value));
            filledFields.push(`${mapping.pdfField} = "${value}" (dropdown)`);
          } else {
            // Text field
            const textField = form.getTextField(mapping.pdfField);

            // Format value based on question ID
            let formattedValue: string;
            if (mapping.questionId.includes('ssn') || mapping.questionId.includes('SSN')) {
              formattedValue = formatSSN(value);
            } else if (mapping.questionId.includes('alienNumber') || mapping.questionId.includes('AlienNumber')) {
              formattedValue = formatAlienNumber(value);
            } else if (mapping.questionId.includes('date') || mapping.questionId.includes('Date')) {
              formattedValue = formatDate(value);
            } else {
              formattedValue = String(value);
            }

            textField.setText(formattedValue);
            filledFields.push(`${mapping.pdfField} = "${formattedValue}"`);
          }
        } catch (fieldError) {
          // If getting the field fails, try as text field
          const textField = form.getTextField(mapping.pdfField);

          // Format value based on question ID
          let formattedValue: string;
          if (mapping.questionId.includes('ssn') || mapping.questionId.includes('SSN')) {
            formattedValue = formatSSN(value);
          } else if (mapping.questionId.includes('alienNumber') || mapping.questionId.includes('AlienNumber')) {
            formattedValue = formatAlienNumber(value);
          } else if (mapping.questionId.includes('date') || mapping.questionId.includes('Date')) {
            formattedValue = formatDate(value);
          } else {
            formattedValue = String(value);
          }

          textField.setText(formattedValue);
          filledFields.push(`${mapping.pdfField} = "${formattedValue}"`);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      failedFields.push({ field: mapping.pdfField, error: errorMessage });
      console.warn(`Failed to fill field ${mapping.pdfField}:`, errorMessage);
    }
  }

  // Log summary
  console.log(`\n📄 PDF Fill Summary for ${formId.toUpperCase()}:`);
  console.log(`   ✅ Filled: ${filledFields.length} fields`);
  console.log(`   ❌ Failed: ${failedFields.length} fields`);

  if (failedFields.length > 0) {
    console.log(`\n   Failed fields:`);
    failedFields.forEach(({ field, error }) => {
      console.log(`   - ${field}: ${error}`);
    });
  }

  // Save and return filled PDF
  // Note: Some forms have rich text fields that pdf-lib doesn't support
  // We need to save without updating appearances for those forms
  try {
    const filledPdfBytes = await pdfDoc.save();
    return filledPdfBytes;
  } catch (error) {
    // If save fails due to rich text fields, try without updating field appearances
    if (error instanceof Error && error.message.includes('rich text')) {
      console.warn('⚠️  PDF contains rich text fields. Saving without appearance updates.');
      const filledPdfBytes = await pdfDoc.save({ updateFieldAppearances: false });
      return filledPdfBytes;
    }
    throw error;
  }
}

/**
 * Fill PDF and return as a blob (for browser download)
 */
export async function fillPDFAndDownload(
  formId: string,
  answers: Record<string, any>,
  filename?: string
): Promise<void> {
  const pdfBytes = await fillPDF(formId, answers);

  // Create blob and download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${formId.toUpperCase()}-filled.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
