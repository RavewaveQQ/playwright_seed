import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base.component';

export class SearchComponent extends BaseComponent {
  readonly sortCombobox = this.root.getByRole('combobox', { name: 'sort' });
  readonly searchInput = this.root.getByRole('textbox', { name: 'Search' });
  readonly searchButton = this.root.getByRole('button', { name: 'Search' });
  readonly clearButton = this.root.getByRole('button', { name: 'X' });
  readonly ecoFriendlyCheckbox = this.root.getByRole('checkbox', { name: 'Show only eco-friendly products' });

  constructor(page: Page) {
    super(page, page.locator('div[data-test="filters"]'));
  }

  categoryCheckbox(name: string): Locator {
    return this.root.getByRole('checkbox', { name });
  }

  brandCheckbox(name: string): Locator {
    return this.root.getByRole('checkbox', { name });
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async clearSearch(): Promise<void> {
    await this.clearButton.click();
  }

  async sortBy(option: string): Promise<void> {
    await this.sortCombobox.selectOption(option);
  }

  async filterByCategory(name: string): Promise<void> {
    await this.categoryCheckbox(name).check();
  }

  async filterByBrand(name: string): Promise<void> {
    await this.brandCheckbox(name).check();
  }
}
