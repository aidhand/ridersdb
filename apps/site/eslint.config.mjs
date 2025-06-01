// @ts-check
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  js.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "no-undef": "off",
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": "off",
    },
  },
]);
