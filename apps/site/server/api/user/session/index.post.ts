import { sessions } from "@repo/db/schema";
import { db } from "~~/server/utils/db";

// Create a session
export default defineEventHandler(async (event) => {
  // Require authentication
  const userSession = await requireUserSession(event);

  // TODO: implement proper validation

  // Create the session
  const [session] = await db
    .insert(sessions)
    .values({
      id: userSession.id,
      user: userSession.user.id,
      token: userSession.secure?.token as string,
      metadata: userSession.metadata as object,
    })
    .returning();

  return session;
});
