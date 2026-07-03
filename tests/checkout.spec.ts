import { test } from '../fixtures/test-fixtures';
import { CUSTOMER, checkoutValidationScenarios } from '../test-data/checkout-data';

const PRODUCT = 'Sauce Labs Backpack';

test.describe('Checkout', () => {
  test('completes a purchase end to end', async ({
    loggedInInventory,
    cartPage,
    checkoutPage,
  }) => {
    await loggedInInventory.addProductToCart(PRODUCT);
    await loggedInInventory.openCart();
    await cartPage.expectItemPresent(PRODUCT);

    await cartPage.checkout();
    await checkoutPage.fillInformation(
      CUSTOMER.firstName,
      CUSTOMER.lastName,
      CUSTOMER.postalCode,
    );
    await checkoutPage.continue();
    await checkoutPage.expectOnOverview();

    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test.describe('information validation', () => {
    for (const scenario of checkoutValidationScenarios) {
      test(`shows error when ${scenario.description}`, async ({
        loggedInInventory,
        cartPage,
        checkoutPage,
      }) => {
        await loggedInInventory.addProductToCart(PRODUCT);
        await loggedInInventory.openCart();
        await cartPage.checkout();

        await checkoutPage.fillInformation(
          scenario.firstName,
          scenario.lastName,
          scenario.postalCode,
        );
        await checkoutPage.continue();
        await checkoutPage.expectError(scenario.expectedError);
      });
    }
  });
});