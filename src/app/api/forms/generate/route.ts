import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateFilledPDF, generateInstructions, generateChecklist } from '@/lib/pdf/generator';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
    try {
        const { applicationId } = await request.json();

        if (!applicationId) {
            return NextResponse.json(
                { error: 'Application ID is required' },
                { status: 400 }
            );
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch application
        const { data: application, error: appError } = await supabase
            .from('form_applications')
            .select('*')
            .eq('id', applicationId)
            .eq('user_id', user.id)
            .single() as any;

        if (appError || !application) {
            return NextResponse.json(
                { error: 'Application not found' },
                { status: 404 }
            );
        }

        // Fetch all answers
        const { data: savedAnswers } = await supabase
            .from('form_answers')
            .select('*')
            .eq('application_id', applicationId)
            .order('step_number', { ascending: true }) as any;

        // Merge all answers
        const answers: Record<string, string> = {};
        savedAnswers?.forEach((answer: any) => {
            if (answer.answers && typeof answer.answers === 'object') {
                Object.assign(answers, answer.answers);
            }
        });

        // Generate PDFs
        const formPDF = await generateFilledPDF({
            formType: application.form_type,
            answers,
            applicationId,
        });

        const instructionsPDF = await generateInstructions(application.form_type);
        const checklistPDF = await generateChecklist(application.form_type);

        // Create ZIP file
        const zip = new JSZip();
        zip.file(`${application.form_type}_Completed.pdf`, formPDF);
        zip.file('Instructions.pdf', instructionsPDF);
        zip.file('Document_Checklist.pdf', checklistPDF);

        const zipBuffer = await zip.generateAsync({ type: 'uint8array' });

        // Update application status
        await (supabase as any)
            .from('form_applications')
            .update({
                status: 'completed',
                completed_at: new Date().toISOString(),
            })
            .eq('id', applicationId);

        // Return ZIP file
        return new NextResponse(Buffer.from(zipBuffer), {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${application.form_type}_Package.zip"`,
            },
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate forms' },
            { status: 500 }
        );
    }
}
