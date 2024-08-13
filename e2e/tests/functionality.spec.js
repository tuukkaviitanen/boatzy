const { test, expect } = require('@playwright/test');
const {
  checkDiceFunctionality,
  getUserColumnCells,
  submitNewName,
} = require('./functionality.helpers');

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

  test.describe('Menu buttons', () => {});

  test.describe('Board', () => {
    test.describe('User options', () => {
      test('should open correctly when player clicked', async ({ page }) => {
        const userColumnCells = await getUserColumnCells(page);

        await userColumnCells.nth(1).click();

        const userPopover = page.getByTestId('user-popover');

        const renameField = userPopover.getByRole('textbox');

        await expect(userPopover).toBeVisible();
        await expect(renameField).toHaveValue('Player 1');
        await expect(userPopover.getByTestId('submit-button')).toBeVisible();
        await expect(userPopover.getByTestId('delete-button')).toBeVisible();
      });

      test('should successfully rename user', async ({ page }) => {
        const userColumnCells = await getUserColumnCells(page);

        await userColumnCells.nth(1).click();
        await submitNewName(page, 'Test user 1');

        await userColumnCells.nth(2).click();
        await submitNewName(page, 'Test user 2');

        expect(userColumnCells.nth(1)).toHaveText('Test user 1');
        expect(userColumnCells.nth(2)).toHaveText('Test user 2');
      });

      test('should successfully delete user', async ({ page }) => {
        const userColumnCells = await getUserColumnCells(page);

        // Make sure
        expect(userColumnCells).toHaveCount(3);
        expect(userColumnCells.nth(1)).toHaveText("Player 1");

        await userColumnCells.nth(1).click();

        const userPopover = page.getByTestId('user-popover');

        await userPopover.getByTestId('delete-button').click();

        const updatedColumnCells = await getUserColumnCells(page);

        expect(updatedColumnCells).toHaveCount(2);
        expect(updatedColumnCells.nth(1)).toHaveText("Player 2");
      });


      test('should not delete last user', async ({ page }) => {
        const userColumnCells = await getUserColumnCells(page);

        const userPopover = page.getByTestId('user-popover');
        const deleteButton = userPopover.getByTestId('delete-button')

        await userColumnCells.nth(1).click();
        await deleteButton.click();
        await userColumnCells.nth(1).click();

        await expect(deleteButton).toBeDisabled()
      });
    });
  });
});
