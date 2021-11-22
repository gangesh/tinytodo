<script>
    import { token, activeItem } from '$lib/stores';

    let item;

    const close = () => { activeItem.set(null); }

    activeItem.subscribe(activeItem => item = activeItem);
</script>

<div class="flex items-center">
    <h2 class="font-bold">Item Details</h2>
    <div class="flex-1 text-right">
        <i on:click={close} class="fas fa-times text-2xl hover:opacity-40 cursor-pointer"/>
    </div>
</div>

<input type="text" placeholder="Subject" class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.subject}>

<textarea placeholder="Notes" rows="5" class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.notes}/>

<input type="text" placeholder="Status" class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.status}>

<input type="text" placeholder="Due Date" class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.due}>

<input type="text" placeholder="Tags" class="block w-full p-2 border border-gray-darkest my-3" bind:value={item.tags}>

<button type="submit" class="mt-3">Submit</button><br><br>