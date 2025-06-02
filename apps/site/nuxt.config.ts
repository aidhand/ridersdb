import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  eslint: { checker: true },

  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    preset: "bun",

    experimental: {
      tasks: true,
      openAPI: true,
    },
  },

  imports: {
    dirs: ["stores"],
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/test-utils/module",
    "nuxt-auth-utils",
  ],

  fonts: {
    defaults: {
      weights: ["100 900"],
      subsets: ["latin", "latin-ext"],
    },
  },

  css: ["~/assets/css/main.css"],

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
});
