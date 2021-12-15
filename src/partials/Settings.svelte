<script>
	import { token, fetchSettings, activeSettings } from "$lib/stores";
	import moment from "moment";

	async function updateSettings() {
		let update = await fetch("/api/settings", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: $token,
			},
			body: JSON.stringify($activeSettings),
		}).then((i) => i.json());

		fetchSettings($token);
		activeSettings.set(null);
	}
</script>

<form on:submit|preventDefault={updateSettings}>
	<small class="block font-bold">Site Title:</small>
	<small class="block text-xs font-light"
		>(specify if you want to change default title)</small
	>
	<input
		type="text"
		bind:value={$activeSettings.title}
		placeholder="Site Title"
		class="block w-64 p-2 border border-gray-darkest my-3"
	/>

	<small class="block font-bold -mb-2">Language:</small>
	<select
		class="block w-64 p-2 border border-gray-darkest my-3 bg-gray-darkest"
		disabled
	>
		<option>English</option>
	</select>

	<small class="block font-bold">Autotagging:</small>
	<small class="block text-xs font-light"
		>(automatically adds tag of current tag filter to newly created task)</small
	>
	<select
		class="block w-64 p-2 border border-gray-darkest my-3"
		bind:value={$activeSettings.autoTagging}
	>
		<option value="true">Yes</option>
		<option value="false">No</option>
	</select>

	<small class="block font-bold -mb-2">Locale:</small>
	<select
		class="block w-64 p-2 border border-gray-darkest my-3 bg-gray-darkest"
		disabled
	>
		<option>English (United States)</option>
	</select>

	<small class="block font-bold -mb-2">First Day of Week:</small>
	<select
		class="block w-64 p-2 border border-gray-darkest my-3 bg-gray-darkest"
		disabled
	>
		<option>Sunday</option>
	</select>

	<small class="block font-bold">Date Format:</small>
	<small class="block text-xs font-light"
		>(additional formats can be found <a
			class="underline"
			href="https://momentjs.com/docs/#/displaying/format/"
			target="_blank">here</a
		>)</small
	>
	<input
		type="text"
		bind:value={$activeSettings.dateFormat}
		placeholder="Date Format"
		class="block w-64 p-2 border border-gray-darkest my-3"
	/>
	Example Date:
	<b>{moment().locale("en").format($activeSettings.dateFormat)}</b><br />

	<button type="submit" class="mt-3">Submit</button><br /><br />
	<!-- <input
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
		{#each $lists as list, i}
			<option value={list.id}>{list.name}</option>
		{/each}
	</select>
	<button type="submit" class="mt-3">Submit</button><br /><br /> -->
</form>
