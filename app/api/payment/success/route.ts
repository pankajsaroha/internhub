import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    const { certificateId } = await req.json();

    await supabase
        .from("certificates")
        .update({ payment_status: "PAID" })
        .eq("certificate_id", certificateId);

    return NextResponse.json({ success: true });
}
