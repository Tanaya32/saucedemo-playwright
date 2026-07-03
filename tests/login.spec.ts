import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { VALID_USER, invalidLoginScenarios } from '../test-data/login-data';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('logs in successfully with valid credentials', async () => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await loginPage.expectLoginSucceeded();
  });

  for (const scenario of invalidLoginScenarios) {
    test(`shows error for ${scenario.description}`, async () => {
      await loginPage.login(scenario.username, scenario.password);
      await loginPage.expectLoginError(scenario.expectedError);
    });
  }
});