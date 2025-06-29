import { baseConfig } from "./dist/eslint/base.js";
import { typescriptConfig } from "./dist/eslint/typescript.js";
import { nodeConfig } from "./dist/eslint/node.js";

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
