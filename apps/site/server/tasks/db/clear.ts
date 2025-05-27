import {
  brands,
  collections,
  prices,
  products,
  retailers,
  variants,
} from "@repo/db/schema";

export default defineTask({
  meta: {
    name: "db:clear",
    description: "Clear all data from the database",
  },
  async run() {
    console.log("🗑️  Clearing database...");

    try {
      // Delete in order to respect foreign key constraints
      console.log("Deleting prices...");
      await db.delete(prices);

      console.log("Deleting variants...");
      await db.delete(variants);

      console.log("Deleting products...");
      await db.delete(products);

      console.log("Deleting retailers...");
      await db.delete(retailers);

      console.log("Deleting collections...");
      await db.delete(collections);

      console.log("Deleting brands...");
      await db.delete(brands);

      console.log("✅ Database cleared successfully!");

      return {
        result: {
          success: true,
          message: "Database cleared successfully",
        },
      };
    } catch (error) {
      console.error("❌ Error clearing database:", error);
      throw error;
    }
  },
});
