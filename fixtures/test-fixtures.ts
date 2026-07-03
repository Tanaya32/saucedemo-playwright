import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { VALID_USER } from '../test-data/login-data';

// Define all custom fixtures available to the tests
interface Pages {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedInInventory: InventoryPage;
}

// Extend Playwright's default test (base) with custom fixtures
export const test = base.extend<Pages>({

  // Creates and provides LoginPage object
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Creates and provides InventoryPage object
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // Creates and provides CartPage object
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  // Creates and provides CheckoutPage object
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Logs in once and provides a ready-to-use InventoryPage
  loggedInInventory: async ({ loginPage, inventoryPage }, use) => {

    // Open login page
    await loginPage.goto();

    // Login using valid credentials
    await loginPage.login(VALID_USER.username, VALID_USER.password);

    // Verify login was successful
    await inventoryPage.expectLoaded();

    // Make the logged-in InventoryPage available to the test
    await use(inventoryPage);
  },
});

// Re-export expect so tests can import both test and expect from this file
export { expect } from '@playwright/test';