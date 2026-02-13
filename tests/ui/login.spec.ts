import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should navigate to login page', async ({ page }) => {
    expect(page.url()).toContain('/');
  });

  test('should login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');
    expect(page.url()).toContain('inventory.html');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });

  test('should fill username field', async () => {
    await loginPage.enterUsername('standard_user');
    await expect(loginPage.usernameInput).toHaveValue('standard_user');
  });

  test('should fill password field', async () => {
    await loginPage.enterPassword('secret_sauce');
    await expect(loginPage.passwordInput).toHaveValue('secret_sauce');
  });
});
