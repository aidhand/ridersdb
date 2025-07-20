import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * Base ESLint configuration for all packages
 * Provides foundational rules and TypeScript support
 */
export const baseConfig: ReturnType<typeof tseslint.config> = tseslint.config(
  // Global ignores - applied to all configs
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/.cache/**",
      "**/coverage/**",
      "**/*.min.js",
      "**/*.bundle.js",
      "**/*.config.js",
      "**/*.config.ts",
      "**/eslint.config.js",
      "**/vitest.config.ts",
      "**/vite.config.ts",
    ],
  },

  // Base configurations
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Base rules for all JavaScript/TypeScript files
  {
    rules: {
      // Code quality
      "no-var": "warn",
      "prefer-const": "warn",
      "no-unused-vars": "warn",

      // Enforce consistent naming
      "camelcase": [
        "error",
        {
          properties: "never",
          ignoreDestructuring: true,
        },
      ],

      // Import organization
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],

      // Console and debugging
      // eslint-disable-next-line no-process-env
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      // eslint-disable-next-line no-process-env
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

      // Error prevention
      "no-unreachable": "error",
      "no-duplicate-case": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-fallthrough": "error",

      // Best practices
      "eqeqeq": ["error", "always", { null: "ignore" }],
      "no-implicit-coercion": "error",
      "prefer-template": "error",
      "no-useless-concat": "error",

      // TypeScript specific overrides
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Configuration for TypeScript files with type-aware rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
    },
  }
);
