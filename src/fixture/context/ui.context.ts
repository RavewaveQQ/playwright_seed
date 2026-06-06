import { Browser, BrowserContext, Page } from '@playwright/test';
import { env } from '@src/common/config/envs/env';
import { BaseUIContext } from './base.ui.context';
import { HomePage } from '@src/ui/pages/home.page';
import { LoginPage } from '@src/ui/pages/login.page';
import { RegisterPage } from '@src/ui/pages/register.page';
import { AccountPage } from '@src/ui/pages/account.page';

export class UiContext extends BaseUIContext {
  private static uiInstance: UiContext;

  public readonly home: HomePage;
  public readonly login: LoginPage;
  public readonly register: RegisterPage;
  public readonly account: AccountPage;

  protected constructor(context: BrowserContext, page: Page) {
    super(context);

    this.home = new HomePage(page);
    this.login = new LoginPage(page);
    this.register = new RegisterPage(page);
    this.account = new AccountPage(page);
  }

  public static async getContext(browser: Browser, storageState?: string): Promise<{ ui: UiContext; page: Page }> {
    const { context, page } = await this.createContext(browser, env.webURL, storageState);
    UiContext.uiInstance = new UiContext(context, page);
    return { ui: UiContext.uiInstance, page };
  }
}
