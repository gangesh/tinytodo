<script>
    import { activeItem } from '$lib/stores';
    import MenuOverlay from '../partials/MenuOverlay.svelte';
    import Tooltip from '../partials/Tooltip.svelte';
    import { token, fetchData } from '$lib/stores';
    import { getTimeRemaining, isOverdue, isDueNow, isDueSoon } from '$lib/days';

    export let item;
    export let showNotes = false;

    let due = '';
    $:{ due = `${new Date(item.due).getUTCMonth() + 1}/${new Date(item.due).getUTCDate()}/${new Date(item.due).getUTCFullYear()}` }

    const setActive = () => {
        if ($activeItem === item) { activeItem.set(null); return; }
        activeItem.set(item);
    }

    async function setStatus() {
        const s = item.status === 'TODO' ? 'DONE' : 'TODO';
        let status = await fetch('/api/items', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $token
            },
            body: JSON.stringify({id: item.id, status: s})
        }).then(i => i.json());

        fetchData($token);
    }

    async function deleteItem() {
        const c = confirm("Are you sure you want to delete this item?");
        if (!c) { return }

        let deleteItem = await fetch('/api/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $token
            },
            body: JSON.stringify({id: item.id})
        }).then(i => i.json());

        fetchData($token);
    }
</script>

<li on:click|self={setActive} class="border-b hover:bg-gray-dark border-gray-dark cursor-pointer p-2 flex">
    <div class="group flex-1 font-light" on:click|self={setActive}>
        <input type="checkbox" checked={item.status === 'DONE'} on:change={setStatus}> 
        <span on:click|self={setActive} class="{item.status === 'DONE' ? 'line-through' : ''}">{item.subject}</span>
        {#if showNotes && item.notes}
            <small on:click|self={setActive} class="font-bold"> - {item.notes}</small>
        {/if}
    </div>
    <div on:click={setActive} class="group mr-3">
        {#if isDueSoon(item)}
            <span class="text-yellow">
                due soon
            </span>
        {:else if isDueNow(item)}
            <span class="text-yellow">
                {getTimeRemaining(item.due).days - 1 === 0 ? 'due today' : 'due tomorrow'}
            </span>
        {:else if isOverdue(item)}
            <span class="text-red">
                <i class="fas fa-arrow-left"/> {getTimeRemaining(item.due).days - 1} day{getTimeRemaining(item.due).days - 1 !== 1 ? 's' : ''} ago
            </span>
        {:else if item.due}
            <span>
                <i class="fas fa-arrow-right"/> {getTimeRemaining(item.due).days} day{getTimeRemaining(item.due).days !== 1 ? 's' : ''}
            </span>
        {/if}
        {#if item.due}
            <Tooltip content={`due ${due}`}/>
        {/if}
    </div>
    <div class="group-hover:opacity-100 opacity-0 h-full">
        <MenuOverlay icon={'fas fa-ellipsis-v'}>
            <p on:click={setActive} class="hover:opacity-40 cursor-pointer mb-1">Edit</p>
            <p on:click={deleteItem} class="hover:opacity-40 cursor-pointer">Delete</p>
        </MenuOverlay>
    </div>
</li>