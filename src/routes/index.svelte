<script>
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';

    onMount(async () => {
		goto('/list/1', {replacePath: true});
	});
</script>