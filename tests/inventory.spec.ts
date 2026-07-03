import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { VALID_USER } from '../test-data/login-data';

test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
  });

  test.describe('sorting', () => {
    test('sorts by name A to Z', async () => {
      await inventoryPage.sortBy('az');
      const names = await inventoryPage.getProductNames();
      expect(names).toEqual([...names].sort());
    });

    test('sorts by name Z to A', async () => {
      await inventoryPage.sortBy('za');
      const names = await inventoryPage.getProductNames();
      expect(names).toEqual([...names].sort().reverse());
    });

    test('sorts by price low to high', async () => {
      await inventoryPage.sortBy('lohi');
      const prices = await inventoryPage.getProductPrices();
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });

    test('sorts by price high to low', async () => {
      await inventoryPage.sortBy('hilo');
      const prices = await inventoryPage.getProductPrices();
      expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });
  });

  test.describe('cart', () => {
    test('add and remove updates the cart badge', async () => {
      await inventoryPage.expectCartCount(0);

      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.expectCartCount(1);

      await inventoryPage.addProductToCart('Sauce Labs Bike Light');
      await inventoryPage.expectCartCount(2);

      await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
      await inventoryPage.expectCartCount(1);
    });
  });
});