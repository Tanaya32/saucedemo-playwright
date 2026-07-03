import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  private cartItem(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  async expectItemPresent(productName: string): Promise<void> {
    await expect(this.cartItem(productName)).toHaveCount(1);
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeProduct(productName: string): Promise<void> {
    await this.cartItem(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}