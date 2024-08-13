

export const checkDiceFunctionality = async (expect, button) => {
  const diceImage = button.getByRole('img');

  await expect(diceImage).toHaveAttribute(
    'src',
    '/src/assets/dice-zero.svg'
  );

  await button.click();

  await expect(diceImage).toHaveAttribute(
    'src',
    '/src/assets/dice-one.svg'
  );

  await button.click();

  await expect(diceImage).toHaveAttribute(
    'src',
    '/src/assets/dice-two.svg'
  );

  await button.click();

  await expect(diceImage).toHaveAttribute(
    'src',
    '/src/assets/dice-three.svg'
  );

  await button.click();

  await expect(diceImage).toHaveAttribute(
    'src',
    '/src/assets/dice-four.svg'
  );

  await button.click();

  await expect(diceImage).toHaveAttribute(
    'src',
    '/src/assets/dice-five.svg'
  );

  await button.click();

  await expect(diceImage).toHaveAttribute(
    'src',
    '/src/assets/dice-six.svg'
  );

  await button.click();

  await expect(diceImage).toHaveAttribute(
    'src',
    '/src/assets/dice-zero.svg'
  );
}