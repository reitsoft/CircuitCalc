<script>
	import { onMount } from 'svelte';

	let articles = [];
	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			const res = await fetch('/api/articles');
			if (res.ok) {
				articles = await res.json();
			}
		} catch (error) {
			console.error('Failed to load articles:', error);
		} finally {
			loading = false;
		}
	});

	function formatPrice(price) {
		return new Intl.NumberFormat('de-DE', {
			style: 'currency',
			currency: 'EUR'
		}).format(price);
	}
</script>

<svelte:head>
	<title>Articles - CircuitCalc</title>
</svelte:head>

<div class="space-y-6">
	<h1 class="text-3xl font-bold">Articles</h1>

	{#if loading}
		<div class="flex justify-center">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else}
		<div class="card bg-base-100 shadow-md">
			<div class="card-body">
				{#if articles.length === 0}
					<p class="text-gray-500">No articles found. Start scraping webshops!</p>
				{:else}
					<div class="overflow-x-auto">
						<table class="table table-sm">
							<thead>
								<tr>
									<th>Name</th>
									<th>Manufacturer</th>
									<th>Price</th>
									<th>Package</th>
									<th>Category</th>
								</tr>
							</thead>
							<tbody>
								{#each articles as article}
									<tr class="hover">
										<td>{article.name}</td>
										<td>{article.manufacturer || '-'}</td>
										<td>{formatPrice(article.purchasePrice)}</td>
										<td>{article.packageSize || '-'}</td>
										<td>{article.category || '-'}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
