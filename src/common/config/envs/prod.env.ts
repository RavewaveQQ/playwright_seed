import { Environment } from '@src/types/env.type';

//mock
export const prod: Environment = {
  webURL: new URL('https://api.example.com'),
  apiURL: new URL('https://api.example.com'),
  user: { email: 'test@example.com' },
  admin: { email: 'admin@example.com' },
};
