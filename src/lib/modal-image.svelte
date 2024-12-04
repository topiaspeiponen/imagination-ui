<script lang="ts">
    import Cancel from "./icons/cancel.svelte";
    import IconWrapper from "./icons/icon-wrapper.svelte";
    import ZoomIn from "./icons/zoom-in.svelte";
    import ZoomOut from "./icons/zoom-out.svelte";

    export let image : string ;
    export let alt : string;
    export let caption : string = '';
    let dialog : HTMLDialogElement;

</script>

<figure>
    <button on:click={() => dialog.showModal()}>
        <IconWrapper
            width="100%"
            height="100%">
            <ZoomOut />
        </IconWrapper>
    </button>
    <img src={image} alt={alt} />
    <figcaption>
        {caption}
    </figcaption>
</figure>
<dialog bind:this={dialog}>
    <button on:click={() => dialog.close()}>
        <IconWrapper
            width="100%"
            height="100%">
            <Cancel />
        </IconWrapper>
    </button>
    <div class="dialog-image-container">
        <img src={image} alt={alt} />
    </div>
</dialog>

<style lang="scss">
    @use '../global.scss' as *;

    figure {
        all: unset;
        display: block;
        position: relative;
        width: 100%;
    }
    button {
        all: unset;
        background-color: white;
        color: black;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.25);
        position: absolute;
        cursor: pointer;
        width: 1rem;
        height: 1rem;
        padding: 0.25rem;
        right: 0.25rem;
        top: 0.5rem;
        opacity: 0;
        transition: all 0.3s;
    }
    figure img {
        border: 1px solid black;
        transition: all 0.3s;
        backface-visibility: hidden;
        object-fit: cover;
        max-width: 100%;
    }
    @media (min-width: $breakpoint-md) {
        figure img {
            width: 100%;
        }
    }
    dialog {
        width: 80%;
        height: 80%;
        overflow: hidden;
        padding: 1.5rem;
        z-index: 99;
    }
    dialog::backdrop {
        background-color: black;
        opacity: 0.75;
    }
    dialog button {
        opacity: 1;
    }
    .dialog-image-container {
        height: 100%;
        width: 100%;
    }
    .dialog-image-container img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
    figure:hover button {
        opacity: 1;
    }
</style>
