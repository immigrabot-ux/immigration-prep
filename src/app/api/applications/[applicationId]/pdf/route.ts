// @ts-nocheck - Supabase generated types causing build issues
/**
 * PDF Generation API Endpoint
 *
 * GET /api/applications/:applicationId/pdf
 *
 * Generates a filled PDF for a specific application.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { fillPDF } from '@/lib/pdf/fill-pdf';

interface RouteContext {
  params: Promise<{
    applicationId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    // 1. Verify user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { applicationId } = await context.params;

    // 2. Get application from database
    const { data: application, error: appError } = await supabase
      .from('form_applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (appError || !application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // 3. Verify user owns this application
    if (application.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden - You do not own this application' },
        { status: 403 }
      );
    }

    // 4. Get form ID and answers
    const formId = application.form_id;

    // Fetch all answers
    const { data: answersData, error: answersError } = await supabase
      .from('form_answers')
      .select('question_id, answer')
      .eq('application_id', applicationId);

    if (answersError) {
      console.error('Error fetching answers:', answersError);
      return NextResponse.json(
        { error: 'Failed to fetch form data' },
        { status: 500 }
      );
    }

    // Convert answers array to object
    const answers: Record<string, any> = {};
    answersData?.forEach((row) => {
      answers[row.question_id] = row.answer;
    });

    if (Object.keys(answers).length === 0) {
      return NextResponse.json(
        { error: 'No form data found for this application' },
        { status: 400 }
      );
    }

    // 5. Generate filled PDF
    const pdfBytes = await fillPDF(formId, answers);

    // 6. Return PDF with proper headers
    const filename = `${formId.toUpperCase()}-filled.pdf`;

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBytes.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
