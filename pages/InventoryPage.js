export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title'); 
    this.cartIcon = page.locator('.shopping_cart_link'); 
    this.inventoryItems = page.locator('.inventory_item'); 
    this.addToCartButtons = page.locator("//button[text()='Add to cart']"); 
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async addItemToCart(itemName) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.locator(this.addToCartButtons).click();
  }
}