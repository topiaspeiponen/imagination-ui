<script>
    import Button from "./button.svelte";

</script>
<header>
    <h1>
        Improve your images with a suite of image processing methods
    </h1>
    <hr />
    <p>
        Blahblah blah blah blahblah Blahblah blah blah blahblah Blahblah blah blah blahblah
    </p>
    <Button label="Start editing" />
</header>

<style>
    header {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        background-color: rgb(var(--color-on-primary));
        padding-left: 5rem;
        padding-right: 5rem;
    }
    h1 {
        color: rgb(var(--color-primary));
    }
    p {
        color: white;
    }
    hr {
        border: unset;
        border-top: 1px solid rgb(var(--color-light-grey));
        width: 100%;
        margin-top: 1rem;
    }
</style>