import {
  productVariants,
  products,
  userWatchlist,
  variantPrices,
} from "@repo/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const userId = event.context.user?.id;

  if (!userId) {
    return {
      status: 401,
      body: { error: "Unauthorized" },
    };
  }

  try {
    const watchlistItems = await db
      .select({
        id: userWatchlist.id,
        productId: products.id,
        productSlug: products.slug,
        productName: products.name,
        productBrand: products.brand,
        productCollection: products.collection,
        productCreatedAt: products.createdAt,
        productUpdatedAt: products.updatedAt,
        variantPrice: variantPrices.price,
      })
      .from(userWatchlist)
      .innerJoin(products, eq(userWatchlist.productId, products.id))
      .leftJoin(productVariants, eq(productVariants.product, products.id))
      .leftJoin(
        variantPrices,
        eq(variantPrices.productVariant, productVariants.id)
      )
      .where(eq(userWatchlist.userId, userId));

    return {
      status: 200,
      body: watchlistItems.map((item) => ({
        id: item.productId,
        slug: item.productSlug,
        name: item.productName,
        price: item.variantPrice || null,
        brand: item.productBrand,
        collection: item.productCollection,
        createdAt: item.productCreatedAt,
        updatedAt: item.productUpdatedAt,
      })),
    };
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }
});
