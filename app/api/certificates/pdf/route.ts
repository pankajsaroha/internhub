import { launchBrowser } from "@/lib/puppeteer-utils"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const certificateId = searchParams.get("id")

    if (!certificateId) {
        return NextResponse.json({ error: "Missing certificate ID" }, { status: 400 })
    }

    const browser = await launchBrowser()
    const page = await browser.newPage()

    await page.goto(
        `${process.env.NEXT_PUBLIC_BASE_URL}/certificate/${certificateId}`,
        { waitUntil: "networkidle0" }
    )

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true
    })

    await browser.close()
    const buffer = Buffer.from(pdf)

    return new NextResponse(buffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=certificate_${certificateId}.pdf`
        }
    })
}
