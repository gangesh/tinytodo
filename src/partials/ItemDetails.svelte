<script>
	import { token, activeItem, lists, fetchData } from "$lib/stores";

	let item;

	activeItem.subscribe(
		(activeItem) => (item = Object.assign({}, activeItem))
	);

	async function updateItem() {
		let update = await fetch("/api/items", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: $token,
			},
			body: JSON.stringify(item),
		}).then((i) => i.json());

		fetchData($token);
		activeItem.set(null);
	}
</script>

<form on:submit|preventDefault={updateItem}>
	<input
		type="text"
		placeholder="Subject"
		class="block w-full p-2 border border-gray-darkest my-3"
		bind:value={item.subject}
	/>
	<textarea
		placeholder="Notes"
		rows="5"
		class="block w-full p-2 border border-gray-darkest my-3"
		bind:value={item.notes}
	/>
	<select
		class="block w-full p-2 border border-gray-darkest my-3"
		bind:value={item.status}
	>
		<option value="TODO">To Do</option>
		<option value="DONE">Done</option>
	</select>
	<input
		type="date"
		placeholder="Due Date"
		class="block w-full p-2 border border-gray-darkest my-3"
		bind:value={item.due}
	/>
	<input
		type="text"
		placeholder="Tags (comma-separated)"
		class="block w-full p-2 border border-gray-darkest my-3"
		bind:value={item.tags}
	/>
	<select
		class="block w-full p-2 border border-gray-darkest my-3"
		bind:value={item.priority}
	>
		<option value={2}>+2</option>
		<option value={1}>+1</option>
		<option value={0}>0</option>
		<option value={-1}>-1</option>
	</select>
	<select
		class="block w-full p-2 border border-gray-darkest my-3"
		bind:value={item.listId}
	>
		{#each $lists["mine"] as list, i}
			<option value={list.id}>{list.name}</option>
		{/each}
		{#each $lists["shared"] as list, i}
			<option value={list.id}>{list.name}</option>
		{/each}
	</select>
	<button type="submit" class="mt-3">Submit</button><br /><br />
</form>
