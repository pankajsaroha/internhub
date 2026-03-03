import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import fs from 'fs';

/**
 * Launches a puppeteer browser instance with environment-aware configuration.
 * Local Windows: Uses installed Chrome or Edge.
 * Production (Vercel): Uses @sparticuz/chromium.
 */
export async function launchBrowser() {
    const isWindows = process.platform === 'win32';

    if (isWindows) {
        // Local Windows Development: Search for local Chrome/Edge
        const possiblePaths = [
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        ];

        let executablePath = '';
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                executablePath = p;
                break;
            }
        }

        if (!executablePath) {
            throw new Error("Could not find a local Chrome or Edge installation for PDF generation.");
        }

        return await puppeteer.launch({
            executablePath,
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    } else {
        // Production (Vercel/Linux): Use @sparticuz/chromium
        return await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: (chromium.headless as unknown) === "new" ? true : (chromium.headless as boolean | "shell"),
        });
    }
}
