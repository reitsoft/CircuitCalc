<script>
	import { onMount } from 'svelte';

	let projects = [];
	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			const res = await fetch('/api/projects');
			if (res.ok) {
				projects = await res.json();
			}
		} catch (error) {
			console.error('Failed to load projects:', error);
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

	function getStatusBadge(status) {
		const colors = {
			draft: 'badge-warning',
			sent: 'badge-success',
			inactive: 'badge-error'
		};
		return colors[status] || 'badge-info';
	}
</script>

<svelte:head>
	<title>Projects - CircuitCalc</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<h1 class="text-3xl font-bold">Projects</h1>
		<button class="btn btn-primary">Create Project</button>
	</div>

	{#if loading}
		<div class="flex justify-center">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else}
		<div class="card bg-base-100 shadow-md">
			<div class="card-body">
				{#if projects.length === 0}
					<p class="text-gray-500">No projects yet. Create one to get started!</p>
				{:else}
					<div class="overflow-x-auto">
						<table class="table table-sm">
							<thead>
								<tr>
									<th>Name</th>
									<th>Customer</th>
									<th>Status</th>
									<th>Total Price</th>
									<th>Articles</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{#each projects as project}
									<tr class="hover">
										<td class="font-semibold">{project.name}</td>
										<td>{project.customerName}</td>
										<td>
											<span class={`badge ${getStatusBadge(project.status)}`}>
												{project.status}
											</span>
										</td>
										<td>{formatPrice(project.totalPrice)}</td>
										<td>{project.articleCount}</td>
										<td>
											<button class="btn btn-sm btn-outline">Edit</button>
										</td>
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
