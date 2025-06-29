# @repo/data

Database seeding and factory package for RidersDB. This package provides **simplified data generators** that combine both data generation and database seeding capabilities.

## Features

- **🎯 Simplified Generators**: Single functions replace complex factory/seeder classes
- **🔧 Dual Purpose**: Same functions for data generation and database seeding
- **📝 TypeScript**: Full type safety with proper Insert types
- **⚡ Better Performance**: Bulk operations instead of individual inserts
- **🎪 CLI**: Command-line interface for easy seeding operations

## New Simplified Architecture

> **Note**: This package has been refactored with a simplified architecture. The old factory/seeder classes are deprecated but still available for backward compatibility.

See [GENERATORS.md](./GENERATORS.md) for detailed documentation on the new simplified generators.

### Quick Start

```typescript
import { createBrands, seedBrands, seedDatabase } from "@repo/data";

// Generate data (testing)
const brands = await createBrands({ count: 5, returnData: true });

// Seed database (seeding)
await seedBrands(db, { count: 10 });

// Seed entire database
await seedDatabase(db, { minimal: true });
```

## Installation

This package is part of the RidersDB monorepo workspace.

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Run tests
bun run test
```

## Usage

### CLI Commands

```bash
# Run standard seeding (new simplified)
bun run seed

# Run minimal seeding (for development)
bun run seed:minimal

# Run full seeding (for staging/demo)
bun run seed:full

# Test factory generation (now uses generators)
bun run factory
```

### New Generators (Now the Only Option)

```typescript
import { createBrands, createProducts, seedDatabase } from "@repo/data";

// Generate data without persisting
const brand = await createBrands({ count: 1, returnData: true });
const premiumBrands = await createBrands({
  count: 5,
  state: "premium",
  returnData: true,
});

// Seed database directly
await createBrands({ count: 10, db });
await createProducts({ count: 50, db });

// Orchestrated seeding
await seedDatabase(db, { minimal: true });
```

### ~~Legacy API~~ (Removed)

The old factory/seeder classes have been completely removed. All code should now use the new generators.

### Available Generators

- `createBrands()` / `seedBrands()` - Generate/seed motorcycle brands
- `createCategories()` / `seedCategories()` - Generate/seed product categories
- `createProducts()` / `seedProducts()` - Generate/seed motorcycle products
- `createRetailers()` / `seedRetailers()` - Generate/seed motorcycle retailers

### Available States

Generators support states for different variations:

```typescript
// Brand states
await createBrands({ state: "premium", db }); // With logo and website
await createBrands({ state: "basic", db }); // Without logo/website

// Product states
await createProducts({ state: "premium", db }); // Premium products
await createProducts({ state: "budget", db }); // Budget products
await createProducts({ state: "safety", db }); // Safety equipment
```

## Benefits of New Architecture

- **50% less code** - Reduced from 10+ files to 5 files
- **Simpler API** - Function calls instead of class instantiation
- **Better performance** - Bulk inserts instead of individual operations
- **Type safety** - Uses proper Insert types for validation
- **Easier testing** - Simple function calls, no mocking needed

## Legacy Support

> **✅ Migration Complete**: The old factory/seeder classes have been **completely removed** from the codebase. All functionality is now provided by the simplified generators.

## Dependencies

- `@repo/shared-utils` - Shared utilities and helpers
- `@repo/shared-types` - Shared TypeScript types
- `@faker-js/faker` - Fake data generation
- `drizzle-orm` - Database ORM
- `commander` - CLI interface
