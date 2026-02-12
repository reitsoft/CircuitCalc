<script>
	import { onMount } from 'svelte';

	let customers = [];
	let newCustomer = {
		name: '',
		email: '',
		phone: '',
		address: '',
		companyName: ''
	};
	let loading = false;
	let showForm = false;

	onMount(async () => {
		await loadCustomers();
	});

	async function loadCustomers() {
		loading = true;
		try {
			const res = await fetch('/api/customers');
			if (res.ok) {
				customers = await res.json();
			}
		} catch (error) {
			console.error('Failed to load customers:', error);
		} finally {
			loading = false;
		}
	}

	async function addCustomer() {
		if (!newCustomer.name) return;

		loading = true;
		try {
			const res = await fetch('/api/customers', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newCustomer)
			});

			if (res.ok) {
				newCustomer = { name: '', email: '', phone: '', address: '', companyName: '' };
				showForm = false;
				await loadCustomers();
			}
		} catch (error) {
			console.error('Failed to add customer:', error);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Customers - CircuitCalc</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<h1 class="text-3xl font-bold">Customers</h1>
		<button class="btn btn-primary" on:click={() => (showForm = !showForm)}>
			{showForm ? 'Cancel' : 'Add Customer'}
		</button>
	</div>

	{#if showForm}
		<div class="card bg-base-100 shadow-md">
			<div class="card-body space-y-4">
				<input
					type="text"
					placeholder="Name"
					bind:value={newCustomer.name}
					class="input input-bordered"
				/>
				<input
					type="email"
					placeholder="Email"
					bind:value={newCustomer.email}
					class="input input-bordered"
				/>
				<input
					type="tel"
					placeholder="Phone"
					bind:value={newCustomer.phone}
					class="input input-bordered"
				/>
				<input
					type="text"
					placeholder="Address"
					bind:value={newCustomer.address}
					class="input input-bordered"
				/>
				<input
					type="text"
					placeholder="Company"
					bind:value={newCustomer.companyName}
					class="input input-bordered"
				/>
				<button
					class="btn btn-success"
					on:click={addCustomer}
					disabled={loading || !newCustomer.name}
				>
					Save Customer
				</button>
			</div>
		</div>
	{/if}

	{#if loading}
		<div class="flex justify-center">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else}
		<div class="card bg-base-100 shadow-md">
			<div class="card-body">
				{#if customers.length === 0}
					<p class="text-gray-500">No customers yet</p>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each customers as customer}
							<div class="border border-base-200 rounded-lg p-4 hover:shadow-md transition">
								<h3 class="font-bold text-lg">{customer.name}</h3>
								{#if customer.companyName}
									<p class="text-sm text-gray-600">{customer.companyName}</p>
								{/if}
								{#if customer.email}
									<p class="text-sm">{customer.email}</p>
								{/if}
								{#if customer.phone}
									<p class="text-sm">{customer.phone}</p>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
