export class CheckoutStepTwoPage {

    constructor(page) {
        this.page = page;
        this.orderInfo = page.locator('[data-test="cart-list"]');
        this.totalAmount = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }
    async finishCheckout() {
        await this.finishButton.click(); 
    }
}