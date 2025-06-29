import { baseConfig } from "./base.js";
import type { TSESLint } from "@typescript-eslint/utils";

/**
 * Node.js-specific ESLint configuration
 * Extends base config with Node.js-specific rules and globals
 */
export const nodeConfig: TSESLint.FlatConfig.ConfigArray = [
  ...baseConfig,
  {
    files: ["**/*.js", "**/*.ts", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      globals: {
        // Node.js globals
        global: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        setImmediate: "readonly",
        clearImmediate: "readonly",
      },
    },
    rules: {
      // Node.js specific rules
      "no-process-env": "warn",
      "no-process-exit": "error",
      "no-sync": "warn",
      "handle-callback-err": "error",

      // CommonJS/ES Module rules
      "no-mixed-requires": "error",
      "no-new-require": "error",
      "no-path-concat": "error",
    },
  },
];

export default nodeConfig;
