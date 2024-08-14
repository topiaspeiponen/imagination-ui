import type { ImageProcessingTechniquePageData } from "./types";

const techniques: ImageProcessingTechniquePageData[] = [{
    id: 'histogram-equalization',
    name: 'Histogram equalization',
    shortDescriptionPlainText: '',
    longDescriptionHtml: `<ol>
                <li>Compute the Histogram: Calculate the histogram of the input image, which represents the frequency of each intensity level in the image.</li>
                <li>Compute the Cumulative Distribution Function (CDF): Calculate the cumulative distribution function from the histogram. The CDF shows the cumulative frequency of intensity levels and is used to map the old intensity levels to new levels.</li>
                <li>Normalize the CDF: Normalize the CDF so that the values range from 0 to 255 (for an 8-bit image). This normalization step transforms the cumulative values into a range suitable for the image's intensity levels.</li>
                <li>Map the Intensity Levels: Use the normalized CDF to map the old intensity levels to new intensity levels. This step effectively redistributes the pixel intensities to achieve a uniform histogram.</li>
                <li>Generate the Equalized Image: Apply the new intensity levels to the pixels in the original image to produce the final equalized image.</li>
                <li>This process results in an image with enhanced contrast, where the intensity levels are more evenly distributed across the entire range, making details in the image more visible.</li>
                </ol>`,
    slug: 'histogram-equalization',
    image: "https://via.placeholder.com/150",
}, {
    id: 'filter-mask',
    name: 'Filter mask',
    shortDescriptionPlainText: '',
    longDescriptionHtml: 'Filter mask description',
    slug: 'filter-mask',
    image: "https://via.placeholder.com/150",
}];

export default techniques;