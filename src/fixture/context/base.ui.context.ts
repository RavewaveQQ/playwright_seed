import { Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '@src/ui/base.page';

export abstract class BaseUIContext {
  constructor(protected context: BrowserContext) {}

  protected static async createContext(
    browser: Browser,
    url: URL,
    storageState?: string,
  ): Promise<{ context: BrowserContext; page: Page }> {
    const context = await browser.newContext({
      baseURL: url.href,
      storageState,
      proxy: undefined,
    });
    const page = await context.newPage();
    await page.goto(url.href, { waitUntil: 'domcontentloaded' });
    return { context, page };
  }

  public async openNewPage<T extends BasePage>(
    triggerAction: () => Promise<void>,
    type: new (page: Page) => T,
  ): Promise<T> {
    const promise = this.context.waitForEvent('page');
    await triggerAction();
    const page = await promise;
    await page.waitForLoadState();
    return new type(page);
  }

  public async openNewTab(): Promise<Page> {
    return this.context.newPage();
  }
}
