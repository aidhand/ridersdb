import { z } from "zod";

export const variantSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  size: z.string().nullable(),
  color: z.string().nullable(),
  product: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Variant = z.infer<typeof variantSchema>;
