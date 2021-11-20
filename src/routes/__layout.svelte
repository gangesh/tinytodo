<script>
    import Header from "../partials/Header.svelte";
    import Footer from "../partials/Footer.svelte";
</script>

<style>@import '../style.css';</style>

<div id="container">
    <Header/>
    <article>
        <slot></slot>
    </article>
    <Footer/>
</div>
