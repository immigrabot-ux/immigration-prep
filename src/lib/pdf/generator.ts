import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { I130_FIELD_MAPPINGS, applyFieldMappings } from '@/lib/constants/form-mappings/i130';

export interface GeneratePDFOptions {
    formType: string;
    answers: Record<string, string>;
    applicationId: string;
}

/**
 * Generate a filled PDF form
 * 
 * NOTE: This is a simplified demonstration implementation.
 * In production, you would:
 * 1. Download official USCIS PDF forms
 * 2. Use PDF inspection tools to identify actual field names
 * 3. Map all 100+ fields per form
 * 4. Handle complex field types (checkboxes, radio buttons, etc.)
 */
export async function generateFilledPDF(options: GeneratePDFOptions): Promise<Uint8Array> {
    const { formType, answers } = options;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page
    const page = pdfDoc.addPage([612, 792]); // Letter size
    const { width, height } = page.getSize();

    // Embed font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Title
    page.drawText(`Form ${formType} - Petition for Alien Relative`, {
        x: 50,
        y: height - 50,
        size: 16,
        font: boldFont,
        color: rgb(0, 0, 0),
    });

    page.drawText('DEMONSTRATION FORM - NOT FOR USCIS SUBMISSION', {
        x: 50,
        y: height - 75,
        size: 10,
        font: font,
        color: rgb(0.8, 0, 0),
    });

    // Apply field mappings
    const mappedData = applyFieldMappings(answers, I130_FIELD_MAPPINGS);

    // Draw form fields
    let yPosition = height - 120;
    const lineHeight = 25;

    // Section: Petitioner Information
    page.drawText('PART 1: INFORMATION ABOUT YOU (PETITIONER)', {
        x: 50,
        y: yPosition,
        size: 12,
        font: boldFont,
    });
    yPosition -= lineHeight * 1.5;

    const petitionerFields = [
        { label: 'Last Name:', value: mappedData.petitioner_last_name },
        { label: 'First Name:', value: mappedData.petitioner_first_name },
        { label: 'Middle Name:', value: mappedData.petitioner_middle_name },
        { label: 'Date of Birth:', value: mappedData.petitioner_dob },
        { label: 'Email:', value: mappedData.petitioner_email },
        { label: 'Street Address:', value: mappedData.petitioner_street },
        { label: 'Apt/Unit:', value: mappedData.petitioner_apt },
        { label: 'City:', value: mappedData.petitioner_city },
        { label: 'State:', value: mappedData.petitioner_state },
        { label: 'ZIP Code:', value: mappedData.petitioner_zip },
    ];

    for (const field of petitionerFields) {
        if (yPosition < 100) {
            // Add new page if needed
            const newPage = pdfDoc.addPage([612, 792]);
            yPosition = newPage.getHeight() - 50;
        }

        page.drawText(field.label, {
            x: 50,
            y: yPosition,
            size: 10,
            font: font,
        });

        page.drawText(field.value || 'N/A', {
            x: 200,
            y: yPosition,
            size: 10,
            font: font,
        });

        yPosition -= lineHeight;
    }

    // Section: Beneficiary Information
    yPosition -= lineHeight;
    page.drawText('PART 2: INFORMATION ABOUT YOUR RELATIVE (BENEFICIARY)', {
        x: 50,
        y: yPosition,
        size: 12,
        font: boldFont,
    });
    yPosition -= lineHeight * 1.5;

    const beneficiaryFields = [
        { label: 'Last Name:', value: mappedData.beneficiary_last_name },
        { label: 'First Name:', value: mappedData.beneficiary_first_name },
        { label: 'Middle Name:', value: mappedData.beneficiary_middle_name },
        { label: 'Date of Birth:', value: mappedData.beneficiary_dob },
        { label: 'Country of Birth:', value: mappedData.beneficiary_country_of_birth },
    ];

    for (const field of beneficiaryFields) {
        if (yPosition < 100) {
            break; // Would add new page in production
        }

        page.drawText(field.label, {
            x: 50,
            y: yPosition,
            size: 10,
            font: font,
        });

        page.drawText(field.value || 'N/A', {
            x: 200,
            y: yPosition,
            size: 10,
            font: font,
        });

        yPosition -= lineHeight;
    }

    // Section: Marriage Information
    yPosition -= lineHeight;
    page.drawText('PART 3: MARRIAGE INFORMATION', {
        x: 50,
        y: yPosition,
        size: 12,
        font: boldFont,
    });
    yPosition -= lineHeight * 1.5;

    const marriageFields = [
        { label: 'Date of Marriage:', value: mappedData.marriage_date },
        { label: 'Place of Marriage:', value: mappedData.marriage_place },
        { label: 'Previous Marriages:', value: mappedData.previous_marriages },
    ];

    for (const field of marriageFields) {
        if (yPosition < 100) {
            break;
        }

        page.drawText(field.label, {
            x: 50,
            y: yPosition,
            size: 10,
            font: font,
        });

        page.drawText(field.value || 'N/A', {
            x: 200,
            y: yPosition,
            size: 10,
            font: font,
        });

        yPosition -= lineHeight;
    }

    // Footer
    page.drawText('Generated by ImmigrationPrep - Self-Service Form Preparation', {
        x: 50,
        y: 30,
        size: 8,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
    });

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

/**
 * Generate instructions document
 */
export async function generateInstructions(formType: string): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let yPosition = height - 50;
    const lineHeight = 20;

    // Title
    page.drawText(`Instructions for Form ${formType}`, {
        x: 50,
        y: yPosition,
        size: 18,
        font: boldFont,
    });
    yPosition -= lineHeight * 2;

    // Instructions
    const instructions = [
        'NEXT STEPS:',
        '',
        '1. Review your completed form carefully',
        '2. Print the form on standard letter-size paper',
        '3. Sign and date where indicated',
        '4. Gather required supporting documents (see checklist)',
        '5. Make copies of everything for your records',
        '6. Mail to the appropriate USCIS address',
        '',
        'IMPORTANT REMINDERS:',
        '',
        '• Use black ink when signing',
        '• Do not staple documents',
        '• Include filing fee (check USCIS.gov for current amount)',
        '• Keep copies of everything you submit',
        '• Track your package with delivery confirmation',
        '',
        'DISCLAIMER:',
        '',
        'ImmigrationPrep is a self-help software tool. We are NOT a law firm',
        'and do NOT provide legal advice. You are preparing your own forms.',
        'For legal advice specific to your situation, consult with a licensed',
        'immigration attorney.',
    ];

    for (const line of instructions) {
        page.drawText(line, {
            x: 50,
            y: yPosition,
            size: 11,
            font: line.includes(':') ? boldFont : font,
        });
        yPosition -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

/**
 * Generate checklist document
 */
export async function generateChecklist(formType: string): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let yPosition = height - 50;
    const lineHeight = 25;

    // Title
    page.drawText(`Document Checklist for Form ${formType}`, {
        x: 50,
        y: yPosition,
        size: 18,
        font: boldFont,
    });
    yPosition -= lineHeight * 2;

    // Checklist items
    const items = [
        '☐ Completed and signed Form I-130',
        '☐ Filing fee (check or money order)',
        '☐ Proof of petitioner\'s U.S. citizenship',
        '☐ Marriage certificate',
        '☐ Passport-style photos (2 for petitioner, 2 for beneficiary)',
        '☐ Proof of legal name change (if applicable)',
        '☐ Evidence of bona fide marriage',
        '☐ Divorce decrees (if previously married)',
    ];

    for (const item of items) {
        page.drawText(item, {
            x: 50,
            y: yPosition,
            size: 12,
            font: font,
        });
        yPosition -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
