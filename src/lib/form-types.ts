import type { Writable } from "svelte/store";

// General form types (generics)

export type SelectOption = {[key: string]: string};

export type SvelteFormData<TValues extends Record<string, string | number | FormSelect>> = {
    values: TValues;
    errors: {
        [K in keyof TValues]?: {
            type?: string;
            message: string;
        }
    }
}

export type FormSelect = Writable<{
    label: string;
    value: string;
}>

// Custom form types

export type FilterMaskForm = {
    mask_width: number;
    mask_height: number;
    corner_handling: string;
    filter_type: string;
    corner_handling_select?: FormSelect;
    filter_type_select?: FormSelect;
}