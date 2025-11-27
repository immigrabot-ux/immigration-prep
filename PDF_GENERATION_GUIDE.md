# PDF Generation Guide

## Overview

USCIS PDFs are **encrypted/protected** but contain **450+ fillable form fields**. We can unlock them, extract field names, map them to our questionnaire, and generate filled PDFs.

## The Problem

USCIS PDFs are protected with encryption that prevents:
- Viewing form field names
- Filling form fields programmatically
- Extracting field metadata

## The Solution

Use `qpdf` to remove encryption, then `pdf-lib` to fill the fields.

---

## Step 1: Install qpdf

qpdf is a command-line tool for PDF manipulation.

```bash
# Mac
brew install qpdf

# Ubuntu
sudo apt-get install qpdf

# Windows
choco install qpdf
```

---

## Step 2: Unlock PDFs

### Unlock Single PDF

```bash
npx tsx src/scripts/unlock-pdf.ts <input.pdf> <output.pdf>

# Example
npx tsx src/scripts/unlock-pdf.ts public/pdf-templates/i-130.pdf public/pdf-templates/i-130-unlocked.pdf
```

### Unlock All PDFs

```bash
# Creates [name]-unlocked.pdf for each PDF
npx tsx src/scripts/unlock-all-pdfs.ts

# Overwrites original files (use with caution)
npx tsx src/scripts/unlock-all-pdfs.ts --overwrite
```

---

## Step 3: List PDF Fields

Once unlocked, extract all fillable field names:

```bash
# Output to console
npx tsx src/scripts/list-pdf-fields.ts public/pdf-templates/i-130-unlocked.pdf

# Save to JSON file
npx tsx src/scripts/list-pdf-fields.ts public/pdf-templates/i-130-unlocked.pdf --json
```

**Output:**
- Total fields: **450**
- JSON file: `i-130-unlocked_fields.json`

---

## Step 4: Understand Field Naming

### I-130 Field Naming Pattern

```
form1[0].#subform[0].Pt2Line4a_FamilyName[0]
├─ form1[0] ─────────────── Form container
├─ #subform[0] ──────────── Page/section
├─ Pt2Line4a_FamilyName ─── Descriptive field name
└─ [0] ──────────────────── Array index
```

### Common Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `Pt1Line*` | Part 1 fields (Relationship) | `Pt1Line1_Spouse` |
| `Pt2Line*` | Part 2 fields (Beneficiary) | `Pt2Line4a_FamilyName` |
| `Pt3Line*` | Part 3 fields (Petitioner) | `Pt3Line1a_FamilyName` |
| `*_FamilyName` | Last name | `Pt2Line4a_FamilyName` |
| `*_GivenName` | First name | `Pt2Line4b_GivenName` |
| `*_MiddleName` | Middle name | `Pt2Line4c_MiddleName` |
| `*_DateofBirth` | Date of birth | `Pt2Line8_DateofBirth` |
| `*_Male` / `*_Female` | Gender checkboxes | `Pt2Line9_Male` |
| `*_Yes` / `*_No` | Yes/No checkboxes | `Pt2Line11_Yes` |
| `*_StreetNumberName` | Street address | `Pt2Line10_StreetNumberName` |
| `*_CityOrTown` | City | `Pt2Line10_CityOrTown` |
| `*_State` | State | `Pt2Line10_State` |
| `*_ZipCode` | ZIP code | `Pt2Line10_ZipCode` |

---

## Step 5: Create Field Mappings

Map questionnaire IDs to PDF field names.

### Example Mapping

```typescript
// src/lib/constants/form-mappings/i130.ts

export const I130_FIELD_MAPPINGS = [
  // Part 2: Beneficiary Information
  { questionId: 'beneficiary_last_name', pdfField: 'form1[0].#subform[0].Pt2Line4a_FamilyName[0]' },
  { questionId: 'beneficiary_first_name', pdfField: 'form1[0].#subform[0].Pt2Line4b_GivenName[0]' },
  { questionId: 'beneficiary_middle_name', pdfField: 'form1[0].#subform[0].Pt2Line4c_MiddleName[0]' },
  { questionId: 'beneficiary_dob', pdfField: 'form1[0].#subform[1].Pt2Line8_DateofBirth[0]' },
  { questionId: 'beneficiary_country_of_birth', pdfField: 'form1[0].#subform[1].Pt2Line7_CountryofBirth[0]' },

  // Beneficiary Address
  { questionId: 'beneficiary_street', pdfField: 'form1[0].#subform[1].Pt2Line10_StreetNumberName[0]' },
  { questionId: 'beneficiary_apt', pdfField: 'form1[0].#subform[1].Pt2Line10_AptSteFlrNumber[0]' },
  { questionId: 'beneficiary_city', pdfField: 'form1[0].#subform[1].Pt2Line10_CityOrTown[0]' },
  { questionId: 'beneficiary_state', pdfField: 'form1[0].#subform[1].Pt2Line10_State[0]' },
  { questionId: 'beneficiary_zip', pdfField: 'form1[0].#subform[1].Pt2Line10_ZipCode[0]' },

  // Relationship
  { questionId: 'relationship_spouse', pdfField: 'form1[0].#subform[0].Pt1Line1_Spouse[0]', type: 'checkbox' },
  { questionId: 'relationship_parent', pdfField: 'form1[0].#subform[0].Pt1Line1_Parent[0]', type: 'checkbox' },
  { questionId: 'relationship_child', pdfField: 'form1[0].#subform[0].Pt1Line1_Child[0]', type: 'checkbox' },
  { questionId: 'relationship_sibling', pdfField: 'form1[0].#subform[0].Pt1Line1_Siblings[0]', type: 'checkbox' },

  // Gender (radio buttons)
  { questionId: 'beneficiary_gender', pdfField: 'form1[0].#subform[1].Pt2Line9_Male[0]', value: 'male', type: 'checkbox' },
  { questionId: 'beneficiary_gender', pdfField: 'form1[0].#subform[1].Pt2Line9_Female[0]', value: 'female', type: 'checkbox' },

  // ... more mappings
];
```

---

## Step 6: Fill PDF Fields

### Using pdf-lib

```typescript
import { PDFDocument } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';

async function fillI130PDF(answers: Record<string, any>) {
  // Load unlocked PDF
  const pdfBytes = readFileSync('public/pdf-templates/i-130-unlocked.pdf');
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Get the form
  const form = pdfDoc.getForm();

  // Fill text fields
  const lastNameField = form.getTextField('form1[0].#subform[0].Pt2Line4a_FamilyName[0]');
  lastNameField.setText(answers.beneficiary_last_name || '');

  const firstNameField = form.getTextField('form1[0].#subform[0].Pt2Line4b_GivenName[0]');
  firstNameField.setText(answers.beneficiary_first_name || '');

  // Fill checkboxes
  const spouseCheckbox = form.getCheckBox('form1[0].#subform[0].Pt1Line1_Spouse[0]');
  if (answers.relationship === 'spouse') {
    spouseCheckbox.check();
  }

  // Save filled PDF
  const filledPdfBytes = await pdfDoc.save();
  writeFileSync('output/i-130-filled.pdf', filledPdfBytes);
}
```

---

## Step 7: Production Implementation

### File Structure

```
src/
├── lib/
│   ├── pdf/
│   │   ├── generator.ts       # PDF generation service
│   │   └── field-mapper.ts    # Maps questionnaire → PDF fields
│   └── constants/
│       └── form-mappings/
│           ├── i130.ts         # I-130 field mappings
│           ├── i485.ts         # I-485 field mappings
│           └── ...
├── scripts/
│   ├── unlock-pdf.ts           # Unlock single PDF
│   ├── unlock-all-pdfs.ts      # Unlock all PDFs
│   └── list-pdf-fields.ts      # Extract field names
└── app/
    └── api/
        └── generate-pdf/
            └── route.ts        # API endpoint for PDF generation
```

### API Endpoint Example

```typescript
// src/app/api/generate-pdf/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateFilledPDF } from '@/lib/pdf/generator';

export async function POST(request: NextRequest) {
  const { formId, answers } = await request.json();

  const pdfBytes = await generateFilledPDF({
    formId,
    answers,
  });

  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${formId}-filled.pdf"`,
    },
  });
}
```

---

## Field Mapping Strategy

### Approach 1: Manual Mapping (Accurate)

Map each questionnaire field to its PDF field manually:

**Pros:**
- 100% accurate
- Full control over mapping
- Can handle complex logic

**Cons:**
- Time-consuming (450 fields × 19 forms = 8,550 mappings)
- Manual work required

**Best for:** Critical forms (I-130, I-485, N-400)

### Approach 2: AI-Assisted Mapping (Fast)

Use AI to suggest mappings based on field names:

```typescript
// Example AI prompt:
// "Map questionnaire field 'beneficiary_last_name' to PDF field containing 'FamilyName'"
// AI suggests: form1[0].#subform[0].Pt2Line4a_FamilyName[0]
```

**Pros:**
- Much faster
- Can handle bulk of fields

**Cons:**
- Requires verification
- May miss edge cases

**Best for:** Less critical fields, initial mapping pass

### Approach 3: Hybrid (Recommended)

1. Use AI for initial mapping (80% of fields)
2. Manually verify critical fields (20%)
3. Test PDF generation end-to-end
4. Iterate and refine

---

## Testing Strategy

### 1. Unit Tests

Test individual field mappings:

```typescript
describe('I-130 Field Mapping', () => {
  it('maps beneficiary last name correctly', () => {
    const result = mapField('beneficiary_last_name', 'Smith');
    expect(result.pdfField).toBe('form1[0].#subform[0].Pt2Line4a_FamilyName[0]');
    expect(result.value).toBe('Smith');
  });
});
```

### 2. Integration Tests

Test full PDF generation:

```typescript
it('generates filled I-130 PDF', async () => {
  const answers = {
    beneficiary_last_name: 'Smith',
    beneficiary_first_name: 'John',
    // ... all answers
  };

  const pdfBytes = await generateFilledPDF({ formId: 'i-130', answers });

  // Verify PDF was generated
  expect(pdfBytes.length).toBeGreaterThan(0);

  // Verify fields are filled
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const lastNameField = form.getTextField('form1[0].#subform[0].Pt2Line4a_FamilyName[0]');
  expect(lastNameField.getText()).toBe('Smith');
});
```

### 3. Visual Testing

1. Generate filled PDF
2. Open in PDF viewer
3. Manually verify all fields
4. Print and compare to paper form

---

## Current Status

### ✅ Completed

- [x] PDF unlocking scripts created
- [x] Field listing script created
- [x] I-130 PDF unlocked (450 fields discovered)
- [x] Field names extracted to JSON
- [x] Field naming patterns documented

### 🔄 In Progress

- [ ] Create field mappings for I-130
- [ ] Implement fillable PDF generation service
- [ ] Test end-to-end PDF generation

### 📋 Next Steps

1. **Create I-130 Field Mappings** (Priority 1)
   - Map top 50 most important fields manually
   - Use AI to suggest mappings for remaining fields
   - Save to `src/lib/constants/form-mappings/i130.ts`

2. **Implement PDF Generator** (Priority 2)
   - Update `src/lib/pdf/generator.ts`
   - Load unlocked PDF template
   - Apply field mappings
   - Fill form fields
   - Save and return filled PDF

3. **Create API Endpoint** (Priority 3)
   - `POST /api/generate-pdf`
   - Accepts: `{ formId, answers }`
   - Returns: Filled PDF file

4. **Add Download Button to Form Wizard** (Priority 4)
   - Show "Download PDF" after completing form
   - Call API endpoint
   - Download filled PDF

---

## Troubleshooting

### Error: qpdf not found

```bash
# Install qpdf
brew install qpdf  # Mac
sudo apt-get install qpdf  # Ubuntu
```

### Error: PDF still encrypted after unlocking

Some PDFs have multiple layers of encryption. Try:

```bash
qpdf --password="" --decrypt input.pdf output.pdf
```

### Error: Field not found

1. Verify field name exactly matches PDF (case-sensitive)
2. Check for array indices: `[0]`, `[1]`, etc.
3. Use `list-pdf-fields.ts` to verify exact field name

### Error: Checkbox not working

Checkboxes in pdf-lib require specific values:

```typescript
checkbox.check();       // Correct
checkbox.uncheck();     // Correct
checkbox.setValue(true);  // May not work
```

---

## Resources

- **pdf-lib Documentation**: https://pdf-lib.js.org/
- **qpdf Manual**: https://qpdf.readthedocs.io/
- **USCIS Forms**: https://www.uscis.gov/forms
- **Field Naming Reference**: `public/pdf-templates/i-130-unlocked_fields.json`

---

## Example: Complete Workflow

```bash
# 1. Unlock PDF
npx tsx src/scripts/unlock-pdf.ts public/pdf-templates/i-130.pdf public/pdf-templates/i-130-unlocked.pdf

# 2. List fields
npx tsx src/scripts/list-pdf-fields.ts public/pdf-templates/i-130-unlocked.pdf --json

# 3. View field names
cat public/pdf-templates/i-130-unlocked_fields.json | jq '.fields[] | .name' | grep -i "FamilyName"

# 4. Create mappings (manual step)
# Edit src/lib/constants/form-mappings/i130.ts

# 5. Generate filled PDF (via API or script)
curl -X POST http://localhost:3000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{"formId": "i-130", "answers": {...}}'
```

---

**Last Updated:** November 26, 2025
**Status:** PDF unlocking complete, field mappings in progress
