import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { NavBarComponent } from '../components/navbar.component';

export type ProfileData = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}>;

export class AccountPage extends BasePage {
  readonly navBar = new NavBarComponent(this.page);

  readonly firstNameInput = this.page.getByRole('textbox', { name: 'First name' });
  readonly lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
  readonly emailInput = this.page.getByRole('textbox', { name: 'Email address' });
  readonly phoneInput = this.page.getByRole('textbox', { name: 'Phone' });
  readonly streetInput = this.page.getByRole('textbox', { name: 'Street' });
  readonly postalCodeInput = this.page.getByRole('textbox', { name: 'Postal code' });
  readonly cityInput = this.page.getByRole('textbox', { name: 'City' });
  readonly stateInput = this.page.getByRole('textbox', { name: 'State' });
  readonly countryInput = this.page.getByRole('textbox', { name: 'Country' });
  readonly updateProfileButton = this.page.getByRole('button', { name: 'Update Profile' });

  readonly currentPasswordInput = this.page.locator('[data-test="current-password"]');
  readonly newPasswordInput = this.page.locator('[data-test="new-password"]');
  readonly confirmPasswordInput = this.page.locator('[data-test="new-password-confirm"]');
  readonly changePasswordButton = this.page.getByRole('button', { name: 'Change Password' });

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/account/profile');
  }

  async updateProfile(data: ProfileData): Promise<void> {
    if (data.firstName !== undefined) await this.firstNameInput.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastNameInput.fill(data.lastName);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.phone !== undefined) await this.phoneInput.fill(data.phone);
    if (data.street !== undefined) await this.streetInput.fill(data.street);
    if (data.postalCode !== undefined) await this.postalCodeInput.fill(data.postalCode);
    if (data.city !== undefined) await this.cityInput.fill(data.city);
    if (data.state !== undefined) await this.stateInput.fill(data.state);
    if (data.country !== undefined) await this.countryInput.fill(data.country);
    await this.updateProfileButton.click();
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.currentPasswordInput.fill(currentPassword);
    await this.newPasswordInput.fill(newPassword);
    await this.confirmPasswordInput.fill(newPassword);
    await this.changePasswordButton.click();
  }
}
