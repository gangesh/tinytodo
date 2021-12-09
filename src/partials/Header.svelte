<script>
    import { token, settings } from '$lib/stores';
</script>

<header class="flex mb-3 mt-2">
    <div class="mr-3">
        {#if $settings.title == null}
            <h1 class="text-2xl font-bold"><i class="fas fa-spinner fa-pulse"/> loading...</h1>
        {:else}
            <h1 class="text-2xl font-bold">{$settings.title}</h1>
        {/if}
    </div>
    <div class="border-b border-blue flex-1 text-right">
        {#if $token}
            <small><a href="/settings">Settings</a></small>
            <small><a href="/logout">Log Out</a></small>
        {:else}
            <small><a href="/login">Log In</a></small>
        {/if}
    </div>
</header>