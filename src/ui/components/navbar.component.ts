import { Page } from '@playwright/test';
import { BaseComponent } from './base.component';

export class NavBarComponent extends BaseComponent {
  private readonly menuBar = this.root.getByRole('menubar', { name: 'Main menu' });

  readonly logoLink = this.root.getByRole('link', { name: 'Practice Software Testing - Toolshop' });
  readonly homeLink = this.menuBar.getByRole('link', { name: 'Home' });
  readonly categoriesButton = this.menuBar.getByRole('button', { name: 'Categories' });
  readonly contactLink = this.menuBar.getByRole('link', { name: 'Contact' });
  readonly signInLink = this.menuBar.getByRole('link', { name: 'Sign in' });
  readonly languageButton = this.root.getByRole('button', { name: 'Select language' });

  // Category dropdown links (visible after clicking categoriesButton)
  readonly handToolsLink = this.page.getByRole('link', { name: 'Hand Tools' });
  readonly powerToolsLink = this.page.getByRole('link', { name: 'Power Tools' });
  readonly otherLink = this.page.getByRole('link', { name: 'Other' });
  readonly specialToolsLink = this.page.getByRole('link', { name: 'Special Tools' });
  readonly rentalsLink = this.page.getByRole('link', { name: 'Rentals' });

  // Authenticated user dropdown (data-test used — name is dynamic per user)
  readonly userMenuButton = this.page.locator('[data-test="nav-menu"]');
  readonly myAccountLink = this.menuBar.getByRole('link', { name: 'My account' });
  readonly myFavoritesLink = this.menuBar.getByRole('link', { name: 'My favorites' });
  readonly myProfileLink = this.menuBar.getByRole('link', { name: 'My profile' });
  readonly myInvoicesLink = this.menuBar.getByRole('link', { name: 'My invoices' });
  readonly myMessagesLink = this.menuBar.getByRole('link', { name: 'My messages' });
  readonly signOutLink = this.menuBar.getByRole('link', { name: 'Sign out' });

  constructor(page: Page) {
    super(page, page.getByRole('navigation').first());
  }

  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }

  async goToSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async openCategories(): Promise<void> {
    await this.categoriesButton.click();
  }

  async openUserMenu(): Promise<void> {
    await this.userMenuButton.click();
  }

  async signOut(): Promise<void> {
    await this.openUserMenu();
    await this.signOutLink.click();
  }
}
