import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateProjectPDF, sendAssignmentEmail } from "@/lib/email-utils";
import { getAssignmentCriteria, selectRandomProjects } from "@/lib/projects/utils";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    const adminSecret = req.headers.get("x-admin-secret");
    if (adminSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, applicationId } = await req.json();

    if (!applicationId) {
        return NextResponse.json({ error: "Missing application ID" }, { status: 400 });
    }

    try {
        switch (action) {
            case "SEND_PROJECTS": {
                // Fetch application details
                const { data: app, error: fetchError } = await supabase
                    .from("applications")
                    .select("*")
                    .eq("id", applicationId)
                    .single();

                if (fetchError || !app) throw new Error("Application not found");

                // Selection logic
                const criteria = getAssignmentCriteria(app.applicant_type, app.experience_level, app.program);
                const assignedProjects = selectRandomProjects(criteria.category, criteria.experience, 3);
                const assignedProjectIds = assignedProjects.map(p => p.id).join(", ");

                // Generate PDF and Send Email
                const pdfBuffer = await generateProjectPDF(assignedProjects);
                await sendAssignmentEmail(app.email, app.full_name, pdfBuffer);

                // Update status to ASSIGNED and store track
                const { error: updateError } = await supabase
                    .from("applications")
                    .update({
                        application_status: "ASSIGNED",
                        assigned_track: assignedProjectIds
                    })
                    .eq("id", applicationId);

                if (updateError) throw updateError;
                return NextResponse.json({ success: true });
            }

            case "MOVE_TO_REVIEW": {
                const { error } = await supabase
                    .from("applications")
                    .update({ application_status: "IN-REVIEW" })
                    .eq("id", applicationId);

                if (error) throw error;
                return NextResponse.json({ success: true });
            }

            case "COMPLETE_REVIEW": {
                // 1. Fetch application to get info for certificate
                const { data: app, error: fetchError } = await supabase
                    .from("applications")
                    .select("*")
                    .eq("id", applicationId)
                    .single();

                if (fetchError || !app) throw new Error("Application not found");

                // 2. Create Certificate record
                const certificateId = "INZ-" + Math.random().toString(36).substring(2, 10).toUpperCase();
                const { error: certError } = await supabase.from("certificates").insert({
                    certificate_id: certificateId,
                    name: app.full_name,
                    program: app.program,
                    email: app.email,
                    payment_status: "PENDING",
                });

                if (certError) throw certError;

                // 3. Update application status to REVIEWED
                const { error: updateError } = await supabase
                    .from("applications")
                    .update({ application_status: "REVIEWED" })
                    .eq("id", applicationId);

                if (updateError) throw updateError;

                return NextResponse.json({ success: true, certificateId });
            }

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (err: any) {
        console.error("Admin Action Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
