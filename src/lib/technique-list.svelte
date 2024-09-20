<script lang="ts">
    import type { ImageProcessingTechniquePageData } from "$lib/types";
    import { fade } from "svelte/transition";
    import TechniqueListItem from "./technique-list-item.svelte";
    export let techniques : ImageProcessingTechniquePageData[];
    export let itemType : "slim" | "normal" = "normal";
</script>

<ul>
    {#each techniques as technique}
        <TechniqueListItem {technique} type={itemType} />
    {/each}
    <div class="more-to-come-notification">
        More to come...
    </div>
</ul>

<style>
    ul {
        height: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-flow: column nowrap;
        row-gap: 1rem;
    }
    .more-to-come-notification {
        display: flex;
        justify-content: center;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
</style>