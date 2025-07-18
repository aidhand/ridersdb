# Testing Guide for Site App

This directory contains the comprehensive testing setup for the RidersDB site application.

## Testing Structure

```
tests/
├── setup/           # Test utilities and global setup
│   ├── global.ts    # Global test configuration
│   └── test-utils.ts # Helper functions and mocks
├── unit/            # Unit tests for utilities and composables
├── component/       # Component tests using mountSuspended
├── e2e/            # End-to-end tests using Playwright
└── fixtures/       # Test data and fixtures
```

## Test Types

### 1. Unit Tests (`tests/unit/`)

- **Purpose:** Test individual functions, utilities, and composables in isolation
- **Tools:** Vitest with Nuxt environment
- **Examples:**
  - `currency.test.ts` - Currency formatting utilities
  - `usePreferences.nuxt.test.ts` - Preferences composable
  - `api-products.nuxt.test.ts` - API endpoint tests

### 2. Component Tests (`tests/component/`)

- **Purpose:** Test Vue components in isolation with mock data
- **Tools:** `mountSuspended` from @nuxt/test-utils
- **Examples:**
  - `ProductCard.nuxt.test.ts` - Product card component
  - `ProductsPage.nuxt.test.ts` - Products page integration

### 3. End-to-End Tests (`tests/e2e/`)

- **Purpose:** Test complete user journeys across the application
- **Tools:** Playwright with @nuxt/test-utils/playwright
- **Examples:**
  - `homepage.spec.ts` - Homepage functionality
  - `products.spec.ts` - Product listing and navigation

## Running Tests

### Unit and Component Tests

```bash
# Run all tests once
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with UI
bun run test:ui

# Run tests with coverage
bun run test:coverage
```

### End-to-End Tests

```bash
# Run E2E tests
bun run test:e2e

# Run E2E tests with UI
bun run test:e2e:ui

# Run E2E tests in headed mode (visible browser)
bun run test:e2e:headed

# Debug E2E tests
bun run test:e2e:debug
```

## Test File Naming Conventions

### Unit Tests

- **Regular unit tests:** `*.test.ts`
- **Nuxt environment tests:** `*.nuxt.test.ts`

### Component Tests

- **Component tests:** `*.nuxt.test.ts` (with mountSuspended)
- **Page tests:** `*Page.nuxt.test.ts`

### E2E Tests

- **E2E tests:** `*.spec.ts`

## Writing Tests

### Unit Test Example

```typescript
import { describe, expect, it } from "vitest";

describe("myFunction", () => {
  it("should return expected result", () => {
    expect(myFunction(input)).toBe(expectedOutput);
  });
});
```

### Component Test Example

```typescript
// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime";

describe("MyComponent", () => {
  it("renders correctly", async () => {
    const wrapper = await mountSuspended(MyComponent, {
      props: {
        /* props */
      },
    });

    expect(wrapper.text()).toContain("expected text");
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from "@nuxt/test-utils/playwright";

test("should navigate correctly", async ({ page, goto }) => {
  await goto("/");
  await page.click("text=Click me");
  await expect(page).toHaveURL("/new-page");
});
```

## Test Utilities

### Mock Data (`test-utils.ts`)

```typescript
import { createMockData } from "../setup/test-utils";

const mockProduct = createMockData.product({
  title: "Custom Title",
  price: 99.99,
});
```

### Mocking Nuxt Composables

```typescript
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

mockNuxtImport("useRouter", () => {
  return () => ({
    push: vi.fn(),
    currentRoute: { value: { path: "/" } },
  });
});
```

### Component Mocking

```typescript
import { mockComponent } from "@nuxt/test-utils/runtime";

mockComponent("MyComponent", {
  template: "<div>Mocked Component</div>",
});
```

## Configuration Files

### Vitest Configuration (`vitest.config.ts`)

- Configures Nuxt environment for unit tests
- Sets up coverage reporting
- Excludes E2E test files

### Playwright Configuration (`playwright.config.ts`)

- Configures E2E testing with multiple browsers
- Sets up test server integration
- Configures reporters and artifacts

## Best Practices

### 1. Test Structure

- Follow the AAA pattern: Arrange, Act, Assert
- Use descriptive test names
- Group related tests with `describe` blocks

### 2. Mocking

- Mock external dependencies
- Use real implementations for internal code when possible
- Clean up mocks between tests

### 3. Assertions

- Use specific assertions
- Test both positive and negative cases
- Include edge cases

### 4. Performance

- Keep unit tests fast
- Use `mountSuspended` for components that need Nuxt context
- Use regular `mount` for simple components

### 5. Maintenance

- Update tests when changing implementation
- Remove obsolete tests
- Keep test data realistic but minimal

## Debugging Tests

### Unit Tests

```bash
# Run specific test file
bun run test currency.test.ts

# Run tests matching pattern
bun run test --grep "currency"

# Debug with breakpoints
bun run test --inspect-brk
```

### E2E Tests

```bash
# Run specific test
bun run test:e2e tests/e2e/homepage.spec.ts

# Debug mode (pauses execution)
bun run test:e2e:debug

# Headed mode (visible browser)
bun run test:e2e:headed
```

## Coverage Reports

Coverage reports are generated in the `coverage/` directory and include:

- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

Access the HTML report by opening `coverage/index.html` in your browser.

## CI/CD Integration

Tests are configured to run in CI environments with:

- Parallel execution disabled for E2E tests
- Retry logic for flaky tests
- XML reports for test results
- Coverage reports for analysis

## Troubleshooting

### Common Issues

1. **Tests timeout:** Increase timeout in configuration
2. **Mocks not working:** Ensure mocks are hoisted properly
3. **E2E tests fail:** Check if dev server is running
4. **Component tests fail:** Verify Nuxt environment is set up

### Getting Help

- Check the [Nuxt Testing Documentation](https://nuxt.com/docs/getting-started/testing)
- Review [Vitest Documentation](https://vitest.dev/)
- Consult [Playwright Documentation](https://playwright.dev/)
- Look at existing test examples in this directory
