import { retailers } from "@repo/db";
import type { InferModel } from "drizzle-orm";

export type Retailer = InferModel<typeof retailers>;
export type NewRetailer = InferModel<typeof retailers, "insert">;
