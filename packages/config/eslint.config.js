import { baseConfig } from "./src/eslint/base";
import { typescriptConfig } from "./src/eslint/typescript";
import { nodeConfig } from "./src/eslint/node";

export default [
  ...baseConfig,
  ...typescriptConfig,
  ...nodeConfig,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
