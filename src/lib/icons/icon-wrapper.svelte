<script lang="ts">
    export let color = "currentColor";
    export let height : string;
    export let width : string;
</script>

<span
    style:color={color}
    style:height={height}
    style:width={width}
    style:display="flex"
>
    <slot></slot>
</span>
