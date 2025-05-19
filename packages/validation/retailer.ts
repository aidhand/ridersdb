import { z } from "zod";

export const newRetailerSchema = z.object({
  slug: z.string(),
  name: z.string(),
  url: z.string().url(),
});
export type NewRetailerInput = z.infer<typeof newRetailerSchema>;
