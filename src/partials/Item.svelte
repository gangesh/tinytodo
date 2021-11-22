<script>
    import { activeItem } from '$lib/stores';
    import MenuOverlay from '../partials/MenuOverlay.svelte';

    export let item;

    const setActive = () => {
        activeItem.set(item);
    }
</script>

<li on:click|self={setActive} class="border-b hover:bg-gray-dark border-gray-dark cursor-pointer p-2 flex">
    <div class="flex-1 font-light" on:click|self={setActive}>
        <input type="checkbox"> {item.subject}
    </div>
    <div class="actions text-right">
        <MenuOverlay icon={'fas fa-ellipsis-v'}>
            <p><i class="fas fa-pencil"/> Edit item</p>
            <p><i class="fas fa-times"/> Delete item</p>
        </MenuOverlay>
    </div>
</li>