<script>
	let showSettings = false;
	import AppInsightsConfig from './AppInsightsConfig.svelte';
	import AppInsightsQuery from './AppInsightsQuery.svelte';
	import AppInsightsResults from './AppInsightsResults.svelte';
</script>

<main>

	<nav class="navbar fixed-top navbar-expand-md navbar-light bg-light">
		<div class="container">
		  <a class="navbar-brand" href="#">App Insights</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarCollapse">
			<!-- left navigation links -->
			<ul class="navbar-nav mr-auto">
	  
			  <!-- active navigation link -->
			  <li class="nav-item active" data-toggle="collapse" data-target=".navbar-collapse.show">
				<a class="nav-link" href="#" on:click="{() => showSettings = false}">Home</a>
			  </li>
	  
			  <!-- regular navigation link -->
			  <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
				<a class="nav-link" href="#" on:click="{() => showSettings = true}">Settings</a>
			</li>
			</ul>
		  </div>
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