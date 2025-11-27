// @ts-nocheck - Supabase generated types causing build issues
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{
    applicationId: string;
  }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
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

    // Parse request body
    const body = await request.json();
    const { formId, answers } = body;

    if (!formId || !answers) {
      return NextResponse.json(
        { error: 'formId and answers are required' },
        { status: 400 }
      );
    }

    // Verify the application belongs to the user
    const { data: application, error: appError } = await supabase
      .from('form_applications')
      .select('id, user_id')
      .eq('id', applicationId)
      .single();

    if (appError || !application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    if ((application as any).user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Upsert answers - save each answer as a separate row
    const answerRows = Object.entries(answers).map(([questionId, value]) => ({
      application_id: applicationId,
      question_id: questionId,
      answer: value,
    }));

    const { error: upsertError } = await supabase
      .from('form_answers')
      .upsert(answerRows as any, {
        onConflict: 'application_id,question_id',
      });

    if (upsertError) {
      console.error('Error upserting answers:', upsertError);
      return NextResponse.json(
        { error: 'Failed to save answers' },
        { status: 500 }
      );
    }

    // Update the application's updated_at timestamp
    const { error: updateError } = await supabase
      .from('form_applications')
      .update({ updated_at: new Date().toISOString() } as any)
      .eq('id', applicationId);

    if (updateError) {
      console.error('Error updating application:', updateError);
    }

    return NextResponse.json({
      success: true,
      message: 'Answers saved successfully',
    });
  } catch (error) {
    console.error('Error in answers API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
