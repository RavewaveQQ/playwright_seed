import { Environment } from '@src/types/env.type';

export const dev: Environment = {
  webURL: new URL('https://practicesoftwaretesting.com/'),
  apiURL: new URL('https://api.practicesoftwaretesting.com/'),
  user: { email: 'tcustomer@practicesoftwaretesting.com' },
  admin: { email: 'admin@practicesoftwaretesting.com' },
};
