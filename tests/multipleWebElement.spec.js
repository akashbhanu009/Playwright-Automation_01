


/*
import {test, expect} from '@playwright/test';

test('print multiple web elemnt present in a page', async ({page}) => {

    await page.goto('https://demoblaze.com/index.html', {waitUntil:'domcontentloaded'});

    
/*    
    const webLinks = await page.$$('a');

    for (const link of webLinks) {
        const linkText = await link.textContent();
        console.log(linkText);
    }
*/

    // const products = await page.$$("//div[@id='tbodyid']//div/h4/a");

    // for (const product of products) {
    //     const productName = await product.textContent();
    //     console.log('product name ==', productName);
    // }

//or
/*
    const allProducts = page.locator('.card-title a');
    const count = await allProducts.count();
    console.log(count);
*/



//*

///////////////////////////////////////////////


/*




*/



import { test, expect } from '@playwright/test';

test('print multiple web elemnt present in a page', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html', { waitUntil: 'domcontentloaded' });

  const products = page.locator('#tbodyid .card-title a');
  await expect(products.first()).toBeVisible({ timeout: 15000 });

  const productNames = await products.allTextContents();
  for (const name of productNames) {
    const value = name.trim();
    if (value) {
      console.log('product name ==', value);
    }
  }
});
