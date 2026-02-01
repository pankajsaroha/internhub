import { NextResponse } from "next/server";
import { randomUUID } from "crypto"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    const { name, program, email } = await req.json()

    const certificateId = "INZ-" + randomUUID().slice(0, 8)

    const { error } = await supabase.from("certificates").insert({
        certificate_id: certificateId,
        name,
        program,
        email,
        payment_status: "PENDING",
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ certificateId })
}
