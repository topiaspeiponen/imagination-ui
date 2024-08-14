<script lang="ts">
    import type { ImageProcessingTechniquePageData } from "$lib/types";
    import TechniqueListItem from "./technique-list-item.svelte";
    export let techniques : ImageProcessingTechniquePageData[];
    export let itemType : "slim" | "normal" = "normal";
</script>

<ul class="{itemType === 'normal' ? 'fade-in-from-right' : 'fade-in-from-left'}">
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
        opacity: 0;
        animation: 0.5s ease-in 0.5s fadeInRight forwards;
    }
    .fade-in-from-right {
        animation: 0.5s ease-in 0.5s fadeInRight forwards;
    }
    .fade-in-from-left {
        animation: 0.5s ease-in 0.5s fadeInLeft forwards;
    }
    .more-to-come-notification {
        display: flex;
        justify-content: center;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
</style>