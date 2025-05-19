import { z } from "zod";

export const newVariantSchema = z.object({
  product: z.string().uuid(),
  sku: z.string(),
  size: z.string().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  metadata: z.any().optional(),
});
export type NewVariantInput = z.infer<typeof newVariantSchema>;
