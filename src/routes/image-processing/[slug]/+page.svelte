<script>
    import TechniqueForm from "$lib/technique-form.svelte";
    import TechniqueList from "$lib/technique-list.svelte";
    /** @type {import('./$types').PageData} */
	export let data;
</script>

<main>
    <aside>
        <TechniqueList itemType="slim" />
    </aside>
    <TechniqueForm title={data.title} description={data.longDescription} techniqueId={data.id} />
</main>

<style lang="scss">
    main {
        display: block;
        max-width: 1400px;
        height: 100vh;
        margin:auto;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 2rem;
    }
    aside {
        display: none;
    }
    @media (min-width: $breakpoint-md) {
        main {
            display: grid;
            grid-template-columns: 1fr 2fr;
        }
        aside {
            display: block;
            padding-right: 1rem;
        }
    }
</style>