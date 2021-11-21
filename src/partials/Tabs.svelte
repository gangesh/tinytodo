<script>
    import { page } from "$app/stores";
    const tabs = [{name: 'Todo', id: 1}, {name: 'Groceries', id: 2}, {name: 'Test', id: 3}];
</script>

<ul>
    {#each tabs as tab}
        <li>
            <a class="block py-1 {$page.path === `/list/${tab.id}` ? 'font-bold' : ''}" href="./{tab.id}">{tab.name}</a>
        </li>
    {/each}
    <li>
        <a class="block" href="#">+</a>
    </li>
</ul>