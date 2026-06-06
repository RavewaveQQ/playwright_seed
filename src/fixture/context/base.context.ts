import { request, APIRequestContext } from '@playwright/test';

export abstract class BaseContext {
  constructor(protected context: APIRequestContext) {}

  protected static async createContext<T extends BaseContext>(
    type: new (context: APIRequestContext) => T,
    baseURL: URL,
    token?: string,
  ): Promise<{ api: T; request: APIRequestContext }> {
    const context = await this.newContext(baseURL, token);
    return { api: new type(context), request: context };
  }

  private static async newContext(baseURL: URL, token?: string): Promise<APIRequestContext> {
    return request.newContext({
      baseURL: baseURL.href,
      extraHTTPHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}
