import { userWatchlist } from "@repo/db/schema";
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

    // Check if the product is in the user's watchlist
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

    if (existingWatchlistItem.length === 0) {
      return {
        status: 404,
        body: { error: "Product not found in watchlist" },
      };
    }

    // Remove product from watchlist
    await db
      .delete(userWatchlist)
      .where(
        and(
          eq(userWatchlist.userId, userId),
          eq(userWatchlist.productId, productId)
        )
      );

    return {
      status: 200,
      body: { message: "Product removed from watchlist successfully" },
    };
  } catch (error) {
    console.error("Error removing product from watchlist:", error);
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }
});
