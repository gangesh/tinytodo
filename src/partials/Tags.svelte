<script>
    import { tags } from '$lib/stores';
</script>

{#if $tags.length !== 0}
    <div class="bg-gray-dark px-2 pb-2 flex">
        {JSON.stringify($tags)}
    </div>
{/if}