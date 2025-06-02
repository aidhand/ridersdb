import { products, userWatchlist } from "@repo/db/schema";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const userId = event.context.user?.id;

  if (!userId) {
    return {
      status: 401,
      body: { error: "Unauthorized" },
    };
  }

  try {
    const body = await readBody(event);

    if (!body || typeof body !== "object") {
      return {
        status: 400,
        body: { error: "Invalid request body" },
      };
    }

    const { productId } = body;

    if (!productId) {
      return {
        status: 400,
        body: { error: "productId is required" },
      };
    }

    // Verify that the product exists
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length === 0) {
      return {
        status: 404,
        body: { error: "Product not found" },
      };
    }

    // Check if the product is already in the watchlist
    const existingWatchlistItem = await db
      .select()
      .from(userWatchlist)
      .where(
        and(
          eq(userWatchlist.userId, userId),
          eq(userWatchlist.productId, productId)
        )
      )
      .limit(1);

    if (existingWatchlistItem.length > 0) {
      return {
        status: 409,
        body: { error: "Product is already in watchlist" },
      };
    }

    // Add product to watchlist
    const watchlistItems = await db
      .insert(userWatchlist)
      .values({
        userId,
        productId,
      })
      .returning();

    const watchlistItem = watchlistItems[0];
    if (!watchlistItem) {
      return {
        status: 500,
        body: { error: "Failed to create watchlist item" },
      };
    }

    return {
      status: 201,
      body: {
        id: watchlistItem.id,
        userId: watchlistItem.userId,
        productId: watchlistItem.productId,
        createdAt: watchlistItem.createdAt,
      },
    };
  } catch (error) {
    console.error("Error adding product to watchlist:", error);
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }
});
