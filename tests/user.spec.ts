import { test, expect } from "@playwright/test";
import User from "../models/User";
import SignupPage from "../pages/SignupPage";

test("user should be able to register to our application", async ({ page }) => {
  const user = new User();
  const signupPage = new SignupPage();

  await signupPage.load(page);
  await signupPage.signup(page,user);
  
  const welcomeMessage = page.locator("[data-testid=welcome]");
  await expect(welcomeMessage).toBeVisible();
});
