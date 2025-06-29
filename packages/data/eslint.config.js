import { baseConfig } from "@repo/config/eslint/base";
import { typescriptConfig } from "@repo/config/eslint/typescript";
import { nodeConfig } from "@repo/config/eslint/node";

export default [
  ...baseConfig,
  ...typescriptConfig,
  ...nodeConfig,
  {
    ignores: ["tests"],
  },
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Allow patterns common in data/seeding scripts
      "no-process-env": "warn",
      "no-process-exit": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
