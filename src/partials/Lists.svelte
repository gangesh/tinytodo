<script>
    import MenuOverlay from './MenuOverlay.svelte';
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { lists, fetchData, token, filter, search, tags } from '$lib/stores';
    import { browser } from "$app/env";

    let name = '';
    let token$ = null;

    token.subscribe(token => token$ = token);

    const navigate = (id) => {
        goto(`./${id}`, {replaceState: true});
        search.set(null);
        tags.set([]);
        filter.set('ALL');
    }

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

    async function renameList(list) {
        const p = prompt("Are you sure you want to delete this list?", list.name);
        if (!p) { return }

        let renameList = await fetch('/api/lists', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $token
            },
            body: JSON.stringify({id: list.id, name: p})
        }).then(i => i.json());

        fetchData($token);
    }

    async function setSort(list, order) {
        
        let orderList = await fetch('/api/lists', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $token
            },
            body: JSON.stringify({id: list.id, order})
        }).then(i => i.json());

        fetchData($token);
    }

    async function deleteList(list) {
        const c = confirm("Are you sure you want to delete this list?");
        if (!c) { return }

        let deleteList = await fetch('/api/lists', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $token
            },
            body: JSON.stringify({id: list.id})
        }).then(i => i.json());

        fetchData($token);
    }
</script>

<ul class="mt-2.5">
    <li class="mb-3.5">
        <form on:submit|preventDefault={addList}>
            <input class="border-gray-darkest border w-34 p-1 text-sm rounded-md" type="text" bind:value={name} placeholder="New list">
            <button type="submit" class="hover:opacity-40"><i class="fas fa-plus"/></button>
        </form>
    </li>
    {#each $lists as list, i}
        <li class="flex items-center mr-5 group">
            <div class="flex-1">
                <p on:click={() => navigate(i)} class="block cursor-pointer py-1 {$page.path === `/list/${i}` ? 'font-bold' : ''}">{list.name}</p>
            </div>
            <div class="group-hover:opacity-100 opacity-0 h-full">
                <MenuOverlay dir={'left'} icon={'fas fa-ellipsis-h'}>
                    <p on:click={renameList(list)} class="hover:opacity-40 cursor-pointer mb-1">Rename list</p>
                    <p on:click={deleteList(list)} class="hover:opacity-40 cursor-pointer mb-1">Delete list</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Clear completed tasks</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Export as CSV</p>
                    <p class="hover:opacity-40 cursor-pointer mb-1">Export as iCal</p>
                    <hr>
                    <p class="hover:opacity-40 cursor-pointer mt-1 mb-1">Publish RSS feed</p>
                    <hr>
                    <!-- <p class="hover:opacity-40 cursor-pointer mt-1 mb-1">Sort by hand</p> -->
                    <p on:click={() => setSort(list, 'CREATED')} class="hover:opacity-40 cursor-pointer mb-1 mt-1"><input class="pointer-events-none" checked={list.order === 'CREATED'} type="radio"> Sort by date created</p>
                    <p on:click={() => setSort(list, 'PRIORITY')} class="hover:opacity-40 cursor-pointer mb-1"><input class="pointer-events-none" checked={list.order === 'PRIORITY'} type="radio"> Sort by priority</p>
                    <p on:click={() => setSort(list, 'DUE')} class="hover:opacity-40 cursor-pointer mb-1"><input class="pointer-events-none" checked={list.order === 'DUE'} type="radio"> Sort by due date</p>
                    <p on:click={() => setSort(list, 'MODIFIED')} class="hover:opacity-40 cursor-pointer"><input class="pointer-events-none" checked={list.order === 'MODIFIED'} type="radio"> Sort by date modified</p>
                    <!-- <hr> -->
                    <!-- <p class="hover:opacity-40 cursor-pointer mt-1">Hide completed tasks</p> -->
                </MenuOverlay>
            </div>
        </li>
    {/each}
    
</ul>