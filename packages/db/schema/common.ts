import { text, timestamp, uuid } from "drizzle-orm/pg-core";

export const baseFields = () => ({
  id: uuid("id").primaryKey().defaultRandom(),
});

export const slugField = () => ({
  slug: text("slug").notNull().unique(),
});
export const nameField = () => ({
  name: text("name").notNull(),
});

export const descriptionField = () => ({
  description: text("description"),
});

export const urlField = () => ({
  url: text("url").notNull(),
});

export const timestampFields = () => ({
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const expiresAtField = () => ({
  expiresAt: timestamp("expires_at"),
});
