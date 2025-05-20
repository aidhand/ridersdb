import { jsonb, pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const providers = authSchema.table("providers", {
  id: uuid("id").primaryKey().defaultRandom(),

  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const users = authSchema.table("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  email: text("email").notNull().unique(),
  name: text("name").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const sessions = authSchema.table("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),

  token: text("token").notNull().unique(),
  metadata: jsonb("metadata"),

  user: uuid("user")
    .notNull()
    .references(() => users.id),
  provider: uuid("provider")
    .notNull()
    .references(() => providers.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at")
    .notNull()
    .$defaultFn(() => new Date(Date.now() + 1000 * 86400 * 14)),
});
