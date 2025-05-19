import { z } from "zod";

export const newProductSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  brand: z.string().uuid(),
  collection: z.string().uuid(),
});
export type NewProductInput = z.infer<typeof newProductSchema>;
