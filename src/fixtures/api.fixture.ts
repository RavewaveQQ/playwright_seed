import { test as base } from '@playwright/test';
import { ApiContext } from '@src/fixtures/context/api.context';

type ApiFixtures = {
  api: ApiContext;
};

export const apiTest = base.extend<ApiFixtures>({
  api: async ({}, use) => {
    const { api, request } = await ApiContext.getContext();
    await use(api);
    await request.dispose();
  },
});
