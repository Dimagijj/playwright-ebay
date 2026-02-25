import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private searchBox = '#gh-ac';
    private searchButton = '#gh-search-btn';
    private FirstItem = 'ul.srp-results li[id^="item"] img.s-card__image';     

    constructor(page: Page) {
        super(page);
    }

    async open(): Promise<void> {
        await this.navigate('/');
    }

    async searchAndSelectProduct(productName: string): Promise<void> {
        await this.fill(this.searchBox, productName);
        await this.click(this.searchButton);
        await this.waitForSelector(this.FirstItem);
        await this.page.locator(this.FirstItem).first().click();
    }


    async getPageTitle(): Promise<string> {
        return await this.getTitle();
    }
}
