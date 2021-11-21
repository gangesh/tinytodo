<script>
    import { page } from "$app/stores";
    const tabs = [{name: 'Todo', id: 1}, {name: 'Groceries', id: 2}, {name: 'Test', id: 3}];
</script>

<ul class="mt-6">
    {#each tabs as tab}
        <li class="{$page.path == `/list/${tab.id}` ? 'bg-gray-dark' : 'bg-dark'} cursor-pointer mr-1 border-gray-dark inline-block border border-b-0 rounded-tr-md">
            <small>
                <a class="block pl-10 pr-2 py-1.5" href="./{tab.id}">{tab.name} <i class="fas pl-7 fa-caret-down"/></a>
            </small>
        </li>
    {/each}
    <li class="cursor-pointer -ml-1 bg-gray border-gray-dark inline-block border border-b-0 rounded-tr-md">
        <small>
            <a class="block px-2 py-1.5 font-bold" href="#">+</a>
        </small>
    </li>
</ul>