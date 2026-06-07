import { faker } from '@faker-js/faker';
import { UserRequest } from '@src/api/controllers/user/dto/user.type';

export function registrationUserFactory(overrides?: Partial<UserRequest>) {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: `!Auto1${faker.internet.password({ length: 6 })}`,
    ...overrides,
  };
}
