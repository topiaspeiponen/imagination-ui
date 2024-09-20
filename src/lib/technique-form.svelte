<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/button.svelte";
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    import IconWrapper from "./icons/icon-wrapper.svelte";
    import Upload from "./icons/upload.svelte";
    import ModalImage from "./modal-image.svelte";
    import SpinningLoader from "./spinning-loader.svelte";
    import type { ImageProcessingTechnique, SelectOption } from "./types";
    import type { Action } from "@sveltejs/kit";
    import Error from "./icons/error.svelte";
    import Input from "./input.svelte";
    import Select from "./select.svelte";

    export let title: string;
    export let description: string;
    export let techniqueId : ImageProcessingTechnique;
    let uploadedImg : string | undefined = undefined;
    let imgData : string | undefined = undefined;
    let loading = false;
    let error = false;

    const filterMaskOptions : SelectOption = {
        fit: 'Fit',
        resize: 'Resize',
        substituteMin: 'Substitute min',
        substituteMax: 'Substitute max'
    }

    const filterTypeOptions : SelectOption = {
        median: 'Median',
        mean: 'Mean'
    }
    
    
    const imageUploaded = (event : Event & {
        currentTarget: EventTarget & HTMLInputElement;
    }) => {
        const file = event?.currentTarget?.files?.[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const target = e.target?.result;
            if (typeof target === "string") uploadedImg = target;
        };
        reader.readAsDataURL(file);
    };

    /** @type {import('svelte/action').Action<HTMLElement, string>}  */
	function render(node : HTMLElement, techniqueId : ImageProcessingTechnique) {
		// Component is re-rendered, empty image data
        uploadedImg = undefined;
        imgData = undefined;
	}
</script>

{#key techniqueId}
<div use:render={techniqueId}>
    <h2>
        {title}
    </h2>
    <div>
        <h3>
            How does it work?
        </h3>
        <p>
            {@html description}
        </p>
    </div>
    <hr />
    <form
        method="POST"
        enctype="multipart/form-data"
        use:enhance={({ formElement, formData, action, cancel, submitter }) => {
            loading = true;
            // `formElement` is this `<form>` element
            // `formData` is its `FormData` object that's about to be submitted
            // `action` is the URL to which the form is posted
            // calling `cancel()` will prevent the submission
            // `submitter` is the `HTMLElement` that caused the form to be submitted

            return async ({ result, update }) => {
                if (result.type === "success" && typeof result.data?.image === "string") {
                    const image = result.data?.image;
                    loading = false;
                    imgData = image;
                }
                else if (result.type === 'error' || result.type === 'failure') {
                    loading = false;
                    error = true;
                }
                await update();
            };
        }}>
        {#if techniqueId == 'filter-mask'}
        <div class="filter-mask-extra-inputs">
            <span>
                <label for=mask-width>Mask width</label>

                <Input inputAttributes={{name: "mask_width", type: "number", id:"mask-height-num", min:3, max: 15, required: true }}/>
            </span>
            <span>
                <label for=mask-height>Mask height</label>
                <Input inputAttributes={{name: "mask_height", type: "number", id:"mask-height-num", min:3, max: 15, required: true }}/>
            </span>
            <span>
                <Select selectLabel="Corner handling" placeholder="Select corner handling" selectOptions={filterMaskOptions} />
            </span>
            <span>
                <Select selectLabel="Filter type" placeholder="Select filter type" selectOptions={filterTypeOptions} />
            </span>
        </div>
        {/if}
        <input type="file" id="image" name="image" on:change={(e) => imageUploaded(e)} required />
        <Button
            buttonAttributes={
                {type:"submit"}
            }
            size="small"
            label="Submit"
            iconPlacement="right">
            <IconWrapper
                slot="icon"
                height="24px"
                width="24px">
                <Upload />
            </IconWrapper>
        </Button>
    </form>
    <div class="image-edit-area">
        {#if uploadedImg}
        <div class="image-container">
            <ModalImage image={uploadedImg} alt="test" />
        </div>
        {/if}
        {#if imgData && !loading}
        <div class="image-container">
            <ModalImage image={imgData} alt="test" />
        </div>
        {/if}
        {#if error && !loading}
        <div class="error-container">
            <IconWrapper
                height="24px"
                width="24px">
                <Error />
            </IconWrapper>
            There was an error processing the image
        </div>
        {/if}
        {#if loading}
        <div class="loader-container">
            <div class="loader">
                <SpinningLoader />
            </div>
        </div>
        {/if}
    </div>
</div>
{/key}

<style lang="scss">
    h2 {
        margin-bottom: 1rem;
    }
    .image-edit-area {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 4rem;
        margin-top: 2rem;
    }
    form {
        display: flex;
        flex-flow: row wrap;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
    }
    hr {
        border: unset;
        border-bottom: 2px solid rgb(var(--color-primary-accent))
    }
    input::-webkit-file-upload-button {
        all: unset;
        background-color: rgb(var(--color-primary));
        padding: 0.5rem 1rem;
        margin-right: 0.5rem;
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
    input::-webkit-file-upload-button:hover {
        background-color: rgb(var(--color-secondary));
        color: rgb(var(--color-on-secondary));
    }
    input::-webkit-file-upload-button:active {
        background-color: rgba(var(--color-secondary), 0.75);
    }
    .image-container {
        max-width: 300px;
    }
    .loader-container {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .error-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
        color: rgb(var(--color-primary))
    }
    .loader {
        width: 4rem;
        height: 4rem;
        color: rgb(var(--color-secondary))
    }
    .filter-mask-extra-inputs {
        display: flex;
        flex-flow: column nowrap;
        gap: 1rem;
        width: 100%;
    }
    .filter-mask-extra-inputs span {
        display: flex;
        flex-flow: column nowrap;
        gap: 0.5rem;
        width: fit-content;
    }

    @media (min-width: $breakpoint-md) {
        .image-container{
            max-width: 300px;
        }
    }
    @media (min-width: $breakpoint-xl) {
        .image-container {
            max-width: 400px;
        }
    }
</style>