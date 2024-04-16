<script lang="ts">
    import { enhance } from "$app/forms";

	/** @type {import('./$types').ActionData} */
	let form;

    let uploadedImg : string | undefined = undefined;
    let imgData : string | undefined = undefined;

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
            };
        }}>
        <label for="name">
            Name
        </label>
        <input type="file" id="image" name="image" on:change={(e) => imageUploaded(e)} required />
        <button type="submit">
            Submit
        </button>
    </form>
    <div class="image-edit-area">
        {#if uploadedImg}
        <figure>
            <img
                src={uploadedImg}
                width="300"
                alt="t"/>
                <figcaption>
                    Uploaded image
                </figcaption>
            </figure>
        {/if}
        {#if imgData}
        <figure>
            <img
                src={imgData}
                width="300"
                alt="t"/>
            <figcaption>
                Your processed image
            </figcaption>
        </figure>
        {/if}
    </div>
</section>

<style>
    .image-edit-area {
        display: flex;
        flex-flow: row nowrap;
        gap: 4rem;
        margin-top: 2rem;
    }
    figure {
        all: unset;
    }
    figure img {
        border: 1px solid grey;
    }
</style>