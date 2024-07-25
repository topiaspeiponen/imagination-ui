<script lang="ts">
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

    export let buttonAttributes : HTMLButtonAttributes | undefined = undefined;
    export let anchorAttributes : HTMLAnchorAttributes | undefined = undefined;
    export let variant : 'primary' | 'secondary' | 'no-background' = 'primary';
    export let iconPlacement : 'left' | 'right' | undefined = 'right';
    export let label = 'Click me';
    export let htmlTag : 'anchor' | 'button' = 'button';
    export let size : 'normal' | 'small' = 'normal';
    export let onClick = () => console.log('Button clicked');

    let classes = `button ${iconPlacement || ''} ${size === 'normal' ? 'normal-size' : 'small-size'} ${variant}`;
</script>

{#if htmlTag === 'anchor'}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
        {...anchorAttributes}
        class={classes}>
        <slot name="icon" />
        {label}
    </a>
{:else}
    <button
        {...buttonAttributes}
        class={classes}
        on:click={onClick}>
        <slot name="icon" />
        {label}
    </button>
{/if}
<style>
    .button.left {
        display: flex;
        gap: 0.25rem;
    }
    .button.right {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        gap: 0.25rem;
    }
    .primary {
        all: unset;
        background-color: rgb(var(--color-primary));
        color: black;
        font-weight: 600;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        width: fit-content;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 200ms;
    }
    .secondary {
        all: unset;
        background-color: rgb(var(--color-primary));
        color: black;
        font-weight: 600;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        width: fit-content;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 200ms;
    }
    .no-background {
        all: unset;
        display: flex;
        align-items: center;
    }
    .normal-size {
        padding: 1rem 2rem;
    }
    .small-size {
        padding: 0.5rem 1rem;
    }
    .primary:hover {
        background-color: rgb(var(--color-secondary));
        color: rgb(var(--color-on-secondary));
    }
    .primary:active {
        background-color: rgba(var(--color-secondary), 0.75);
    }
    button:focus {
        outline: none;
    }
</style>