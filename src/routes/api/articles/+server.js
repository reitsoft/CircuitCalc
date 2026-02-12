import { json } from '@sveltejs/kit';
import { db, articles } from '$lib/db/index.js';

export async function GET() {
	try {
		// const allArticles = await db.select().from(articles);
		// return json(allArticles);
		return json([]);
	} catch (error) {
		return json({ error: 'Failed to load articles' }, { status: 500 });
	}
}
