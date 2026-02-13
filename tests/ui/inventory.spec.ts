import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

test.describe("Inventory Page", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await page.waitForURL("**/inventory.html");
  });

  test("should display inventory title", async () => {
    await expect(inventoryPage.title).toBeVisible();
  });

  test("should navigate to cart", async ({ page }) => {
    await inventoryPage.goToCart();
    await page.waitForURL("**/cart.html");
    expect(page.url()).toContain("cart.html");
  });

  test("should display cart link", async () => {
    await expect(inventoryPage.cartLink).toBeVisible();
  });

  test("should add item to cart", async ({}) => {
    await inventoryPage.addInventoryItem(0);
    await expect(inventoryPage.cartBadge).toBeVisible();
  });
});
