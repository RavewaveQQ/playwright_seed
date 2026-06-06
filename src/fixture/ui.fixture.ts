import { test as base } from '@playwright/test';
import { UiContext } from './context/ui.context';

type UserRole = 'user' | 'admin';

type UiFixtures = {
  userRole: UserRole;
  ui: UiContext;
};

export const uiTest = base.extend<UiFixtures>({
  userRole: ['user', { option: true }],

  ui: async ({ browser, userRole }, use) => {
    const { ui, page } = await UiContext.getContext(browser, `storage/${userRole}.json`);
    await use(ui);
    await page.close();
  },
});
