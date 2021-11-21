<script>
    import { page } from "$app/stores";
    const tabs = [{name: 'Todo', id: 1}, {name: 'Groceries', id: 2}, {name: 'Test', id: 3}];
</script>


<div>
    <div class="flex">
        <div>
            <button class="btn btn-success mb-2 text-white normal-case w-full justify-start btn-medium">
                <i class="fas fa-plus"/>&nbsp;&nbsp;New List
            </button>
        </div>
        <div class="flex-1 text-right">
            <button class="btn btn-square btn-ghost mr-2">
                <i class="fas fa-filter"/>
            </button>
            <button class="btn btn-square btn-ghost">
                <i class="fas fa-search"/>
            </button>
        </div>
    </div>
    
    {#each tabs as tab, i}
        <a href="./{tab.id}">
            <button class="btn {$page.path == `/list/${tab.id}` ? 'btn-active' : ''} mb-2 btn-ghost normal-case w-full justify-start btn-medium">
                {tab.name}
            </button>
        </a>
    {/each}
</div>