<script lang="ts">
    import { createSelect, melt } from "@melt-ui/svelte";
    import IconWrapper from "./icons/icon-wrapper.svelte";
    import ChevronDown from "./icons/chevron-down.svelte";

    export let selectOptions: { [key: string]: string };
    export let selectLabel: string;
    export let placeholder: string;

    const {
        elements: { trigger, menu, option, group, groupLabel, label },
        states: { selectedLabel, open },
        helpers: { isSelected },
    } = createSelect<string>({
        forceVisible: true,
        positioning: {
            placement: "bottom",
            fitViewport: true,
            sameWidth: true,
        },
    });
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label use:melt={$label}>{selectLabel}</label>
<button class="select-field" use:melt={$trigger}>
    <span>{$selectedLabel || placeholder}</span>
    <IconWrapper height="24px" width="24px">
        <ChevronDown />
    </IconWrapper>
</button>
{#if $open}
    <div class="select-option-list-container" use:melt={$menu}>
        <ul use:melt={$group("test")}>
            {#each Object.entries(selectOptions) as selectOption}
                <li
                    use:melt={$option({
                        value: selectOption[0],
                        label: selectOption[1],
                    })}
                >
                    {selectOption[1]}
                </li>
            {/each}
        </ul>
    </div>
{/if}

<style>
    .select-field {
        display: flex;
        flex-flow: row nowrap;
        min-width: 200px;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        text-align: left;
        align-items: center;
        font-weight: 400;
    }
    .select-field span {
        margin-right: auto;
    }
    ul {
        list-style: none;
        border-radius: 0.5rem;
        background-color: white;
        padding: 0.5rem;
        color: black;
        margin: 0;
    }
    ul li {
        padding: 0.5rem 1rem;
    }
    ul li:hover {
        background-color: grey;
        border-radius: 0.5rem;
    }
</style>
