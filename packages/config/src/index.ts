// ESLint configurations
export { baseConfig as eslintBase } from "./eslint/base";
export { typescriptConfig as eslintTypescript } from "./eslint/typescript";
export { nodeConfig as eslintNode } from "./eslint/node";
// export { vueConfig as eslintVue, nuxtConfig as eslintNuxt } from "./eslint/vue";

// Prettier configurations
export { baseConfig as prettierBase } from "./prettier/base";

// TypeScript configurations are JSON files consumed directly via tsconfig.json extends
// Available configurations:
// - @repo/config/typescript/base - Base TypeScript configuration
// - @repo/config/typescript/node - Node.js specific configuration
// - @repo/config/typescript/node-app - Node.js applications (CLI, servers)
// - @repo/config/typescript/node-library - Node.js libraries and packages
// No programmatic export needed for typescript/*.json

// Oxlint configurations
export { baseConfig as oxlintBase } from "./oxlint/base";

// Vitest configuration
export { baseConfig as vitestBase } from "./vitest/base";
