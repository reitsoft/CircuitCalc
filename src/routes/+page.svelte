<script>
	import { onMount } from 'svelte';

	let metrics = [];
	let recentActivity = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			const res = await fetch('/api/dashboard');
			if (res.ok) {
				const data = await res.json();
				metrics = data.metrics;
				recentActivity = data.recentActivity;
			} else {
				error = 'Failed to load dashboard';
			}
		} catch (err) {
			console.error('Dashboard error:', err);
			error = 'Error loading dashboard';
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Dashboard - CircuitCalc</title>
</svelte:head>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold mb-2">Dashboard</h1>
		<p class="text-gray-600">Welcome to CircuitCalc - Electrical Component Management System</p>
	</div>

	<!-- Error Message -->
	{#if error}
		<div class="alert alert-error">
			<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2M9 3h6a3 3 0 013 3v6a3 3 0 01-3 3H9a3 3 0 01-3-3V6a3 3 0 013-3z" />
			</svg>
			<span>{error}</span>
		</div>
	{/if}

	{#if loading}
		<div class="flex justify-center items-center py-20">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else}
		<!-- Metrics Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each metrics as metric}
				<div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
					<div class="card-body">
						<h3 class="card-title text-lg">{metric.label}</h3>
						<p class="text-3xl font-bold text-primary mt-2">{metric.value}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<!-- Welcome Card -->
			<div class="lg:col-span-2">
				<div class="card bg-base-100 shadow-md">
					<div class="card-body">
						<h2 class="card-title mb-4">Getting Started</h2>
						<div class="prose prose-sm max-w-none">
							<ol class="list-decimal list-inside space-y-3 text-sm">
								<li>
									<strong>Add Webshops:</strong>
									<a href="/webshops" class="link link-primary">Go to Webshops</a>
									and add URLs of online shops to scrape for electrical components
								</li>
								<li>
									<strong>Browse Articles:</strong>
									Check the scraped articles in the
									<a href="/articles" class="link link-primary">Articles</a>
									section
								</li>
								<li>
									<strong>Manage Customers:</strong>
									Create customer profiles in the
									<a href="/customers" class="link link-primary">Customers</a>
									section
								</li>
								<li>
									<strong>Create Projects:</strong>
									Build custom offers by linking articles to customers in
									<a href="/projects" class="link link-primary">Projects</a>
								</li>
								<li><strong>Generate Offers:</strong> Export professional PDF offers for your customers</li>
							</ol>
						</div>
					</div>
				</div>
			</div>

			<!-- Activity Feed -->
			<div class="card bg-base-100 shadow-md">
				<div class="card-body">
					<h2 class="card-title mb-4">Recent Activity</h2>
					{#if recentActivity.length === 0}
						<p class="text-gray-500 text-sm">No recent activity</p>
					{:else}
						<ul class="space-y-2">
							{#each recentActivity.slice(0, 5) as activity}
								<li class="text-sm text-gray-600 border-l-2 border-primary pl-3">{activity}</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
