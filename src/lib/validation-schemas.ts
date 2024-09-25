import { z } from "zod";

export const filterMaskFormSchema = z.object({
  mask_width: z.number().min(3),
  mask_height: z.number().min(3),
  corner_handling: z.string().min(1),
  filter_type: z.string().min(1)
});
