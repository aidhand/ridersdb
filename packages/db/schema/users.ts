import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  baseFields,
  descriptionField,
  expiresAtField,
  nameField,
  slugField,
  timestampFields,
} from "./common";
import { currencyEnum, languageEnum, regionEnum, themeEnum } from "./enums";

export const users = pgTable("users", {
  ...baseFields(),

  email: varchar("email").notNull().unique(),
  firstName: varchar("first_name", { length: 100 }),

  githubId: varchar("github_id"),
  githubUsername: varchar("github_username"),

  location: varchar("location"),
  timezone: varchar("timezone"),

  // Parent relationships
  // - nil
  //
  // Child relationships
  // - notifications (one-to-many)
  // - preferences (one-to-one)
  // - sessions (one-to-many)
  // - watchers (one-to-many)
  //
  // Many-to-many relationships
  // - lists (user watchlists)

  ...timestampFields(),
});

export const userRelations = relations(users, () => ({
  // relations to be defined in other files as needed
}));

export const userSessions = pgTable(
  "user_sessions",
  {
    ...baseFields(),

    // Parent relationships
    // - users (many-to-one)
    //
    // Child relationships
    // - nil
    //
    // Many-to-many relationships
    // - nil

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    // TODO: auto-generate session tokens
    sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
    refreshToken: varchar("refresh_token", { length: 255 }),

    userAgent: varchar("user_agent"),
    ipAddress: varchar("ip_address", { length: 45 }), // IPv6 max length

    ...timestampFields(),
    ...expiresAtField(),
  },
  (table) => [index().on(table.userId), index().on(table.sessionToken)]
);

export const userSessionRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));

export const userPreferences = pgTable(
  "user_preferences",
  {
    ...baseFields(),

    // Parent relationships
    // - users (one-to-one)
    //
    // Child relationships
    // - nil
    //
    // Many-to-many relationships
    // - nil

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    // Site preferences
    theme: themeEnum("theme").notNull().default("system"),

    // Localization preferences
    language: languageEnum("language").notNull().default("en"),
    region: regionEnum("region").notNull().default("AU"),
    currency: currencyEnum("currency").notNull().default("AUD"),
    // Notification preferences
    emailNotifications: boolean("email_notifications").notNull().default(true),
    smsNotifications: boolean("sms_notifications").notNull().default(false),
    pushNotifications: boolean("push_notifications").notNull().default(false),

    ...timestampFields(),
  },
  (table) => [index().on(table.userId)]
);

export const userPreferenceRelations = relations(
  userPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userPreferences.userId],
      references: [users.id],
    }),
  })
);

export const userWatchers = pgTable(
  "user_watchers",
  {
    ...baseFields(),

    // Parent relationships
    // - users (many-to-one)
    //
    // Child relationships
    // - nil
    //
    // Many-to-many relationships
    // - nil

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    productId: uuid("product_id"),
    variantId: uuid("variant_id"),
    retailerId: uuid("retailer_id"),

    name: varchar("name", { length: 255 }).notNull(),
    triggerType: varchar("trigger_type", { length: 50 }).notNull(),
    targetPrice: numeric("target_price", { precision: 10, scale: 2 }),
    thresholdType: varchar("threshold_type", { length: 20 }).default(
      "absolute"
    ),
    thresholdValue: numeric("threshold_value", { precision: 10, scale: 2 }),
    stockThreshold: integer("stock_threshold").default(1),
    notifyEmail: boolean("notify_email").notNull().default(true),
    notifyPush: boolean("notify_push").notNull().default(false),
    notifySms: boolean("notify_sms").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    triggerOnce: boolean("trigger_once").notNull().default(false),
    maxTriggers: integer("max_triggers"),
    triggerCount: integer("trigger_count").notNull().default(0),
    lastTriggeredAt: timestamp("last_triggered_at"),

    ...timestampFields(),
  },
  (table) => [
    index().on(table.userId),
    index().on(table.productId),
    index().on(table.variantId),
    index().on(table.retailerId),
  ]
);

export const userWatcherRelations = relations(userWatchers, ({ one }) => ({
  user: one(users, {
    fields: [userWatchers.userId],
    references: [users.id],
  }),
}));

export const userNotifications = pgTable(
  "user_notifications",
  {
    ...baseFields(),

    // Parent relationships
    // - users (many-to-one)
    //
    // Child relationships
    // - nil
    //
    // Many-to-many relationships
    // - nil

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    type: varchar("type", { length: 50 }).notNull(), // 'info', 'warning', 'error', 'success'
    isRead: boolean("is_read").notNull().default(false),

    ...timestampFields(),
  },
  (table) => [index().on(table.userId), index().on(table.isRead)]
);

export const userNotificationRelations = relations(
  userNotifications,
  ({ one }) => ({
    user: one(users, {
      fields: [userNotifications.userId],
      references: [users.id],
    }),
  })
);

export const userLists = pgTable(
  "user_lists",
  {
    ...baseFields(),

    ...slugField(),

    ...nameField(),
    ...descriptionField(),

    // Parent relationships
    // - users (many-to-one)
    //
    // Child relationships
    // - nil
    //
    // Many-to-many relationships
    // - products
    // - users (user watchlists)

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    ...timestampFields(),
  },
  (table) => [index().on(table.userId), index().on(table.slug)]
);

export const userListRelations = relations(userLists, ({ one }) => ({
  user: one(users, {
    fields: [userLists.userId],
    references: [users.id],
  }),
}));

// Junction table for user lists and products (many-to-many)
export const userListProductsJunction = pgTable(
  "user_list_products_junction",
  {
    listId: uuid("list_id")
      .notNull()
      .references(() => userLists.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    productId: uuid("product_id").notNull(),
    addedAt: timestamp("added_at").notNull().defaultNow(),
  },
  (table) => [
    index().on(table.listId),
    index().on(table.productId),
    index().on(table.listId, table.productId),
  ]
);
