#!/usr/bin/env tsx

/**
 * Test PDF Fill Script
 *
 * Tests the PDF fill service with sample data
 *
 * Usage:
 *   npx tsx src/scripts/test-pdf-fill.ts [formId]
 *   npx tsx src/scripts/test-pdf-fill.ts i-130
 *   npx tsx src/scripts/test-pdf-fill.ts i-485
 */

import { fillPDF } from '@/lib/pdf/fill-pdf';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Sample data for different forms
const SAMPLE_DATA: Record<string, Record<string, any>> = {
  'i-130': {
    // Part 1: Relationship
    'part1.relationship': 'spouse',

    // Part 2: Beneficiary Information
    'part2.alienNumber': 'A123456789',
    'part2.uscisOnlineAccount': 'USC123456789',
    'part2.ssn': '123-45-6789',
    'part2.lastName': 'Smith',
    'part2.firstName': 'John',
    'part2.middleName': 'Michael',
    'part2.dateOfBirth': '1990-05-15',
    'part2.sex': 'male',
    'part2.cityOfBirth': 'London',
    'part2.countryOfBirth': 'United Kingdom',
    'part2.mailingInCareOf': 'Jane Doe',
    'part2.mailingStreet': '123 Main Street',
    'part2.mailingAptNumber': '4B',
    'part2.mailingCity': 'New York',
    'part2.mailingState': 'NY',
    'part2.mailingZip': '10001',
    'part2.country': 'United States',

    // Part 4: Petitioner Information
    'part4.alienNumber': 'A987654321',
    'part4.uscisOnlineAccount': 'USC987654321',
    'part4.ssn': '987-65-4321',
    'part4.lastName': 'Doe',
    'part4.firstName': 'Jane',
    'part4.middleName': 'Elizabeth',
    'part4.sex': 'female',
    'part4.cityOfBirth': 'Boston',
    'part4.countryOfBirth': 'United States',
    'part4.street': '123 Main Street',
    'part4.aptNumber': '4B',
    'part4.city': 'New York',
    'part4.state': 'NY',
    'part4.zip': '10001',
    'part4.country': 'United States',
  },
  'i-485': {
    'part1.dob': '1990-05-15',
    'part1.sex': 'male',
    'part1.cityOfBirth': 'London',
    'part1.countryOfBirth': 'United Kingdom',
    'part1.countryOfCitizenship': 'United Kingdom',
    'part1.ssn': '123-45-6789',
    'part1.mailingStreet': '123 Main Street',
    'part1.mailingAptNumber': '4B',
    'part1.mailingCity': 'New York',
    'part1.mailingState': 'NY',
    'part1.mailingZip': '10001',
    'part1.passportNumber': 'UK1234567',
    'part1.passportCountry': 'United Kingdom',
    'part1.entryCity': 'New York',
    'part1.entryState': 'NY',
  },
  'i-765': {
    'part2.mailingStreet': '123 Main Street',
    'part2.mailingCity': 'New York',
    'part2.mailingState': 'NY',
    'part2.mailingZip': '10001',
    'part2.mailingAptNumber': '4B',
    'part2.ssn': '123-45-6789',
    'part2.dob': '1990-05-15',
    'part2.cityOfBirth': 'London',
    'part2.countryOfBirth': 'United Kingdom',
    'part2.passportNumber': 'UK1234567',
    'part2.passportCountry': 'United Kingdom',
  },
  'i-131': {
    'part1.lastName': 'Smith',
    'part1.firstName': 'John',
    'part1.middleName': 'Michael',
    'part1.mailingStreet': '123 Main Street',
    'part1.mailingCity': 'New York',
    'part1.mailingState': 'NY',
    'part1.mailingZip': '10001',
    'part1.dateOfBirth': '1990-05-15',
    'part1.countryOfBirth': 'United Kingdom',
    'part1.countryOfCitizenship': 'United Kingdom',
  },
  'i-864': {
    'part1.lastName': 'Doe',
    'part1.firstName': 'Jane',
    'part1.middleName': 'Elizabeth',
    'part1.mailingStreet': '123 Main Street',
    'part1.mailingCity': 'New York',
    'part1.mailingState': 'NY',
    'part1.mailingZip': '10001',
    'part1.dateOfBirth': '1985-03-20',
    'part1.ssn': '987-65-4321',
  },
  'n-400': {
    'part1.lastName': 'Smith',
    'part1.firstName': 'John',
    'part1.middleName': 'Michael',
    'part1.dateOfBirth': '1990-05-15',
    'part1.ssn': '123-45-6789',
    'part1.mailingStreet': '123 Main Street',
    'part1.mailingCity': 'New York',
    'part1.mailingState': 'NY',
    'part1.mailingZip': '10001',
  },
  'i-751': {
    'part1.mailingCity': 'New York',
    'part1.mailingState': 'NY',
    'part1.mailingZip': '10001',
    'part2.dob': '1990-05-15',
    'part2.countryOfBirth': 'United Kingdom',
    'part2.countryOfCitizenship': 'United Kingdom',
    'part4.spouseDob': '1985-03-20',
  },
  'i-90': {
    'part1.lastName': 'Smith',
    'part1.firstName': 'John',
    'part1.middleName': 'Michael',
    'part1.mailingStreet': '123 Main Street',
    'part1.mailingCity': 'New York',
    'part1.mailingState': 'NY',
    'part1.mailingZip': '10001',
    'part1.dob': '1990-05-15',
    'part1.countryOfBirth': 'United Kingdom',
    'part1.ssn': '123-45-6789',
  },
  'i-129': {
    'part1.lastName': 'TechCorp',
    'part1.street': '456 Business Ave',
    'part1.city': 'San Francisco',
    'part1.state': 'CA',
    'part1.zip': '94102',
    'part2.lastName': 'Smith',
    'part2.firstName': 'John',
    'part2.dob': '1990-05-15',
    'part2.countryOfBirth': 'India',
    'part2.countryOfCitizenship': 'India',
  },
  'i-140': {
    'part1.lastName': 'TechCorp',
    'part1.street': '456 Business Ave',
    'part1.city': 'San Francisco',
    'part1.state': 'CA',
    'part1.zip': '94102',
    'part2.lastName': 'Smith',
    'part2.firstName': 'John',
    'part2.dob': '1990-05-15',
  },
  'i-539': {
    'part1.lastName': 'Smith',
    'part1.firstName': 'John',
    'part1.middleName': 'Michael',
    'part1.mailingStreet': '123 Main Street',
    'part1.mailingCity': 'New York',
    'part1.mailingState': 'NY',
    'part1.mailingZip': '10001',
    'part1.dob': '1990-05-15',
    'part1.countryOfBirth': 'Canada',
    'part1.countryOfCitizenship': 'Canada',
  },
  'i-9': {
    'section1.lastName': 'Smith',
    'section1.firstName': 'John',
    'section1.middleName': 'M',
    'section1.dob': '1990-05-15',
    'section1.ssn': '123-45-6789',
    'section2.employerName': 'TechCorp Inc',
    'section2.employerCity': 'New York',
    'section2.employerState': 'NY',
  },
  'i-526': {
    'petitioner.lastName': 'Smith',
    'petitioner.firstName': 'John',
  },
  'i-129f': {
    'part1.4.ssn': '123-45-6789',
    'part1.6.placeOfBirth.city': 'New York',
    'part1.6.placeOfBirth.country': 'United States',
    'part1.8a.mailingStreet': '123 Main Street',
    'part1.8d.city': 'New York',
    'part1.8e.state': 'NY',
    'part1.8f.zipCode': '10001',
    'part2.4.ssn': '987-65-4321',
    'part2.6.cityOfBirth': 'London',
    'part2.6.countryOfBirth': 'United Kingdom',
  },
  'i-360': {
    'part3.1.lastName': 'Smith',
    'part3.2.firstName': 'John',
    'part3.6.dateOfBirth': '1990-05-15',
    'part3.7.cityOfBirth': 'London',
    'part3.7.countryOfBirth': 'United Kingdom',
    'part12.1.daytimePhone': '212-555-1234',
    'part12.2.mobilePhone': '917-555-5678',
    'part12.3.email': 'john.smith@email.com',
  },
  'i-600': {
    'part1.1.lastName': 'Doe',
    'part1.2.firstName': 'Jane',
    'part1.4.dateOfBirth': '1985-03-20',
    'part1.5.cityOfBirth': 'Boston',
    'part1.5.countryOfBirth': 'United States',
    'part1.7.mailingStreet': '123 Main St',
    'part1.7.mailingCity': 'New York',
    'part1.7.mailingState': 'NY',
    'part1.7.mailingZip': '10001',
    'part2.1.childLastName': 'Smith',
    'part2.2.childFirstName': 'John',
  },
  'i-589': {
    'partA.1.alienNumber': 'A123456789',
    'partA.2.ssn': '123-45-6789',
    'partA.3.lastName': 'Smith',
    'partA.4.firstName': 'John',
    'partA.6.dateOfBirth': '1990-05-15',
    'partA.8.mailingStreet': '123 Main Street',
    'partA.8.mailingCity': 'New York',
    'partA.8.mailingState': 'NY',
  },
  'i-821d': {
    'part1.requestType': 'initial',
    'part1.lastName': 'Garcia',
    'part1.firstName': 'Maria',
    'part1.middleName': 'Elena',
    'part1.dateOfBirth': '1995-08-15',
    'part1.alienNumber': 'A123456789',
    'part1.expirationDate': '2026-03-15',
    'part2.ssn': '123-45-6789',
    'part2.mailingStreet': '123 Main Street',
    'part2.mailingCity': 'Los Angeles',
    'part2.mailingState': 'CA',
    'part2.mailingZip': '90001',
    'part2.countryOfBirth': 'Mexico',
    'part2.countryOfCitizenship': 'Mexico',
  },
  'i-212': {
    'part1.lastName': 'Rodriguez',
    'part1.firstName': 'Carlos',
    'part1.middleName': 'Luis',
    'part1.dateOfBirth': '1988-11-20',
    'part1.cityOfBirth': 'Guadalajara',
    'part1.countryOfBirth': 'Mexico',
    'part1.alienNumber': 'A987654321',
    'part2.dateOfRemoval': '2020-05-10',
    'part2.portOfRemoval': 'San Diego, CA',
    'part2.reasonForRemoval': 'Unlawful presence',
  },
  'i-290b': {
    'part1.lastName': 'Chen',
    'part1.firstName': 'Wei',
    'part1.middleName': 'Ming',
    'part1.alienNumber': 'A555444333',
    'part2.requestType': 'appeal',
    'part2.decisionDate': '2024-09-15',
    'part2.formType': 'I-130',
    'part2.reasonForAppeal': 'Error in evidence evaluation',
  },
  'i-601': {
    'part1.lastName': 'Patel',
    'part1.firstName': 'Raj',
    'part1.middleName': 'Kumar',
    'part1.dateOfBirth': '1985-04-12',
    'part1.countryOfBirth': 'India',
    'part1.alienNumber': 'A111222333',
    'part2.relativeType': 'spouse',
    'part2.relativeName': 'Sarah Patel',
    'part2.relativeStatus': 'US Citizen',
    'part3.inadmissibilityGrounds': 'Unlawful presence over 180 days',
    'part3.extremeHardship': 'Spouse has chronic medical condition requiring care',
  },
  'i-601a': {
    'part1.lastName': 'Kim',
    'part1.firstName': 'Soo',
    'part1.middleName': 'Min',
    'part1.dateOfBirth': '1992-07-08',
    'part1.alienNumber': 'A999888777',
    'part2.relativeType': 'spouse',
    'part2.relativeName': 'James Kim',
    'part2.relativeSSN': '456-78-9012',
    'part3.extremeHardship': 'Spouse is sole caregiver for elderly parents',
    'part3.consularPost': 'Seoul, South Korea',
  },
};

async function testPDFFill(formId: string = 'i-130') {
  console.log('\n🧪 Testing PDF Fill Service...\n');

  // Get sample data for this form
  const sampleAnswers = SAMPLE_DATA[formId.toLowerCase()];

  if (!sampleAnswers) {
    console.error(`❌ No sample data found for form: ${formId}`);
    console.log(`Available forms: ${Object.keys(SAMPLE_DATA).join(', ')}\n`);
    process.exit(1);
  }

  try {
    console.log(`📄 Form: ${formId.toUpperCase()}`);
    console.log(`📝 Sample fields: ${Object.keys(sampleAnswers).length}\n`);

    // Generate PDF
    console.log('🔄 Generating PDF...\n');
    const pdfBytes = await fillPDF(formId, sampleAnswers);

    // Save to output directory
    const outputDir = join(process.cwd(), 'output');
    const outputPath = join(outputDir, `${formId}-test-filled.pdf`);

    // Ensure output directory exists
    const { existsSync, mkdirSync } = await import('fs');
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(outputPath, pdfBytes);

    console.log('\n✅ PDF Generated Successfully!');
    console.log(`   Saved to: ${outputPath}`);
    console.log(`   File size: ${(pdfBytes.length / 1024).toFixed(2)} KB\n`);

    console.log('🎉 Test completed!\n');
    console.log('Next steps:');
    console.log('  1. Open the PDF and verify fields are filled correctly');
    console.log('  2. Check that checkboxes are checked/unchecked as expected');
    console.log('  3. Verify date formatting (MM/DD/YYYY)');
    console.log('  4. Test with different sample data\n');
  } catch (error) {
    console.error('\n❌ Test failed!');
    console.error('Error:', error instanceof Error ? error.message : error);
    console.error('\nStack trace:');
    console.error(error);
    process.exit(1);
  }
}

// Get formId from command line args
const formId = process.argv[2] || 'i-130';
testPDFFill(formId);
