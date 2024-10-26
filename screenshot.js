const puppeteer = require("puppeteer");
require("dotenv").config();

async function launchConfiguredBrowser() {
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
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
    console.log('Screenshots taken', screenshots);
    return screenshots;
}
async function handleScreenshot(options) {
    const browser = await launchConfiguredBrowser();
    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport(options.viewport);
    const screenshots = await takeScreenshot(options, page);
    await browser.close();
    return screenshots;
}

module.exports = { handleScreenshot };
//# sourceMappingURL=screenshot.js.map