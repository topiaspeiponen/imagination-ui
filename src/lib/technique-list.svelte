<script lang="ts">
    import type { ImageProcessingTechniqueItem } from "$lib/types";
    import TechniqueListItem from "./technique-list-item.svelte";
    export let techniques : ImageProcessingTechniqueItem[] = [
        {
            id: "tec-1",
            name: "Histogram equalization",
            description: "Description of technique 1",
            image: "https://via.placeholder.com/150",
            slug: "histogram-equalization"
        },
        {
            id: "456",
            name: "Technique 2",
            description: "Description of technique 2",
            image: "https://via.placeholder.com/150",
            slug: "technique-2"
        },
        {
            id: "789",
            name: "Technique 3",
            description: "Description of technique 3",
            image: "https://via.placeholder.com/150",
            slug: "technique-3"
        },
        {
            id: "789",
            name: "Technique 4",
            description: "Description of technique 3",
            image: "https://via.placeholder.com/150",
            slug: "technique-4"
        },

        {
            id: "789",
            name: "Technique 5",
            description: "Description of technique 3",
            image: "https://via.placeholder.com/150",
            slug: "technique-5"
        },
    ];
    export let itemType : "slim" | "normal" = "normal";
</script>

<ul class="{itemType === 'normal' ? 'fade-in-from-right' : 'fade-in-from-left'}">
    {#each techniques as technique}
        <TechniqueListItem {technique} type={itemType} />
    {/each}
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
</style>