<script>
    import Item from "./Item.svelte";
</script>

<div class="bg-gray-dark p-2 flex">
    <div class="mr-2">
        <input class="border-gray-darkest border w-96 p-1 text-sm rounded-md" type="text" placeholder="New task">
        <span><i class="fas fa-plus"/></span>
    </div>
    <div class="flex-1 text-right">
        <input class="border-gray-darkest border w-64 p-1 text-sm rounded-md" type="text" placeholder="Search">
    </div>
</div>
<div class="py-3 px-3 flex items-center flex-align border-b-2 border-blue">
    <h2 class="font-bold mr-2">Tasks (1) <i class="fas fa-caret-down"/></h2>
    <div>
        <small>Notes: <a href="#">Show</a> / <a href="#">Hide</a></small> 
    </div>
    <div class="flex-1 text-right">
        <small>Tags <i class="fas fa-caret-down"/></small>
    </div>
</div>
<ul class="h-items my-3 overflow-auto">
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
    <Item/>
</ul>