import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
    // Razorpay MUST be created inside the handler
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
        amount: 9900, // ₹99 (paise me)
        currency: "INR",
        receipt: "inzivoo_certificate",
    });

    return NextResponse.json(order);
}
