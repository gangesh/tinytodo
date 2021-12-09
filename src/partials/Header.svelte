<script>
    import { token, settings, loading } from '$lib/stores';
</script>

<header class="flex mb-3 mt-2">
    <div class="mr-3">
            <h1 class="text-2xl font-bold">
                {#if $settings.title == null}
                    myTinyTodo
                {:else}
                    {$settings.title}
                {/if}
                {#if $loading}<i class="fas fa-spinner fa-pulse"/>{/if}
            </h1>        
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