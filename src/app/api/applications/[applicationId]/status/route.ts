// @ts-nocheck - Supabase generated types causing build issues
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{
    applicationId: string;
  }>;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
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
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'status is required' },
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

    if (application.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update status
    const { error: updateError } = await supabase
      .from('form_applications')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', applicationId);

    if (updateError) {
      console.error('Error updating status:', updateError);
      return NextResponse.json(
        { error: 'Failed to update status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
    });
  } catch (error) {
    console.error('Error in status API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
