import { expect } from '@playwright/test';
import { apiTest as test } from '@src/fixture/api.fixture';
import { registrationUserFactory } from '@testData/user.factory';

test.describe('User Registration API', () => {
  const createdUserIds: string[] = [];

  test.afterEach(async ({ adminApi }) => {
    while (createdUserIds.length) {
      await adminApi.user.remove(createdUserIds.pop()!);
    }
  });

  test('POST /users/register creates a new user @smoke', async ({ api }) => {
    const userData = registrationUserFactory();

    const user = await api.user.registerFlow(userData);
    createdUserIds.push(user.id);

    expect(user.email).toBe(userData.email);
    expect(user.first_name).toBe(userData.first_name);
    expect(user.last_name).toBe(userData.last_name);
    expect(user.id).toBeTruthy();
  });

  test('POST /users/register with existing email returns 409', async ({ api }) => {
    const userData = registrationUserFactory();

    const user = await api.user.registerFlow(userData);
    createdUserIds.push(user.id);
    const response = await api.user.register(userData);

    expect(response.status).toBe(409);
  });
});
