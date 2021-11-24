<script>
  import { token, principal } from '$lib/stores';
  import {goto} from '$app/navigation';
  import {onMount} from 'svelte';

  onMount(async () => {
    token.subscribe(token => {
      token ? goto('/list/0', {replacePath: true}) : goto('/login', {replacePath: true});
    });
  });
</script>