<script>
    import { settings } from "$lib/stores";

    const handleUpdate = () => {

    }
</script>

<form on:submit|preventDefault={handleUpdate} class="border border-gray-darkest p-3">
    <h1 class="font-bold text-xl">Settings</h1>
    <input type="text" bind:value={$settings.title} placeholder="Site Title" class="block w-64 p-2 border border-gray-darkest my-3">
    <button type="submit" class="mt-3">Submit</button><br><br>
    <a href="../"><i class="fas fa-arrow-left"/> Go back</a>
</form>
