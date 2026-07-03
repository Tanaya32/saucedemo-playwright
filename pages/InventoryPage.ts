import { type Page, type Locator, expect } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  private readonly page: Page;
  private readonly sortDropdown: Locator;
  private readonly itemNames: Locator;
  private readonly itemPrices: Locator;
  private readonly inventoryItems: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly menuButton : Locator;
  private readonly logoutLink : Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL('/inventory.html');
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const raw = await this.itemPrices.allTextContents();
    return raw.map((price) => Number(price.replace('$', '')));
  }

  private productButton(productName: string): Locator {
    return this.inventoryItems
      .filter({ hasText: productName })
      .getByRole('button');
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.productButton(productName).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.productButton(productName).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async expectCartCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async logout(): Promise<void> {
  await this.menuButton.click();
  await this.logoutLink.click();
}
  
}