import { apiTest as setup } from '@src/fixture/api.fixture';
import { expect } from '@playwright/test';
import { env } from '@src/common/config/envs/env';

const LOGINS = [
  { role: 'user', email: env.user.email, password: env.password, path: 'storage/user.json' },
  { role: 'admin', email: env.admin.email, password: env.adminPassword, path: 'storage/admin.json' },
];

for (const { role, email, password, path } of LOGINS) {
  setup(`setup: ${role} login`, async ({ api, page }) => {
    const token = await api.user.loginFlow(email, password);
    expect(token.access_token, 'Login succeeded but access_token is missing').toBeTruthy();

    await page.goto(env.webURL.href);
    await page.evaluate((t: string) => localStorage.setItem('auth-token', t), token.access_token);
    await page.reload();
    await expect(page.locator('[data-test="nav-menu"]'), 'User menu not visible — token was not applied').toBeVisible();

    await page.context().storageState({ path });
  });
}
