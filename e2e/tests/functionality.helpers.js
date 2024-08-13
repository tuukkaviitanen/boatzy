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
 * @returns {Promise<import("playwright-core").Locator>} Promise for cells locator
 */
export const getUserColumnCells = async (page) => {
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


export const deleteUser = async (page) => {

}