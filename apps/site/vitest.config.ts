import { defineVitestConfig } from "@nuxt/test-utils/config";
import { mergeConfig } from "vitest/config";
import { baseConfig } from "@repo/config/vitest/base";

export default defineVitestConfig(
  mergeConfig(baseConfig, {
    test: {
      // Test files
      include: [
        // "**/*.nuxt.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "**/*{.,-}{nuxt.,}{test,spec}.?(c|m)[jt]s?(x)",
      ],
      exclude: ["**/e2e/**"],

      // Environment options for Nuxt
      environmentOptions: {
        nuxt: {
          domEnvironment: "happy-dom",
        },
      },
    },
  })
);
