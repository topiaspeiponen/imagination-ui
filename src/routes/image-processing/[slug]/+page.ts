import type { ImageProcessingTechniquePageData } from '$lib/types.js';
import { error } from '@sveltejs/kit';
import type { PageLoadEvent } from './$types';
import techniques from '$lib/techniques';

export function load({ params } : PageLoadEvent) : ImageProcessingTechniquePageData | undefined {
    switch (params.slug){
	    case 'histogram-equalization':
            return techniques.find(tech => tech.id === 'histogram-equalization');
        case 'filter-mask':
            return techniques.find(tech => tech.id === 'filter-mask');
	}

	error(404, 'Not found');
}