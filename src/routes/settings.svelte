<script>
	import { settings, token, fetchSettings } from "$lib/stores";
	import moment from "moment";

	let tempSettings = {};
	settings.subscribe((settings) => {
		tempSettings = Object.assign({}, settings);
	});

	async function handleUpdate() {
		let update = await fetch("/api/settings", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: $token,
			},
			body: JSON.stringify(tempSettings),
		}).then((i) => i.json());

		fetchSettings($token);
	}
</script>

<form
	on:submit|preventDefault={handleUpdate}
	class="border border-gray-darkest p-3"
>
	<h1 class="font-bold text-xl">Settings</h1>
	<br />

	<small class="block font-bold">Site Title:</small>
	<small class="block text-xs font-light"
		>(specify if you want to change default title)</small
	>
	<input
		type="text"
		bind:value={tempSettings.title}
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
		bind:value={tempSettings.autoTagging}
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
		bind:value={tempSettings.dateFormat}
		placeholder="Date Format"
		class="block w-64 p-2 border border-gray-darkest my-3"
	/>
	Example Date:
	<b>{moment().locale("en").format(tempSettings.dateFormat)}</b><br />

	<button type="submit" class="mt-3">Submit</button><br /><br />
	<a href="../"><i class="fas fa-arrow-left" /> Go back</a>
</form>
