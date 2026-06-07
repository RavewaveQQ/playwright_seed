import { Environment } from '@src/types/env.type';

export const local: Environment = {
  webURL: new URL('http://localhost:4200/'),
  apiURL: new URL('http://localhost:8091/'),
  user: { email: 'customer2@practicesoftwaretesting.com' },
  admin: { email: 'admin@practicesoftwaretesting.com' },
};
