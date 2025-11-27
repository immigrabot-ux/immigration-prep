import { PDFDocument, PDFForm, PDFTextField, PDFCheckBox, PDFDropdown, rgb, StandardFonts } from 'pdf-lib';
import { FormDefinition, FieldMapping } from '@/lib/constants/forms-registry';
import {
  flattenAnswers,
  getNestedValue,
  applyTransform,
  formatFullName,
  formatAddress,
  splitTextForPDF,
} from './helpers';

/**
 * Generates a filled PDF form based on the form definition and user answers
 */
export async function generatePDF(
  formDefinition: FormDefinition,
  answers: Record<string, any>
): Promise<Uint8Array> {
  // Flatten nested answers for easier access
  const flatAnswers = flattenAnswers(answers);

  // Check if we have a PDF template
  if (formDefinition.pdfTemplate) {
    // Load and fill existing PDF template
    return await fillPDFTemplate(formDefinition, answers, flatAnswers);
  } else {
    // Generate a simple PDF listing all answers (MVP fallback)
    return await generateSimplePDF(formDefinition, answers);
  }
}

/**
 * Fills an existing PDF template with user answers
 */
async function fillPDFTemplate(
  formDefinition: FormDefinition,
  answers: Record<string, any>,
  flatAnswers: Record<string, any>
): Promise<Uint8Array> {
  try {
    // Load the PDF template
    const templateUrl = formDefinition.pdfTemplate!;
    const templateBytes = await fetch(templateUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    // Get field mappings
    const fieldMappings = formDefinition.fieldMapping || {};

    // Fill each mapped field
    for (const [pdfFieldName, mapping] of Object.entries(fieldMappings)) {
      try {
        const value = getFieldValue(mapping, answers, flatAnswers);
        const formattedValue = applyTransform(value, mapping.transform);

        // Get the form field
        const field = form.getField(pdfFieldName);

        // Fill based on field type
        if (field instanceof PDFTextField) {
          field.setText(formattedValue);
        } else if (field instanceof PDFCheckBox) {
          if (formattedValue === 'X' || formattedValue === 'true' || formattedValue === 'Yes') {
            field.check();
          } else {
            field.uncheck();
          }
        } else if (field instanceof PDFDropdown) {
          field.select(formattedValue);
        }
      } catch (fieldError) {
        console.warn(`Error filling field ${pdfFieldName}:`, fieldError);
        // Continue filling other fields even if one fails
      }
    }

    // Flatten the form to make it read-only (optional)
    // form.flatten();

    // Save and return the PDF
    return await pdfDoc.save();
  } catch (error) {
    console.error('Error filling PDF template:', error);
    // Fallback to simple PDF if template filling fails
    return await generateSimplePDF(formDefinition, answers);
  }
}

/**
 * Gets the value for a field based on its mapping
 */
function getFieldValue(
  mapping: FieldMapping,
  answers: Record<string, any>,
  flatAnswers: Record<string, any>
): any {
  // If questionId is provided, use it to get the value
  if (mapping.questionId) {
    // Check if it's a nested path (contains dot)
    if (mapping.questionId.includes('.')) {
      return getNestedValue(answers, mapping.questionId);
    }
    // Otherwise, try flat answers first, then original answers
    return flatAnswers[mapping.questionId] ?? answers[mapping.questionId];
  }

  // If value is a function, call it with answers
  if (typeof mapping.value === 'function') {
    return mapping.value(answers);
  }

  // If value is a static string, return it
  if (mapping.value !== undefined) {
    return mapping.value;
  }

  return '';
}

/**
 * Generates a simple PDF listing all answers (MVP fallback)
 */
async function generateSimplePDF(
  formDefinition: FormDefinition,
  answers: Record<string, any>
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([612, 792]); // Letter size
  const { width, height } = page.getSize();
  let yPosition = height - 50;

  const fontSize = 10;
  const titleFontSize = 16;
  const sectionFontSize = 12;
  const lineHeight = 15;
  const margin = 50;
  const maxWidth = width - 2 * margin;

  // Helper to add new page if needed
  const checkAndAddPage = () => {
    if (yPosition < 50) {
      page = pdfDoc.addPage([612, 792]);
      yPosition = height - 50;
    }
  };

  // Title
  page.drawText(formDefinition.title, {
    x: margin,
    y: yPosition,
    size: titleFontSize,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  yPosition -= titleFontSize + 10;

  // Date generated
  const today = new Date().toLocaleDateString('en-US');
  page.drawText(`Generated: ${today}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });
  yPosition -= lineHeight + 10;

  // Divider line
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: width - margin, y: yPosition },
    thickness: 1,
    color: rgb(0.7, 0.7, 0.7),
  });
  yPosition -= 20;

  // Iterate through sections and questions
  for (const section of formDefinition.sections) {
    checkAndAddPage();

    // Section title
    page.drawText(section.title, {
      x: margin,
      y: yPosition,
      size: sectionFontSize,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= sectionFontSize + 5;

    // Section divider
    page.drawLine({
      start: { x: margin, y: yPosition },
      end: { x: width - margin, y: yPosition },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });
    yPosition -= 15;

    // Questions and answers
    for (const question of section.questions) {
      const answer = answers[question.id];

      // Skip if no answer provided
      if (answer === undefined || answer === null || answer === '') {
        continue;
      }

      checkAndAddPage();

      // Question label
      const questionLines = splitTextForPDF(question.label, 80);
      for (const line of questionLines) {
        checkAndAddPage();
        page.drawText(line, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: boldFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
      }

      // Format answer based on type
      let formattedAnswer = '';
      if (typeof answer === 'boolean') {
        formattedAnswer = answer ? 'Yes' : 'No';
      } else if (question.type === 'name' && typeof answer === 'object') {
        formattedAnswer = formatFullName(answer);
      } else if (question.type === 'address' && typeof answer === 'object') {
        formattedAnswer = formatAddress(answer);
      } else if (typeof answer === 'object') {
        formattedAnswer = JSON.stringify(answer, null, 2);
      } else {
        formattedAnswer = String(answer);
      }

      // Answer text
      const answerLines = splitTextForPDF(formattedAnswer, 90);
      for (const line of answerLines) {
        checkAndAddPage();
        page.drawText(line, {
          x: margin + 10,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });
        yPosition -= lineHeight;
      }

      yPosition -= 5; // Extra spacing between questions
    }

    yPosition -= 10; // Extra spacing between sections
  }

  // Save and return
  return await pdfDoc.save();
}

/**
 * Helper to download a PDF in the browser
 */
export function downloadPDF(pdfBytes: Uint8Array, filename: string) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
