<script>
    import { secretKey, appId } from "./stores.js";
</script>

<div class="row">ApplicationId: <input bind:value={$appId} /></div>
<div class="row">ApplicationSecretKey: <input bind:value={$secretKey} /></div>
