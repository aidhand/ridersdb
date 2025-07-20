import { baseConfig } from "@repo/config/eslint/base";
import { typescriptConfig } from "@repo/config/eslint/typescript";

export default [
  ...baseConfig,
  ...typescriptConfig,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
