import { brands } from "./schema/brands";
import { categories } from "./schema/categories";
import { products, variants } from "./schema/products";
import { listings, retailers } from "./schema/retailers";
import { stockHistory } from "./schema/stock";
import { priceHistory } from "./schema/prices";

export { brands };
export type Brand = typeof brands.$inferSelect;
export type BrandInsert = typeof brands.$inferInsert;
export type BrandUpdate = Partial<BrandInsert>;

export { categories };
export type Category = typeof categories.$inferSelect;
export type CategoryInsert = typeof categories.$inferInsert;
export type CategoryUpdate = Partial<CategoryInsert>;

export { products };
export type Product = typeof products.$inferSelect;
export type ProductInsert = typeof products.$inferInsert;
export type ProductUpdate = Partial<ProductInsert>;

export { variants };
export type Variant = typeof variants.$inferSelect;
export type VariantInsert = typeof variants.$inferInsert;
export type VariantUpdate = Partial<VariantInsert>;

export { retailers };
export type Retailer = typeof retailers.$inferSelect;
export type RetailerInsert = typeof retailers.$inferInsert;
export type RetailerUpdate = Partial<RetailerInsert>;

export { listings };
export type Listing = typeof listings.$inferSelect;
export type ListingInsert = typeof listings.$inferInsert;
export type ListingUpdate = Partial<ListingInsert>;

export { priceHistory };
export type PriceHistory = typeof priceHistory.$inferSelect;
export type PriceHistoryInsert = typeof priceHistory.$inferInsert;
export type PriceHistoryUpdate = Partial<PriceHistoryInsert>;

export { stockHistory };
export type StockHistory = typeof stockHistory.$inferSelect;
export type StockHistoryInsert = typeof stockHistory.$inferInsert;
export type StockHistoryUpdate = Partial<StockHistoryInsert>;
