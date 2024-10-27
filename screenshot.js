import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

async function launchConfiguredBrowser() {
    const browser = await puppeteer.launch({
        // headless: true, // default option
        // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,

        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
            // "--force-dark-mode"
            // "--disable-setuid-sandbox",
            // "--disable-dev-shm-usage",
            // "--disable-web-security",
            // "--disable-features=IsolateOrigins,site-per-process",
            // "--disable-background-networking",
            // "--disable-background-timer-throttling",
            // "--disable-backgrounding-occluded-windows",
            // "--disable-breakpad",
            // "--disable-client-side-phishing-detection",
            // "--disable-component-update",
            // "--disable-default-apps",
            // "--disable-domain-reliability",
            "--disable-extensions",
            // "--disable-features=AudioServiceOutOfProcess",
            // "--disable-hang-monitor",
            // "--disable-ipc-flooding-protection",
            // "--disable-notifications",
            // "--disable-offer-store-unmasked-wallet-cards",
            // "--disable-print-preview",
            // "--disable-prompt-on-repost",
            // "--disable-renderer-backgrounding",
            // "--disable-sync",
            // "--disable-translate",
            // "--metrics-recording-only",
            // "--no-first-run",
            // "--safebrowsing-disable-auto-update",
            // "--enable-automation",
            // "--password-store=basic",
            // "--use-mock-keychain",
        ],
        executablePath: process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
    });
    return browser;
}
async function takeScreenshot(options, page) {
    if (typeof options.url !== 'string') {
        throw new Error('No url provided');
    }
    await page.goto(options.url, { waitUntil: 'networkidle0' });
    await page.setViewport(options.viewport);
    const height = await page.evaluate(() => document.body.scrollHeight);
    const screenshots = [];
    for (let offset = 0; offset < height; offset += options.imageHeight) {
        await page.evaluate((offset) => window.scrollTo(0, offset), offset);
        const screenshot = await page.screenshot({
            fullPage: false,
            clip: {
                x: 0,
                y: offset,
                width: options.viewport.width,
                height: Math.min(options.imageHeight, height - offset),
            },
        });
        screenshots.push(screenshot);
    }
    return screenshots;
}
export async function handleScreenshot(options) {
    const browser = await launchConfiguredBrowser();
    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport(options.viewport);
    const screenshots = await takeScreenshot(options, page);
    await browser.close();
    return screenshots;
}
