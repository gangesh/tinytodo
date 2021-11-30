<script>
    import Item from "./Item.svelte";
    import MenuOverlay from './MenuOverlay.svelte';
    import { lists, fetchData, token, search } from '$lib/stores';
    import { isOverdue, isDueNow, isDueSoon } from '$lib/days';
    import { filters } from '$lib/dict';

    export let index;

    let subject = '';
    let notes = false;

    search.subscribe(() => { 
        // This is kinda kludgy. It may be better to add a debounce.
        if (!document.getElementById('search')) { return; }
        setTimeout(() => {
            document.getElementById('search').focus(); 
        }, 5);
    })

    const showNotes = () => { notes = true; }
    const hideNotes = () => { notes = false; }

    async function addItem() {
        if (subject.trim() === '') { return }
        let newItem = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $token
            },
            body: JSON.stringify({subject, listId: $lists[index].id})
        }).then(i => i.json());

        subject = '';
        fetchData($token);
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
        <input id="search" class="border-gray-darkest border w-64 p-1 text-sm rounded-md" type="text" bind:value={$search} placeholder="Search">
    </div>
</div>
<div class="py-3 px-3 flex items-center flex-align border-b-2 border-blue">
    {#if $lists[index]}
        <h2 class="font-bold mr-2">{filters[$filter]} ({$lists[index].items[$filter].length})
        <MenuOverlay dir={'left'}>
            {#each Object.keys(filters) as filter$, i}
                <p on:click={() => filter.set(filter$)} class="hover:opacity-40 cursor-pointer {i === Object.keys(filters).length - 1 ? '' : 'mb-1'}">
                    {filters[filter$]} ({$lists[index].items[filter$].length})
                </p>
            {/each}
        </MenuOverlay>
        </h2>
    {/if}
    <div>
        <small>Notes: <span class="{notes ? 'font-bold' : ''} cursor-pointer" on:click={showNotes}>Show</span>
        / 
        <span class="{notes ? '' : 'font-bold'} cursor-pointer" on:click={hideNotes}>Hide</span></small> 
    </div>
    <div class="flex-1 text-right">
        <small>Tags 
            <MenuOverlay>
                <p>No tags to filter by.</p>
            </MenuOverlay>
        </small>
    </div>
</div>
<ul class="h-items my-3 overflow-auto">
    {#each $lists[index].items[$filter] as item, i}
        <Item item={item} showNotes={notes}/>
    {/each}
</ul>