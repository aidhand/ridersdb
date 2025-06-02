export default defineEventHandler(async (event) => {
  // Require authentication
  const session = await requireUserSession(event);

  return session;
});
