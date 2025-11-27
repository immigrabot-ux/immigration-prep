#!/usr/bin/env tsx

/**
 * Test All PDFs Script
 *
 * Tests PDF generation for all 18 forms
 */

import { fillPDF } from '@/lib/pdf/fill-pdf';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Import sample data from test-pdf-fill
const FORMS = [
  'i-130', 'i-485', 'i-765', 'i-131', 'i-864', 'n-400',
  'i-751', 'i-90', 'i-129f', 'i-129', 'i-140', 'i-539',
  'i-9', 'i-360', 'i-600', 'i-589', 'i-821d', 'i-212',
  'i-290b', 'i-601', 'i-601a'
];

const SAMPLE_DATA: Record<string, Record<string, any>> = {
  'i-130': {
    'part2.lastName': 'Smith',
    'part2.firstName': 'John',
    'part4.lastName': 'Doe',
    'part4.firstName': 'Jane',
  },
  'i-485': {
    'part1.dob': '1990-05-15',
    'part1.cityOfBirth': 'London',
  },
  'i-765': {
    'part2.mailingCity': 'New York',
    'part2.mailingState': 'NY',
    'part2.ssn': '123-45-6789',
  },
  'i-131': {
    'part1.lastName': 'Smith',
    'part1.firstName': 'John',
  },
  'i-864': {
    'part1.lastName': 'Doe',
    'part1.firstName': 'Jane',
  },
  'n-400': {
    'part1.lastName': 'Smith',
    'part1.firstName': 'John',
  },
  'i-751': {
    'part1.mailingCity': 'New York',
    'part2.countryOfBirth': 'United Kingdom',
  },
  'i-90': {
    'part1.lastName': 'Smith',
    'part1.mailingCity': 'New York',
  },
  'i-129f': {
    'part1.4.ssn': '123-45-6789',
    'part1.6.placeOfBirth.city': 'New York',
    'part1.6.placeOfBirth.country': 'United States',
    'part1.8a.mailingStreet': '123 Main Street',
    'part1.8d.city': 'New York',
    'part1.8e.state': 'NY',
    'part1.8f.zipCode': '10001',
  },
  'i-129': {
    'part1.lastName': 'TechCorp',
    'part2.lastName': 'Smith',
  },
  'i-140': {
    'part1.lastName': 'TechCorp',
    'part2.lastName': 'Smith',
  },
  'i-539': {
    'part1.lastName': 'Smith',
    'part1.mailingCity': 'New York',
  },
  'i-9': {
    'section1.lastName': 'Smith',
    'section1.firstName': 'John',
  },
  'i-360': {
    'part3.1.lastName': 'Smith',
    'part3.2.firstName': 'John',
    'part3.6.dateOfBirth': '1990-05-15',
    'part3.7.cityOfBirth': 'London',
    'part3.7.countryOfBirth': 'United Kingdom',
  },
  'i-600': {
    'part1.1.lastName': 'Doe',
    'part1.2.firstName': 'Jane',
    'part1.4.dateOfBirth': '1985-03-20',
    'part1.5.cityOfBirth': 'Boston',
    'part1.5.countryOfBirth': 'United States',
    'part1.7.mailingStreet': '123 Main St',
    'part1.7.mailingCity': 'New York',
  },
  'i-589': {
    'partA.1.alienNumber': 'A123456789',
    'partA.2.ssn': '123-45-6789',
    'partA.3.lastName': 'Smith',
    'partA.4.firstName': 'John',
    'partA.6.dateOfBirth': '1990-05-15',
  },
  'i-821d': {
    'part2.ssn': '123-45-6789',
    'part2.mailingCity': 'Los Angeles',
  },
  'i-212': {
    'part1.cityOfBirth': 'Guadalajara',
    'part1.countryOfBirth': 'Mexico',
  },
  'i-290b': {
    'part1.lastName': 'Chen',
  },
  'i-601': {
    'part1.countryOfBirth': 'India',
  },
  'i-601a': {
    'part2.relativeSSN': '456-78-9012',
  },
};

async function testAllPDFs() {
  console.log('\n🧪 Testing PDF Generation for All 18 Forms...\n');

  const outputDir = join(process.cwd(), 'output');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const results: Array<{ form: string; status: 'pass' | 'fail'; error?: string; size?: number }> = [];

  for (const formId of FORMS) {
    try {
      const sampleAnswers = SAMPLE_DATA[formId] || {};

      console.log(`📄 Testing ${formId.toUpperCase()}...`);

      const pdfBytes = await fillPDF(formId, sampleAnswers);
      const outputPath = join(outputDir, `${formId}-test-filled.pdf`);
      writeFileSync(outputPath, pdfBytes);

      results.push({
        form: formId.toUpperCase(),
        status: 'pass',
        size: pdfBytes.length,
      });

      console.log(`   ✅ Generated (${(pdfBytes.length / 1024).toFixed(2)} KB)\n`);
    } catch (error) {
      results.push({
        form: formId.toUpperCase(),
        status: 'fail',
        error: error instanceof Error ? error.message : String(error),
      });

      console.log(`   ❌ Failed: ${error instanceof Error ? error.message : error}\n`);
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80) + '\n');

  const passed = results.filter(r => r.status === 'pass');
  const failed = results.filter(r => r.status === 'fail');

  console.log(`Total Forms: ${FORMS.length}`);
  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`Success Rate: ${((passed.length / FORMS.length) * 100).toFixed(1)}%\n`);

  if (failed.length > 0) {
    console.log('Failed Forms:');
    failed.forEach(r => {
      console.log(`  ❌ ${r.form}: ${r.error}`);
    });
    console.log('');
  }

  console.log('Passed Forms:');
  passed.forEach(r => {
    console.log(`  ✅ ${r.form}: ${(r.size! / 1024).toFixed(2)} KB`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('All PDFs saved to: ' + outputDir);
  console.log('=' + '='.repeat(80) + '\n');

  process.exit(failed.length > 0 ? 1 : 0);
}

testAllPDFs();
