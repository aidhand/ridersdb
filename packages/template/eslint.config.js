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
  },
];
