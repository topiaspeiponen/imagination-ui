<header>
    <h1>
        <a href="/">
            Imagination
        </a>
    </h1>
</header>

<slot />

<style>
    header {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        color: rgb(var(--color-primary));
        background-color: rgb(var(--color-background-primary));
        padding: 1.5rem 0;
    }
    a {
        all: unset;
        cursor: pointer;
    }
</style>