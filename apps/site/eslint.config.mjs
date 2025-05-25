/** @type {import('eslint').FlatConfig[]} */
import base from "@repo/config/eslint.config.mjs";

export default [
  ...base,
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": "off",
    },
    ignores: ["node_modules", "dist", ".output", ".nuxt", "*.d.ts"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2021,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];
