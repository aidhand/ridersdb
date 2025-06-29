import { typescriptConfig } from "@repo/config/eslint/typescript";

export default [
  ...typescriptConfig,
  {
    rules: {
      // Allow `any` types in type definition files - often necessary for generic type definitions
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
