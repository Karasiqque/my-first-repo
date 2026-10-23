import { test, expect } from '@playwright/test';
test('test login function', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
await page.locator('#user-name').fill('standard_user');
await page.getByPlaceholder("Password").fill('secret_sauce');
await page.getByRole('button', { name : "Login"}).click();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
test('negative test login function', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
await page.locator('#user-name').fill('locked_out_user');
await page.getByPlaceholder("Password").fill('secret_sauce');
await page.getByRole('button', { name : "Login"}).click();
 await expect(page.getByRole('alert', { text: 'Epic sadface: Sorry, this user has been locked out.' })).toBeVisible();
});