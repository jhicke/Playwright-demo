import { test, expect } from "@playwright/test";

test("GET /users/2 returns mocked user", async ({ page }) => {
  await page.route("**/api/users/2", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: {
          id: 2,
          email: "email@example.com",
          first_name: "John",
          last_name: "Doe",
        },
      }),
    });
  });

  const response = await page.request.get("https://dotesthere.com/api/users/2");
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.data.id).toBe(2);
});

test("GET /users/999 returns mocked 404", async ({ page }) => {
  await page.route("**/api/users/999", async (route) => {
    await route.fulfill({
      status: 404,
      contentType: "application/json",
      body: JSON.stringify({ error: "User not found" }),
    });
  });

  const response = await page.request.get(
    "https://dotesthere.com/api/users/999",
  );

  expect(response.status()).toBe(404);
});
