<script lang="ts">
    import type { ImageProcessingTechniqueItem } from "$lib/types";
    import TechniqueListItem from "./technique-list-item.svelte";
    export let techniques : ImageProcessingTechniqueItem[] = [
        {
            id: "123",
            name: "Technique 1",
            description: "Description of technique 1",
            image: "https://via.placeholder.com/150",
            slug: "technique-1"
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
            id: "101",
            name: "Technique 4",
            description: "Description of technique 4",
            image: "https://via.placeholder.com/150",
            slug: "technique-4"
        },
        {
            id: "112",
            name: "Technique 5",
            description: "Description of technique 5",
            image: "https://via.placeholder.com/150",
            slug: "technique-5"
        }
    ];
</script>

<ul>
    {#each techniques as technique}
        <TechniqueListItem {technique} />
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-flow: column nowrap;
        row-gap: 1rem;
        margin: 0 2rem;
        padding-right: 1rem;
        margin-top: 2rem;
        overflow-y: auto;
    }
    
</style>