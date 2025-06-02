import { relations } from "drizzle-orm";
import {
  index,
  jsonb,
  pgSchema,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const users = authSchema.table(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    email: text("email").notNull().unique(),
    name: text("name").notNull(),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index().on(table.email), index().on(table.name)]
);

export const sessions = authSchema.table(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    token: text("token").notNull().unique(),
    metadata: jsonb("metadata"),

    user: uuid("user")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    expiresAt: timestamp("expires_at")
      .notNull()
      .$defaultFn(() => new Date(Date.now() + 1000 * 86400 * 14)),
  },
  (table) => [index().on(table.token), index().on(table.user)]
);

// User preferences table
export const userPreferences = authSchema.table(
  "user_preferences",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    viewMode: text("view_mode").notNull().default("grid"),
    currency: text("currency").notNull().default("USD"),
    region: text("region").notNull().default("US"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index().on(table.userId)]
);

export const userPreferencesRelations = relations(
  userPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userPreferences.userId],
      references: [users.id],
    }),
  })
);

// User watchlist table
export const userWatchlist = authSchema.table(
  "user_watchlist",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    productId: uuid("product_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index().on(table.userId),
    index().on(table.productId),
    index().on(table.userId, table.productId),
  ]
);
