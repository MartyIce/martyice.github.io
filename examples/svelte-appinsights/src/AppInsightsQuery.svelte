<script>
    import { query } from './stores.js';
</script>

<div class="row">
    <div class="col-3 text-right">
        Query:
    </div>
    <div class="col-9">
        <textarea bind:value={$query}/>
    </div>
</div>

<style>
	textarea {
		width: 100%;
		-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
		-moz-box-sizing: border-box;    /* Firefox, other Gecko */
		box-sizing: border-box;         /* Opera/IE 8+ */
	}	
</style>
