import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { NavBarComponent } from '../components/navbar.component';
import { SearchComponent } from '../components/search.component';

export class HomePage extends BasePage {
  readonly navBar = new NavBarComponent(this.page);
  readonly search = new SearchComponent(this.page);

  private readonly paginationNav = this.page.getByRole('navigation').last();

  async open(): Promise<void> {
    await this.goto('/');
  }

  productCard(name: string): Locator {
    return this.page.getByRole('link').filter({
      has: this.page.getByRole('heading', { name, level: 5 }),
    });
  }

  async openProduct(name: string): Promise<void> {
    await this.productCard(name).first().click();
  }

  async goToPage(pageNumber: number): Promise<void> {
    await this.paginationNav.getByRole('button', { name: `Page-${pageNumber}` }).click();
  }

  async goToNextPage(): Promise<void> {
    await this.paginationNav.getByRole('button', { name: 'Next' }).click();
  }

  async goToPreviousPage(): Promise<void> {
    await this.paginationNav.getByRole('button', { name: 'Previous' }).click();
  }
}
