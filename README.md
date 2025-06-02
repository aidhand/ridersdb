# RidersDB Monorepo

RidersDB is a platform to search, compare, and find motorcycles, gear, and accessories.

## Monorepo Structure

- `apps/site`: Main Nuxt 3 web application
- `packages/db`: Database ORM and schema (Drizzle ORM)
- `packages/types`: Shared TypeScript types
- `packages/validation`: Validation schemas (valibot)
- `packages/config`: Shared ESLint and TypeScript config

## Getting Started

1. Install dependencies:
   ```sh
   bun install
   # or npm install / yarn install / pnpm install
   ```
2. Copy `.env.example` to `.env` and fill in required values (e.g., `DATABASE_URL`).
3. Run the development server:
   ```sh
   bun run dev
   # or npm run dev / yarn dev / pnpm dev
   ```

## Scripts

- `dev`: Start development server
- `build`: Build all apps and packages
- `lint`: Lint all code (ESLint Flat Config, TypeScript support)
- `format`: Format codebase (Prettier)
- `typecheck`: Type check all packages and apps

## Linting & Code Quality

This monorepo uses a modern, three-tier linting system:

1. **Biome** - Fast formatting, import organization, and basic linting
2. **Oxlint** - Ultra-fast TypeScript/JavaScript linting
3. **ESLint** - Comprehensive framework-specific linting

### Available Commands

- `bun run lint:all` - Run complete pipeline: Biome → Oxlint → ESLint
- `bun run lint:check` - Check all linters without auto-fixing
- `bun run biome:fix` - Apply Biome fixes (formatting + basic linting)
- `bun run oxlint:check` - Run Oxlint checks

See [LINTING.md](./LINTING.md) for detailed setup information.

## TypeScript & Linting

- Uses ESLint Flat Config with TypeScript support via `@typescript-eslint`.
- Shared config in `packages/config`.
- Each package/app has a `typecheck` script for type safety.

## License

See [LICENSE](./LICENSE).

---

For more details, see the documentation in each package/app.
