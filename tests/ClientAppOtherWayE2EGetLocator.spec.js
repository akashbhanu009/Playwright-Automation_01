import { test, expect } from '@playwright/test';

test('Browser context playwright test', async ({ page }) => {
  //Login to the application
  await page.goto('https://rahulshettyacademy.com/client/', { waitUntil: 'networkidle', timeout: 50000 });
  await page.getByPlaceholder('email@example.com').fill('akashbhanutiwari@gmail.com');
  await page.getByPlaceholder('enter your passsword').fill('@Abt1983');
  await page.getByRole('button',{name:"login"}).click();

  //If this wait not work and return empty array '[]' then use below wait
  // await page.waitForLoadState('networkidle');

  await page.locator('div.card-body b').first().waitFor(); // wait for the products to be visible

  //Chaining locators to click on 'Add to Cart' button for 'ZARA COAT 3'
  await page.locator(".card-body").filter({ hasText: 'ZARA COAT 3' }).getByRole('button', { name: 'Add To Cart' }).click();
  
  // Click on Cart icon using chained locators
  await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();



  await page.locator('li.items.even.ng-star-inserted:visible').waitFor(); // wait for the cart items to be visible

  //Assertion to verify if the selected product is added to the cart
  await expect(page.getByText('ZARA COAT 3')).toBeVisible();

  // click on checkout button
  await page.getByRole('button', { name: 'Checkout' }).click(); 

  // await page.locator('[placeholder*="Select Country"]').fill('ind'); // fill the country input field immediately, but not get the auto-suggestion
  await page.getByPlaceholder('Select Country').pressSequentially("indi",{delay:150}); // fill the country input field
  await page.locator('.ta-results').waitFor(); // wait for the auto-suggestion to be visible

  await page.getByRole('button', { name: 'India'}).nth(1).click();
  

  //in place of below code you can use one line above code --^
  
  // const dropDownOptionsCount = await page.locator('.ta-results button').count();
  // for (let i = 0; i < dropDownOptionsCount; ++i) {
  //   const text = await page.locator('.ta-results button').nth(i).textContent();
  //   if (text.trim() === 'India') {
  //     await page.locator('.ta-results button').nth(i).click();
  //     break;
  //   }
  // }




  // to launch the playwright inspector and pause the execution at this point
  // await page.pause();

  //validate the email in brown color is same as enter in the tet field in login page
  const emailText = await page.locator("label[type='text']").textContent();
  console.log("emailText: " , emailText);
  expect(page.locator('.user__name [type="text"]').first()).toHaveText("akashbhanutiwari@gmail.com");
  

  await page.locator("input[value='4542 9931 9292 2293']").waitFor(); // wait for the card input field to be visible
  await page.locator("input[value='4542 9931 9292 2293']").fill('4542 9931 9292 2293');
  // page.locator("body > app-root:nth-child(1) > app-order:nth-child(2) > section:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(2)").fill('03/25');
  
  // await page.locator('.input txt').nth(0).fill('123');
  // // await page.locator("body > app-root:nth-child(1) > app-order:nth-child(2) > section:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > input:nth-child(2)").fill('123');
  // await page.locator('.input txt').nth(1).fill('Akash Bhanutiwari');
  //using the xpath then only it worked
  await page.locator("(//input[@type='text'])[2]").fill("123");
  await page.locator("(//input[@type='text'])[3]").fill("Akash Bhanutiwari");

  await page.locator('input[name="coupon"]').fill('rahulshettyacademy');
  await page.locator('button:has-text("Apply")').click();

  await page.locator('p.mt-1.ng-star-inserted').waitFor(); // wait for the coupon response message to be visible
  const couponResponse = await page.locator('p.mt-1.ng-star-inserted').textContent();
  console.log('Coupon Response: ', couponResponse);
  expect(couponResponse).toBe('* Coupon Applied');

  

  // click on place order button
  await page.getByText('PLACE ORDER').click();
  // await page.locator("button[class*='submit']").click();

  // Assertion to verify order confirmation message
  await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();
  

  const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent(); 
  console.log("Order ID: ", orderID);

  //click on 'My Orders' button
  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  await page.locator('tbody tr').first().waitFor(); // wait for the orders table to be visible

  const rows = page.locator('tbody tr');
  const rowsCount = await rows.count(); 

  for (let i = 0; i < rowsCount; ++i) {
    const rowOrderID = await rows.nth(i).locator('th').textContent();
    if (orderID.includes(rowOrderID)) {
      await rows.nth(i).locator('button:has-text("View")').first().click();
      break;
    }
  } 

  const orderIdDetailsPage = await page.locator("div.col-text").textContent();
  expect(orderID.includes(orderIdDetailsPage)).toBeTruthy();

});

