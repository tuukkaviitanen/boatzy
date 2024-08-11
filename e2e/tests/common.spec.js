// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Boatzy/);
  });

  test('should have correct header', async ({ page }) => {
    const header = page.locator('h2:has-text("Boatzy")');
    await expect(header).toBeVisible();
  });
});
