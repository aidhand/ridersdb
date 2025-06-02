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
    const preferences = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    // If no preferences exist, return default values
    if (preferences.length === 0) {
      return {
        status: 200,
        body: {
          viewMode: "grid",
          currency: "USD",
          region: "US",
          createdAt: null,
          updatedAt: null,
        },
      };
    }
    return {
      status: 200,
      body: {
        id: preferences[0]?.id,
        viewMode: preferences[0]?.viewMode,
        currency: preferences[0]?.currency,
        region: preferences[0]?.region,
        createdAt: preferences[0]?.createdAt,
        updatedAt: preferences[0]?.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }
});
