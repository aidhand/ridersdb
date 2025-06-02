import { relations } from "drizzle-orm";
import { users, userWatchlist } from "./auth";
import { products } from "./products";

// Relations that span across schema files to avoid circular dependencies
export const userWatchlistRelations = relations(userWatchlist, ({ one }) => ({
  user: one(users, {
    fields: [userWatchlist.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [userWatchlist.productId],
    references: [products.id],
  }),
}));
