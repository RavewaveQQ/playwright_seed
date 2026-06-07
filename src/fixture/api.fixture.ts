import { test as base } from '@playwright/test';
import { ApiContext } from './context/api.context';
import { readAuthToken } from './storage';

type ApiFixtures = {
  api: ApiContext;
  adminApi: ApiContext;
};

export const apiTest = base.extend<ApiFixtures>({
  api: async ({ storageState }, use) => {
    const storagePath = typeof storageState === 'string' ? storageState : 'storage/user.json';
    const token = readAuthToken(storagePath);
    const { api, request } = await ApiContext.getContext(token);
    await use(api);
    await request.dispose();
  },
  adminApi: async ({}, use) => {
    const token = readAuthToken('storage/admin.json');
    const { api, request } = await ApiContext.getContext(token);
    await use(api);
    await request.dispose();
  },
});
