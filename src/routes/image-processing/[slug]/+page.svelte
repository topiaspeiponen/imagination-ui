<script>
    import TechniqueForm from "$lib/technique-form.svelte";
    import TechniqueList from "$lib/technique-list.svelte";
    import techniques from "$lib/techniques";
    /** @type {import('./$types').PageData} */
	export let data;
</script>

<main>
    <aside>
        <TechniqueList techniques={techniques} itemType="slim" />
    </aside>
    {#if data.id}
        <TechniqueForm title={data.name} description={data.longDescriptionHtml} techniqueId={data.id} />
    {/if}
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