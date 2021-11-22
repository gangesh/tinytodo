<script>
    import MenuOverlay from './MenuOverlay.svelte';
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { lists, fetchData, token } from '$lib/stores';

    let name = '';
    let token$ = null;

    token.subscribe(token => token$ = token);

    async function addList() {

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
        <li class="flex items-center mr-3 group">
            <div class="flex-1">
                <a class="block py-1 {$page.path === `/list/${i}` ? 'font-bold' : ''}" href="./{i}">{list.name}</a>
            </div>
            <div class="group-hover:opacity-100 opacity-0 h-full">
                <MenuOverlay dir={'left'} icon={'fas fa-ellipsis-h'}>
                    <p><i class="fas fa-pencil"/> Edit item</p>
                    <p><i class="fas fa-times"/> Delete item</p>
                </MenuOverlay>
            </div>
        </li>
    {/each}
</ul>