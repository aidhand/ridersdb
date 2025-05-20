import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    renderJsonPayloads: true,
  },

  imports: {
    dirs: ["./app/stores", "./shared/types"],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia/colada-nuxt",
  ],

  css: ["~/assets/css/main.css"],
});
