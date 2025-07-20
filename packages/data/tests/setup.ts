import { afterAll, beforeAll } from "vitest";

beforeAll(async () => {
  // Setup test environment without database
  console.log("🧪 Setting up test environment...");

  // Mock environment variables if needed
  process.env.NODE_ENV = "test";
});

afterAll(async () => {
  // Cleanup
  console.log("🧪 Cleaning up test environment...");
});
