import createUser from "~~/server/api/user/index.post";
import createSession from "~~/server/api/user/session/index.post";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },

  async onSuccess(event, res) {
    await setUserSession(event, {
      user: {
        email: res.user.email,
        name: res.user.name,
      },

      secure: {
        token: res.tokens.access_token,
      },

      metadata: res.user,
    });

    const user = await createUser(event);
    console.log("User created:", JSON.stringify(user));

    // Add the full user information - will be merged with the existing session
    await setUserSession(event, {
      user,
    });

    const session = await createSession(event);
    console.log("Session created:", JSON.stringify(session));

    await setUserSession(event, {
      createdAt: session.createdAt,
    });

    return sendRedirect(event, "/user");
  },

  onError(event, error) {
    // TODO: Redirect to an error page
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
