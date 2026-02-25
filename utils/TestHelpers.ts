import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';


export async function navigateToProduct(
  page: Page,
  productName: string
): Promise<Page> {

  const homePage = new HomePage(page);
  
  await homePage.open();

  // Wait for new tab BEFORE clicking
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    homePage.searchAndSelectProduct(productName)
  ]);

  await newPage.waitForLoadState();

  return newPage;
}
