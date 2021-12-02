<script>
    export let content = '';
</script>

<div class="group-hover:block hidden absolute bg-black-lighter text-white px-2 mt-2">
    <div class="w-16 overflow-hidden absolute -top-2 left-10">
        <div class="h-2 w-2 bg-black-lighter rotate-45 transform origin-bottom-left"></div>
    </div>
    <small>{content}</small>
</div>