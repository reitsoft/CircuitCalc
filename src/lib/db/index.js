
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import {
	articles,
	customers,
	projects,
	projectArticles,
	scrapeLogs
} from './schema.js';

const sqlite = new Database('circuit-calc.db');
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, {
	schema: {
		articles,
		customers,
		projects,
		projectArticles,
		scrapeLogs
	}
});
export { articles, customers, projects, projectArticles, scrapeLogs };
