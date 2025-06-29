# @repo/template

A template package for creating new packages in the RidersDB workspace. This package follows the established patterns and configurations used throughout the monorepo.

## 🚀 Quick Start

This template provides a solid foundation for creating new packages in the RidersDB workspace with:

- **TypeScript**: Full type safety with proper configuration
- **ESLint**: Code linting with shared configuration
- **Vitest**: Testing framework with coverage support
- **Prettier & Biome**: Code formatting and linting
- **Workspace Integration**: Proper monorepo setup

## 📁 Structure

```
packages/template/
├── src/
│   ├── lib/           # Core library functionality
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── index.ts       # Main package exports
├── tests/             # Test files
├── package.json       # Package configuration
├── tsconfig.json      # TypeScript configuration
├── eslint.config.js   # ESLint configuration
├── vitest.config.ts   # Vitest configuration
└── README.md          # This file
```

## 🛠️ Usage

### As a Template

1. **Copy the template:**

   ```bash
   cp -r packages/template packages/your-new-package
   ```

2. **Update package.json:**

   ```json
   {
     "name": "@repo/your-new-package",
     "description": "Your package description"
     // ... other fields
   }
   ```

3. **Update imports and exports:**

   - Modify `src/index.ts` to export your functionality
   - Update test files to test your code
   - Customize the library structure as needed

4. **Install dependencies:**
   ```bash
   bun install
   ```

### Development Scripts

```bash
# Build the package
bun run build

# Development mode with watch
bun run dev

# Run tests
bun run test

# Run tests with coverage
bun run test:coverage

# Type checking
bun run typecheck

# Linting
bun run lint
bun run lint:check

# Formatting
bun run format
bun run format:check

# Biome (alternative linter/formatter)
bun run biome:check
bun run biome:fix
```

## 🧩 What's Included

### Core Library (`src/lib/`)

- `TemplateCore`: Example core class with basic functionality
- Extensible structure for adding more modules

### Types (`src/types/`)

- `TemplateConfig`: Configuration interface
- `TemplateOptions`: Options interface
- `TemplateResult`: Result type for operations
- `TemplateEventHandler`: Event handler type

### Utils (`src/utils/`)

- `Logger`: Logging utility with prefixes
- `sleep`: Async sleep function
- `isDefined`: Type guard for defined values
- `deepClone`: Deep cloning utility

### Tests (`tests/`)

- Example tests for core functionality
- Test setup with proper environment configuration
- Coverage reporting configured

## 🔧 Configuration

### TypeScript

- Extends `@repo/config/typescript/lib`
- Configured for library development
- Path mapping for clean imports (`~/*`)

### ESLint

- Extends `@repo/config/eslint`
- TypeScript and Node.js support enabled
- Proper parser configuration

### Vitest

- Node.js test environment
- Setup files configured
- Coverage reporting available

## 📦 Dependencies

### Production Dependencies

- None by default (add as needed)

### Development Dependencies

- `@repo/config`: Shared configuration
- `typescript`: TypeScript compiler
- `eslint`: Code linting
- `prettier`: Code formatting
- `@biomejs/biome`: Alternative linter/formatter
- `vitest`: Testing framework
- `@vitest/coverage-v8`: Coverage reporting
- `@vitest/ui`: Test UI

## 🎯 Customization

### Adding New Features

1. **Add to library:**

   ```typescript
   // src/lib/feature.ts
   export class NewFeature {
     // Implementation
   }

   // src/lib/index.ts
   export { NewFeature } from "./feature.js";
   ```

2. **Add types:**

   ```typescript
   // src/types/index.ts
   export interface NewFeatureConfig {
     // Configuration
   }
   ```

3. **Add utilities:**

   ```typescript
   // src/utils/helpers.ts or new file
   export function helperFunction() {
     // Implementation
   }
   ```

4. **Add tests:**

   ```typescript
   // tests/feature.test.ts
   import { describe, it, expect } from "vitest";
   import { NewFeature } from "../src/lib/feature.js";

   describe("NewFeature", () => {
     it("should work", () => {
       expect(true).toBe(true);
     });
   });
   ```

### Adding Dependencies

1. **Runtime dependencies:**

   ```bash
   bun add dependency-name
   ```

2. **Development dependencies:**

   ```bash
   bun add -D dev-dependency-name
   ```

3. **Workspace dependencies:**
   ```json
   {
     "dependencies": {
       "@repo/other-package": "workspace:*"
     }
   }
   ```

## 🔗 Integration

This template is designed to work seamlessly with the RidersDB monorepo:

- Uses shared ESLint and TypeScript configurations
- Follows established naming conventions
- Compatible with Turbo build system
- Ready for workspace dependencies

## 📝 Notes

- Remove this README and replace with your package documentation
- Customize the example code to fit your use case
- Update package.json with appropriate dependencies
- Consider adding a CLI if your package needs one (see `@repo/data` for example)
- Add additional scripts as needed for your specific use case
