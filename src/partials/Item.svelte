<script>
	import { activeItem } from "$lib/stores";
	import MenuOverlay from "../partials/MenuOverlay.svelte";
	import Tooltip from "../partials/Tooltip.svelte";
	import { token, fetchData, tags, settings } from "$lib/stores";
	import { addTag } from "$lib/tags";
	import {
		getTimeRemaining,
		isOverdue,
		isDueNow,
		isDueSoon,
	} from "$lib/days";
	import moment from "moment";

	export let item;
	export let showNotes = false;

	const setActive = () => {
		if ($activeItem === item) {
			activeItem.set(null);
			return;
		}
		activeItem.set(item);
	};

	async function setStatus(e) {
		item.status = item.status === "TODO" ? "DONE" : "TODO";

		let status = await fetch("/api/items", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: $token,
			},
			body: JSON.stringify({ id: item.id, status: item.status }),
		}).then((i) => i.json());

		fetchData($token);
	}

	async function deleteItem() {
		const c = confirm("Are you sure you want to delete this item?");
		if (!c) {
			return;
		}

		let deleteItem = await fetch("/api/items", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: $token,
			},
			body: JSON.stringify({ id: item.id }),
		}).then((i) => i.json());

		fetchData($token);
	}
</script>

<li
	on:click|self={setActive}
	class="group-scope border-b hover:bg-gray-dark border-gray-dark cursor-pointer p-2 flex"
>
	<div class="flex-1 font-light" on:click|self={setActive}>
		<input class="mr-1"
			type="checkbox"
			checked={item.status === "DONE"}
			on:click={setStatus}
		/>
		{#if item.priority === 2}
			<span
				class="inline-block bg-red-lighter text-white mx-1 px-1 font-bold text-sm"
				>+2</span
			>
		{:else if item.priority === 1}
			<span
				class="inline-block bg-orange text-white mx-1 px-1 font-bold text-sm"
				>+1</span
			>
		{:else if item.priority === -1}
			<span
				class="inline-block bg-blue-darker text-white px-1 font-bold text-sm"
				>-1</span
			>
		{/if}
		<span
			on:click|self={setActive}
			class={item.status === "DONE" ? "line-through" : ""}
			>{item.subject}</span
		>
		{#if item.tags}
			<small class="ml-3">
				{#each item.tags.split(",") as tag, i}
					<span
						class="hover:opacity-80 bg-gray px-2 py-1 rounded"
						on:click={() => addTag(tag.trim(), $tags)}
						>{tag.trim()}</span
					>{i !== item.tags.split(",").length - 1 ? " " : ""}
				{/each}
			</small>
		{/if}
		{#if showNotes && item.notes}
			<small on:click|self={setActive} class="font-bold">
				- {item.notes}</small
			>
		{/if}
	</div>
	<div on:click={setActive} class="group mr-3">
		{#if isDueSoon(item)}
			<span class="text-yellow"> due soon </span>
		{:else if isDueNow(item)}
			<span class="text-yellow">
				due in {getTimeRemaining(item.due, true)}
			</span>
		{:else if isOverdue(item)}
			<span class="text-red">
				<i class="fas fa-arrow-left" />
				 {getTimeRemaining(item.due)}
			</span>
		{:else if item.due && item.status === "TODO"}
			<span class="text-green">
				<i class="fas fa-arrow-right" />
				in {getTimeRemaining(item.due, true)}
			</span>
		{/if}
		{#if item.due}
			<Tooltip
				content={`due ${moment(item.due)
					.locale("en")
					.format($settings.dateFormat)}`}
			/>
		{/if}
	</div>
	<div class="group-scope-hover:opacity-100 opacity-0 h-full">
		<MenuOverlay icon={"fas fa-ellipsis-v"}>
			<p
				on:click={setActive}
				class="hover:opacity-40 cursor-pointer mb-1"
			>
				Edit
			</p>
			<p on:click={deleteItem} class="hover:opacity-40 cursor-pointer">
				Delete
			</p>
		</MenuOverlay>
	</div>
</li>
