<script>
    import Item from "./Item.svelte";
    import MenuOverlay from './MenuOverlay.svelte';
    import { lists, fetchData, token } from '$lib/stores';
    import { isOverdue, isDueNow, isDueSoon } from '$lib/days';

    export let index;

    let subject = '';
    let notes = false;

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
        <input class="border-gray-darkest border w-64 p-1 text-sm rounded-md" type="text" placeholder="Search">
    </div>
</div>
<div class="py-3 px-3 flex items-center flex-align border-b-2 border-blue">
    {#if $lists[index]}
        <h2 class="font-bold mr-2">{$lists[index].name} ({$lists[index].items.length})
        <MenuOverlay dir={'left'}>
            <p class="hover:opacity-40 cursor-pointer mb-1">All Tasks ({$lists[index].items.length})</p>
            <p class="hover:opacity-40 cursor-pointer mb-1">To Do ({$lists[index].items.filter(i => i.status === 'TODO').length})</p>
            <p class="hover:opacity-40 cursor-pointer mb-1">Overdue ({$lists[index].items.filter(i => isOverdue(i)).length})</p>
            <p class="hover:opacity-40 cursor-pointer mb-1">Today / Tomorrow ({$lists[index].items.filter(i => isDueNow(i)).length})</p>
            <p class="hover:opacity-40 cursor-pointer mb-1">Soon ({$lists[index].items.filter(i => isDueSoon(i)).length})</p>
            <p class="hover:opacity-40 cursor-pointer">Done ({$lists[index].items.filter(i => i.status === 'DONE').length})</p>
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
    {#if $lists[index]}
        {#each $lists[index].items as item, i}
            <Item item={item} showNotes={notes}/>
        {/each}
    {/if}
</ul>