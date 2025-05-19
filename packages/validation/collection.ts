import { z } from "zod";

export const newCollectionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
});
export type NewCollectionInput = z.infer<typeof newCollectionSchema>;
