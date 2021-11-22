<script>
    import MenuOverlay from './MenuOverlay.svelte';
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { lists, fetchData, token } from '$lib/stores';

    let name = '';
    let token$ = null;

    token.subscribe(token => token$ = token);

    async function addList() {
        if (name.trim() === '') { return }
        let newList = await fetch('/api/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token$
            },
            body: JSON.stringify({name})
        }).then(i => i.json());

        name = '';
        fetchData(token$);
        goto(`/list/${$lists.length}`, {replacePath: true})
    }
</script>

<ul class="mt-2.5">
    <li>
        <form on:submit|preventDefault={addList}>
            <input class="border-gray-darkest border w-34 p-1 text-sm rounded-md" type="text" bind:value={name} placeholder="New list">
            <button type="submit" class="hover:opacity-40"><i class="fas fa-plus"/></button>
        </form>
    </li>
    {#each $lists as list, i}
        <li class="flex items-center mr-5 group">
            <div class="flex-1">
                <a class="block py-1 {$page.path === `/list/${i}` ? 'font-bold' : ''}" href="./{i}">{list.name}</a>
            </div>
            <div class="group-hover:opacity-100 opacity-0 h-full">
                <MenuOverlay dir={'left'} icon={'fas fa-ellipsis-h'}>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Rename list</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Delete list</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Clear completed tasks</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Export as CSV</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Export as iCal</p>
                    <hr>
                    <p class="hover:opacity-40 cursor-pointer mt-1 mb-1">Publish RSS feed</p>
                    <hr>
                    <p class="hover:opacity-40 cursor-pointer mt-1 mb-1">Sort by hand</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Sort by date created</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Sort by priority</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Sort by due date</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Sort by date modified</p>
                    <hr>
                    <p class="hover:opacity-40 cursor-pointer mt-1">Show completed tasks</p>
                </MenuOverlay>
            </div>
        </li>
    {/each}
</ul>