<script lang="ts">
    export let label = 'Click me';
    export let htmlTag : 'anchor' | 'button' = 'button';
    export let onClick = () => console.log('Button clicked');
    export let href = '';
</script>

{#if htmlTag === 'anchor'}
    <a class="primary" href={href}>
        {label}
    </a>
{:else}
    <button class="primary" on:click={onClick}>
        {label}
    </button>
{/if}
<style>
    .primary {
        all: unset;
        background-color: rgb(var(--color-primary));
        color: black;
        font-weight: 600;
        border: none;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        width: fit-content;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 200ms;
    }
    button:hover {
        background-color: rgb(var(--color-secondary));
        color: rgb(var(--color-on-secondary));
    }
    button:active {
        background-color: rgba(var(--color-secondary), 0.75);
    }
    button:focus {
        outline: none;
    }
</style>