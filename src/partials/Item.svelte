<script>
    import { activeItem } from '$lib/stores';
    import MenuOverlay from '../partials/MenuOverlay.svelte';

    export let item;
    export let showNotes = false;

    const setActive = () => {
        activeItem.set(item);
    }
</script>

<li on:click|self={setActive} class="group border-b hover:bg-gray-dark border-gray-dark cursor-pointer p-2 flex">
    <div class="flex-1 font-light" on:click|self={setActive}>
        <input type="checkbox"> {item.subject}
        {#if showNotes && item.notes}
            <small class="font-bold">- {item.notes}</small>
        {/if}
    </div>
    <div class="group-hover:opacity-100 opacity-0 h-full">
        <MenuOverlay icon={'fas fa-ellipsis-v'}>
            <p class="hover:opacity-40 cursor-pointer mb-1">Edit</p>
            <p class="hover:opacity-40 cursor-pointer">Delete</p>
        </MenuOverlay>
    </div>
</li>