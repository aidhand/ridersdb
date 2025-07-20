import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Enable globals for easier testing
    globals: true,
    // Test environment
    environment: "node",
    // Include test files
    include: ["tests/**/*.{test,spec}.{ts,js}"],
    // Exclude files
    exclude: ["node_modules", "dist", "storage"],
    // Alias configuration for easier imports
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
});
