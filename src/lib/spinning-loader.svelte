<div class="loading-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>

<style>
    .loading-ring,
    .loading-ring div {
        box-sizing: border-box;
    }
    .loading-ring {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
    }
    .loading-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border: 0.5rem solid currentColor;
        border-radius: 50%;
        animation: loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: currentColor transparent transparent transparent;
    }
    .loading-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .loading-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .loading-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes loading-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
