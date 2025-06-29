import { defineConfig, mergeConfig } from "vitest/config";
import { baseConfig } from "@repo/config/vitest/base";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      setupFiles: ["./tests/setup.ts"],
    },
  })
);
