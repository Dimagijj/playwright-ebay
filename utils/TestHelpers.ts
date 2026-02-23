import { Page } from '@playwright/test';

export class TestHelpers {
    static generateRandomString(length: number = 8): string {
        return Math.random().toString(36).substring(2, length + 2);
    }

    static generateRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async takeScreenshot(page: Page, name: string): Promise<void> {
        await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    }

    static async waitForPageLoad(page: Page): Promise<void> {
        await page.waitForLoadState('networkidle');
    }

    static formatPrice(price: string): string {
        return price.replace(/[^0-9.]/g, '');
    }
}
