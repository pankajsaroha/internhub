import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

        // Map UI fields to database fields
        // applicant_type is already STUDENT / WORKING_PROFESSIONAL
        // student_year is integer or null
        // experience_level is string (even if user enters numbers)
        // assigned_track is optional, we don't have it in form currently but user included it in SQL

        const { data, error } = await supabase
            .from("applications")
            .insert({
                full_name,
                email,
                program,
                applicant_type,
                student_year: student_year ? parseInt(student_year) : null,
                experience_level: experience_level || "0", // Default to "0" if empty for professionals
                agreed_to_terms,
                application_status: "APPLIED" // Default status
            })
            .select();

        if (error) {
            console.error("Supabase Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
