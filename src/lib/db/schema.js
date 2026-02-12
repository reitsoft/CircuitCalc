import { integer, real, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// Articles from scraped webshops
export const articles = sqliteTable('articles', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	manufacturer: text('manufacturer'),
	purchasePrice: real('purchase_price').notNull(),
	packageSize: text('package_size'),
	category: text('category'),
	webshopUrl: text('webshop_url'),
	scrapedDate: integer('scraped_date').default(Date.now),
	createdAt: integer('created_at').default(Date.now)
});

// Customers
export const customers = sqliteTable('customers', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email'),
	phone: text('phone'),
	address: text('address'),
	companyName: text('company_name'),
	createdAt: integer('created_at').default(Date.now)
});

// Projects linking customers to articles
export const projects = sqliteTable('projects', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	customerId: integer('customer_id').notNull().references(() => customers.id),
	status: text('status').default('draft'), // draft, inactive, sent
	totalPrice: real('total_price').default(0),
	markupPercentage: real('markup_percentage').default(30),
	createdAt: integer('created_at').default(Date.now),
	updatedAt: integer('updated_at').default(Date.now)
});

// Junction table: Projects to Articles
export const projectArticles = sqliteTable('project_articles', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	projectId: integer('project_id').notNull().references(() => projects.id),
	articleId: integer('article_id').notNull().references(() => articles.id),
	quantity: integer('quantity').default(1),
	sellingPrice: real('selling_price')
});

// Scraping logs for audit trail
export const scrapeLogs = sqliteTable('scrape_logs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	webshopUrl: text('webshop_url').notNull(),
	scrapedCount: integer('scraped_count').default(0),
	errorMessage: text('error_message'),
	timestamp: integer('timestamp').default(Date.now)
});

// Relations
export const projectsRelations = relations(projects, ({ one, many }) => ({
	customer: one(customers, {
		fields: [projects.customerId],
		references: [customers.id]
	}),
	projectArticles: many(projectArticles)
}));

export const projectArticlesRelations = relations(projectArticles, ({ one }) => ({
	project: one(projects, {
		fields: [projectArticles.projectId],
		references: [projects.id]
	}),
	article: one(articles, {
		fields: [projectArticles.articleId],
		references: [articles.id]
	})
}));

export const customersRelations = relations(customers, ({ many }) => ({
	projects: many(projects)
}));
