import { baseConfig } from "@repo/config/eslint/base";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Add ignore for this config file specifically
  {
    ignores: ["eslint.config.js"],
  },
  ...baseConfig,
  // TypeScript files with project info for type-aware linting
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
