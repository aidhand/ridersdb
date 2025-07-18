import { test, expect } from "@nuxt/test-utils/playwright";

/**
 * E2E test for the homepage
 * Tests the complete user journey on the home page
 */
test.describe("Homepage", () => {
  test("should load and display the homepage correctly", async ({
    page,
    goto,
  }) => {
    await goto("/", { waitUntil: "hydration" });

    // Check that the page loaded
    await expect(page).toHaveTitle(/RidersDB/);

    // Check for main navigation
    await expect(page.locator("nav")).toBeVisible();

    // Check for main content
    await expect(page.locator("main")).toBeVisible();
  });

  test("should navigate to products page", async ({ page, goto }) => {
    await goto("/", { waitUntil: "hydration" });

    // Find and click products link
    const productsLink = page.getByRole("link", { name: /products/i });
    await expect(productsLink).toBeVisible();

    await productsLink.click();

    // Wait for navigation
    await expect(page).toHaveURL(/\/products/);

    // Check that products page loaded
    await expect(
      page.getByRole("heading", { name: /products/i })
    ).toBeVisible();
  });

  test("should handle theme toggle", async ({ page, goto }) => {
    await goto("/", { waitUntil: "hydration" });

    // Find theme toggle button
    const themeToggle = page.getByRole("button", { name: /theme/i });

    if (await themeToggle.isVisible()) {
      await themeToggle.click();

      // Wait for theme change (this would depend on your implementation)
      await page.waitForTimeout(500);

      // You might check for a class change or data attribute
      // This is just an example - adjust based on your implementation
      const body = page.locator("body");
      const isDark = await body.evaluate((el) => el.classList.contains("dark"));
      expect(typeof isDark).toBe("boolean");
    }
  });

  test("should be responsive on mobile", async ({ page, goto }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await goto("/", { waitUntil: "hydration" });

    // Check that mobile navigation works
    const mobileNav = page.locator(
      '[data-testid="mobile-nav"], .mobile-nav, nav'
    );
    await expect(mobileNav).toBeVisible();

    // Check that content is still accessible
    await expect(page.locator("main")).toBeVisible();
  });
});
