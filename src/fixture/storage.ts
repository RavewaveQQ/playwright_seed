import { readFileSync } from 'fs';

export const AUTH_TOKEN_KEY = 'auth-token';

type StorageState = {
  cookies: unknown[];
  origins: Array<{ origin: string; localStorage: Array<{ name: string; value: string }> }>;
};

export function readAuthToken(path: string): string {
  let state: StorageState;
  try {
    state = JSON.parse(readFileSync(path, 'utf-8')) as StorageState;
  } catch {
    throw new Error(`Storage state not found at "${path}". Did the setup project run before this test?`);
  }

  const token = state.origins?.[0]?.localStorage?.find((item) => item.name === AUTH_TOKEN_KEY)?.value;
  if (!token) {
    throw new Error(`No "${AUTH_TOKEN_KEY}" found in storage state "${path}".`);
  }
  return token;
}

export function buildStorageState(origin: string, token: string): StorageState {
  return {
    cookies: [],
    origins: [{ origin, localStorage: [{ name: AUTH_TOKEN_KEY, value: token }] }],
  };
}
