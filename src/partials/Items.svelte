<script>
    import Item from "./Item.svelte";
    import MenuOverlay from './MenuOverlay.svelte';
    import { lists, fetchData, token, search, filter, tags, settings } from '$lib/stores';
    import { filters } from '$lib/dict';
    import { addTag } from '$lib/tags';
    import Tags from './Tags.svelte';
    import { sort } from "$lib/sort";

    export let index;

    let subject = '';
    let notes = false;
    let items = [];
    let tags$ = [];

    $: {
        search.subscribe(i => {
            if (!$lists[index]) { return; }
            window.setTimeout(() => {
                generateItems();
            }, 100)
        });

        tags.subscribe(i => {
            if (!$lists[index]) { return; }
            window.setTimeout(() => {
                generateItems();
            }, 100)
        });

        tags$ = $lists[index]?.items[$filter]
            .flatMap(i => i.tags)
            .filter(i => i !== null)
            .flatMap(i => i.split(','))
            .map(i => i.trim())
            .filter(unique) || [];
    }

    const generateItems = () => {
        let payload = $lists[index].items[$filter];
        if ($search) {
            payload = payload.filter(item => item.subject.toLowerCase().indexOf($search.toLowerCase()) !== -1)
        }
        if ($tags.length !== 0) {
            $tags.forEach(tag => {
                payload = payload.filter(i => i.tags && i.tags.indexOf(tag) !== -1);
            });
        }
        payload = sort(payload, $lists[index].order);
        items = payload;
    }

    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    }

    const showNotes = () => { notes = true; }
    const hideNotes = () => { notes = false; }

    async function addItem() {
        if (subject.trim() === '') { return }
        const appendTags = $settings.autoTagging == 'true' ? $tags.join(', ') : '';
        let newItem = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $token
            },
            body: JSON.stringify({subject, tags: appendTags, listId: $lists[index].id})
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
<Tags/>
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
                {#if tags$.length !== 0}
                    {#each tags$ as tag, i}
                        <p on:click={() => addTag(tag.trim(), $tags)} class="hover:opacity-40 cursor-pointer mb-1">{tag.trim()}</p>
                    {/each}
                {:else}
                    <p>No tags to filter by.</p>
                {/if}
            </MenuOverlay>
        </small>
    </div>
</div>
<ul class="h-items my-3 overflow-auto">
    {#each items as item, i}
        <Item item={item} showNotes={notes}/>
    {/each}
</ul>