import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  eslint: { checker: true },

  css: ["~/assets/css/main.css"],

  fonts: {
    defaults: {
      weights: ["100 900"],
      subsets: ["latin", "latin-ext"],
    },
  },

  runtimeConfig: {
    session: {
      password: "",
    },

    oauth: {
      github: {
        clientId: "",
        clientSecret: "",
      },
    },

    database: {
      url: "",
    },

    api: {
      baseUrl: "/api",
      pagination: {
        defaultLimit: 20,
        defaultOffset: 0,
      },
    },

    public: {},
  },

  nitro: {
    preset: "bun",

    experimental: {
      tasks: true,
      openAPI: true,
    },
  },

  extends: ["@repo/db", "@repo/auth"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/test-utils",
  ],
});
