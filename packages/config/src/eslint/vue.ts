import { baseConfig } from "./base.js";
import type { TSESLint } from "@typescript-eslint/utils";

/**
 * Vue/Nuxt-specific ESLint configuration
 * Extends base config with Vue and Nuxt specific rules
 */
export const vueConfig: TSESLint.FlatConfig.ConfigArray = [
  ...baseConfig,
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      // Vue-specific rules (to be added when vue-eslint-parser is available)
      // These would typically come from @vue/eslint-config-typescript
      "vue/html-self-closing": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/max-attributes-per-line": "off",
      "vue/html-closing-bracket-newline": "off",
    },
  },
];

/**
 * Nuxt-specific ESLint configuration
 * Extends Vue config with Nuxt-specific rules and globals
 */
export const nuxtConfig: TSESLint.FlatConfig.ConfigArray = [
  ...vueConfig,
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      globals: {
        // Nuxt auto-imports and globals
        $fetch: "readonly",
        useNuxtApp: "readonly",
        useHead: "readonly",
        useMeta: "readonly",
        useRoute: "readonly",
        useRouter: "readonly",
        useState: "readonly",
        useCookie: "readonly",
        useRequestHeaders: "readonly",
        useRequestURL: "readonly",
        navigateTo: "readonly",
        abortNavigation: "readonly",
        refresh: "readonly",
        clearNuxtData: "readonly",
        refreshCookie: "readonly",
      },
    },
    rules: {
      // Nuxt-specific rules
      "vue/multi-word-component-names": "off", // Nuxt allows single-word components
    },
  },
];

export { vueConfig as default };
