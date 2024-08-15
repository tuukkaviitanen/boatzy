const { test, expect } = require('@playwright/test');
const {
  checkDiceFunctionality,
  getUserColumnCells,
  submitNewName,
  clickDiceTimes,
  getCell,
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

  test.describe('Menu buttons', () => {
    test.describe('Add player button', () => {
      test('should add player successfully', async ({ page }) => {
        const userColumnCells = getUserColumnCells(page);

        // Make sure the initial number of columns is as expected
        await expect(userColumnCells).toHaveCount(3);

        // Try to add 10 players and make sure each is added successfully
        for (const [index] of Array.from({ length: 10 }).entries()) {
          const expectedColumnCount = index + 4;
          const expectedUserName = `Player ${index + 3}`;

          await page.getByText(/Add player/i).click();
          expect(userColumnCells).toHaveCount(expectedColumnCount);
          expect(userColumnCells.last()).toHaveText(expectedUserName);
        }
      });
    });

    test.describe('Skip turn button', () => {
      test('should skip turn successfully', async ({ page }) => {
        const board = page.getByTestId(/board/);
        const firstInputRow = board.getByRole('row').nth(1);
        const firstInputRowCells = firstInputRow.getByRole('cell');

        expect(firstInputRowCells.nth(1)).toHaveText('0');
        expect(firstInputRowCells.nth(2)).not.toHaveText('0');

        await page.getByText(/Skip turn/i).click();

        expect(firstInputRowCells.nth(1)).not.toHaveText('0');
        expect(firstInputRowCells.nth(2)).toHaveText('0');

        await page.getByText(/Skip turn/i).click();

        expect(firstInputRowCells.nth(1)).toHaveText('0');
        expect(firstInputRowCells.nth(2)).not.toHaveText('0');
      });
    });

    test.describe('Reset game button', () => {
      test('Should prompt user and reset game successfully', async ({
        page,
      }) => {
        // Set confirm dialogue event handler
        page.on('dialog', async (dialog) => {
          expect(dialog.message()).toEqual('Are you sure you want to reset?');
          await dialog.accept();
        });

        // Play first 3 turns and end on player 2 turn
        await clickDiceTimes(page, 0, 1);
        await getCell(page, 1, 1).click();

        await clickDiceTimes(page, 0, 1);
        await getCell(page, 1, 2).click();

        await getCell(page, 2, 1).click();

        // Check first 2 rows have values
        await expect(getCell(page, 1, 1)).toHaveText('1');
        await expect(getCell(page, 1, 2)).toHaveText('1');

        await expect(getCell(page, 2, 1)).toHaveText('0');
        await expect(getCell(page, 2, 2)).toHaveText('0');

        // Add player
        await page.getByText(/Add player/i).click();

        // Change player name
        await getUserColumnCells(page).nth(1).click();
        await submitNewName(page, 'Test user 1');

        // Check player name and count has changed
        await expect(getUserColumnCells(page)).toHaveCount(4);
        await expect(getUserColumnCells(page).nth(1)).toHaveText('Test user 1');

        // Reset game
        await page.getByText(/Reset game/i).click();

        // Check that values and current turn have reset
        await expect(getCell(page, 1, 1)).toHaveText('0');
        await expect(getCell(page, 1, 2)).toHaveText('');
        await expect(getCell(page, 2, 1)).toHaveText('0');
        await expect(getCell(page, 2, 2)).toHaveText('');

        // Check that amount of players and names have reset
        await expect(getUserColumnCells(page)).toHaveCount(3);
        await expect(getUserColumnCells(page).nth(1)).toHaveText('Player 1');
      });
    });
  });

  test.describe('Board', () => {
    test.describe('User options', () => {
      test('should open correctly when player clicked', async ({ page }) => {
        const userColumnCells = getUserColumnCells(page);

        await userColumnCells.nth(1).click();

        const userPopover = page.getByTestId('user-popover');

        const renameField = userPopover.getByRole('textbox');

        await expect(userPopover).toBeVisible();
        await expect(renameField).toHaveValue('Player 1');
        await expect(userPopover.getByTestId('submit-button')).toBeVisible();
        await expect(userPopover.getByTestId('delete-button')).toBeVisible();
      });

      test('should successfully rename user', async ({ page }) => {
        const userColumnCells = getUserColumnCells(page);

        await userColumnCells.nth(1).click();
        await submitNewName(page, 'Test user 1');

        await userColumnCells.nth(2).click();
        await submitNewName(page, 'Test user 2');

        expect(userColumnCells.nth(1)).toHaveText('Test user 1');
        expect(userColumnCells.nth(2)).toHaveText('Test user 2');
      });

      test('should successfully delete user', async ({ page }) => {
        const userColumnCells = getUserColumnCells(page);

        expect(userColumnCells).toHaveCount(3);
        expect(userColumnCells.nth(1)).toHaveText('Player 1');

        await userColumnCells.nth(1).click();

        const userPopover = page.getByTestId('user-popover');

        await userPopover.getByTestId('delete-button').click();

        const updatedColumnCells = getUserColumnCells(page);

        expect(updatedColumnCells).toHaveCount(2);
        expect(updatedColumnCells.nth(1)).toHaveText('Player 2');
      });

      test('should not delete last user', async ({ page }) => {
        const userColumnCells = getUserColumnCells(page);

        const userPopover = page.getByTestId('user-popover');
        const deleteButton = userPopover.getByTestId('delete-button');

        await userColumnCells.nth(1).click();
        await deleteButton.click();
        await userColumnCells.nth(1).click();

        await expect(deleteButton).toBeDisabled();
      });
    });
  });
});
