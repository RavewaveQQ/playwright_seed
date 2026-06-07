import { APIManager } from '@src/common/core/api-manager';
import { APIRequestContext, expect } from '@playwright/test';
import { ApiParsedResponse } from '@src/types/common/api-manager.type';

export abstract class BaseController {
  protected apiManager: APIManager;

  constructor(request: APIRequestContext) {
    this.apiManager = new APIManager(request);
  }

  protected expectStatus<T>(response: ApiParsedResponse<T>, status = 200): T {
    expect(response.status, `URL: ${response.url}\nBody: ${JSON.stringify(response.body)}`).toBe(status);
    return response.body;
  }
}
