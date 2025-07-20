import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Use workspace pattern for better organization
    projects: ["apps/*", "packages/*"],
    // Global test configuration
    globals: true,
    // Reporters for different environments
    reporters: ["default"],
  },
});
