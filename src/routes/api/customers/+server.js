import { json } from '@sveltejs/kit';
import { db, customers } from '$lib/db/index.js';
import { customerSchema } from '$lib/utils/validators.js';

export async function GET() {
	try {
		// const allCustomers = await db.select().from(customers);
		// return json(allCustomers);
		return json([]);
	} catch (error) {
		return json({ error: 'Failed to load customers' }, { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const body = await request.json();
		const validated = customerSchema.parse(body);

		// TODO: Save to database
		// await db.insert(customers).values(validated);

		return json({ success: true, customer: validated });
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Invalid input';
		return json({ error: message }, { status: 400 });
	}
}
