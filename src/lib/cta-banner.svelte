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
    <Button
        label="Start editing"
        buttonAttributes={{
            style: 
                `
                    animation: 0.5s ease-in 0.75s fadeInUp forwards;
                    opacity: 0;
                `
        }}
    />
</header>

<style>
    header {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        background-color: rgb(var(--color-background-primary));
        padding-left: 5rem;
        padding-right: 5rem;
    }
    h1 {
        color: rgb(var(--color-primary));
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