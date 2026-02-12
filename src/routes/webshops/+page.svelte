<script>
	import { onMount } from 'svelte';

	let webshops = [];
	let newUrl = '';
	let loading = false;
	let scraping = false;

	onMount(async () => {
		await loadWebshops();
	});

	async function loadWebshops() {
		loading = true;
		try {
			const res = await fetch('/api/webshops');
			if (res.ok) {
				webshops = await res.json();
			}
		} catch (error) {
			console.error('Failed to load webshops:', error);
		} finally {
			loading = false;
		}
	}

	async function addWebshop() {
		if (!newUrl.trim()) return;

		loading = true;
		try {
			const res = await fetch('/api/webshops', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url: newUrl })
			});

			if (res.ok) {
				newUrl = '';
				await loadWebshops();
			}
		} catch (error) {
			console.error('Failed to add webshop:', error);
		} finally {
			loading = false;
		}
	}

	async function startScrape(url) {
		scraping = true;
		try {
			const res = await fetch('/api/scrape', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url })
			});

			if (res.ok) {
				const result = await res.json();
				alert(`Scraped ${result.count} articles from ${url}`);
				await loadWebshops();
			}
		} catch (error) {
			console.error('Scraping failed:', error);
			alert('Scraping failed');
		} finally {
			scraping = false;
		}
	}
</script>

<svelte:head>
	<title>Webshops - CircuitCalc</title>
</svelte:head>

<div class="space-y-6">
	<h1 class="text-3xl font-bold">Webshops</h1>

	<!-- Add New Webshop -->
	<div class="card bg-base-100 shadow-md">
		<div class="card-body">
			<h2 class="card-title">Add New Webshop</h2>
			<div class="flex gap-2">
				<input
					type="url"
					placeholder="https://example.com"
					bind:value={newUrl}
					class="input input-bordered flex-1"
					disabled={loading}
				/>
				<button class="btn btn-primary" on:click={addWebshop} disabled={loading || !newUrl.trim()}>
					{#if loading}
						<span class="loading loading-spinner loading-sm"></span>
					{:else}
						Add
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Webshop List -->
	<div class="card bg-base-100 shadow-md">
		<div class="card-body">
			<h2 class="card-title">Managed Webshops</h2>

			{#if webshops.length === 0}
				<p class="text-gray-500">No webshops added yet</p>
			{:else}
				<div class="overflow-x-auto">
					<table class="table table-sm">
						<thead>
							<tr>
								<th>URL</th>
								<th>Articles</th>
								<th>Last Scraped</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each webshops as shop}
								<tr class="hover">
									<td>
										<a href={shop.url} target="_blank" rel="noopener noreferrer" class="link link-primary">
											{shop.url}
										</a>
									</td>
									<td>{shop.articleCount || 0}</td>
									<td>{shop.lastScraped || 'Never'}</td>
									<td>
										<button
											class="btn btn-sm btn-outline"
											on:click={() => startScrape(shop.url)}
											disabled={scraping}
										>
											{#if scraping}
												<span class="loading loading-spinner loading-xs"></span>
											{:else}
												Scrape
											{/if}
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</div>
</div>
