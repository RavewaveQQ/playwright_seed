import { BasePage } from '../base.page';
import { NavBarComponent } from '../components/navbar.component';

export type RegisterData = {
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
};

export class RegisterPage extends BasePage {
  readonly navBar = new NavBarComponent(this.page);

  readonly firstNameInput = this.page.getByRole('textbox', { name: 'First name' });
  readonly lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
  readonly dobInput = this.page.getByRole('textbox', { name: 'Date of Birth *' });
  readonly countryCombobox = this.page.getByRole('combobox', { name: 'Country' });
  readonly postalCodeInput = this.page.getByRole('textbox', { name: 'Postal code' });
  readonly houseNumberInput = this.page.getByRole('textbox', { name: 'House number' });
  readonly streetInput = this.page.getByRole('textbox', { name: 'Street' });
  readonly cityInput = this.page.getByRole('textbox', { name: 'City' });
  readonly stateInput = this.page.getByRole('textbox', { name: 'State' });
  readonly phoneInput = this.page.getByRole('textbox', { name: 'Phone' });
  readonly emailInput = this.page.getByRole('textbox', { name: 'Email address' });
  readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  readonly registerButton = this.page.getByRole('button', { name: 'Register' });

  async open(): Promise<void> {
    await this.goto('/auth/register');
  }

  async register(data: RegisterData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dobInput.fill(data.dob);
    await this.countryCombobox.selectOption(data.country);
    await this.postalCodeInput.fill(data.postalCode);
    await this.houseNumberInput.fill(data.houseNumber);
    await this.streetInput.fill(data.street);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.registerButton.click();
  }
}
