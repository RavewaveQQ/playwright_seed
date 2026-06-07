import { UserController } from '@controllers/user/user.controller';
import { UserRequest } from '@controllers/user/dto/user.type';

export class UserControllerSteps extends UserController {
  public async loginFlow(email: string, password: string) {
    const response = await this.login({ email, password });
    return this.expectStatus(response);
  }

  public async getMeFlow() {
    const response = await this.getMe();
    return this.expectStatus(response);
  }

  public async registerFlow(data: UserRequest) {
    const response = await this.register(data);
    return this.expectStatus(response, 201);
  }
}
