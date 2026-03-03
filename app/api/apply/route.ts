import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAssignmentCriteria, selectRandomProjects } from "@/lib/projects/utils";
import { generateProjectPDF, sendAssignmentEmail } from "@/lib/email-utils";

export const runtime = "nodejs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            full_name,
            email,
            program,
            applicant_type,
            student_year,
            experience_level,
            agreed_to_terms
        } = body;

        // 1. Select Projects
        const criteria = getAssignmentCriteria(applicant_type, experience_level, program);
        const assignedProjects = selectRandomProjects(criteria.category, criteria.experience, 2);
        const assignedProjectIds = assignedProjects.map(p => p.id).join(", ");

        // 2. Initial Insertion with APPLIED status
        const { data: insertData, error: insertError } = await supabase
            .from("applications")
            .insert({
                full_name,
                email,
                program,
                applicant_type,
                student_year: student_year ? parseInt(student_year) : null,
                experience_level,
                agreed_to_terms,
                assigned_track: assignedProjectIds,
                application_status: "APPLIED"
            })
            .select()
            .single();

        if (insertError) {
            console.error("Supabase Insert Error:", insertError);
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        // 3. Background: Generate PDF and Send Email (non-blocking for fast UI response)
        // We trigger this without 'await' so the response can be sent immediately
        (async () => {
            try {
                const pdfBuffer = await generateProjectPDF(assignedProjects);
                await sendAssignmentEmail(email, full_name, pdfBuffer);

                // 4. Update status to ASSIGNED
                await supabase
                    .from("applications")
                    .update({ application_status: "ASSIGNED" })
                    .eq("id", insertData.id);
            } catch (emailErr) {
                console.error("Background Email/PDF process failed:", emailErr);
            }
        })();

        // 5. Respond immediately to show success popup
        return NextResponse.json({ success: true, data: insertData });
    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
