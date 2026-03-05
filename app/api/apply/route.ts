import { NextResponse, after } from "next/server";
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
            agreed_to_terms,
            auth_user_id
        } = body;
        const normalizedEmail = String(email || "").trim().toLowerCase();

        // 1. Select Projects
        const criteria = getAssignmentCriteria(applicant_type, experience_level, program);
        const assignedProjects = selectRandomProjects(criteria.category, criteria.experience, 3);
        const assignedProjectIds = assignedProjects.map(p => p.id).join(", ");

        // 2. Ensure users table has this user (insert if new, ignore if exists)
        const normalizedAuthUserId = typeof auth_user_id === "string" && auth_user_id.trim()
            ? auth_user_id.trim()
            : null;
        const { data: existingUser, error: userFetchError } = await supabase
            .from("users")
            .select("email")
            .eq("email", normalizedEmail)
            .maybeSingle();

        if (userFetchError) {
            console.error("Users lookup error:", userFetchError);
        } else if (!existingUser) {
            const newUserPayload: { id: string; name: string; email: string } = {
                id: normalizedAuthUserId || crypto.randomUUID(),
                name: full_name,
                email: normalizedEmail,
            };

            const { error: userInsertError } = await supabase
                .from("users")
                .insert(newUserPayload);

            if (userInsertError) {
                // If email race-condition happens between check and insert, ignore duplicate.
                if (userInsertError.code !== "23505") {
                    console.error("Users insert error:", userInsertError);
                    return NextResponse.json({ error: userInsertError.message }, { status: 500 });
                }
            }
        }

        // 3. Initial Insertion with APPLIED status
        const { data: insertData, error: insertError } = await supabase
            .from("applications")
            .insert({
                full_name,
                email: normalizedEmail,
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

        // 4. Deferred: Generate PDF and Send Email (non-blocking for fast UI response)
        // Using 'after' ensures the response is sent immediately to the user 
        // while the heavy work continued in the background.
        after(async () => {
            try {
                const pdfBuffer = await generateProjectPDF(assignedProjects);
                await sendAssignmentEmail(normalizedEmail, full_name, pdfBuffer);

                // 5. Update status to ASSIGNED
                await supabase
                    .from("applications")
                    .update({ application_status: "ASSIGNED" })
                    .eq("id", insertData.id);
            } catch (emailErr) {
                console.error("Background Email/PDF process failed:", emailErr);
            }
        });

        // 6. Respond immediately to show success popup
        return NextResponse.json({ success: true, data: insertData });
    } catch (err: unknown) {
        console.error("API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
