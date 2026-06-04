import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { NavBarComponent } from '../components/navbar.component';

export class LoginPage extends BasePage {
  readonly navBar = new NavBarComponent(this.page);

  readonly emailInput = this.page.getByRole('textbox', { name: 'Email address *' });
  readonly passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly signInWithGoogleButton = this.page.getByRole('button', { name: 'Sign in with Google' });
  readonly registerLink = this.page.getByRole('link', { name: 'Register your account' });
  readonly forgotPasswordLink = this.page.getByRole('link', { name: 'Forgot your Password?' });
  readonly errorMessage: Locator = this.page.locator('[class*="alert"]');

  async open(): Promise<void> {
    await this.goto('/auth/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async goToRegister(): Promise<void> {
    await this.registerLink.click();
  }

  async goToForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }
}
