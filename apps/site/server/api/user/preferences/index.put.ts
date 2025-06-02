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
    const body = await readBody(event);

    if (!body || typeof body !== "object") {
      return {
        status: 400,
        body: { error: "Invalid request body" },
      };
    }

    const { viewMode, currency, region } = body;

    // Validate required fields
    if (!viewMode || !currency || !region) {
      return {
        status: 400,
        body: { error: "viewMode, currency, and region are required" },
      };
    }

    // Validate viewMode
    if (viewMode !== "grid" && viewMode !== "list") {
      return {
        status: 400,
        body: { error: "viewMode must be either 'grid' or 'list'" },
      };
    }

    // Check if preferences already exist
    const existingPreferences = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    let updatedPreferences;

    if (existingPreferences.length === 0) {
      // Create new preferences
      const [created] = await db
        .insert(userPreferences)
        .values({
          userId,
          viewMode,
          currency,
          region,
        })
        .returning();

      updatedPreferences = created;
    } else {
      // Update existing preferences
      const [updated] = await db
        .update(userPreferences)
        .set({
          viewMode,
          currency,
          region,
          updatedAt: new Date(),
        })
        .where(eq(userPreferences.userId, userId))
        .returning();

      updatedPreferences = updated;
    }
    return {
      status: 200,
      body: {
        id: updatedPreferences?.id,
        viewMode: updatedPreferences?.viewMode,
        currency: updatedPreferences?.currency,
        region: updatedPreferences?.region,
        createdAt: updatedPreferences?.createdAt,
        updatedAt: updatedPreferences?.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error updating user preferences:", error);
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }
});
