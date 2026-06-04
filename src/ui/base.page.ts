import { expect, Page, Response, Request } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  public async goto(
    url: string,
    options?: {
      referer?: string;
      timeout?: number;
      waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
    },
  ): Promise<null | Response> {
    return this.page.goto(url, options);
  }

  public onRequest(url: string, functionToDo: (request: Request) => void) {
    return this.page.on('request', (request) => {
      if (request.url() === url) {
        functionToDo(request);
      }
    });
  }

  public async waitForResponse(
    urlOrPredicate: string | RegExp | ((response: Response) => boolean | Promise<boolean>),
    options?: {
      timeout?: number;
    },
  ): Promise<Response> {
    return this.page.waitForResponse(urlOrPredicate, options);
  }

  public async waitForNavigation(
    url: string | RegExp | ((url: URL) => boolean),
    options?: {
      waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
    },
  ): Promise<void> {
    return this.page.waitForURL(url, options);
  }

  public async waitLoad(
    state?: 'load' | 'domcontentloaded' | 'networkidle',
    options?: {
      timeout?: number;
    },
  ): Promise<void> {
    await this.page.waitForLoadState(state, options);
  }

  public async expectPageToHaveTitle(urlOrPredicate: string | RegExp) {
    await expect(this.page, 'Incorrect title of the page.').toHaveTitle(urlOrPredicate);
  }

  public async expectPageToHaveUrl(urlOrPredicate: string | RegExp) {
    await expect(this.page, 'Incorrect URL. Should contain expected part.').toHaveURL(urlOrPredicate);
  }

  public async expectPageNotHaveUrl(urlOrPredicate: string | RegExp) {
    await expect(this.page, 'Incorrect URL. Should not have expected part.').not.toHaveURL(urlOrPredicate);
  }

  public acceptDialog() {
    return this.page.on('dialog', (dialog) => dialog.accept());
  }

  public async refresh(options?: {
    timeout?: number;
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
  }) {
    await this.page.reload(options);
  }

  public async waitForResponseSuccessResponse(url: string): Promise<Response> {
    return this.waitForResponse((response) => response.url().includes(url) && response.status() === 200);
  }
}
