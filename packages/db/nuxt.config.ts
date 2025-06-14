export default defineNuxtConfig({
  runtimeConfig: {
    database: {
      url: "",
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/test-utils"],
});
