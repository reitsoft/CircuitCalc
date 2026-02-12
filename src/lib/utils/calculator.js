/**
 * Calculate selling price based on purchase price and markup percentage
 * Formula: selling_price = purchase_price * (1 + markup_percentage / 100)
 */
export function calculateSellingPrice(purchasePrice, markupPercentage) {
	const result = purchasePrice * (1 + markupPercentage / 100);
	return Math.round(result * 100) / 100;
}

/**
 * Calculate total project price from articles
 */
export function calculateProjectTotal(articles, markupPercentage) {
	const total = articles.reduce((sum, item) => {
		const sellingPrice = calculateSellingPrice(item.purchasePrice, markupPercentage);
		return sum + sellingPrice * item.quantity;
	}, 0);

	return Math.round(total * 100) / 100;
}

/**
 * Format number as currency (EUR, German locale)
 */
export function formatCurrency(value) {
	return new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR'
	}).format(value);
}

/**
 * Format number with specified decimal places
 */
export function formatNumber(value, decimals = 2) {
	return value.toFixed(decimals);
}
