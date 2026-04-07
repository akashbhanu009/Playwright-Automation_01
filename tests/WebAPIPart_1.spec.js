import{test, expect, request} from '@playwright/test';



test.beforeAll(async ({request}) => {
  
  console.log('*****  Before All Tests  *****');

  try{
  const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      timeout: 60000,
        data: {
          userEmail: 'akashbhanutiwari@gmail.com',
          userPassword: '@Abt1983'
        },
        
      })
      const actualResponseCode = response.status();
      console.log('Login API response code: ', actualResponseCode);
      //or 
      // expect(response.status()).toBe(200); //it may give error if status is not 2xx or 3xx
      expect(response.ok()).toBeTruthy(); // Assert that the response status is 2xx
        // expect(response.status()).toBe(actualResponseCode);
        
      const respData = await response.json(); // to get the response data in json format [token will be there in the response]
        console.log('JSON Response Data: ',await respData);
        console.log('JSON Response TOKEN: ',await respData.token);
        const token = respData.token;
        //set the token as global storage state so that it can be used in other tests
        test.info().annotations.push({ type: 'token', description: token });
  }catch(error){
    test.skip(true, 'API host not reachable (DNS / Network issue)');
    console.log('Error during login API call: ', error);
  }
        
});

test.beforeEach(async () => {
  console.log('*****  Before Each Test  *****');
});




test('Browser context playwright test', async ({ page }) => {
  //Set the token in the local storage before navigating to the application page
  // bypass the login step by setting the token in the local storage

  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, test.info().annotations.find(a => a.type === 'token').description);
  await page.goto('https://rahulshettyacademy.com/client/', { waitUntil: 'networkidle', timeout: 60000 });


  //Login to the application
  // await page.goto('https://rahulshettyacademy.com/client/', { waitUntil: 'networkidle', timeout: 50000 });
  // await page.locator('#userEmail').fill('akashbhanutiwari@gmail.com');
  // await page.locator('#userPassword').fill('@Abt1983');
  // await page.locator('#login').click();

  //If this wait not work and return empty array '[]' then use below wait
  // await page.waitForLoadState('networkidle');

  await page.locator('div.card-body b').first().waitFor(); // wait for the products to be visible

  //Get all the titles of the products and print them
  
  const titles = await page.locator('div.card-body b').allTextContents();
  console.log(titles);


  // now get the product name 'zara coat 3 ' and click on Add to Cart

  const products = page.locator('.card-body');
  const counts = await products.count();
  const productName = 'ZARA COAT 3';

  
  
  for (let i = 0; i < counts; ++i) {
    if(await products.nth(i).locator('b').textContent() === productName) {
      //click on 'add to cart' button
      await products.nth(i).locator('button:has-text("Add to Cart")').first().click();
      // await products.nth(i).locator('button', { name: ' Add To Cart' }).first().click();
      //  await page.getByRole('button', { name: ' Add To Cart' }).first().click();
      //  await page.getByRole('button', { name: '   Cart' }).click();
      break;
    }
  }

  // click on the cart button
  await page.locator("//button[@routerlink='/dashboard/cart']").click();
  await page.locator('li.items.even.ng-star-inserted:visible').waitFor(); // wait for the cart items to be visible

  //Assertion to verify if the selected product is added to the cart
  // await expect(page.locator('h3:has-text("ZARA COAT 3")')).toBeVisible(); // this auto-wait or below code without auto-wait
  const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
  expect(bool).toBeTruthy();

  // click on checkout button
  await page.locator('button:has-text("Checkout")').click(); 

  // await page.locator('[placeholder*="Select Country"]').fill('ind'); // fill the country input field immediately, but not get the auto-suggestion
  await page.locator('[placeholder*="Select Country"]').pressSequentially("ind",{delay:150}); // fill the country input field
  await page.locator('.ta-results').waitFor(); // wait for the auto-suggestion to be visible
  
  const dropDownOptionsCount = await page.locator('.ta-results button').count();
  for (let i = 0; i < dropDownOptionsCount; ++i) {
    const text = await page.locator('.ta-results button').nth(i).textContent();
    if (text.trim() === 'India') {
      await page.locator('.ta-results button').nth(i).click();
      break;
    }
  }

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
  await page.locator('.action__submit').click();
  // await page.locator("button[class*='submit']").click();

  // Assertion to verify order confirmation message
  await page.locator('.hero-primary').waitFor(); // wait for the order confirmation message to be visible
  const orderConfirmationMessage = await page.locator('.hero-primary').textContent();
  console.log('orderConfirmationMessage: ', orderConfirmationMessage);
  expect(orderConfirmationMessage).toBe(' Thankyou for the order. '); // have spaces in the actual text
  // if didn't match due to spaces then use trim(), below code
  expect(orderConfirmationMessage.trim()).toBe('Thankyou for the order.');

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

