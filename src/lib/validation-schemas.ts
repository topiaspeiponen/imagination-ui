import { z } from "zod";

const maskDimensionSchema = z.number().min(3).refine((val) => val % 2 !== 0, {
  message: "Number must be odd",
});

export const filterMaskFormSchema = z.object({
  mask_width: maskDimensionSchema,
  mask_height: maskDimensionSchema,
  corner_handling: z.string().min(1),
  filter_type: z.string().min(1)
});
