<script>
    import CtaBanner from "$lib/cta-banner.svelte";
    import TechniqueList from "$lib/technique-list.svelte";

</script>

<main>
    <CtaBanner />
    <TechniqueList />
</main>

<style lang="scss">
    main {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    @media (min-width: $breakpoint-md) {
        main {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }
</style>