import { test } from '../fixtures/test-fixtures';

test.describe('Logout', () => {
  test('logs out and returns to the login page', async ({
    loggedInInventory,
    loginPage,
  }) => {
    await loggedInInventory.logout();
    await loginPage.expectLoaded();
  });
});