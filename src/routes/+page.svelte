<script>
    import CtaBanner from "$lib/cta-banner.svelte";
    import TechniqueList from "$lib/technique-list.svelte";
    import techniques from "$lib/techniques";

</script>

<main>
    <CtaBanner />
    <section>
        <TechniqueList techniques={techniques}/>
    </section>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        overflow: auto;
        gap: 1rem;
    }
    section {
        overflow-y: hidden;
        padding: 1rem;
        margin: 1rem 0;
        background-color: rgb(var(--color-background-primary));
    }
    @media (min-width: $breakpoint-md) {
        main {
            height: 100vh;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            overflow: hidden;
        }
        section {
            overflow: auto;
        }
    }
</style>