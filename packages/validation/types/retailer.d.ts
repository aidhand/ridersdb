import { retailers } from "@repo/db/schema";
import type { InferModel } from "drizzle-orm";
import type { InferOutput } from "valibot";
import { newRetailerSchema, updateRetailerSchema } from "../src/retailer";
import { identifierSchema } from "../src/utils";

export type Retailer = InferModel<typeof retailers>;
export type RetailerIdentifier = InferOutput<typeof identifierSchema>;
export type NewRetailer = InferOutput<typeof newRetailerSchema>;
export type UpdateRetailer = InferOutput<typeof updateRetailerSchema>;
