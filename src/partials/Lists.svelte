<script>
	import List from "./List.svelte";
	import { goto } from "$app/navigation";
	import { lists, fetchData, token, settings } from "$lib/stores";

	let name = "";
	let token$ = null;

	token.subscribe((token) => (token$ = token));

	async function addList() {
		if (name.trim() === "") {
			return;
		}
		let newList = await fetch("/api/lists", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token$,
			},
			body: JSON.stringify({ name, order: $settings.defaultOrder }),
		}).then((i) => i.json());

		name = "";
		fetchData(token$);
		goto(`/list/${$lists.length}`, { replacePath: true });
	}
</script>

<ul class="mt-2.5">
	<li class="mb-3.5">
		<form on:submit|preventDefault={addList}>
			<input
				class="border-gray-darkest border w-34 p-1 text-sm rounded-md"
				type="text"
				bind:value={name}
				placeholder="New list"
			/>
			<button type="submit" class="hover:opacity-40"
				><i class="fas fa-plus" /></button
			>
		</form>
	</li>
	<h2 class="font-bold text-xl">My Lists</h2>
	{#each $lists.mine as list}
		<List {list} />
	{/each}
	<h2 class="font-bold text-xl">Shared With Me</h2>
	{#each $lists.shared as list}
		<List {list} />
	{/each}
</ul>
