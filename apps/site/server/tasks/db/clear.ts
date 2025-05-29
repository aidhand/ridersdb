import { useNodePg } from "@repo/db";
import {
  brands,
  collections,
  prices,
  products,
  retailers,
  variants,
} from "@repo/db/schema";

const { databaseUrl } = useRuntimeConfig();
const db = useNodePg(databaseUrl);

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
        console.log("Deleting prices...");
        await tx.delete(prices);

        console.log("Deleting variants...");
        await tx.delete(variants);

        console.log("Deleting products...");
        await tx.delete(products);

        console.log("Deleting retailers...");
        await tx.delete(retailers);

        console.log("Deleting collections...");
        await tx.delete(collections);

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
