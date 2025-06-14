export default defineNuxtConfig({
  runtimeConfig: {
    database: {
      url: "",
    },

    session: {
      password: "",
    },

    oauth: {
      github: {
        clientId: "",
        clientSecret: "",
      },
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/test-utils"],
});
