<script>
    import { page } from "$app/stores";
    const tabs = [{name: 'Todo', id: 1}, {name: 'Groceries', id: 2}, {name: 'Test', id: 3}];
</script>


<div>
    <button class="
    btn 
    btn-success
    mb-2
    btn-outline
    text-white
    normal-case 
    w-full 
    justify-start 
    btn-medium"
    ><i class="fas fa-plus"/>&nbsp;New</button>
    {#each tabs as tab, i}
        <a href="./{tab.id}">
            <button class="
            btn 
            {$page.path == `/list/${tab.id}` ? 'btn-active' : ''} 
            mb-2
            btn-ghost 
            normal-case 
            w-full 
            justify-start 
            btn-medium"
            >{tab.name}</button>
        </a>
    {/each}
</div>