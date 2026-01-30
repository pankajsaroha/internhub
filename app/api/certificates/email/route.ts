import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
    const { email, certificateId } = await req.json()

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${certificateId}`

    await transporter.sendMail({
        from: "InternHub <noreply@internhub.com>",
        to: email,
        subject: "Your Internship Certificate",
        html: `
      <p>Congratulations 🎉</p>
      <p>Verify your certificate here:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `
    })

    return NextResponse.json({ success: true })
}
