import type { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiParsedResponse, Method, RequestOptions } from '@src/types/common/api-manager.type';
import { ApiLogger } from './api-logger';

export class APIManager {
  constructor(private readonly request: APIRequestContext) {}

  async get<T>(url: string, options?: RequestOptions): Promise<ApiParsedResponse<T>> {
    return this.send<T>('get', url, options);
  }

  async post<T>(url: string, options?: RequestOptions): Promise<ApiParsedResponse<T>> {
    return this.send<T>('post', url, options);
  }

  async put<T>(url: string, options?: RequestOptions): Promise<ApiParsedResponse<T>> {
    return this.send<T>('put', url, options);
  }

  async patch<T>(url: string, options?: RequestOptions): Promise<ApiParsedResponse<T>> {
    return this.send<T>('patch', url, options);
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<ApiParsedResponse<T>> {
    return this.send<T>('delete', url, options);
  }

  async storageState(): ReturnType<APIRequestContext['storageState']> {
    return this.request.storageState();
  }

  private async send<T>(method: Method, url: string, options?: RequestOptions): Promise<ApiParsedResponse<T>> {
    ApiLogger.logRequest({ method: method.toUpperCase(), url, body: options?.data });
    const started = Date.now();
    const response = await this.request[method](url, {
      headers: options?.headers,
      params: options?.params,
      data: options?.data,
      timeout: options?.timeout,
    });
    const parsed = await this.parse<T>(response, started);
    ApiLogger.logResponse(method.toUpperCase(), parsed);
    return parsed;
  }

  private async parse<T>(response: APIResponse, started: number): Promise<ApiParsedResponse<T>> {
    const text = await response.text();
    const body = this.safeJsonParse<T>(text);
    return {
      status: response.status(),
      body,
      headers: response.headers(),
      url: response.url(),
      latencyMs: Date.now() - started,
      originalResponse: response,
    };
  }

  private safeJsonParse<T>(text: string): T {
    if (!text) return undefined as T;
    try {
      return JSON.parse(text) as T;
    } catch {
      return text as unknown as T;
    }
  }
}
