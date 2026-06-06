/* eslint-disable no-console */
import { ApiParsedResponse } from '@src/types/common/api-manager.type';

const LATENCY_WARN_MS = Number(process.env.API_LATENCY_WARN_MS ?? 3000);
const LOG_ENABLED = process.env.API_LOG !== 'false';

export interface RequestLog {
  method: string;
  url: string;
  body?: unknown;
}

export class ApiLogger {
  static logRequest(req: RequestLog): void {
    if (!LOG_ENABLED) return;
    const bodyStr = req.body ? ` body=${truncate(JSON.stringify(maskSensitive(req.body)))}` : '';
    console.info(`→ ${req.method} ${req.url}${bodyStr}`);
  }

  static logResponse(method: string, response: ApiParsedResponse<unknown>): void {
    if (!LOG_ENABLED) return;
    const slowMark = response.latencyMs > LATENCY_WARN_MS ? ' SLOW' : '';
    console.info(`← ${method} ${response.url} [${response.status}] ${response.latencyMs}ms${slowMark}`);
  }
}

const SENSITIVE_KEYS = new Set(['password', 'token', 'secret', 'authorization']);

function maskSensitive(body: unknown): unknown {
  if (typeof body !== 'object' || body === null) return body;
  return Object.fromEntries(
    Object.entries(body as Record<string, unknown>).map(([k, v]) => [
      k,
      SENSITIVE_KEYS.has(k.toLowerCase()) ? '***' : v,
    ]),
  );
}

function truncate(value: string, max = 500): string {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}
