import type { Config } from "prettier";

/**
 * Base Prettier configuration for all packages
 * Provides consistent code formatting across the monorepo
 */
export const baseConfig: Config = {
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "none",
  printWidth: 80,
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  overrides: [
    {
      files: ["*.json", "*.jsonc"],
      options: {
        parser: "json",
        printWidth: 120,
      },
    },
    {
      files: ["*.md", "*.mdx"],
      options: {
        parser: "markdown",
        printWidth: 100,
        proseWrap: "always",
      },
    },
    {
      files: ["*.yaml", "*.yml"],
      options: {
        parser: "yaml",
        tabWidth: 2,
      },
    },
    {
      files: ["*.css", "*.scss", "*.less"],
      options: {
        parser: "css",
        printWidth: 120,
      },
    },
  ],
};

export default baseConfig;
