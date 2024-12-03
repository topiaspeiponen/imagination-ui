import type { ImageProcessingTechniquePageData } from "./types";

const techniques: ImageProcessingTechniquePageData[] = [{
    id: 'histogram-equalization',
    name: 'Histogram equalization',
    shortDescriptionPlainText: 'Adjust the global contrast of your image',
    longDescriptionHtml: `<div class="histogram-equalization-description">
  <ol>
    <li>
      <strong>Upload an Image</strong><br>
      Start by selecting and uploading an image to be processed.
    </li>
    <li>
      <strong>Understand Histogram Equalization</strong><br>
      This technique enhances the contrast of your image by redistributing pixel intensity values. It works by spreading out the most frequent intensity values, making details in brighter or darker areas more visible.
    </li>
    <li>
      <strong>Process and View Results</strong><br>
      Simply click <strong>Process Image</strong> to apply histogram equalization. The resulting image will have improved contrast and enhanced visual detail, particularly in underexposed or overexposed regions.
    </li>
  </ol>
</div>`,
    slug: 'histogram-equalization',
    image: "https://via.placeholder.com/150",
}, {
    id: 'filter-mask',
    name: 'Filter mask',
    shortDescriptionPlainText: 'Process your image piece by piece with a mask filter',
    longDescriptionHtml: `<div class="filter-description">
  <ol>
    <li>
      <strong>Upload an Image</strong><br>
      Start by selecting and uploading an image to be processed.
    </li>
    <li>
      <strong>Set Filter Parameters</strong><br>
      Adjust the following options to customize the filter applied to your image:
      <ul>
        <li>
          <strong>Mask Dimensions</strong><br>
          Define the size of the filter mask using height and width. Both values can range from <strong>3 to 15</strong> pixels. Larger masks analyze more pixels but may affect performance.
        </li>
        <li>
          <strong>Corner Handling</strong><br>
          Choose how the edges and corners of the image are processed:
          <ul>
            <li><strong>Mirror</strong>: Reflects surrounding pixels to fill gaps.</li>
            <li><strong>Resize</strong>: Adjusts the image to fit the mask.</li>
            <li><strong>Substitute Min</strong>: Uses the minimum pixel value from the image.</li>
            <li><strong>Substitute Max</strong>: Uses the maximum pixel value from the image.</li>
          </ul>
        </li>
        <li>
          <strong>Filter Type</strong><br>
          Select the type of processing:
          <ul>
            <li><strong>Median</strong>: Replaces each pixel with the median value of its surrounding pixels. Useful for reducing noise while preserving edges.</li>
            <li><strong>Mean</strong>: Replaces each pixel with the average value of its surrounding pixels. Useful for creating a smoother, blurred effect.</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <strong>Process and View Results</strong><br>
      Click <strong>Process Image</strong> to apply the filter. The filtered image will be displayed, reflecting the applied parameters.
    </li>
  </ol>
</div>`,
    slug: 'filter-mask',
    image: "https://via.placeholder.com/150",
}];

export default techniques;