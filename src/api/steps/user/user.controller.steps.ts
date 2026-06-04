import { UserController } from '@controllers/user/user.controller';

export class UserControllerSteps extends UserController {
  public async loginFlow(email: string, password: string) {
    const response = await this.login({ email, password });
    return this.expectResponseSuccess(response);
  }
}
