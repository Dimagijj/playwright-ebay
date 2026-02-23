import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdvancedSearchPage extends BasePage {
    private keywordInput = '#_nkw';
    private excludeWordsInput = '#_ex_kw';
    private minPriceInput = '#_udlo';
    private maxPriceInput = '#_udhi';
    private searchButton = 'button[type="submit"]';
    private categorySelect = '#e1-1';
    private buyingFormatCheckbox = 'input[name="LH_Auction"]';
    private conditionNew = 'input[value="1000"]';
    private conditionUsed = 'input[value="3000"]';

    constructor(page: Page) {
        super(page);
    }

    async open(): Promise<void> {
        await this.navigate('/sch/ebayadvsearch');
    }

    async searchWithKeyword(keyword: string): Promise<void> {
        await this.fill(this.keywordInput, keyword);
    }

    async excludeWords(words: string): Promise<void> {
        await this.fill(this.excludeWordsInput, words);
    }

    async setPriceRange(minPrice?: number, maxPrice?: number): Promise<void> {
        if (minPrice) {
            await this.fill(this.minPriceInput, minPrice.toString());
        }
        if (maxPrice) {
            await this.fill(this.maxPriceInput, maxPrice.toString());
        }
    }

    async selectCategory(category: string): Promise<void> {
        await this.selectOption(this.categorySelect, category);
    }

    async clickSearch(): Promise<void> {
        await this.click(this.searchButton);
    }

    async performAdvancedSearch(keyword: string, minPrice?: number, maxPrice?: number): Promise<void> {
        await this.searchWithKeyword(keyword);
        await this.setPriceRange(minPrice, maxPrice);
        await this.clickSearch();
    }
}
