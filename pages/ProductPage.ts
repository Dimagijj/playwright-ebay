import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    private productTitle = 'h1.x-item-title__mainTitle';
    private productPrice = '.x-price-primary';
    private addToCartButton = 'a[href*="cart"]';
    private buyNowButton = 'a[href*="purchaseconfirm"]';
    private watchButton = 'a[href*="watchlist"]';
    private sellerInfo = '.x-sellercard-atf__info';
    private shippingInfo = '.ux-labels-values--shipping';
    private productImage = '.ux-image-carousel-item img';
    private quantityInput = 'input[aria-label*="Quantity"]';

    constructor(page: Page) {
        super(page);
    }

    async getProductTitle(): Promise<string | null> {
        if (await this.isVisible(this.productTitle)) {
            return await this.getText(this.productTitle);
        }
        return null;
    }

    async getProductPrice(): Promise<string | null> {
        if (await this.isVisible(this.productPrice)) {
            return await this.getText(this.productPrice);
        }
        return null;
    }

    async clickAddToCart(): Promise<void> {
        if (await this.isVisible(this.addToCartButton)) {
            await this.click(this.addToCartButton);
        }
    }

    async clickBuyNow(): Promise<void> {
        if (await this.isVisible(this.buyNowButton)) {
            await this.click(this.buyNowButton);
        }
    }

    async clickWatch(): Promise<void> {
        if (await this.isVisible(this.watchButton)) {
            await this.click(this.watchButton);
        }
    }

    async isSellerInfoVisible(): Promise<boolean> {
        return await this.isVisible(this.sellerInfo);
    }

    async isProductImageVisible(): Promise<boolean> {
        return await this.isVisible(this.productImage);
    }

    async setQuantity(quantity: number): Promise<void> {
        if (await this.isVisible(this.quantityInput)) {
            await this.fill(this.quantityInput, quantity.toString());
        }
    }
}
