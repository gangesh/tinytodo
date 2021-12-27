<script>
	import { token, settings, loading, activeSettings } from "$lib/stores";
</script>

<header class="flex mb-3 mt-2 pl-5 pr-5 pt-3 pb-3">
	<div class="mr-3">
		<a href="/">
			<h1 class="text-2xl font-bold">
				{#if $settings.title == null}
					TinyTodo
				{:else}
					{$settings.title}
				{/if}
				{#if $loading}<i class="fas fa-spinner fa-pulse" />{/if}
			</h1>
		</a>
	</div>
	<div class="border-b border-gray-darkest flex-1 text-right">
		{#if $token}
			<small
				class="mr-3 cursor-pointer"
				on:click={() =>
					activeSettings.set(Object.assign({}, $settings))}
			>
				Settings
			</small>
			<small><a href="/logout">Log Out</a></small>
		{:else}
			<small><a href="/login">Log In</a></small>
		{/if}
	</div>
</header>
