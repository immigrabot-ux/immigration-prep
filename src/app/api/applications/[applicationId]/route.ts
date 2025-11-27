// @ts-nocheck - Supabase generated types causing build issues
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{
    applicationId: string;
  }>;
}

export async function DELETE(request: NextRequest, context: RouteContext) {
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

    // Delete associated answers first (cascade delete should handle this, but being explicit)
    await supabase.from('form_answers').delete().eq('application_id', applicationId);

    // Delete the application
    const { error: deleteError } = await supabase
      .from('form_applications')
      .delete()
      .eq('id', applicationId);

    if (deleteError) {
      console.error('Error deleting application:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete application' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    console.error('Error in delete API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
