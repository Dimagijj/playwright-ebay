import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  private productTitle = "h1.x-item-title__mainTitle";
  private relatedProductsSection = "section:has-text('Similar Items')";
  private productPrice = ".x-price-primary";
  private addToCartButton = 'a[href*="cart"]';
  private buyNowButton = 'a[href*="purchaseconfirm"]';
  private watchButton = 'a[href*="watchlist"]';
  private sellerInfo = ".x-sellercard-atf__info";
  private shippingInfo = ".ux-labels-values--shipping";
  private productImage = ".ux-image-carousel-item img";
  private quantityInput = 'input[aria-label*="Quantity"]';

  constructor(page: Page) {
    super(page);
  }

  getProductTitle(): Promise<string | null> {
    return this.getText(this.productTitle);
  }
  //check if related product section is visible and return the locator if it is otherwise return null
  getRelatedProductsSection() {
    return this.page.locator(this.relatedProductsSection);
  }

  async getCategoryFromJsonLD() {
    return await this.page.evaluate(() => {
      const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];

      for (const script of scripts) {
        try {
          const data = JSON.parse(script.textContent || '');

          if (data['@type'] === 'Product' && data.category) {
            return data.category;
          }
        } catch (e) {}
      }
      return null;
    });
  }

  async getRelatedProductLinks(limit = 3): Promise<string[]> {
    const links = await this.page.locator(`${this.relatedProductsSection} a[href*="/itm/"]`).evaluateAll((elements, max) =>
      elements.slice(0, max).map((el: any) => el.href).filter((href: string) => href && href.includes('/itm/')),
      limit
    );
    return links;
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
