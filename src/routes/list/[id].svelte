<script>
	import Lists from "../../partials/Lists.svelte";
	import Items from "../../partials/Items.svelte";
	import Drawer from "../../partials/Drawer.svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import {
		token,
		lists,
		activeItem,
		activeList,
		activeSettings,
	} from "$lib/stores";
	import { onMount } from "svelte";
	import ItemDetails from "../../partials/ItemDetails.svelte";
	import ShareSettings from "../../partials/ShareSettings.svelte";
	import Settings from "../../partials/Settings.svelte";

	let page$ = null;

	page.subscribe((page) => {
		page$ = page;
	});

	onMount(async () => {
		token.subscribe((token) => {
			if (!token) {
				goto("/login", { replacePath: true });
			}
		});
	});
</script>

<div class="flex">
	{#if page$ && $lists}
		<div class="w-64 p-5 pt-0 border-r border-gray-dark">
			<Lists />
		</div>
		<div class="flex-1">
			{#if $lists.length !== 0}
				<Items listId={page$.params.id} />
			{/if}
		</div>
	{/if}
</div>

<Drawer store={activeItem} name="Item Details">
	<ItemDetails />
</Drawer>

<Drawer store={activeList} name="List Sharing">
	<ShareSettings />
</Drawer>

<Drawer store={activeSettings} name="Settings" pos="left">
	<Settings />
</Drawer>
