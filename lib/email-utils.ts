import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { Project } from './projects/registry';

/**
 * Simple markdown to HTML converter for PDF styling.
 */
function simpleMarkdownToHtml(md: string): string {
    return md
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>')
        .replace(/<\/ul><ul>/g, '') // Merge adjacent lists
        .replace(/\n/g, '<br>');
}

/**
 * Generates a PDF buffer containing the details of assigned projects.
 */
export async function generateProjectPDF(projects: Project[]): Promise<Buffer> {
    const projectSections = await Promise.all(projects.map(async (p) => {
        const fullPath = path.join(process.cwd(), 'lib/projects', p.filePath);
        const mdContent = fs.readFileSync(fullPath, 'utf8');
        const htmlContent = simpleMarkdownToHtml(mdContent);

        return `
            <div class="project-section">
                <h2 class="project-title-header">${p.title}</h2>
                <div class="project-body">${htmlContent}</div>
            </div>
            ${projects.indexOf(p) < projects.length - 1 ? '<div class="page-break"></div>' : ''}
        `;
    }));

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica', 'Arial', sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 40px; }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 4px solid #4f46e5; padding-bottom: 20px; }
                h1 { color: #4f46e5; font-size: 28px; margin: 0; }
                .summary { background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #e2e8f0; }
                .summary h2 { color: #475569; font-size: 18px; margin-top: 0; }
                .summary ul { margin: 10px 0 0 20px; padding: 0; }
                .summary li { color: #64748b; font-weight: 600; margin-bottom: 5px; }
                .project-section { margin-top: 20px; }
                .project-title-header { color: #ffffff; background: #4f46e5; padding: 12px 20px; border-radius: 8px; font-size: 22px; margin-bottom: 20px; }
                .project-body { padding: 0 10px; }
                h2 { color: #1e293b; margin-top: 25px; font-size: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
                h3 { color: #334155; margin-top: 20px; font-size: 18px; }
                p { margin-bottom: 15px; }
                li { margin-bottom: 8px; }
                .page-break { page-break-after: always; }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Assigned Projects - Inzivoo</h1>
            </div>
            
            <div class="summary">
                <h2>Project Selection Summary</h2>
                <p>Based on your experience and track, we have assigned the following projects for your evaluation:</p>
                <ul>
                    ${projects.map(p => `<li>${p.title}</li>`).join('')}
                </ul>
            </div>
            
            ${projectSections.join('')}
        </body>
        </html>
    `;

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });

    await browser.close();
    return Buffer.from(pdf);
}

/**
 * Sends the assignment email with PDF attachment using Resend.
 */
export async function sendAssignmentEmail(to: string, name: string, pdfBuffer: Buffer) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not defined in environment variables");

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 'Inzivoo Team <info@inzivoo.com>',
            to: [to],
            subject: `Your Project Access - ${name}`,
            html: `
                <div style="font-family: sans-serif; color: #1e293b; line-height: 1.6;">
                    <h2 style="color: #4f46e5;">Welcome to Inzivoo, ${name}!</h2>
                    <p>We've received your application and carefully reviewed your profile.</p>
                    <p>Attached to this email, you will find a PDF containing your <strong>assigned projects</strong>. These projects are selected to match your experience level and chosen track.</p>
                    <p><strong>Next Steps:</strong></p>
                    <ul>
                        <li>Open the attached PDF to review the project details.</li>
                        <li>Follow the implementation guide provided for each project.</li>
                        <li>Submit your work within the requested timeline.</li>
                    </ul>
                    <p>If you have any questions, feel free to reply to this email.</p>
                    <br>
                    <p>Best regards,<br>The Inzivoo Team</p>
                </div>
            `,
            attachments: [
                {
                    filename: 'Assigned_Projects_Inzivoo.pdf',
                    content: pdfBuffer.toString('base64')
                }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Resend API Error: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
}
