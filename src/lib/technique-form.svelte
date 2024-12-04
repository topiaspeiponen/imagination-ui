<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/button.svelte";
    import IconWrapper from "./icons/icon-wrapper.svelte";
    import Upload from "./icons/upload.svelte";
    import ModalImage from "./modal-image.svelte";
    import SpinningLoader from "./spinning-loader.svelte";
    import type { ImageProcessingTechnique } from "./types";
    import type {
        FilterMaskForm,
        SelectOption,
        SvelteFormData,
    } from "./form-types";
    import Error from "./icons/error.svelte";
    import Select from "./select.svelte";
    import { get, writable } from "svelte/store";
    import { filterMaskFormSchema } from "./validation-schemas";
    import type { SubmitFunction } from "@sveltejs/kit";

    let { title, description, techniqueId } : { title: string, description: string, techniqueId: ImageProcessingTechnique} = $props();

    let uploadedImg = $state<string | undefined>();
    let imgData = $state<string | undefined>();
    let loading = $state<boolean>(false);
    let error = $state<boolean>(false);

    const cornerHandlingOptions: SelectOption = {
        mirror: "Mirror",
        resize: "Resize",
        substituteMin: "Substitute min",
        substituteMax: "Substitute max",
    };

    const filterTypeOptions: SelectOption = {
        median: "Median",
        mean: "Mean",
    };

    let form = $state<SvelteFormData<FilterMaskForm>>({
            values: {
                mask_width: 3,
                mask_height: 3,
                corner_handling: cornerHandlingOptions.fit,
                filter_type: filterTypeOptions.median,
                corner_handling_select: writable({
                    label: cornerHandlingOptions.mirror,
                    value:
                        Object.keys(cornerHandlingOptions).find(
                            (key) => key === "mirror",
                        ) || "",
                }),
                filter_type_select: writable({
                    label: filterTypeOptions.median,
                    value:
                        Object.keys(filterTypeOptions).find(
                            (key) => key === "median",
                        ) || "",
                }),
            },
            errors: {},
        });

    const resetForm = () => {
        form = {
            values: {
                mask_width: 3,
                mask_height: 3,
                corner_handling: cornerHandlingOptions.fit,
                filter_type: filterTypeOptions.median,
                corner_handling_select: writable({
                    label: cornerHandlingOptions.mirror,
                    value:
                        Object.keys(cornerHandlingOptions).find(
                            (key) => key === "mirror",
                        ) || "",
                }),
                filter_type_select: writable({
                    label: filterTypeOptions.median,
                    value:
                        Object.keys(filterTypeOptions).find(
                            (key) => key === "median",
                        ) || "",
                }),
            },
            errors: {},
        };
    };

    const clearErrors = () => {
        form = {
            ...form,
            errors: {},
        };
    };
    resetForm();

    const parseFormData = (values: FilterMaskForm): FilterMaskForm => {
        const parsed = {
            ...values,
            corner_handling: values.corner_handling_select
                ? get(values.corner_handling_select).value
                : "",
            filter_type: values.filter_type_select
                ? get(values.filter_type_select).value
                : "",
        };
        delete parsed.corner_handling_select;
        delete parsed.filter_type_select;
        return parsed;
    };

    const imageUploaded = (
        event: Event & {
            currentTarget: EventTarget & HTMLInputElement;
        },
    ) => {
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

    const submit: SubmitFunction = ({ formData, cancel }) => {
        clearErrors();
        // Validate formdata
        const parsedFormData = parseFormData(form.values);
        const validationResults =
            filterMaskFormSchema.safeParse(parsedFormData);

        if (validationResults.error) {
            console.error(
                "Errors detected, cancel submission ",
                validationResults.error,
            );
            const keys = Object.keys(
                validationResults.error.formErrors.fieldErrors,
            );
            keys.forEach((err) => {
                const key = err as keyof Omit<
                    FilterMaskForm,
                    "corner_handling_select" | "filter_type_select"
                >;
                const message =
                    validationResults.error.formErrors.fieldErrors[key];
                form = {
                    ...form,
                    errors: {
                        ...form.errors,
                        [key]: {
                            message,
                        },
                    },
                };
            });
            cancel();
            return;
        }
        imgData = undefined;
        loading = true;

        Object.entries(parsedFormData).forEach((entry) => {
            formData.append(entry[0], entry[1].toString());
        });

        return async ({ result, update }) => {
            if (
                result.type === "success" &&
                typeof result.data?.image === "string"
            ) {
                const image = result.data?.image;
                loading = false;
                error = false;
                imgData = image;
            } else if (result.type === "error" || result.type === "failure") {
                loading = false;
                error = true;
            }
            await update({
                reset: false,
            });
        };
    };

    function render(
        _node: HTMLElement,
        _techniqueId: ImageProcessingTechnique,
    ) {
        uploadedImg = undefined;
        imgData = undefined;
        error = false;
    }
</script>

{#key techniqueId}
    <div class="technique-container" use:render={techniqueId}>
        <h2>
            {title}
        </h2>
        <div class="technique-description">
            <h3>How does it work?</h3>
            <p>
                {@html description}
            </p>
        </div>
        <hr />
        <form method="POST" enctype="multipart/form-data" use:enhance={submit}>
            {#if techniqueId == "filter-mask"}
                <div class="filter-mask-extra-inputs">
                    <span>
                        <label for="mask-width">Mask width</label>
                        <input
                            type="number"
                            id="mask-width-num"
                            min="3"
                            max="15"
                            required
                            bind:value={form.values["mask_width"]}
                            oninput={(element) => {
                                form = {
                                    ...form,
                                    values: {
                                        ...form.values,
                                        mask_width: parseInt(
                                            element.currentTarget.value,
                                        ),
                                    },
                                };
                            }}
                        />
                        {#if form.errors["mask_width"]}
                            <small>
                                {form.errors["mask_width"].message}
                            </small>
                        {/if}
                    </span>
                    <span>
                        <label for="mask-height">Mask height</label>
                        <input
                            type="number"
                            id="mask-height-num"
                            min="3"
                            max="15"
                            required
                            bind:value={form.values["mask_height"]}
                            oninput={(element) => {
                                form = {
                                    ...form,
                                    values: {
                                        ...form.values,
                                        mask_height: parseInt(
                                            element.currentTarget.value,
                                        ),
                                    },
                                };
                            }}
                        />
                        {#if form.errors["mask_height"]}
                            <small>
                                {form.errors["mask_height"].message}
                            </small>
                        {/if}
                    </span>
                    <span>
                        {#if form.values["corner_handling_select"]}
                            <Select
                                selected={form.values["corner_handling_select"]}
                                selectLabel="Corner handling"
                                placeholder="Select corner handling"
                                selectOptions={cornerHandlingOptions}
                            />
                        {/if}
                    </span>
                    <span>
                        {#if form.values["filter_type_select"]}
                            <Select
                                selected={form.values["filter_type_select"]}
                                selectLabel="Filter type"
                                placeholder="Select filter type"
                                selectOptions={filterTypeOptions}
                            />
                        {/if}
                    </span>
                </div>
            {/if}
            <input
                type="file"
                accept="image/png, image/jpeg"
                id="image"
                name="image"
                onchange={(e) => imageUploaded(e)}
                required
            />
            <Button
                buttonAttributes={{
                    type: "submit",
                    disabled: loading,
                }}
                size="small"
                label="Process image"
                iconPlacement="right"
            >
                <IconWrapper slot="icon" height="24px" width="24px">
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
                    <IconWrapper height="24px" width="24px">
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
    @use '../global.scss' as *;

    input {
        padding: 0.5rem;
        border: 1px solid white;
        border-radius: 0.3rem;
    }
    small {
        color: rgb(var(--color-error));
    }
    h2 {
        margin-bottom: 1rem;
    }
    .technique-container {
        padding: 0 1rem;
    }
    :global(.technique-description li) {
        margin: 0.5rem 0;
    }
           
    .image-edit-area {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 1rem;
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
        border-bottom: 2px solid rgb(var(--color-primary-accent));
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
        width: 50%;
    }
    .loader-container {
        display: flex;
        justify-content: center;
        width: 50%;
    }
    .error-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
        color: rgb(var(--color-primary));
    }
    .loader {
        width: 4rem;
        height: 4rem;
        color: rgb(var(--color-secondary));
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
        .image-edit-area {
            gap: 2rem;
        }
    }
</style>
