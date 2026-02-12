import * as z from 'zod';

export const webshopUrlSchema = z
	.string()
	.url('URL Format ungültig')
	.refine(
		(url) => url.startsWith('https://') || url.startsWith('http://'),
		'URL muss mit http:// oder https:// beginnen'
	);

export const articleSchema = z.object({
	name: z.string().min(1, 'Artikel Name erforderlich'),
	manufacturer: z.string().optional(),
	purchasePrice: z
		.number()
		.positive('Einkaufspreis muss positiv sein')
		.min(0.01, 'Preis zu klein'),
	packageSize: z.string().optional(),
	category: z.string().optional()
});

export const customerSchema = z.object({
	name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
	email: z.string().email('Email Format ungültig').optional().or(z.literal('')),
	phone: z.string().optional(),
	address: z.string().optional(),
	companyName: z.string().optional()
});

export const projectSchema = z.object({
	name: z.string().min(1, 'Projek Name erforderlich'),
	customerId: z.number().int().positive('Gültiger Kunde erforderlich'),
	markupPercentage: z
		.number()
		.min(0, 'Markup muss nicht-negativ sein')
		.max(1000, 'Markup zu hoch')
});
