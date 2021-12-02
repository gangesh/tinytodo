<script>
    import { token, activeItem, lists, fetchData } from '$lib/stores';

    let item;

    const close = () => { activeItem.set(null); }

    activeItem.subscribe(activeItem => item = Object.assign({}, activeItem));

    async function updateItem() {

        let update = await fetch('/api/items', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $token
            },
            body: JSON.stringify(item)
        }).then(i => i.json());

        fetchData($token);
        close();
    }
</script>

<div class="flex items-center">
    <h2 class="font-bold">Item Details</h2>
    <div class="flex-1 text-right">
        <i on:click={close} class="fas fa-times text-2xl hover:opacity-40 cursor-pointer"/>
    </div>
</div>

<form on:submit|preventDefault={updateItem}>
    <input type="text" placeholder="Subject" class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.subject}>
    <textarea placeholder="Notes" rows="5" class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.notes}/>
    <select class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.status}>
        <option value="TODO">To Do</option>
        <option value="DONE">Done</option>
    </select>
    <input type="date" placeholder="Due Date" class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.due}>
    <input type="text" placeholder="Tags (comma-separated)" class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.tags}>
    <select class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.priority}>
        <option value="{2}">+2</option>
        <option value="{1}">+1</option>
        <option value="{0}">0</option>
        <option value="{-1}">-1</option>
    </select>
    <select class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.listId}>
        {#each $lists as list, i}
            <option value="{list.id}">{list.name}</option>
        {/each}
    </select>
    <button type="submit" class="mt-3">Submit</button><br><br>
</form>