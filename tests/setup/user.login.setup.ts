import { apiTest as setup } from '@fixtures/api.fixture';
import { env } from '@src/common/config/envs/env';

const LOGINS = [
  { role: 'user', email: env.user.email, password: env.password, path: 'storage/user.json' },
  { role: 'admin', email: env.admin.email, password: env.adminPassword, path: 'storage/admin.json' },
];

for (const { role, email, password, path } of LOGINS) {
  setup(`setup: ${role} login`, async ({ api, page }) => {
    const token = await api.user.loginFlow(email, password);
    await page.goto(env.webURL.href);
    await page.evaluate((t) => localStorage.setItem('auth-token', t), token.access_token);
    await page.context().storageState({ path });
  });
}
