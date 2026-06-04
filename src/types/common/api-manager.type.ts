import type { APIResponse } from '@playwright/test';
import type { Serializable } from 'child_process';
import type { ReadStream } from 'fs';

export interface RequestOptions {
  params?: { [key: string]: string | number | boolean } | URLSearchParams | string;
  method?: string;
  headers?: Record<string, string>;
  data?: string | Buffer | Serializable;
  form?: { [key: string]: string | number | boolean } | FormData;
  multipart?:
    | { [key: string]: string | number | boolean | ReadStream | { name: string; mimeType: string; buffer: Buffer } }
    | FormData;
  timeout?: number;
  failOnStatusCode?: boolean;
  ignoreHTTPSErrors?: boolean;
  maxRedirects?: number;
  maxRetries?: number;
}

export interface ApiParsedResponse<T> {
  status: number;
  body: T;
  headers: Record<string, string>;
  url: string;
  latencyMs: number;
  originalResponse: APIResponse;
}

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';
