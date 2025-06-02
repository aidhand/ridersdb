import { users } from "@repo/db/schema";
import { db } from "~~/server/utils/db";

// Create a user
export default defineEventHandler(async (event) => {
  // Require authentication
  const userSession = await requireUserSession(event);

  // TODO: implement proper validation

  // Check if the user exists
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, userSession.user.email))
    .limit(1);

  if (existingUser) return existingUser;

  // Create the user
  const [newUser] = await db
    .insert(users)
    .values({
      email: userSession.user.email as string,
      name: userSession.user.name as string,
    })
    .returning();

  return newUser;
});
