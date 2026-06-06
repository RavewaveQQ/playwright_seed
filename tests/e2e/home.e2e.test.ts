import { expect } from '@playwright/test';
import { uiTest as test } from '@src/fixture/ui.fixture';

test.describe('Home page', () => {
  test('authenticated user sees product list @smoke', async ({ ui }) => {
    await ui.home.open();

    await expect(ui.home.navBar.userMenuButton).toBeVisible();
    await expect(ui.home.navBar.signInLink).toBeHidden();
    await expect(ui.home.productCard('Bolt Cutters').first()).toBeVisible();
  });

  test('user can search for a product @smoke', async ({ ui }) => {
    await ui.home.open();
    await ui.home.search.search('Pliers');

    await expect(ui.home.productCard('Pliers').first()).toBeVisible();
  });

  test('user can navigate to account page @smoke', async ({ ui }) => {
    await ui.account.open();

    await expect(ui.account.firstNameInput).toBeVisible();
    await expect(ui.account.updateProfileButton).toBeVisible();
  });
});
