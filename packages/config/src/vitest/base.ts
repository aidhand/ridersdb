import { defineConfig } from "vitest/config";

export const baseConfig = defineConfig({
  test: {
    globals: true,

    include: [
      // "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)",
    ],

    exclude: [
      "**/node_modules/**",
      "**/coverage/**",
      "**/dist/**",
      "**/*.config.*",
      "**/.{eslint,prettier}rc.{?(c|m)js,yml}",
      "**/.{idea,git,cache,output,temp,nuxt,next}/**",
    ],

    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "html"],

      exclude: [
        "**/node_modules/**",
        "**/coverage/**",
        "**/dist/**",
        "**/*.d.ts",
        "**/*.config.*",
        "**/virtual:*",
        "**/test?(s)/**",
        "**/type?(s)/**",
        "**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)",
        "**/.{eslint,prettier}rc.{?(c|m)js,yml}",
        "**/.{idea,git,cache,output,temp,nuxt,next}/**",
      ],
    },

    testTimeout: 10000,
    hookTimeout: 10000,
    reporters: ["verbose"],
  },
});
