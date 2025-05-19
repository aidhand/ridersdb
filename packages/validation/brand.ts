import { z } from "zod";

export const newBrandSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
});
export type NewBrandInput = z.infer<typeof newBrandSchema>;
