import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { AdvancedSearchPage } from '../pages/AdvancedSearchPage';
import { testData } from '../utils/testData';
//declare variables for page objects
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;
let advancedSearchPage: AdvancedSearchPage;

//use beforeEach to initialize page objects before each test
test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  searchResultsPage = new SearchResultsPage(page);
  productPage = new ProductPage(page);
  advancedSearchPage = new AdvancedSearchPage(page);
});
test.beforeAll(async () => {
    console.log('Starting eBay test suite...');
});
 
test.afterAll(async () => {
    console.log('eBay test suite completed!');
});
test.describe('eBay Product Display fucntionalities', () => {
    test('should load eBay home page successfully', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await homePage.open();
        const title = await homePage.getPageTitle();
        expect(title).toContain('eBay');      
    
    });

    test('should search and select the product sucessfully', async ({ page }) => {
        await homePage.searchAndSelectProduct(testData.searchKeywords.walletName);

    });

    test('should display correct product detail page', async ({ page }) => {
        const productText = await homePage.getPrductText();
        const [newPage] = await Promise.all([
        page.context().waitForEvent('page')]);
        await newPage.waitForLoadState();
        expect(productText).toContain(testData.searchKeywords.walletName);  
   });

//     test('should search using Enter key', async ({ page }) => {
//         await homePage.open();
//         await homePage.searchWithEnter(testData.searchKeywords.smartphone);
        
//         await page.waitForURL(/.*sch/);
//         expect(page.url()).toContain(testData.searchKeywords.smartphone);
//     });

//     test('should navigate to advanced search', async ({ page }) => {
//         await homePage.open();
//         await homePage.clickAdvancedSearch();
        
//         await page.waitForURL(/.*ebayadvsearch/);
//         expect(page.url()).toContain('ebayadvsearch');
//     });

//     test('should display all main navigation elements', async ({ page }) => {
//         await homePage.open();
        
//         const isLogoVisible = await homePage.isLogoVisible();
//         expect(isLogoVisible).toBeTruthy();
//     });
// });

// test.describe('eBay Search Tests', () => {
//     test('should display search results for valid product', async ({ page }) => {
//         await homePage.open();
//         await homePage.searchProduct(testData.searchKeywords.iPhone);
        
//         const areResultsDisplayed = await searchResultsPage.areResultsDisplayed();
//         expect(areResultsDisplayed).toBeTruthy();
        
//         const resultsCount = await searchResultsPage.getResultsCount();
//         expect(resultsCount).toBeGreaterThan(0);
//     });

//     test('should display product title and price in results', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         await homePage.open();
//         await homePage.searchProduct(testData.searchKeywords.laptop);
        
//         const title = await searchResultsPage.getResultTitle(1);
//         expect(title).toBeTruthy();
//         expect(title!.length).toBeGreaterThan(0);
        
//         const price = await searchResultsPage.getResultPrice(1);
//         expect(price).toBeTruthy();
//     });

//     test('should show filter sidebar on results page', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         await homePage.open();
//         await homePage.searchProduct(testData.searchKeywords.camera);
        
//         const isFilterVisible = await searchResultsPage.isFilterSidebarVisible();
//         expect(isFilterVisible).toBeTruthy();
//     });

//     test('should search for multiple products', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         const products = [testData.searchKeywords.headphones, testData.searchKeywords.watch, testData.searchKeywords.shoes];
        
//         for (const product of products) {
//             await homePage.open();
//             await homePage.searchProduct(product);
            
//             const areResultsDisplayed = await searchResultsPage.areResultsDisplayed();
//             expect(areResultsDisplayed).toBeTruthy();
//         }
//     });

//     test('should display results count', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         await homePage.open();
//         await homePage.searchProduct(testData.searchKeywords.tablet);
        
//         const resultsCountText = await searchResultsPage.getResultsCountText();
//         expect(resultsCountText).toBeTruthy();
//     });
// });

// test.describe('eBay Product Page Tests', () => {
//     test('should display product details', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         const productPage = new ProductPage(page);
//         await homePage.open();
//         await homePage.searchProduct(testData.searchKeywords.gamingMouse);
//         await searchResultsPage.clickFirstResult();
        
//         await page.waitForLoadState('networkidle');
        
//         const productTitle = await productPage.getProductTitle();
//         expect(productTitle).toBeTruthy();
//     });

//     test('should show product image', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         const productPage = new ProductPage(page);
//         await homePage.open();
//         await homePage.searchProduct(testData.searchKeywords.keyboard);
//         await searchResultsPage.clickFirstResult();
        
//         await page.waitForLoadState('networkidle');
        
//         const isImageVisible = await productPage.isProductImageVisible();
//         expect(isImageVisible).toBeTruthy();
//     });

//     test('should display seller information', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         const productPage = new ProductPage(page);
//         await homePage.open();
//         await homePage.searchProduct(testData.searchKeywords.monitor);
//         await searchResultsPage.clickFirstResult();
        
//         await page.waitForLoadState('networkidle');
        
//         const isSellerInfoVisible = await productPage.isSellerInfoVisible();
//         expect(isSellerInfoVisible).toBeTruthy();
//     });

//     test('should display product price', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         const productPage = new ProductPage(page);
//         await homePage.open();
//         await homePage.searchProduct(testData.searchKeywords.webcam);
//         await searchResultsPage.clickFirstResult();
        
//         await page.waitForLoadState('networkidle');
        
//         const price = await productPage.getProductPrice();
//         expect(price).toBeTruthy();
//     });
// });

// test.describe('eBay Advanced Search Tests', () => {
//     test('should load advanced search page', async ({ page }) => {
//         const advancedSearchPage = new AdvancedSearchPage(page);
//         await advancedSearchPage.open();
        
//         expect(page.url()).toContain('ebayadvsearch');
//     });

//     test('should search with keyword only', async ({ page }) => {
//         const advancedSearchPage = new AdvancedSearchPage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         await advancedSearchPage.open();
    //     await advancedSearchPage.searchWithKeyword(testData.searchKeywords.laptop);
    //     await advancedSearchPage.clickSearch();
        
    //     const areResultsDisplayed = await searchResultsPage.areResultsDisplayed();
    //     expect(areResultsDisplayed).toBeTruthy();
    // });

    // test('should search with price range', async ({ page }) => {
    //     const advancedSearchPage = new AdvancedSearchPage(page);
    //     const searchResultsPage = new SearchResultsPage(page);
    //     await advancedSearchPage.open();
    //     await advancedSearchPage.performAdvancedSearch(testData.searchKeywords.smartphone, testData.priceRange.min, testData.priceRange.max);
        
//         const areResultsDisplayed = await searchResultsPage.areResultsDisplayed();
//         expect(areResultsDisplayed).toBeTruthy();
//     });

//     test('should exclude words from search', async ({ page }) => {
//         const advancedSearchPage = new AdvancedSearchPage(page);
//         const searchResultsPage = new SearchResultsPage(page);
//         await advancedSearchPage.open();
//         await advancedSearchPage.searchWithKeyword(testData.searchKeywords.phone);
//         await advancedSearchPage.excludeWords(testData.excludeWords.case);
//         await advancedSearchPage.clickSearch();
        
//         const areResultsDisplayed = await searchResultsPage.areResultsDisplayed();
//         expect(areResultsDisplayed).toBeTruthy();
//     });
 });