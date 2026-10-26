import { expect, test } from '@playwright/test';
import { css } from './helpers';

test('a selected paper marks itself with data-selected and never leaks the prop', async ({
  page,
}) => {
  await page.goto('/?story=paper-selected');
  for (const variant of ['outlined', 'elevation']) {
    const rest = page.getByTestId(`paper-${variant}`);
    const selected = page.getByTestId(`paper-${variant}-selected`);
    await expect(selected).toHaveAttribute('data-selected', '');
    await expect(rest).not.toHaveAttribute('data-selected');
    for (const paper of [rest, selected]) {
      await expect(paper).not.toHaveAttribute('selected');
      await expect(paper).not.toHaveAttribute('aria-selected');
      await expect(paper).not.toHaveAttribute('tabindex');
    }
    expect(await css(selected, 'border-top-width')).toBe(await css(rest, 'border-top-width'));
    expect(await css(selected, 'border-top-style')).toBe('solid');
    expect(await css(selected, 'border-top-color')).not.toBe(await css(rest, 'border-top-color'));
    expect(await css(selected, 'background-color')).not.toBe(await css(rest, 'background-color'));
    expect(await css(selected, 'border-radius')).toBe(await css(rest, 'border-radius'));
  }
  expect(await css(page.getByTestId('paper-elevation-selected'), 'box-shadow')).toBe(
    await css(page.getByTestId('paper-elevation'), 'box-shadow'),
  );
});

test('a card follows the page state for its selection without moving its content', async ({
  page,
}) => {
  await page.goto('/?story=card-selected');
  const starter = page.getByTestId('card-plan-starter');
  const team = page.getByTestId('card-plan-team');
  await expect(team).toHaveAttribute('data-selected', '');
  await expect(starter).not.toHaveAttribute('data-selected');
  const before = await starter.getByText('$0').boundingBox();
  const box = await starter.boundingBox();
  await page.getByTestId('card-plan-starter-choose').click();
  await expect(starter).toHaveAttribute('data-selected', '');
  await expect(team).not.toHaveAttribute('data-selected');
  expect(await starter.getByText('$0').boundingBox()).toEqual(before);
  expect(await starter.boundingBox()).toEqual(box);
  await expect(page.getByTestId('card-plan-starter-choose')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(await starter.evaluate((element) => element.tagName)).toBe('ARTICLE');
  await expect(starter).toHaveAccessibleName('Starter');
  expect(await css(page.getByTestId('card-elevation-selected'), 'box-shadow')).not.toBe('none');
});
