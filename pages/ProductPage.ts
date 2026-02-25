import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  private productTitle = "h1.x-item-title__mainTitle";
  private relatedProductsSection = "section:has-text('Similar Items')";
  private productPrice = ".x-price-primary";

  constructor(page: Page) {
    super(page);
  }

  async getProductTitle(): Promise<string | null> {
    await this.waitForSelector(this.productTitle);
    return this.getText(this.productTitle);
  }

  async getRelatedProductsSection() {
    await this.page.waitForSelector(this.relatedProductsSection, { timeout: 10000 });
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

  async getProductPrice(): Promise<number | null> {
    await this.page.waitForSelector(this.productPrice, { timeout: 10000 });
    const priceText = await this.page.locator(this.productPrice).first().innerText();
    const cleanedPrice = priceText.replace(/[^0-9.]/g, '');
    return Number(cleanedPrice);
  }

  async getrelatedItemCount(): Promise<number> {
    return await this.page.locator(this.relatedProductsSection).count();
  }
}
