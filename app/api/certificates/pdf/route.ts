import puppeteer from "puppeteer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { certificateId } = await req.json()

    const browser = await puppeteer.launch()
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

    return new NextResponse(pdf, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=certificate.pdf"
        }
    })
}
