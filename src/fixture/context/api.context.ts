import { APIRequestContext } from '@playwright/test';
import { env } from '@src/common/config/envs/env';
import { BaseContext } from './base.context';
import { UserControllerSteps } from '@src/api/steps/user/user.controller.steps';
import { ProductController } from '@controllers/product/product.controller';

export class ApiContext extends BaseContext {
  public readonly user = new UserControllerSteps(this.context);
  public readonly product = new ProductController(this.context);

  public static async getContext(token?: string): Promise<{ api: ApiContext; request: APIRequestContext }> {
    return this.createContext(ApiContext, env.apiURL, token);
  }
}
