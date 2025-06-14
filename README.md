# RidersDB Monorepo

RidersDB is a platform to search, compare, and find motorcycles, gear, and accessories.

## Monorepo Structure

- `apps/site`: Main Nuxt 3 web application
- `packages/db`: Database ORM and schema (Drizzle ORM)
- `packages/types`: Shared TypeScript types
- `packages/validation`: Validation schemas (zod)
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
- `lint`: Lint all code (Biome, Oxlint, and ESLint)
- `format`: Format codebase (Biome and Prettier)
- `typecheck`: Type check all packages and apps

## License

See [LICENSE](./LICENSE).

---

For more details, see the documentation in each package/app.
