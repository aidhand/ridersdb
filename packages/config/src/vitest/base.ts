import { defineConfig } from "vitest/config";

export const baseConfig = defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: [
        [
          "json",
          {
            file: "../coverage.json",
          },
        ],
        "text",
        "html"
      ],
      enabled: true,
      exclude: [
        "coverage/**",
        "dist/**",
        "**/node_modules/**",
        "**/[.]**",
        "**/*.d.ts",
        "**/virtual:*",
        "**/__x00__*",
        "**/\x00*",
        "cypress/**", 
        "test?(s)/**",
        "test?(-*).?(c|m)[jt]s?(x)",
        "**/*{.,-}test.?(c|m)[jt]s?(x)",
        "**/*{.,-}spec.?(c|m)[jt]s?(x)",
        "**/__tests__/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
        "**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
      ]
    },
    include: [
      "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],    testTimeout: 10000,
    hookTimeout: 10000,
    reporters: ["verbose"],
  },
});
