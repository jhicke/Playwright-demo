import { Locator, Page } from "@playwright/test";
import { InventoryItem } from "./components/InventoryItem";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getInventoryItem(index: number) {
    const itemRoot = this.page
      .locator('[data-test="inventory-item"]')
      .nth(index);
    return new InventoryItem(this.page, itemRoot);
  }
  async addInventoryItem(index: number) {
    const item = await this.getInventoryItem(index);
    await item.addToCart();
  }
}
