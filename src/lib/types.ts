export type ImageProcessingTechnique = 'histogram-equalization' | 'filter-mask'

export type ImageProcessingTechniquePageData = {
    id: ImageProcessingTechnique;
    name: string;
    shortDescriptionPlainText: string;
    longDescriptionHtml: string;
    slug: string;
    image: string;
}