<script>
	let showSettings = false;
	import AppInsightsConfig from './AppInsightsConfig.svelte';
	import AppInsightsQuery from './AppInsightsQuery.svelte';
	import AppInsightsResults from './AppInsightsResults.svelte';
</script>

<main>

	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="navbar-brand">App Insights</div>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<button class="nav-link" on:click="{() => showSettings = false}">Home</button>
				</li>
				<li class="nav-item">
					<button class="nav-link" on:click="{() => showSettings = true}">Settings</button>
				</li>
			</ul>
		</div>
	</nav>
	{#if showSettings}
	<AppInsightsConfig />
	{:else}
	<AppInsightsQuery />
	<AppInsightsResults />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>