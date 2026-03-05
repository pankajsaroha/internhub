import { launchBrowser } from './puppeteer-utils';
import fs from 'fs';
import path from 'path';
import { Project } from './projects/registry';

function extractMarkdownSection(md: string, heading: string): string {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`##\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, "i");
    const match = md.match(regex);
    if (!match) return "";
    return match[1]
        .split(/\r?\n/)
        .map((line) => line.trim().replace(/^\-\s*/, ""))
        .filter((line) => line && !line.startsWith("```") && !line.startsWith("### "))
        .join(" ")
        .trim();
}

/**
 * Simple markdown to HTML converter for PDF styling with fenced code support.
 */
function simpleMarkdownToHtml(md: string): string {
    const escapeHtml = (text: string): string =>
        text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");

    const formatInline = (text: string): string => {
        return escapeHtml(text).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    };

    const codeBlocks: string[] = [];
    const withCodePlaceholders = md.replace(/```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g, (_, lang = "", code = "") => {
        const token = `@@CODE_BLOCK_${codeBlocks.length}@@`;
        codeBlocks.push(
            `<pre class="code-block"><code data-lang="${escapeHtml(lang)}">${escapeHtml(code.trim())}</code></pre>`
        );
        return token;
    });

    const lines = withCodePlaceholders.split(/\r?\n/);
    let html = "";
    let inList = false;
    let paragraphBuffer: string[] = [];

    const flushParagraph = () => {
        if (paragraphBuffer.length > 0) {
            html += `<p>${paragraphBuffer.join(" ")}</p>`;
            paragraphBuffer = [];
        }
    };

    const closeList = () => {
        if (inList) {
            html += "</ul>";
            inList = false;
        }
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();

        if (!line) {
            flushParagraph();
            closeList();
            continue;
        }

        const codeMatch = line.match(/^@@CODE_BLOCK_(\d+)@@$/);
        if (codeMatch) {
            flushParagraph();
            closeList();
            html += codeBlocks[Number(codeMatch[1])] || "";
            continue;
        }

        if (line.startsWith("### ")) {
            flushParagraph();
            closeList();
            html += `<h3>${formatInline(line.slice(4))}</h3>`;
            continue;
        }

        if (line.startsWith("## ")) {
            flushParagraph();
            closeList();
            html += `<h2>${formatInline(line.slice(3))}</h2>`;
            continue;
        }

        if (line.startsWith("# ")) {
            flushParagraph();
            closeList();
            html += `<h1>${formatInline(line.slice(2))}</h1>`;
            continue;
        }

        if (line.startsWith("- ")) {
            flushParagraph();
            if (!inList) {
                html += "<ul>";
                inList = true;
            }
            html += `<li>${formatInline(line.slice(2))}</li>`;
            continue;
        }

        closeList();
        paragraphBuffer.push(formatInline(line));
    }

    flushParagraph();
    closeList();
    return html;
}

/**
 * Generates a PDF buffer containing the details of assigned projects.
 */
export async function generateProjectPDF(projects: Project[]): Promise<Buffer> {
    const projectDetails = await Promise.all(projects.map(async (p) => {
        const fullPath = path.join(process.cwd(), 'lib/projects', p.filePath);
        const mdContent = fs.readFileSync(fullPath, 'utf8');
        const htmlContent = simpleMarkdownToHtml(mdContent);
        const objective = extractMarkdownSection(mdContent, "Objective");
        const requirements = extractMarkdownSection(mdContent, "Core Requirements");
        const implementation = extractMarkdownSection(mdContent, "Implementation Guide");

        const sectionHtml = `
            <div class="project-section">
                <h2 class="project-title-header">${p.title}</h2>
                <div class="project-body">${htmlContent}</div>
            </div>
            ${projects.indexOf(p) < projects.length - 1 ? '<div class="page-break"></div>' : ''}
        `;
        return { title: p.title, objective, requirements, implementation, sectionHtml };
    }));

    const projectSections = projectDetails.map((d) => d.sectionHtml);
    const projectExplanations = projectDetails.map((d) => `
        <div class="explain-card">
            <h3>${d.title}</h3>
            <p><strong>What you will build:</strong> ${d.objective || "Project details are provided in the full section below."}</p>
            <p><strong>Why this project:</strong> ${d.requirements || "It matches your experience level and helps you practice implementation skills."}</p>
            <p><strong>How to approach:</strong> ${d.implementation || "Follow the implementation guide and code snippets provided in the detailed section."}</p>
        </div>
    `).join("");

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
                .mandatory-note { margin-top: 14px; padding: 12px 14px; border-radius: 10px; background: #fff7ed; border: 1px solid #fdba74; color: #9a3412; font-weight: 700; font-size: 13px; }
                .explain-grid { margin: 24px 0 28px 0; display: grid; grid-template-columns: 1fr; gap: 12px; }
                .explain-card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; background: #ffffff; }
                .explain-card h3 { margin: 0 0 8px 0; color: #1e293b; font-size: 16px; }
                .explain-card p { margin: 6px 0; font-size: 13px; color: #334155; }
                .project-section { margin-top: 20px; }
                .project-title-header { color: #ffffff; background: #4f46e5; padding: 12px 20px; border-radius: 8px; font-size: 22px; margin-bottom: 20px; }
                .project-body { padding: 0 10px; }
                h2 { color: #1e293b; margin-top: 25px; font-size: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
                h3 { color: #334155; margin-top: 20px; font-size: 18px; }
                p { margin-bottom: 15px; }
                li { margin-bottom: 8px; }
                .code-block { background: #0f172a; color: #e2e8f0; padding: 14px; border-radius: 8px; overflow-x: auto; font-size: 12px; line-height: 1.45; }
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
                <div class="mandatory-note">
                    Important: You must complete at least 1 assigned project. You may refer to the project guideline for better understanding and guidance.
                </div>
            </div>

            <div class="explain-grid">
                ${projectExplanations}
            </div>
            
            ${projectSections.join('')}
        </body>
        </html>
    `;

    // 3. Launch Browser using shared utility
    const browser = await launchBrowser();

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
                    <p><strong>Important:</strong> You must complete at least 1 assigned project.</p>
                    <p><strong>Next Steps:</strong></p>
                    <ul>
                        <li>Open the attached PDF to review the project details.</li>
                        <li> You may refer to the project guideline for better understanding and guidance.</li>
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
