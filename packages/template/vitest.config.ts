import { defineConfig, mergeConfig } from "vitest/config";
import { baseConfig } from "@repo/config/vitest/base";
import tsconfigPaths from "vite-tsconfig-paths";

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      environment: "node",
      setupFiles: ["./tests/setup.ts"],
    },
  })
);
