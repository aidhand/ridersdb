import { afterAll, beforeAll } from "vitest";

beforeAll(async () => {
  // Setup test environment
  console.log("🧪 Setting up template test environment...");

  // Initialize any test resources
  // eslint-disable-next-line no-process-env
  process.env.NODE_ENV = "test";
});

afterAll(async () => {
  // Cleanup test environment
  console.log("🧪 Cleaning up template test environment...");

  // Clean up any test resources
});
