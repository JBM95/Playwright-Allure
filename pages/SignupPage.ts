import { Page } from "@playwright/test";
import User from "../models/User";

export default class SignupPage {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  passwordInput: string;
  confirmPasswordInput: string;
  submitButton: string;

  constructor() {
    this.firstNameInput = "[data-testid=first-name]";
    this.lastNameInput = "[data-testid=last-name]";
    this.emailInput = "[data-testid=email]";
    this.passwordInput = "[data-testid=password]";
    this.confirmPasswordInput = "[data-testid=confirm-password]";
    this.submitButton = "[data-testid=submit]";
  }

  async load(page: Page) {
    await page.goto("/signup");
  }

  async signup(page: Page, user: User) {
    await page.fill(this.firstNameInput, user.getFirstName());
    await page.fill(this.lastNameInput, user.getLastName());
    await page.fill(this.emailInput, user.getEmail());
    await page.fill(this.passwordInput, user.getPassword());
    await page.fill(this.confirmPasswordInput, user.getPassword());
    await page.click(this.submitButton);
  }
}
