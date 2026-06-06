import { expect } from '@playwright/test';
import { apiTest as test } from '@src/fixture/api.fixture';
import { env } from '@src/common/config/envs/env';

test.describe('User API', () => {
  test('GET /users/me returns current user profile @smoke', async ({ api }) => {
    const user = await api.user.getMeFlow();

    expect(user.email).toBe(env.user.email);
    expect(user.id).toBeTruthy();
  });

  test('POST /users/login with invalid password returns 401 @smoke', async ({ api }) => {
    const response = await api.user.login({ email: env.user.email, password: 'wrong_password' });

    expect(response.status).toBe(401);
  });

  test('GET /products returns paginated list with items @smoke', async ({ api }) => {
    const response = await api.product.getAll();

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.total).toBeGreaterThan(0);
    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
    });
  });
});
