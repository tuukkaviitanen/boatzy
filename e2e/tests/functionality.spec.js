const { test, expect } = require('@playwright/test');
const { checkDiceFunctionality } = require('./functionality.helpers');

test.describe('Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Dices', () => {
    test('should increase by 1 when clicked', async ({ page }) => {
      const dicesContainer = page.getByTestId(/dices-container/);
      const diceButtons = await dicesContainer.getByRole('button').all();

      for (const diceButton of diceButtons) {
        await checkDiceFunctionality(expect, diceButton);
      }
    });
  });
});
