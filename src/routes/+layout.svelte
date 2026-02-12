<script>
	import "../app.css"
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- Header with Navigation -->
<header class="navbar sticky top-0 z-50 bg-base-300 shadow-lg">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn btn-ghost lg:hidden" aria-label="Toggle navigation menu">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
				</svg>
			</button>
			<ul tabindex="-1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
				<li><a href="/">Dashboard</a></li>
				<li><a href="/webshops">Webshops</a></li>
				<li><a href="/articles">Articles</a></li>
				<li><a href="/customers">Customers</a></li>
				<li><a href="/projects">Projects</a></li>
			</ul>
		</div>
		<a href="/" class="btn btn-ghost text-xl font-bold">🔌 CircuitCalc</a>
	</div>

	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">Dashboard</a></li>
			<li><a href="/webshops">Webshops</a></li>
			<li><a href="/articles">Articles</a></li>
			<li><a href="/customers">Customers</a></li>
			<li><a href="/projects">Projects</a></li>
		</ul>
	</div>

	<div class="navbar-end">
		<button class="btn btn-ghost btn-circle" aria-label="Settings">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-9-2m9 2l9-2m-18-8l9-2m9 2m0-8l-9 2m9-2m0 8v8m0 0l-9-2m9 2l9-2" />
			</svg>
		</button>
	</div>
</header>

<!-- Main Content -->
<main class="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 md:p-8">
	<div class="container mx-auto max-w-7xl">
		{@render children()}
	</div>
</main>

<!-- Footer -->
<footer class="footer footer-center p-4 bg-base-300 text-base-content border-t border-base-200">
	<p>© 2026 CircuitCalc | Electrical Component Management System</p>
</footer>
