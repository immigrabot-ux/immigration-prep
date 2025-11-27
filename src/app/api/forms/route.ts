// @ts-nocheck - Supabase generated types causing build issues
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { getFormPackage } from '@/lib/constants/form-packages';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

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
    const { packageId, formIds } = body;

    if (!packageId && !formIds) {
      return NextResponse.json(
        { error: 'Either packageId or formIds is required' },
        { status: 400 }
      );
    }

    let formsToCreate: string[] = [];

    // Determine which forms to create
    if (packageId) {
      const formPackage = getFormPackage(packageId);
      if (!formPackage) {
        return NextResponse.json(
          { error: 'Package not found' },
          { status: 404 }
        );
      }
      formsToCreate = formPackage.formIds;
    } else {
      formsToCreate = formIds;
    }

    // Validate all forms exist in registry
    const invalidForms = formsToCreate.filter(
      (formId) => !FORM_REGISTRY[formId]
    );
    if (invalidForms.length > 0) {
      return NextResponse.json(
        { error: `Invalid form IDs: ${invalidForms.join(', ')}` },
        { status: 400 }
      );
    }

    // Create form applications
    const applications = formsToCreate.map((formId) => ({
      user_id: user.id,
      form_id: formId,
      status: 'draft',
      package_id: packageId || null,
    }));

    const { data: createdApplications, error: createError } = await supabase
      .from('form_applications')
      .insert(applications)
      .select();

    if (createError) {
      console.error('Error creating applications:', createError);
      return NextResponse.json(
        { error: 'Failed to create applications' },
        { status: 500 }
      );
    }

    if (!createdApplications || createdApplications.length === 0) {
      return NextResponse.json(
        { error: 'No applications created' },
        { status: 500 }
      );
    }

    // Return the first application ID to redirect user
    return NextResponse.json({
      success: true,
      applicationId: createdApplications[0].id,
      applications: createdApplications,
    });
  } catch (error) {
    console.error('Error in forms API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
