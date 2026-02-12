import puppeteer from 'puppeteer';

/**
 * Scrape articles from a webshop using Puppeteer
 */
export async function scrapeWebshop(url, selector = '.product') {
	let browser;

	try {
		browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});

		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

		const articles = await page.evaluate((sel) => {
			const elements = document.querySelectorAll(sel);
			const results = [];

			elements.forEach((el) => {
				const name = el.querySelector('.product-name')?.textContent?.trim();
				const priceText = el.querySelector('.product-price')?.textContent ?? '0';
				const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

				if (name && price > 0) {
					results.push({
						name,
						manufacturer: el.querySelector('.product-manufacturer')?.textContent?.trim(),
						price,
						packageSize: el.querySelector('.product-package')?.textContent?.trim(),
						category: el.querySelector('.product-category')?.textContent?.trim()
					});
				}
			});

			return results;
		}, selector);

		await browser.close();
		return articles;
	} catch (error) {
		if (browser) await browser.close();
		throw new Error(
			`Scraping fehlgeschlagen: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}
