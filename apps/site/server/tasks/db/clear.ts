import { useNodePg } from "@repo/db";
import {
  brands,
  priceHistory,
  productCategories,
  productVariants,
  products,
  retailers,
  stockHistory,
} from "@repo/db/schema";

const { database } = useRuntimeConfig();
const db = useNodePg(database.url);

export default defineTask({
  meta: {
    name: "db:clear",
    description: "Clear all data from the database",
  },
  async run() {
    console.log("🗑️  Clearing database...");

    await db.transaction(async (tx) => {
      try {
        // Delete in order to respect foreign key constraints
        console.log("Deleting price history...");
        await tx.delete(priceHistory);

        console.log("Deleting stock history...");
        await tx.delete(stockHistory);

        console.log("Deleting product variants...");
        await tx.delete(productVariants);

        console.log("Deleting products...");
        await tx.delete(products);

        console.log("Deleting retailers...");
        await tx.delete(retailers);

        console.log("Deleting categories...");
        await tx.delete(productCategories);

        console.log("Deleting brands...");
        await tx.delete(brands);
      } catch (error) {
        console.error("❌ Error clearing database:", error);
        tx.rollback();
      }
    });

    console.log("✅ Database cleared successfully!");

    return {
      result: {
        success: true,
        message: "Database cleared successfully",
      },
    };
  },
});
