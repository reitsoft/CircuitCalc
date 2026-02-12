import { json } from '@sveltejs/kit';
import { db, scrapeLogs } from '$lib/db/index.js';

export async function GET() {
	try {
		const logs = await db.select().from(scrapeLogs).limit(10);

		return json({
			metrics: [
				{ label: 'Total Articles', value: 0 },
				{ label: 'Total Customers', value: 0 },
				{ label: 'Active Projects', value: 0 },
				{ label: 'Recent Scrapes', value: logs.length }
			],
			recentActivity: logs.map((log) => `Scraped ${log.scrapedCount} from ${log.webshopUrl}`)
		});
	} catch (error) {
		console.error('Dashboard error:', error);
		return json(
			{
				metrics: [
					{ label: 'Total Articles', value: 0 },
					{ label: 'Total Customers', value: 0 },
					{ label: 'Active Projects', value: 0 },
					{ label: 'Recent Scrapes', value: 0 }
				],
				recentActivity: []
			},
			{ status: 500 }
		);
	}
}
