<script>
    import Lists from '../../partials/Lists.svelte';
    import Items from '../../partials/Items.svelte';
    import Drawer from '../../partials/Drawer.svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { token, lists, activeItem } from '$lib/stores';
    import { onMount } from 'svelte';

    let page$ = null;

    page.subscribe(page => {
        page$ = page;
    });

    onMount(async () => {
        token.subscribe(token => {
            if (!token) { goto('/login', {replacePath: true}); }
        });
    });
</script>

<div class="flex">
    {#if page$ && $lists}
        <div class="w-48 border-r border-gray-dark">
            <Lists/>
        </div>
        <div class="flex-1">
            {#if $lists.length !== 0}
                <Items index={page$.params.id}/>
            {/if}
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<div class="
    bg-white 
    w-80
    {$activeItem ? 'right-0' : '-right-80'}
    absolute 
    transition-all
    duration-500
    top-0 
    h-screen border-l 
    border-gray-darkest 
    p-3">
        {#if $activeItem}
            <Drawer/>
        {/if}
</div> 


