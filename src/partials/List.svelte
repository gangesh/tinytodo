<script>
    import Item from "./Item.svelte";
</script>

<!-- <div class="bg-gray-dark p-2 flex">
    <div class="mr-2">
        <input class="border-gray-darkest border w-96 p-1 text-sm rounded-md" type="text" placeholder="New task">
        <span>new</span>
    </div>
    <div class="flex-1 text-right">
        <input class="border-gray-darkest border w-64 p-1 text-sm rounded-md" type="text" placeholder="Search">
    </div>
</div> -->


<!-- <div class="navbar mb-2 border-info border rounded-box">
    <div class="flex-1 lg:flex-none">
        <div class="form-control">
            <div class="relative">
                <input type="text" placeholder="New Item" class="w-full pr-16 input input-ghost input-bordered"> 
                <button class="absolute top-0 right-0 rounded-l-none btn btn-ghost"><i class="fas fa-plus"/></button>
            </div>
        </div> 
    </div> 
    <div>
       
    </div> 
  </div> -->

<div class="flex items-center">
    <div class="mr-5">
        <h2 class="font-bold">Groceries (1)</h2>
    </div>
    <div class="flex-1">
        <div class="relative">
            <input type="text" placeholder="Search" class="w-full pr-16 input input-sm input-gray py-2 input-bordered"> 
            <button class="absolute top-0 right-0 rounded-l-none btn-sm btn btn-gray">
                <i class="fas fa-plus"/>
            </button>
        </div>
    </div>
    <div class="flex-1 text-right">
        
        <div class="btn-group justify-end">
            Notes:&nbsp;
            <button class="btn btn-outline btn-xs bg-info border-info text-white pointer-events-none">Show</button> 
            <button class="btn btn-outline btn-xs">Hide</button> 
            <button class="btn btn-outline btn-xs">
                <i class="fas fa-ellipsis-h"/>
            </button>
          </div>
    </div>
</div>

<div class="overflow-x-auto mb-5">
    <table class="table table-zebra w-full">
      <tbody>
        <Item/>
        <Item/>
        <Item done={true}/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item overdue={true}/>
        <Item done={true}/>
      </tbody> 
    </table>
  </div>
  