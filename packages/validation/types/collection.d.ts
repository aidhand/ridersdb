import { collections } from "@repo/db/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { InferOutput } from "valibot";
import { newCollectionSchema, updateCollectionSchema } from "../src/collection";
import { identifierSchema } from "../src/utils";

export type Collection = InferSelectModel<typeof collections>;
export type NewCollection = InferInsertModel<typeof collections>;
export type CollectionIdentifier = InferOutput<typeof identifierSchema>;
export type NewCollection = InferOutput<typeof newCollectionSchema>;
export type UpdateCollection = InferOutput<typeof updateCollectionSchema>;
