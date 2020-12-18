<script>
    export let appInsightsQuery;
    export let appInsightsApplicationId;
    export let appInsightsSecretKey;
    import AppInsightsRepository from './AppInsightsRepository.js';
    
    let aiRepository = new AppInsightsRepository();

	async function executeQuery() {
        // event handler code goes here
        console.log(appInsightsQuery);
        /*
        let promise = await aiRepository.Execute(appInsightsApplicationId, appInsightsSecretKey, appInsightsQuery);
        var results = await promise.text();
        console.log(results)
        */
	}

</script>

<button on:click={executeQuery}>
    Execute
</button>
<div>
Results:
</div>
