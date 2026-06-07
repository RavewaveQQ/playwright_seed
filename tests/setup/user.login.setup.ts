import { apiTest as setup } from '@src/fixture/api.fixture';
import { expect } from '@playwright/test';
import { env } from '@src/common/config/envs/env';
import { buildStorageState } from '@src/fixture/storage';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';

const LOGINS = [
  { role: 'user', email: env.user.email, password: env.password, storagePath: 'storage/user.json' },
  { role: 'admin', email: env.admin.email, password: env.adminPassword, storagePath: 'storage/admin.json' },
];

for (const { role, email, password, storagePath } of LOGINS) {
  setup(`setup: ${role} login`, async ({ api }) => {
    const token = await api.user.loginFlow(email, password);
    expect(token.access_token, 'Login succeeded but access_token is missing').toBeTruthy();

    mkdirSync(path.dirname(storagePath), { recursive: true });
    writeFileSync(storagePath, JSON.stringify(buildStorageState(env.webURL.origin, token.access_token)));
  });
}
