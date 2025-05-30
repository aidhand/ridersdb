export default defineTask({
  meta: {
    name: "db:reset",
    description: "Clear and reseed the database with fresh data",
  },
  async run({ payload }) {
    console.log("🔄 Resetting database (clear + seed)...");

    try {
      // Run clear task
      await runTask("db:clear");

      // Run seed task with any provided payload
      await runTask("db:seed", { payload });

      console.log("✅ Database reset completed successfully!");

      return {
        result: {
          success: true,
          message: "Database reset completed successfully",
        },
      };
    } catch (error) {
      console.error("❌ Error resetting database:", error);
      throw error;
    }
  },
});
