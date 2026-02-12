import { json } from '@sveltejs/kit';
import { db, projects } from '$lib/db/index.js';

export async function GET() {
	try {
		// const allProjects = await db.select().from(projects);
		// return json(allProjects);
		return json([]);
	} catch (error) {
		return json({ error: 'Failed to load projects' }, { status: 500 });
	}
}
