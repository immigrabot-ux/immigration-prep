// @ts-nocheck - Supabase generated types causing build issues
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { generatePDF } from '@/lib/pdf/universal-generator';
import { checkFormAccess } from '@/lib/access-control';

interface RouteContext {
  params: Promise<{
    applicationId: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const supabase = await createClient();
    const { applicationId } = await context.params;

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the application
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

    // Verify ownership
    if (application.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get form definition from registry
    const formDefinition = FORM_REGISTRY[application.form_id];
    if (!formDefinition) {
      return NextResponse.json(
        { error: 'Form definition not found' },
        { status: 404 }
      );
    }

    // Check if user has access to this form
    const accessCheck = await checkFormAccess(application.form_id);
    if (!accessCheck.hasAccess) {
      return NextResponse.json(
        { error: 'Purchase required to download this form', reason: accessCheck.reason },
        { status: 403 }
      );
    }

    // Fetch all answers for this application
    const { data: answersData, error: answersError } = await supabase
      .from('form_answers')
      .select('question_id, answer')
      .eq('application_id', applicationId);

    if (answersError) {
      console.error('Error fetching answers:', answersError);
      return NextResponse.json(
        { error: 'Failed to fetch answers' },
        { status: 500 }
      );
    }

    // Convert answers array to object
    const answers: Record<string, any> = {};
    answersData?.forEach((row) => {
      answers[row.question_id] = row.answer;
    });

    // Generate the PDF
    const pdfBytes = await generatePDF(formDefinition, answers);

    // Return the PDF as a downloadable file
    const filename = `${formDefinition.id}_${new Date().toISOString().split('T')[0]}.pdf`;

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBytes.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
