import { readFileSync } from 'fs';

export const AUTH_TOKEN_KEY = 'auth-token';

type StorageState = {
  cookies: unknown[];
  origins: Array<{ origin: string; localStorage: Array<{ name: string; value: string }> }>;
};

export function readAuthToken(path: string): string | undefined {
  try {
    const state = JSON.parse(readFileSync(path, 'utf-8')) as StorageState;
    return state.origins?.[0]?.localStorage?.find((item) => item.name === AUTH_TOKEN_KEY)?.value;
  } catch {
    return undefined;
  }
}

export function buildStorageState(origin: string, token: string): StorageState {
  return {
    cookies: [],
    origins: [{ origin, localStorage: [{ name: AUTH_TOKEN_KEY, value: token }] }],
  };
}
