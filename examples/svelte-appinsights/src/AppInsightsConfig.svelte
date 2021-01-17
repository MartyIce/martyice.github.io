<script>
    import { secretKey, appId } from "./stores.js";
</script>

<div class="row">
    <div class="col-3 text-right">
        Application Id:
    </div>
    <div class="col-9">
        <input bind:value={$appId} />
    </div>
</div>
<div class="row">
    <div class="col-3 text-right">
        Application Secret Key:
    </div>
    <div class="col-9">
        <input bind:value={$secretKey} />
    </div>
</div>

<style>
	input {
		width: 100%;
	}	
</style>
