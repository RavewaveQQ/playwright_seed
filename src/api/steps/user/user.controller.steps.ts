import { UserController } from '@controllers/user/user.controller';
import { UserRequest } from '@controllers/user/dto/user.type';
import { step } from '@src/common/core/step.decorator';

export class UserControllerSteps extends UserController {
  @step('login', { logArgs: false })
  public async loginFlow(email: string, password: string) {
    const response = await this.login({ email, password });
    return this.expectStatus(response);
  }

  @step('get current user profile')
  public async getMeFlow() {
    const response = await this.getMe();
    return this.expectStatus(response);
  }

  @step('register new user', { logArgs: false })
  public async registerFlow(data: UserRequest) {
    const response = await this.register(data);
    return this.expectStatus(response, 201);
  }
}
