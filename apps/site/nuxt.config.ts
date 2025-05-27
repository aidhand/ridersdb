// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  // experimental: {
  //   asyncContext: true,
  //   asyncEntry: true,
  //   clientFallback: true,
  //   componentIslands: true,
  //   renderJsonPayloads: true,
  //   lazyHydration: true,
  //   sharedPrerenderData: true,
  //   typedPages: true,
  // },

  nitro: {
    preset: "bun",

    experimental: {
      tasks: true,
      openAPI: true,
    },
  },

  runtimeConfig: {
    databaseUrl: "",

    api: {
      baseUrl: "/api",
      pagination: {
        defaultLimit: 20,
        defaultOffset: 0,
      },
    },

    public: {},
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils/module",
    "@nuxt/ui",
  ],
  fonts: {
    defaults: {
      weights: ["100 900"],
      subsets: ["latin", "latin-ext"],
    },
  },
  css: ["~/assets/css/main.css"],
});
