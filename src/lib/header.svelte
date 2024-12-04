<script lang="ts">
    import Button from "./button.svelte";
    import Cancel from "./icons/cancel.svelte";
    import IconWrapper from "./icons/icon-wrapper.svelte";
    import Menu from "./icons/menu.svelte";

    export let menuOpen = true;
    export let onMenuClicked : () => void;
</script>

<header>
    <span>
        <Button
        variant="no-background"
        buttonAttributes={{style: "padding: 0; width: fit-content;"}}
        onClick={onMenuClicked}>

        <IconWrapper
        slot="icon"
        height="32px"
        width="100%">
        {#if menuOpen}
            <Cancel />
        {:else}
            <Menu />
        {/if}
        </IconWrapper>
        </Button>
    </span>
    <h1>
        <a href="/">
            Imagination
        </a>
    </h1>
</header>

<style lang="scss">
    header {
        position: fixed;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        color: rgb(var(--color-background-on-primary));
        background-color: rgb(var(--color-background-primary));
        padding: 1.5rem 0;
        border-bottom: 1px solid rgb(var(--color-primary-accent));
        box-sizing: border-box;
        height: var(--header-height);
        z-index: 10;
    }
    header span {
        position: absolute;
        left: 2rem;
    }
    a {
        all: unset;
        cursor: pointer;
    }
</style>