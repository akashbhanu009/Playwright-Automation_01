import { test, expect } from '@playwright/test';

test('Navigate to category, select Men > Tshirts, and verify Pure Cotton Neon Green Tshirt', async ({ page }) => {
  // Step 1: Navigate to the website
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  
  // Verify the page loaded successfully
  await expect(page).toHaveTitle('Automation Exercise');
  
  // Step 2: Click on 'MEN' category
  await page.locator('a[href="#Men"]').click();
  
  // Wait for the Men subcategories to appear
  await page.waitForSelector('text=Tshirts', { timeout: 10000 });
  
  // Step 3: Click on 'TSHIRTS'
  await page.locator('a[href="/category_products/3"]').click();
  
  // Wait for the products page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Step 4: Verify the "Pure Cotton Neon Green Tshirt" is in the list
  const productLocators = await page.locator('p').all();
  const productNames = await Promise.all(
    productLocators.map(loc => loc.textContent())
  );
  
  // Check if the product exists in the list
  const productFound = productNames.includes('Pure Cotton Neon Green Tshirt');
  expect(productFound).toBeTruthy();
  
  console.log('✓ Pure Cotton Neon Green Tshirt found in the list');
});
