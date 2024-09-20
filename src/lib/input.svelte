<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    export let inputAttributes : HTMLInputAttributes | undefined = undefined;
</script>

<input {...inputAttributes}/>

<style>
    input {
        padding: 0.5rem;
        border: 1px solid white;
        border-radius: 0.3rem;
    }
</style>