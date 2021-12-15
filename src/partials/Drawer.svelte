<script>
	export let store;
	export let name;
	export let pos = "right";

	const close = () => {
		store.set(null);
	};

	let posVal = 0;

	$: {
		if (pos === "right") {
			posVal = $store ? "right-0" : "-right-80";
		}
		if (pos === "left") {
			posVal = $store ? "left-0" : "-left-80";
		}
	}
</script>

<div
	class="
    bg-white 
    w-80
    {posVal}
    absolute 
    transition-all
    duration-500
    top-0 
    h-screen border-l 
	border-r
    border-gray-darkest 
    p-3"
>
	{#if $store}
		<div class="flex items-center">
			<h2 class="font-bold text-blue-darker text-2xl">{name}</h2>
			<div class="flex-1 text-right">
				<i
					on:click={close}
					class="fas fa-times text-2xl hover:opacity-40 cursor-pointer"
				/>
			</div>
		</div>

		<slot />
	{/if}
</div>
