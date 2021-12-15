<script>
	import { token, lists, fetchData, activeList } from "$lib/stores";
	import { getList } from "$lib/lists";

	lists.subscribe((lists) => {
		console.log("UPDATE", lists);
		const list = getList(lists, $activeList.id);
		console.log("LIST", list);
		activeList.set(list);
	});

	async function addGuest() {
		const p = prompt("Enter the email address of a tinytodo user", "");
		if (!p) {
			return;
		}

		let newGuest = await fetch("/api/guests", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: $token,
			},
			body: JSON.stringify({ email: p, listId: $activeList.id }),
		}).then((i) => i.json());

		fetchData($token);
	}

	async function deleteGuest(guest) {
		const c = confirm(
			`Are you sure you want to revoke ${guest.email}'s' access to ${$activeList.name}?`
		);
		if (!c) {
			return;
		}

		let deleteGuest = await fetch("/api/guests", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: $token,
			},
			body: JSON.stringify({
				userId: guest.id,
				listId: $activeList.id,
			}),
		}).then((i) => i.json());

		fetchData($token);
	}
</script>

<p class="font-bold">{$activeList.name}</p>
<p>Owner: {$activeList.owner}</p>

{#if $activeList.guests.length > 0}
	<table class="w-full my-6">
		<tr>
			<th class="text-left">Email</th>
			<th class="text-left">Role</th>
			<th class="text-left" />
		</tr>
		{#each $activeList.guests as guest}
			<tr>
				<td class="text-xs">{guest.email}</td>
				<td class="text-xs">{guest.role}</td>
				<td class="text-xs">
					<button on:click={() => deleteGuest(guest)} class="text-red"
						>revoke</button
					>
				</td>
			</tr>
		{/each}
	</table>
{/if}

<button on:click={() => addGuest()}>Add Guest</button>
