<script>
    export let done = false;
    export let overdue = false;
</script>

<tr class="hover cursor-pointer">
    <td class="w-10">
      <label>
        <input type="checkbox" class="checkbox" bind:checked={done}>
      </label>
    </td> 
    <td class="w-full">Item Name</td> 
    <td>
        {#if done}
            <div class="btn btn-success btn-xs">Done</div>
        {:else if overdue}
            <div class="btn btn-error btn-xs">Overdue</div>
        {:else}
            <div class="btn btn-info btn-xs">To Do</div>
        {/if}
    </td> 
    <td>
      <button class="btn btn-ghost btn-xs"><i class="fas fa-ellipsis-v"/></button>
    </td>
</tr>