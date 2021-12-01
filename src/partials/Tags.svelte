<script>
    import { tags } from '$lib/stores';
    import { removeTag } from '$lib/tags';
</script>

{#if $tags.length !== 0}
    <div class="bg-gray-dark px-2 pb-2 flex">
        {#each $tags as tag, i}
            <button class="flex items-center bg-white mr-2 px-1 border border-gray-darkest rounded-md" on:click={() => removeTag(tag, $tags) }>
                {tag}
                <small><i class="fas mx-1 mt-1.5 text-gray-darkest fa-times"/></small>
            </button>
        {/each}
    </div>
{/if}