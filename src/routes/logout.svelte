<script>
    import { token, principal } from '$lib/stores';
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
  
    onMount(async () => {
        token.set(null);
        goto('/login', {replacePath: true})
    });
  </script>