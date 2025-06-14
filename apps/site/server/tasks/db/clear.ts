export default defineTask({
  meta: {
    name: "db:clear",
    description: "Clear all data from the database",
  },
  async run() {
    console.log("🗑️  Clearing database...");

    // Helper function for clearing logic
    async function runClear(dbOrTx) {
      // Delete data in reverse dependency order to respect foreign key constraints
      console.log("Deleting product variants...");
      await dbOrTx.delete(productVariants);

      console.log("Deleting products...");
      await dbOrTx.delete(products);

      console.log("Deleting retailers...");
      await dbOrTx.delete(retailers);

      console.log("Deleting product categories...");
      await dbOrTx.delete(productCategories);

      console.log("Deleting brands...");
      await dbOrTx.delete(brands);
    }

    try {
      try {
        // Attempt to use a transaction
        await db.transaction(async (tx) => {
          await runClear(tx);
        });
      } catch (txError) {
        console.warn(
          "⚠️ Transaction failed, falling back to non-transactional clear:",
          txError
        );
        await runClear(db);
      }
    } catch (error) {
      console.error("❌ Error clearing database:", error);
      throw error;
    }

    console.log("✅ Database cleared successfully!");

    return {
      result: {
        success: true,
        message: "Database cleared successfully",
      },
    };
  },
});
