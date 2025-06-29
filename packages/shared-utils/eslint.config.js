import { typescriptConfig } from "@repo/config/eslint/typescript";

export default [
  ...typescriptConfig,
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    rules: {
      // Allow `any` types in utility functions - often necessary for generic utilities
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
