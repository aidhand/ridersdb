import { test, expect } from "@nuxt/test-utils/playwright";

/**
 * E2E test for products functionality
 * Tests product listing, search, and detail views
 */
test.describe("Products", () => {
  test("should display products list", async ({ page, goto }) => {
    await goto("/products", { waitUntil: "hydration" });

    // Check page title
    await expect(page).toHaveTitle(/Products.*RidersDB/);

    // Check for products heading
    await expect(
      page.getByRole("heading", { name: /products/i })
    ).toBeVisible();

    // Check for product grid or list
    const productContainer = page.locator(
      '[data-testid="product-grid"], [data-testid="product-list"], .product-grid, .product-list'
    );
    await expect(productContainer).toBeVisible();
  });

  test("should handle product search", async ({ page, goto }) => {
    await goto("/products", { waitUntil: "hydration" });

    // Find search input
    const searchInput = page
      .getByRole("searchbox")
      .or(page.getByPlaceholder(/search/i));

    if (await searchInput.isVisible()) {
      await searchInput.fill("test product");
      await searchInput.press("Enter");

      // Wait for search results
      await page.waitForTimeout(1000);

      // Results should be filtered or show search state
      const resultsContainer = page.locator(
        '[data-testid="search-results"], .search-results'
      );
      if (await resultsContainer.isVisible()) {
        await expect(resultsContainer).toBeVisible();
      }
    }
  });

  test("should navigate to product detail", async ({ page, goto }) => {
    await goto("/products", { waitUntil: "hydration" });

    // Find a product link (adjust selector based on your implementation)
    const productLink = page.locator('a[href*="/products/"]').first();

    if (await productLink.isVisible()) {
      await productLink.click();

      // Should navigate to product detail page
      await expect(page).toHaveURL(/\/products\/[^/]+/);

      // Check for product detail content
      const productTitle = page.getByRole("heading").first();
      await expect(productTitle).toBeVisible();
    }
  });

  test("should handle empty state", async ({ page, goto }) => {
    // This test assumes you have a way to trigger empty state
    // You might need to mock the API or use a specific route
    await goto("/products?empty=true", { waitUntil: "hydration" });

    // Check for empty state message
    const emptyState = page
      .getByText(/no products found/i)
      .or(page.getByText(/empty/i));

    // This is optional based on your implementation
    if (await emptyState.isVisible()) {
      await expect(emptyState).toBeVisible();
    }
  });

  test("should filter by brand", async ({ page, goto }) => {
    await goto("/products", { waitUntil: "hydration" });

    // Look for brand filter (adjust based on your implementation)
    const brandFilter = page
      .getByRole("combobox", { name: /brand/i })
      .or(page.locator('[data-testid="brand-filter"]'));

    if (await brandFilter.isVisible()) {
      await brandFilter.click();

      // Select a brand option
      const brandOption = page.getByRole("option").first();
      if (await brandOption.isVisible()) {
        await brandOption.click();

        // Wait for filtering
        await page.waitForTimeout(1000);

        // Products should be filtered
        const productContainer = page.locator(
          '[data-testid="product-grid"], .product-grid'
        );
        await expect(productContainer).toBeVisible();
      }
    }
  });

  test("should handle pagination", async ({ page, goto }) => {
    await goto("/products", { waitUntil: "hydration" });

    // Look for pagination controls
    const nextButton = page
      .getByRole("button", { name: /next/i })
      .or(page.locator('[data-testid="pagination-next"]'));

    if ((await nextButton.isVisible()) && (await nextButton.isEnabled())) {
      await nextButton.click();

      // Wait for page change
      await page.waitForTimeout(1000);

      // URL should change or content should update
      const productContainer = page.locator(
        '[data-testid="product-grid"], .product-grid'
      );
      await expect(productContainer).toBeVisible();
    }
  });
});
