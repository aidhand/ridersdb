import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Use workspace pattern for better organization
    projects: ["apps/*", "packages/*"],
    // Global test configuration
    globals: true,
    // Reporters for different environments
    reporters: process.env.CI ? ["default", "junit"] : ["default"],
    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules",
        "dist",
        "**/*.config.*",
        "**/*.d.ts",
        "**/coverage/**",
      ],
    },
  },
});
