<script lang="ts">
    import Header from "$lib/header.svelte";
    import IconWrapper from "$lib/icons/icon-wrapper.svelte";
    import TechniqueForm from "$lib/technique-form.svelte";
    import TechniqueList from "$lib/technique-list.svelte";
    import techniques from "$lib/techniques";
    import { fade, slide } from "svelte/transition";
    import { page } from "$app/stores";
    
	export let data;
    let sideMenuOpen = true;

    page.subscribe(() => {
        sideMenuOpen = false;
    })
</script>

<Header menuOpen={sideMenuOpen} onMenuClicked={() => sideMenuOpen = !sideMenuOpen} />
<main>
    {#if sideMenuOpen}
    <aside transition:slide={{duration: 500, axis: 'x'}}>
        <TechniqueList techniques={techniques} itemType="slim" />
    </aside>
    <div
        class="overlay"
        role="button"
        tabindex="-1"
        on:click={() => sideMenuOpen = false}
        on:keydown={() => sideMenuOpen = false}
        transition:fade={{duration: 250}}/>
    {/if}
    <section>
    {#if data.id}
        <TechniqueForm title={data.name} description={data.longDescriptionHtml} techniqueId={data.id} />
    {/if}
    </section>
</main>

<style lang="scss">
    main {
        display: flex;
    }
    aside {
        position: absolute;
        box-sizing: border-box;
        padding: 1rem;
        background-color:rgb(var(--color-surface-dim));
        width: 500px;
        height: calc(100vh - var(--header-height));
        z-index: 10;
    }
    .overlay {
        position: absolute;
        background-color: rgba(var(--color-background-primary), 0.5);
        z-index: 9;
        width: 100%;
        height: 100%;
    }
    section {
        margin-top: 2rem;
        margin-left: auto;
        margin-right: auto;
        width: 800px;
    }
</style>