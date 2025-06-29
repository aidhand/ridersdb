/**
 * Base Oxlint configuration for all packages
 * Provides fast, performant linting with Rust-based oxlint
 */
export interface OxlintConfig {
  env: Record<string, boolean>;
  categories: Record<string, string>;
  rules: Record<string, string>;
  ignorePatterns: string[];
}

export const baseConfig: OxlintConfig = {
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  categories: {
    correctness: "error",
    style: "warn",
    suspicious: "warn",
    perf: "warn",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "prefer-const": "error",
    "no-var": "error",
    "eqeqeq": "error",
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    ".nuxt/",
    ".output/",
    "coverage/",
    "*.min.js",
  ],
};

export default baseConfig;
