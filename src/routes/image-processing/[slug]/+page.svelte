<script>
    import TechniqueForm from "$lib/technique-form.svelte";
    import TechniqueList from "$lib/technique-list.svelte";

</script>
<main>
    <aside>
        <TechniqueList itemType="slim" />
    </aside>
    <TechniqueForm />
</main>
<style>
    main {
        display: grid;
        grid-template-columns: 1fr 2fr;
        max-width: 1400px;
        height: 100vh;
        margin:auto;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 2rem;
    }
    aside {
        padding-right: 1rem;
    }
</style>