export type ImageProcessingTechnique = 'histogram-equalization' | 'filter-mask'

export type ImageProcessingTechniqueItem = {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
}

export type ImageProcessingTechniquePageData = {
    id: ImageProcessingTechnique;
    title: string;
    longDescription: string;
}