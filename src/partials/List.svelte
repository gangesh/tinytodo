<script>
    import Item from "./Item.svelte";
    import MenuOverlay from './MenuOverlay.svelte';
    import { lists, fetchData, token } from '$lib/stores';

    export let index;

    let subject = '';
    let token$ = null;

    token.subscribe(token => token$ = token);

    async function addItem() {

        let newItem = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token$
            },
            body: JSON.stringify({subject, listId: $lists[index].id})
        }).then(i => i.json());

        subject = '';
        fetchData(token$);
    }
</script>

<div class="bg-gray-dark p-2 flex">
    <div class="mr-2">
        <form on:submit|preventDefault={addItem}>
            <input class="border-gray-darkest border w-96 p-1 text-sm rounded-md" type="text" bind:value={subject} placeholder="New item">
            <button type="submit" class="hover:opacity-40"><i class="fas fa-plus"/></button>
        </form>
    </div>
    <div class="flex-1 text-right">
        <input class="border-gray-darkest border w-64 p-1 text-sm rounded-md" type="text" placeholder="Search">
    </div>
</div>
<div class="py-3 px-3 flex items-center flex-align border-b-2 border-blue">
    {#if $lists[index]}
        <h2 class="font-bold mr-2">{$lists[index].name} ({$lists[index].items.length})
        <MenuOverlay dir={'left'}>
            <p><i class="fas fa-times"/> Delete list</p>
        </MenuOverlay>
        </h2>
    {/if}
    <div>
        <small>Notes: <a href="#">Show</a> / <a href="#">Hide</a></small> 
    </div>
    <div class="flex-1 text-right">
        <small>Tags <MenuOverlay/></small>
    </div>
</div>
<ul class="h-items my-3 overflow-auto">
    {#if $lists[index]}
        {#each $lists[index].items as item, i}
            <Item item={item}/>
        {/each}
    {/if}
</ul>