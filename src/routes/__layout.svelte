<script>
    import Header from "../partials/Header.svelte";
    import Footer from "../partials/Footer.svelte";
</script>

<style lang="postcss">@import '../style.css';</style>

<div class="container">
    <Header/>
    <article>
        <slot></slot>
    </article>
    <Footer/>
</div>
