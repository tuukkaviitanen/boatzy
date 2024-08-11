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
    const header = page.getByRole('heading', { name: 'Boatzy' });
    await expect(header).toBeVisible();
  });

  test('should have correct menu buttons', async ({ page }) => {
    const buttonsContainer = page.getByTestId(/buttons-container/);

    const buttons = buttonsContainer.getByRole('button');

    await expect(buttons).toHaveCount(3);

    await expect(buttons.nth(0)).toHaveText(/Add player/i);
    await expect(buttons.nth(1)).toHaveText(/Skip turn/i);
    await expect(buttons.nth(2)).toHaveText(/Reset game/i);
  });

  test.describe('Board', () => {
    test('should have correct amount of columns, rows and cells', async ({ page }) => {
      const board = page.getByTestId(/board/)

      const columns = board.locator("tr:first-child td")
      const rows =  board.getByRole("row")

      const cells = board.getByRole("cell")

      await expect(columns).toHaveCount(3)
      await expect(rows).toHaveCount(19)
      await expect(cells).toHaveCount(57)
    });

    test("should show correct players", async ({page}) => {
      const board = page.getByTestId(/board/)

      const firstRow = board.getByRole("row").first()

      const cells = firstRow.getByRole("cell")

      await expect(cells.nth(1)).toHaveText(/Player 1/)
      await expect(cells.nth(2)).toHaveText(/Player 2/)
    })
  });

  test.describe('Dice buttons', () => {
    test('should have 5 dices', async ({ page }) => {
      const dicesContainer = page.getByTestId(/dices-container/);
      const diceButtons = dicesContainer.getByRole('button');
      await expect(diceButtons).toHaveCount(5);
    });

    test('should have correct images rendered on dice buttons', async ({
      page,
    }) => {
      const dicesContainer = page.getByTestId(/dices-container/);

      for (const image of await dicesContainer.getByRole('img').all()) {
        const isLoaded = await image.evaluate(
          // @ts-ignore // Won't break anything if "complete" or "naturalHeight" properties don't exists, the tests just fail as they should
          (img) => img.complete && img.naturalHeight !== 0
        );
        expect(isLoaded).toBeTruthy();
        await expect(image).toHaveAttribute('src', '/src/assets/dice-zero.svg');
      }
    });
  });
});
