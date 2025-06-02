// Create a session
export default defineEventHandler(async (event) => {
  // Require authentication
  const userSession = await requireUserSession(event);
  return userSession;
});
