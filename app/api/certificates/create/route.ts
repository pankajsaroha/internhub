import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
    globalThis.certificates = globalThis.certificates || {}
    const { name, program, email } = await req.json()

    const certificateId = "IH-" + randomUUID().slice(0, 8)

    // TODO: store in DB later
    globalThis.certificates ??= {}
    globalThis.certificates[certificateId] = {
        name,
        program,
        email,
        issueDate: new Date().toISOString()
    }

    return NextResponse.json({ certificateId })
}
