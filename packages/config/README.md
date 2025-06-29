# @repo/config

Unified configuration package for RidersDB projects - ESLint, TypeScript, Prettier, Oxlint, and Vitest configurations.

## Features

- **ESLint**: Base, TypeScript, Node.js, and Vue/Nuxt configurations
- **TypeScript**: Strict, modern TypeScript settings
- **Prettier**: Consistent code formatting
- **Oxlint**: Fast Rust-based linting
- **Vitest**: Test configuration
- **Direct Imports**: No factory functions - import and extend configs directly
- **TypeScript-first**: Full type safety for all configurations
- **Monorepo Ready**: Designed for workspace and turborepo setups

## Installation

```bash
# Using npm
npm install --save-dev @repo/config

# Using bun
bun add --dev @repo/config
```

## Usage

### ESLint

#### Basic JavaScript/TypeScript Project

```javascript
// eslint.config.js
import { baseConfig } from "@repo/config/eslint/base";

export default baseConfig;
```

#### TypeScript Project with Strict Rules

```javascript
// eslint.config.js
import { baseConfig } from "@repo/config/eslint/base";
import { typescriptConfig } from "@repo/config/eslint/typescript";

export default [...baseConfig, ...typescriptConfig];
```

#### Node.js Project

```javascript
// eslint.config.js
import { baseConfig } from "@repo/config/eslint/base";
import { nodeConfig } from "@repo/config/eslint/node";

export default [...baseConfig, ...nodeConfig];
```

#### Vue/Nuxt Project

```javascript
// eslint.config.js
import { vueConfig, nuxtConfig } from "@repo/config/eslint/vue";

// For Vue projects
export default vueConfig;

// For Nuxt projects
export default nuxtConfig;
```

#### Full Stack Project

```javascript
// eslint.config.js
import { baseConfig } from "@repo/config/eslint/base";
import { typescriptConfig } from "@repo/config/eslint/typescript";
import { nodeConfig } from "@repo/config/eslint/node";

export default [
  ...baseConfig,
  ...typescriptConfig,
  ...nodeConfig,
  {
    // Custom overrides
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

### TypeScript

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@repo/config/typescript/base",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist"
  }
}
```

### Prettier

```javascript
// prettier.config.js
import { baseConfig } from "@repo/config/prettier/base";

export default baseConfig;
```

Or using the config directly:

```json
{
  "extends": "@repo/config/prettier/base"
}
```

### Oxlint

```javascript
// oxlint.config.js
import { baseConfig } from "@repo/config/oxlint/base";

export default baseConfig;
```

### Vitest

#### Basic Test Configuration

```javascript
// vitest.config.ts
import { baseConfig } from "@repo/config/vitest/base";

export default baseConfig;
```

#### UI Tests with jsdom Environment

```javascript
// vitest.config.ts
import { uiConfig } from "@repo/config/vitest/ui";

export default uiConfig;
```

#### Custom Configuration

```javascript
// vitest.config.ts
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
```

## Configuration Structure

```
@repo/config/
├── eslint/
│   ├── base        # Base ESLint rules for all JS/TS
│   ├── typescript  # Strict TypeScript rules
│   ├── node        # Node.js specific rules and globals
│   └── vue         # Vue/Nuxt rules and configs
├── typescript/
│   └── base        # Base TypeScript compiler options
├── prettier/
│   └── base        # Base Prettier formatting rules
├── oxlint/
│   └── base        # Base Oxlint configuration
└── vitest/
    ├── base        # Base Vitest test configuration
    └── ui          # UI-focused config with jsdom environment
```

## Advanced Usage

### Custom ESLint Rules

```javascript
import { baseConfig } from "@repo/config/eslint/base";
import { typescriptConfig } from "@repo/config/eslint/typescript";

export default [
  ...baseConfig,
  ...typescriptConfig,
  {
    files: ["**/*.ts"],
    rules: {
      // Override or add custom rules
      "@typescript-eslint/no-unused-vars": "error",
      "prefer-const": "warn",
    },
  },
];
```

### Project-Specific TypeScript

```json
{
  "extends": "@repo/config/typescript/base",
  "compilerOptions": {
    "lib": ["DOM", "ES2022"],
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

## Available Exports

- `@repo/config/eslint/base` - Base ESLint configuration
- `@repo/config/eslint/typescript` - TypeScript-specific ESLint rules
- `@repo/config/eslint/node` - Node.js ESLint configuration
- `@repo/config/eslint/vue` - Vue and Nuxt ESLint configurations
- `@repo/config/typescript/base` - Base TypeScript configuration
- `@repo/config/prettier/base` - Base Prettier configuration
- `@repo/config/oxlint/base` - Base Oxlint configuration
- `@repo/config/vitest/base` - Base Vitest configuration

## Migration from Factory Pattern

If you were previously using the factory functions:

```javascript
// Old factory pattern ❌
import { createESLintConfig } from "@repo/config/eslint";
export default createESLintConfig({ typescript: true, node: true });

// New direct import pattern ✅
import { baseConfig } from "@repo/config/eslint/base";
import { typescriptConfig } from "@repo/config/eslint/typescript";
import { nodeConfig } from "@repo/config/eslint/node";
export default [...baseConfig, ...typescriptConfig, ...nodeConfig];
```

## License

MIT
