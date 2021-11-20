<script>
    import { page } from "$app/stores";
</script>

<ul id="tabs">
    <li><a class:active={$page.path == '/list/1'} href="./1">Todo</a></li>
    <li><a class:active={$page.path == '/list/2'} href="./2">Todo</a></li>
    <li><a class:active={$page.path == '/list/3'} href="./3">Todo</a></li>
    <li><a class:active={$page.path == '/list/4'} href="./4">Todo</a></li>
    <li><a class:active={$page.path == '/list/5'} href="./5">Todo</a></li>
    <li><a href="#">+</a></li>
</ul>