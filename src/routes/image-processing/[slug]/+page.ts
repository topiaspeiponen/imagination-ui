import type { ImageProcessingTechniquePageData } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export function load({ params }) : ImageProcessingTechniquePageData {
    console.log(params)
    switch (params.slug){
	    case 'histogram-equalization':
            return {
                id: 'histogram-equalization',
                title: 'Hello world!',
                longDescription: `Compute the Histogram: Calculate the histogram of the input image, which represents the frequency of each intensity level in the image.
                Compute the Cumulative Distribution Function (CDF): Calculate the cumulative distribution function from the histogram. The CDF shows the cumulative frequency of intensity levels and is used to map the old intensity levels to new levels.
                Normalize the CDF: Normalize the CDF so that the values range from 0 to 255 (for an 8-bit image). This normalization step transforms the cumulative values into a range suitable for the image's intensity levels.
                Map the Intensity Levels: Use the normalized CDF to map the old intensity levels to new intensity levels. This step effectively redistributes the pixel intensities to achieve a uniform histogram.
                Generate the Equalized Image: Apply the new intensity levels to the pixels in the original image to produce the final equalized image.
                This process results in an image with enhanced contrast, where the intensity levels are more evenly distributed across the entire range, making details in the image more visible.`
            };
        case 'filter-mask':
            return {
                id: 'filter-mask',
                title: 'Filter mask',
                longDescription: 'Filter mask description'
            }
	}

	error(404, 'Not found');
}