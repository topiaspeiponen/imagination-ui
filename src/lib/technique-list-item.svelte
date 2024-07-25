<script lang="ts">
    import Button from "$lib/button.svelte";
    import type { ImageProcessingTechniqueItem } from "$lib/types";
    import ChevronDown from "$lib/icons/chevron-down.svelte";
    import ChevronUp from "$lib/icons/chevron-up.svelte";
    import IconWrapper from "$lib/icons/icon-wrapper.svelte";

    export let technique: ImageProcessingTechniqueItem;
    export let expanded = false;
    export let type : "slim" | "normal" = 'normal';
</script>

{#if type === 'normal'}
    <li class="row">
        <div class="top-container">
            <div class="technique-item image-container {expanded ? 'full-width-image' : 'half-width-image'}">
                <img src={technique.image} alt={technique.name} />
            </div>
            <section class="technique-item text-container-short {expanded ? 'hidden' : 'visible'}">
                <div class="text-container-short-content">
                    <h2>{technique.name}</h2>
                    <div class="action-area">
                        <Button
                            label="Learn more"
                            htmlTag="anchor"
                            anchorAttributes={{href:`/image-processing/${technique.slug}`}}
                            />
                        <Button
                            variant="no-background"
                            size="small"
                            label={expanded ? "Hide" : "Show"}
                            onClick={() => expanded = !expanded}>
                            <IconWrapper
                                slot="icon"
                                height="24px"
                                width="24px">
                                <ChevronDown />
                            </IconWrapper>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
        <section class="technique-item text-container-long {expanded ? 'visible' : 'hidden'}">
            <h2>{technique.name}</h2>
            <div class="expanded-description">
                <h3>How does it work?</h3>
                <p>{technique.description}</p>
            </div>
            <div class="action-area">
                <Button
                    label="Learn more"
                    htmlTag="anchor"
                    anchorAttributes={{href:`/image-processing/${technique.slug}`}}
                    />
                <Button
                    variant="no-background"
                    label={expanded ? "Hide" : "Show"}
                    onClick={() => expanded = !expanded}>
                    <IconWrapper
                        slot="icon"
                        height="24px"
                        width="100%">
                        <ChevronUp />
                    </IconWrapper>
                </Button>
            </div>
        </section>
    </li>
{:else if type === 'slim'}
<li class="row">
    <div class="top-container">
        <div class="technique-item image-container {expanded ? 'full-width-image' : 'half-width-image'}">
            <img src={technique.image} alt={technique.name} />
        </div>
        <section class="technique-item text-container-short {expanded ? 'hidden' : 'visible'}">
            <div class="text-container-short-content">
                <h3>{technique.name}</h3>
                <div class="action-area">
                    <Button label="Learn more" htmlTag="anchor" anchorAttributes={{href:`/image-processing/${technique.slug}`}} />
                </div>
            </div>
        </section>
    </div>
    <section class="technique-item text-container-long {expanded ? 'visible' : 'hidden'}">
        <h3>{technique.name}</h3>
        <div class="expanded-description">
            <h3>How does it work?</h3>
            <p>{technique.description}</p>
        </div>
    </section>
</li>
{/if}

<style>
    li {
        display: flex;
        flex-flow: row wrap;
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
        border-radius: 0.5rem;
        background-color: rgb(var(--color-background-primary));
        color: white;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        transition:
            box-shadow 0.2s,
            border-image-source 1s;
    }
    li:hover {
        box-shadow: 0 0 8px -2px rgb(var(--color-primary));
    }
    li:has(.full-width-image) {
        border-image-source: linear-gradient(to left,#d53a9d, #743ad5);
    }
    .top-container {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        overflow: hidden;
    }
    .full-width-image {
        width: 100%;
        height: 10rem;
    }
    .half-width-image {
        width: 50%;
        height: 10rem;
    }
    [class*="text-container"] {
        display: flex;
        flex-flow: column nowrap;
        height: inherit;
        overflow: hidden;
    }
    .text-container-short {
        transition: width 0.3s ease-in;
        width: 50%;
        height: 10rem;
    }
    .text-container-short.hidden {
        width: 0;
        height: 0;
        transition:
            width 0.3s ease-in,
            height 0s ease-in 0.3s;
    }
    .text-container-short-content {
        padding: 1rem;
    }
    .text-container-long {
        width: 100%;
        transition: all 0.3s ease-in;
        height: 20rem;
        padding: 1rem;
    }
    .text-container-long.hidden {
        transition: all 0.3s ease-in;
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
    }
    .image-container {
        transition: all 0.3s ease-in;
    }
    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .action-area {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-top: auto;
        height: 3rem;
    }
</style>