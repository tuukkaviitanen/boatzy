/**
 * @param {import("playwright/test").Expect} expect
 * @param {import("playwright-core").Locator} button
 */
export const checkDiceFunctionality = async (expect, button) => {
  const diceImage = button.getByRole('img');

  await expect(diceImage).toHaveAttribute('src', '/src/assets/dice-zero.svg');

  await button.click();

  await expect(diceImage).toHaveAttribute('src', '/src/assets/dice-one.svg');

  await button.click();

  await expect(diceImage).toHaveAttribute('src', '/src/assets/dice-two.svg');

  await button.click();

  await expect(diceImage).toHaveAttribute('src', '/src/assets/dice-three.svg');

  await button.click();

  await expect(diceImage).toHaveAttribute('src', '/src/assets/dice-four.svg');

  await button.click();

  await expect(diceImage).toHaveAttribute('src', '/src/assets/dice-five.svg');

  await button.click();

  await expect(diceImage).toHaveAttribute('src', '/src/assets/dice-six.svg');

  await button.click();

  await expect(diceImage).toHaveAttribute('src', '/src/assets/dice-zero.svg');
};

/**
 * @param {import("playwright-core").Page} page
 * @returns Cells locator
 */
export const getUserColumnCells = (page) => {
  const board = page.getByTestId(/board/);

  const firstRow = board.getByRole('row').first();

  const cells = firstRow.getByRole('cell');

  return cells;
};

/**
 * @param {import("playwright-core").Page} page
 * @param {string} newName
 */
export const submitNewName = async (page, newName) => {
  const userPopover = page.getByTestId('user-popover');

  const renameField = userPopover.getByRole('textbox');

  await renameField.clear();
  await renameField.fill(newName);

  userPopover.getByTestId('submit-button').click();
};

/**
 * @param {import("playwright-core").Page} page
 * @param {number} diceIndex Index of the selected dice
 * @param {number} diceValue Value from 1 to 6
 */
export const clickDiceTimes = async (page, diceIndex, diceValue) => {
  const dicesContainer = page.getByTestId(/dices-container/);
  const diceButtons = dicesContainer.getByRole('button');
  const selectedDiceButton = diceButtons.nth(diceIndex);

  for (const _ of Array.from({ length: diceValue })) {
    await selectedDiceButton.click();
  }
};

/**
 * @param {import("playwright-core").Page} page
 * @param {number} rowIndex
 * @param {number} columnIndex
 */
export const getCell = (page, rowIndex, columnIndex) => {
  const board = page.getByTestId(/board/);
  const rows = board.getByRole('row');
  const selectedRow = rows.nth(rowIndex);
  const selectedRowCells = selectedRow.getByRole('cell');
  const selectedCell = selectedRowCells.nth(columnIndex);

  return selectedCell;
};
