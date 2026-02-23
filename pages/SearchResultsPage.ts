import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
    private searchResults = '.s-item';
    private resultTitle = '.s-item__title';
    private resultPrice = '.s-item__price';
    private sortDropdown = 'button[aria-label*="Sort"]';
    private filterSidebar = '.x-refine__main';
    private paginationNext = 'a.pagination__next';
    private resultsCount = '.srp-controls__count-heading';
    private firstResult = '.s-item:first-child .s-item__link';

    constructor(page: Page) {
        super(page);
    }

    async getResultsCount(): Promise<number> {
        const elements = await this.page.$$(this.searchResults);
        return elements.length;
    }

    async getResultTitle(index: number = 0): Promise<string | null> {
        const titles = await this.page.$$(this.resultTitle);
        if (titles.length > index) {
            return await titles[index].textContent();
        }
        return null;
    }

    async getResultPrice(index: number = 0): Promise<string | null> {
        const prices = await this.page.$$(this.resultPrice);
        if (prices.length > index) {
            return await prices[index].textContent();
        }
        return null;
    }

    async clickFirstResult(): Promise<void> {
        await this.click(this.firstResult);
    }

    async isFilterSidebarVisible(): Promise<boolean> {
        return await this.isVisible(this.filterSidebar);
    }

    async goToNextPage(): Promise<void> {
        if (await this.isVisible(this.paginationNext)) {
            await this.click(this.paginationNext);
        }
    }

    async getResultsCountText(): Promise<string | null> {
        if (await this.isVisible(this.resultsCount)) {
            return await this.getText(this.resultsCount);
        }
        return null;
    }

    async areResultsDisplayed(): Promise<boolean> {
        return await this.isVisible(this.searchResults);
    }
}
