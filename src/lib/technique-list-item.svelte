<script lang="ts">
    import Button from "$lib/button.svelte";
    import type { ImageProcessingTechniquePageData } from "$lib/types";
    import ChevronDown from "$lib/icons/chevron-down.svelte";
    import ChevronUp from "$lib/icons/chevron-up.svelte";
    import IconWrapper from "$lib/icons/icon-wrapper.svelte";
    import { page } from "$app/stores";

    export let technique: ImageProcessingTechniquePageData;
    export let expanded = false;
    export let type: "slim" | "normal" = "normal";
</script>

{#if type === "normal"}
    <li class="row full">
        <div class="top-container">
            <div
                class="technique-item image-container {expanded
                    ? 'full-width-image'
                    : 'half-width-image'}"
            >
                <img src={technique.image} alt={technique.name} />
            </div>
            <section
                class="technique-item text-container-short {expanded
                    ? 'hidden'
                    : 'visible'}"
            >
                <div class="text-container-short-content">
                    <h2>{technique.name}</h2>
                    <p>{technique.shortDescriptionPlainText}</p>
                    <div class="action-area">
                        <Button
                            label="Go to"
                            htmlTag="anchor"
                            anchorAttributes={{
                                href: `/image-processing/${technique.slug}`,
                            }}
                        />
                        <Button
                            variant="no-background"
                            size="small"
                            label={expanded ? "Hide" : "Show"}
                            onClick={() => (expanded = !expanded)}
                        >
                            <IconWrapper slot="icon" height="24px" width="24px">
                                <ChevronDown />
                            </IconWrapper>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
        <section
            class="technique-item text-container-long {expanded
                ? 'visible'
                : 'hidden'}"
        >
            <h2>{technique.name}</h2>
            <div class="expanded-description">
                <h3>How does it work?</h3>
                <p>{@html technique.longDescriptionHtml}</p>
            </div>
            <div class="action-area">
                <Button
                    label="Start"
                    htmlTag="anchor"
                    anchorAttributes={{
                        href: `/image-processing/${technique.slug}`,
                    }}
                />
                <Button
                    variant="no-background"
                    label={expanded ? "Hide" : "Show"}
                    onClick={() => (expanded = !expanded)}
                >
                    <IconWrapper slot="icon" height="24px" width="100%">
                        <ChevronUp />
                    </IconWrapper>
                </Button>
            </div>
        </section>
    </li>
{:else if type === "slim"}
    <li class="row slim">
        <a
            href="/image-processing/{technique.slug}"
            aria-disabled={$page.params.slug === technique.slug}
        >
            <div class="top-container">
                <div class="technique-item image-container half-width-image">
                    <img src={technique.image} alt={technique.name} />
                </div>
                <section
                    class="technique-item text-container-short {expanded
                        ? 'hidden'
                        : 'visible'}"
                >
                    <div class="text-container-short-content">
                        <h3>{technique.name}</h3>
                        <p>{technique.shortDescriptionPlainText}</p>
                    </div>
                </section>
            </div>
            <section
                class="technique-item text-container-long {expanded
                    ? 'visible'
                    : 'hidden'}"
            >
                <h3>{technique.name}</h3>
                <div class="expanded-description">
                    <h3>How does it work?</h3>
                    <p>{technique.shortDescriptionPlainText}</p>
                </div>
            </section>
        </a>
    </li>
{/if}

<style lang="scss">
    li {
        display: flex;
        flex-flow: row wrap;
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
        border-radius: 0.5rem;
        background-color: rgb(var(--color-background-primary));
        color: white;
        box-shadow:
            0 1px 3px 0 rgb(0 0 0 / 0.1),
            0 1px 2px -1px rgb(0 0 0 / 0.1);
        transition:
            transform 0.25s,
            box-shadow 0.2s,
            border-image-source 1s;
    }
    .full:hover {
        box-shadow:
            0 1px 3px 0 rgb(var(--color-primary)),
            0 1px 2px -1px rgb(var(--color-primary));
    }
    .full:has(.full-width-image) {
        border-image-source: linear-gradient(to left, #d53a9d, #743ad5);
    }
    .slim a {
        text-decoration: none;
        color: unset;
        width: 100%;
        cursor: pointer;
    }
    .slim:has(a[aria-disabled="false"]):hover {
        transform: scale(1.02);
    }
    .slim a[aria-disabled="true"] {
        pointer-events: none;
        background-color: rgb(var(--color-primary));
        color: rgb(var(--color-on-primary));
    }
    .top-container {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        height: 15rem;
        overflow: hidden;
    }
    .top-container {
        height: 15rem;
    }
    .full-width-image {
        width: 100%;
    }
    .half-width-image {
        width: 40%;
    }
    @media (min-width: $breakpoint-md) {
        .half-width-image {
            width: 50%;
        }
        .slim .top-container {
            height: 12.5rem;
        }
        .text-container-short {
            width: 50%;
        }
    }
    [class*="text-container"] {
        display: flex;
        flex-flow: column nowrap;
        height: inherit;
        overflow: hidden;
    }
    .text-container-short {
        transition: width 0.3s ease-in;
        width: 60%;
        height: 100%;
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
    .text-container-short-content p {
        padding-right: 0.5rem;
        overflow-y: auto;
    }
    .text-container-long {
        width: 100%;
        transition: all 0.3s ease-in;
        height: 25rem;
        padding: 1rem;
    }
    .text-container-long.hidden {
        transition: all 0.3s ease-in;
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
    }
    .expanded-description {
        margin: 1rem 0;
        overflow-y: auto;
        padding-right: 1rem;
    }
    :global(.expanded-description li) {
        margin: 0.5rem 0;
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
