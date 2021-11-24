<script>
    let toggled = false;
    export let icon = 'fas fa-caret-down';
    export let dir = 'right';

    const setToggled = () => {
        toggled = !toggled;
    }
</script>
<div on:click={setToggled} class="{toggled ? '' : 'hidden'} z-20 absolute top-0 left-0 bg-black h-screen w-screen opacity-20"></div>
<div class="inline-block relative">
    <i on:click={setToggled} class="inline-block w-2 hover:opacity-40 {icon} cursor-pointer"/>
    <div on:click={setToggled} class="{toggled ? '' : 'hidden'} z-30 rounded-md absolute text-sm p-3 {dir}-0 font-normal text-left bg-white border-gray-darkest border w-48">
        <slot/>
    </div>
</div>


