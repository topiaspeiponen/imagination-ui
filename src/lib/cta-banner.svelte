<script>
    import Button from "./button.svelte";

</script>
<header>
    <h1>
        Imagination - image processing hub
    </h1>
    <hr />
    <p>
        Improve your images with a suite of image processing methods
    </p>
</header>

<style lang="scss">
    @use '../global.scss' as *;

    header {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        background-color: rgb(var(--color-background-primary));
        padding-left: 5rem;
        padding-right: 5rem;
        padding-top: 3rem;
    }
    @media (min-width: $breakpoint-md) {
        header {
            padding-top: 2rem;
        }
    }
    h1 {
        color: rgb(var(--color-on-background-primary));
    }
    p {
        opacity: 0;
        color: white;
        animation: 0.5s ease-in 0.25s fadeInUp forwards; 
    }
    hr {
        border: unset;
        border-top: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(90deg, rgb(var(--color-secondary)) 40%, rgb(var(--color-primary)) 100%);
        width: 100%;
        margin-top: 1rem;
    }
    h1, hr {
        animation: 0.5s ease-in 0s fadeInUp; 
    }
</style>