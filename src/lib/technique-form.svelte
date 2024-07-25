<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/button.svelte";
    import IconWrapper from "./icons/icon-wrapper.svelte";
    import Upload from "./icons/upload.svelte";
    import ModalImage from "./modal-image.svelte";
    import SpinningLoader from "./spinning-loader.svelte";

	/** @type {import('./$types').ActionData} */
	let form;

    let uploadedImg : string | undefined = undefined;
    let imgData : string | undefined = undefined;
    let loading = false;

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
</script>

<section>
    <h2>
        Technique Form
    </h2>
    <div>
        <h3>
            How does it work?
        </h3>
        <p>
            This is a form that allows you to submit a new image processing technique to be added to the list of techniques.
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
                    imgData = image;
                }
                await update();
                loading = false;
            };
        }}>
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
        {#if loading}
        <div class="loader-container">
            <div class="loader">
                <SpinningLoader />
            </div>
        </div>
        {/if}
    </div>
</section>

<style lang="scss">
    .image-edit-area {
        display: flex;
        flex-flow: row wrap;
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
    .loader {
        width: 4rem;
        height: 4rem;
        color: rgb(var(--color-secondary))
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