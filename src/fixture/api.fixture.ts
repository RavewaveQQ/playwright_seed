import { test as base } from '@playwright/test';
import { readFileSync } from 'fs';
import { ApiContext } from './context/api.context';

type ApiFixtures = {
  api: ApiContext;
};

function getTokenFromStorage(path: string): string | undefined {
  try {
    const state = JSON.parse(readFileSync(path, 'utf-8')) as {
      origins?: Array<{ localStorage?: Array<{ name: string; value: string }> }>;
    };
    return state.origins?.[0]?.localStorage?.find((item) => item.name === 'auth-token')?.value;
  } catch {
    return undefined;
  }
}

export const apiTest = base.extend<ApiFixtures>({
  api: async ({ storageState }, use) => {
    const storagePath = typeof storageState === 'string' ? storageState : 'storage/user.json';
    const token = getTokenFromStorage(storagePath);
    const { api, request } = await ApiContext.getContext(token);
    await use(api);
    await request.dispose();
  },
});
