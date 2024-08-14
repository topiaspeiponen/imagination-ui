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
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    section {
        overflow-y: auto;
        padding: 1rem;
        background-color: rgb(var(--color-background-primary));
    }
    @media (min-width: $breakpoint-md) {
        main {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }
</style>