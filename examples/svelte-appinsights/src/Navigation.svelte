<script>
    import { showSettings } from './stores.js';
</script>

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
			<li class="nav-item {$showSettings === false ? 'active' : ''}" data-toggle="collapse" data-target=".navbar-collapse.show">
			<a class="nav-link" href="#" on:click="{() => $showSettings = false}">Home</a>
			</li>
	
			<!-- regular navigation link -->
			<li class="nav-item {$showSettings === true ? 'active' : ''}" data-toggle="collapse" data-target=".navbar-collapse.show">
			<a class="nav-link" href="#" on:click="{() => $showSettings = true}">Settings</a>
		</li>
		</ul>
		</div>
	</div>
</nav>
