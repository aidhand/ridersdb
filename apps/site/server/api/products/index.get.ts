// Import the database connection and schema from the workspace package
import { orm, products } from "@repo/db";
import { createError } from "h3";

export default defineEventHandler(async (_event) => {
  try {
    // Query all products from the database
    const res = await orm.select().from(products).execute();

    // Return products as JSON
    return {
      products: res,
      success: true,
      count: res.length,
    };
  } catch (error) {
    // Use H3's createError utility for standardized error handling
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    // Throw a standardized error object with proper status code
    throw createError({
      statusCode: 500,
      statusMessage: "Database Error",
      message,
      fatal: true,
    });
  }
});
