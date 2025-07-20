import tseslint from "typescript-eslint";

/**
 * TypeScript-specific ESLint configuration
 * Provides TypeScript rules for better type safety
 */
export const typescriptConfig: ReturnType<typeof tseslint.config> =
  tseslint.config(
    // Apply TypeScript recommended rules
    ...tseslint.configs.recommended,
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
      rules: {
        // Basic TypeScript rules
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-inferrable-types": "warn",

        // Interface and type definitions
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],

        // Array type consistency
        "@typescript-eslint/array-type": ["error", { default: "array-simple" }],

        // Disable base ESLint rules that conflict with TypeScript
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "error",
      },
    }
  );

export default typescriptConfig;
