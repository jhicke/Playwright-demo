import { Locator, Page } from "@playwright/test";

export class InventoryItem {
  readonly page: Page;
  readonly root: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page, root: Locator) {
    this.page = page;
    this.root = root;

    this.name = root.locator('[data-test="inventory-item-name"]');
    this.description = root.locator('[data-test="inventory-item-desc"]');
    this.price = root.locator('[data-test="inventory-item-price"]');
    this.addButton = root.locator("button", { hasText: "Add to cart" });
    this.removeButton = root.locator("button", { hasText: "Remove" });
  }

  async addToCart() {
    await this.addButton.click();
  }

  async removeFromCart() {
    await this.removeButton.click();
  }
  async getPrice() {
    await this.price.textContent();
  }
}
