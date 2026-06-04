import { dev } from './dev.env';
import { stage } from './stage.env';
import { prod } from './prod.env';

const envMap = { dev, stage, prod };

const name = (process.env.ENV ?? 'dev') as keyof typeof envMap;
if (!(name in envMap)) throw new Error(`Unknown ENV: ${name}`);

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env variable: ${key}`);
  return value;
}

export const env = {
  ...envMap[name],
  password: required('PASSWORD'),
  adminPassword: required('ADMIN_PASSWORD'),
};
