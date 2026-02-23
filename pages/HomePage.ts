import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private searchBox = '#gh-ac';
    private searchButton = '#gh-btn';
    private FirstItem = '.s-item__title';     
    private advancedSearchLink = '#gh-as-a';
    private categoryDropdown = '#gh-cat';
    private dailyDealsLink = 'a[href*="deals"]';
    private helpContactLink = 'a[href*="help"]';
    private registerLink = 'a[href*="reg.ebay"]';
    private signInLink = 'a[href*="signin"]';

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
        await this.click(this.FirstItem);
    }
    
    async getPrductText(): Promise<string | null> {
        return await this.getText(this.FirstItem);
    }


    async clickAdvancedSearch(): Promise<void> {
        await this.click(this.advancedSearchLink);
    }

    async selectCategory(category: string): Promise<void> {
        await this.selectOption(this.categoryDropdown, category);
    }

    async clickDailyDeals(): Promise<void> {
        await this.click(this.dailyDealsLink);
    }
    async getPageTitle(): Promise<string> {
        return await this.getTitle();
    }
}
