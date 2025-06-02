import { userPreferences } from "@repo/db/schema";
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
    // Check if preferences exist before deleting
    const existingPreferences = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    if (existingPreferences.length === 0) {
      return {
        status: 404,
        body: { error: "User preferences not found" },
      };
    }

    // Delete user preferences
    await db.delete(userPreferences).where(eq(userPreferences.userId, userId));

    return {
      status: 200,
      body: { message: "User preferences deleted successfully" },
    };
  } catch (error) {
    console.error("Error deleting user preferences:", error);
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }
});
