import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { testData } from '../utils/testData';
import { navigateToProduct } from '../utils/TestHelpers';

let homePage: HomePage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);   
  productPage = new ProductPage(page);
});

test.beforeAll(async () => {
    console.log('Starting eBay test suite...');
});
 
test.afterAll(async () => {
    console.log('eBay test suite completed!');
});
test.describe('eBay Product Display functionalities', () => {
    test('should load eBay home page successfully', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await homePage.open();
        const title = await homePage.getPageTitle();
        expect(title).toContain('eBay');      
    
    });

    test('should search and select the product sucessfully and redirect to product page', async ({ page }) => {
       const productTab = await navigateToProduct(page,testData.searchKeywords.walletName);
       expect(productTab).toHaveURL(/\/itm\//);
    });

    test('should display correct title on product detail page', async ({ page }) => {
       const productTab = await navigateToProduct(page,testData.searchKeywords.walletName);
       const newProductPage = new ProductPage(productTab);
       const productTitle = await newProductPage.getProductTitle();
       expect(productTitle).toContain(testData.searchKeywords.walletName);
    });
     
    test('Verify the Related product section is visible on the product detail page', async ({ page }) => {
        const productTab = await navigateToProduct(page,testData.searchKeywords.walletName);
        const newProductPage = new ProductPage(productTab);
        const relatedProductsSection = await newProductPage.getRelatedProductsSection();
        await expect(relatedProductsSection).toBeVisible();
    });
        
    test('Verify if the Related product catagory is same as Main Product catagory', async ({ page }) => {
        const productTab = await navigateToProduct(page,testData.searchKeywords.walletName);
        const newProductPage = new ProductPage(productTab);
        const mainProductCategory = await newProductPage.getCategoryFromJsonLD();
        const relatedLinks = await newProductPage.getRelatedProductLinks(1);

        expect(relatedLinks.length).toBeGreaterThan(0);

       // Validate first related product only
        const link = relatedLinks[0];
        if (link) {
          await productTab.goto(link, { waitUntil: 'domcontentloaded', timeout: 15000 });
          const relatedCategory = await newProductPage.getCategoryFromJsonLD();
          expect(relatedCategory).toBe(mainProductCategory); 
        }
    });

    test('Verify if the related product is the same price range ', async ({ page }) => {
        const productTab = await navigateToProduct(page,testData.searchKeywords.walletName);
        const newProductPage = new ProductPage(productTab);
        const mainPrice = await newProductPage.getProductPrice();
        const relatedLinks = await newProductPage.getRelatedProductLinks(1);

        expect(mainPrice).not.toBeNull();

        if (mainPrice !== null && relatedLinks.length > 0) {
            const link = relatedLinks[0];
            await productTab.goto(link, { waitUntil: 'domcontentloaded', timeout: 15000 });
            const relatedPrice = await newProductPage.getProductPrice();

            if (relatedPrice !== null) {
                expect(relatedPrice).toBeGreaterThanOrEqual(mainPrice * 0.7);
                expect(relatedPrice).toBeLessThanOrEqual(mainPrice * 1.3);
            }
        }
    });

    test('Verify the count of related products displayed in related product section is upto 6', async ({ page }) => {
        const productTab = await navigateToProduct(page,testData.searchKeywords.walletName);
        const newProductPage = new ProductPage(productTab);
        const relatedItemCount = await newProductPage.getrelatedItemCount();
        expect(relatedItemCount).toBeLessThanOrEqual(6);
    });
});
