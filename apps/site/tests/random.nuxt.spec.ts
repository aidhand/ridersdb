import { fileURLToPath } from "node:url";
import { $fetch, isDev, setup } from "@nuxt/test-utils";
import { describe, expect, it } from "vitest";

console.log(import.meta.url);

describe("example", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("..", import.meta.url)),
    server: true,
  });

  it("Renders Hello Nuxt", async () => {
    expect(await $fetch("/")).toMatch("Hello Nuxt!");
  });

  if (isDev()) {
    it("[dev] ensure vite client script is added", async () => {
      expect(await $fetch("/")).toMatch('/_nuxt/@vite/client"');
    });
  }
});
