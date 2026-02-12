import { json } from '@sveltejs/kit';
import { db } from '$lib/db/index.js';

export async function GET() {
	try {
		// TODO: Implement webshop retrieval from database
		return json([]);
	} catch (error) {
		return json({ error: 'Failed to load webshops' }, { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const { url } = await request.json();

		if (!url || !url.startsWith('http')) {
			return json({ error: 'Invalid URL' }, { status: 400 });
		}

		// TODO: Store webshop URL in database

		return json({ success: true, url });
	} catch (error) {
		return json({ error: 'Failed to add webshop' }, { status: 500 });
	}
}
