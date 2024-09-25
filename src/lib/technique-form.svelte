<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/button.svelte";
    import IconWrapper from "./icons/icon-wrapper.svelte";
    import Upload from "./icons/upload.svelte";
    import ModalImage from "./modal-image.svelte";
    import SpinningLoader from "./spinning-loader.svelte";
    import type { ImageProcessingTechnique } from "./types";
    import type { FilterMaskForm, FormSelect, SelectOption, SvelteFormData} from "./form-types";
    import Error from "./icons/error.svelte";
    import Input from "./input.svelte";
    import Select from "./select.svelte";
    import { get, writable } from "svelte/store";
    import { filterMaskFormSchema } from "./validation-schemas";

    export let title: string;
    export let description: string;
    export let techniqueId : ImageProcessingTechnique;
    let uploadedImg : string | undefined = undefined;
    let imgData : string | undefined = undefined;
    let loading = false;
    let error = false;
    
    const cornerHandlingOptions : SelectOption = {
        fit: 'Fit',
        resize: 'Resize',
        substituteMin: 'Substitute min',
        substituteMax: 'Substitute max'
    }

    const filterTypeOptions : SelectOption = {
        median: 'Median',
        mean: 'Mean'
    }

    let form : SvelteFormData<FilterMaskForm> = {
        values: {
            mask_width: 3,
            mask_height: 3,
            corner_handling: cornerHandlingOptions.fit,
            filter_type: filterTypeOptions.median,
            corner_handling_select: writable({
                label: cornerHandlingOptions.fit,
                value: Object.keys(cornerHandlingOptions).find((key) => key === 'fit') || ''
            }),
            filter_type_select: writable({
                label: filterTypeOptions.median,
                value: Object.keys(filterTypeOptions).find((key) => key === 'median') || ''
            }),
        },
        errors: {}
    };

    const parseFormData = (values: FilterMaskForm) : FilterMaskForm => {
        const parsed = {
            ...values,
            corner_handling: values.corner_handling_select ? get(values.corner_handling_select).value : '',
            filter_type: values.filter_type_select ? get(values.filter_type_select).value : ''
        };
        delete parsed.corner_handling_select;
        delete parsed.filter_type_select;
        return parsed;
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
        use:enhance={({ formData, cancel }) => {
            const parsedFormData = parseFormData(form.values)
            const validationResults = filterMaskFormSchema.safeParse(parsedFormData);

            if (validationResults.error) {
                console.error('Errors detected, cancel submission');
                cancel();
                return;
            }
            loading = true;
            
            Object.entries(parsedFormData).forEach((entry) => {
                formData.append(entry[0], entry[1].toString())
            })
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
                <Input inputAttributes={{type: "number", id:"mask-height-num", min:3, max: 15, required: true, "bind:value": form.values['mask_width'] }}/>
            </span>
            <span>
                <label for=mask-height>Mask height</label>
                <Input inputAttributes={{type: "number", id:"mask-height-num", min:3, max: 15, required: true, "bind:value": form.values['mask_height'] }}/>
            </span>
            <span>
                {#if form.values['corner_handling_select']}
                <Select selected={form.values['corner_handling_select']} selectLabel="Corner handling" placeholder="Select corner handling" selectOptions={cornerHandlingOptions} />
                {/if}
            </span>
            <span>
                {#if form.values['filter_type_select']}
                <Select selected={form.values['filter_type_select']}  selectLabel="Filter type" placeholder="Select filter type" selectOptions={filterTypeOptions} />
                {/if}
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