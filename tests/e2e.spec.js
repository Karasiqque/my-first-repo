import { test, expect } from '@playwright/test';
import {LoginPage } from '../pages/LoginPage';
import {InventoryPage } from '../pages/InventoryPage'; 
import {CartPage } from '../pages/CartPage';
import {CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import {CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import {CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('E2E тест полного сценария покупки', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open(); //1
    await loginPage.login('standard_user', 'secret_sauce'); //2

 expect(await inventoryPage.getPageTitle()).toBe("Products"); //3

 await page.locator('[data-test="product-sort-container"]').selectOption('hilo'); //4
const mostExpensiveItemName = await page.locator('.inventory_item_name').first().textContent();
  await inventoryPage.addItemToCart(mostExpensiveItemName);

  await inventoryPage.openCart();//5

  await expect(cartPage.cartItems.filter({ hasText: mostExpensiveItemName })).toBeVisible();//6

await cartPage.goToCheckout();//7

  await checkoutStepOnePage.fillUserInfo('Egor', 'Karas', '12345');//8,9

  await checkoutStepTwoPage.finishCheckout();//10

  expect(await checkoutCompletePage.getCompletionMessage()).toBe('Thank you for your order!');//11
});