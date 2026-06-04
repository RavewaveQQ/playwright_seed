import { APIManager } from '@src/common/core/api-manager';
import { APIRequestContext, expect } from '@playwright/test';
import { ApiParsedResponse } from '@src/types/common/api-manager.type';

export abstract class BaseController {
  protected apiManager: APIManager;

  constructor(request: APIRequestContext) {
    this.apiManager = new APIManager(request);
  }

  protected expectResponseSuccess<T>(response: ApiParsedResponse<T>): T {
    this.verifyStatus(response, 200);
    return response.body;
  }

  protected getSuccessResponseBody<T>(response: ApiParsedResponse<T>): T {
    this.verifyStatus(response, 200);
    return response.body;
  }

  protected verifyStatusAndGetResponseBody<T>(response: ApiParsedResponse<T>, status = 400): T {
    this.verifyStatus(response, status);
    return response.body;
  }

  protected verifyStatus<T>(response: ApiParsedResponse<T>, status: number): void {
    expect(response.status, `URL: ${response.url}\nBody: ${JSON.stringify(response.body)}`).toBe(status);
  }
}
