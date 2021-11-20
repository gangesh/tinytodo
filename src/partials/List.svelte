<script>
    import Item from "./Item.svelte";
</script>

<div id="actions" class="flex">
    <div>
        <input type="text" placeholder="New task">
        <span>new</span>
    </div>
    <div class="flex-1 right">
        <input type="text" placeholder="Search">
    </div>
</div>
<div class="flex flex-align">
    <h2>Tasks (1)</h2>
    <!-- Notes: <a href="#">Show</a> / <a href="#">Hide</a> -->
    <div class="flex-1 right">
        Tags
    </div>
</div>
<ul id="list">
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
</ul>