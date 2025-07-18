# @repo/shared

Consolidated shared TypeScript types and utilities for the RidersDB monorepo.

This package combines the previously separate `@repo/shared-types` and `@repo/shared-utils` packages into a single, unified package for better maintainability and developer experience.

## Structure

```
src/
├── types/          # TypeScript type definitions
│   ├── api.ts      # API-related types
│   ├── auth.ts     # Authentication types
│   ├── common.ts   # Common utility types
│   ├── config.ts   # Configuration types
│   ├── database.ts # Database types
│   └── generators.ts # Generator types
├── utils/          # Utility functions
│   ├── database.ts # Database utilities
│   ├── errors.ts   # Error classes and utilities
│   ├── helpers.ts  # General helper functions
│   ├── logging.ts  # Logging utilities
│   ├── parse.ts    # Parsing and normalization utilities
│   ├── slug.ts     # Slug generation (re-exports)
│   ├── types.ts    # Type guard utilities
│   └── validation.ts # Validation utilities
└── index.ts        # Main exports
```

## Usage

### Basic Import

```typescript
import { generateSlug, DatabaseConfig, ApiResponse } from "@repo/shared";
```

### Specific Imports

```typescript
// Types only
import type { AnyDatabase, ErrorResponse } from "@repo/shared/types/database";
import type { UserProfile } from "@repo/shared/types/auth";

// Utilities only
import {
  createDatabaseConnections,
  runInTransaction,
} from "@repo/shared/utils/database";
import { AppError, ValidationError } from "@repo/shared/utils/errors";
```

### Backward Compatibility

The package maintains backward compatibility with the most commonly used exports available directly from the main entry point.

## Migration from Previous Packages

### From @repo/shared-types

```typescript
// Before
import type { DatabaseConfig } from "@repo/shared-types/database";

// After
import type { DatabaseConfig } from "@repo/shared/types/database";
// or
import type { DatabaseConfig } from "@repo/shared";
```

### From @repo/shared-utils

```typescript
// Before
import { generateSlug } from "@repo/shared-utils";

// After
import { generateSlug } from "@repo/shared/utils/slug";
// or
import { generateSlug } from "@repo/shared";
```

## Features

- **Type Definitions**: Comprehensive TypeScript types for API, authentication, database, and more
- **Utility Functions**: Helper functions for common operations like slug generation, validation, and error handling
- **Database Utilities**: Functions for handling database connections, transactions, and batch operations
- **Error Handling**: Standardized error classes and error response utilities
- **Validation**: Type guards and validation functions
- **Normalization**: Text and data normalization utilities

## Development

```bash
# Install dependencies
pnpm install

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Testing
pnpm test

# Watch mode
pnpm test:watch
```
