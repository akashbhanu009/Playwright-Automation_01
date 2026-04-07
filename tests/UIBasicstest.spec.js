import { test, expect } from '@playwright/test';

test('Browser context playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const title = await page.title();
  expect(title).toBe('LoginPage Practise | Rahul Shetty Academy');
  await page.locator('#username').fill('rahul');
  await page.locator('#password').fill('learning');
  await page.locator('#signInBtn').click();
  console.log(await page.locator('[style*="block"]').textContent());

  // const errorMssg =  page.locator('[style*="block"]').textContent();
  //assertions
  expect(await page.locator('[style*="block"]').textContent()).toContain('Incorrect username/password.');
  //clear the incorrect username and fill with correct one


  await page.locator('#username').fill('');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#signInBtn').click();
  // console.log(await expect(page.locator('[style*="none"]')).toContainText('Incorrect'));

  await page.waitForLoadState('networkidle');
  const products = page.locator('.card-body');
  const count = await products.count();
  console.log(count);



  console.log(await page.locator('.card-body a').first().textContent());
  console.log(await page.locator('.card-body a').nth(1).textContent());

  const allTextTitles = await page.locator('.card-body a').allTextContents();
  console.log(allTextTitles);

});


test('Page playwright test', async ({ page }) => {

  await page.goto('https://www.google.com/');
  const title = await page.title();
  console.log(title);
  //  await expect(title).toBe('Google');
  await expect(page).toHaveTitle(/Google/);
});


test.only('UI Controls drop-drown', async ({ page }) => {
  await page.pause();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const userName = page.locator('#username');
  const password = page.locator('#password');
  const SignIn = page.locator('#signInBtn');

  //dropdown static
  const dropDown = page.locator('select.form-control');
  await dropDown.selectOption('consult');
  await expect(dropDown).toHaveValue('consult');
  console.log("Consultant selected from the drop-down: ", await dropDown.inputValue());

  //checkbox
  //checkbox checked
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  console.log("Checkbox is selected: ", await page.locator("#terms").isChecked());

  //checkbox checked to uncheck
  await page.locator("#terms").uncheck();
  await expect(page.locator("#terms")).not.toBeChecked();
  console.log("Checkbox is selected: ", await page.locator("#terms").isChecked());

  //Radiobutton
  await page.locator('label.customradio').locator('span').last().click();
  await expect(page.locator('label.customradio').locator('span').last()).toHaveClass(/checkmark/);
  await expect(page.locator('label.customradio').locator('span').last()).toBeChecked();
  console.log("User option selected: " , await page.locator('label.customradio').locator('span').last().inputValue());

  //click the confirmation pop-up
  await expect(page.locator('#okayBtn')).toBeVisible();
  await expect(page.locator('#okayBtn')).toHaveText('Okay');
  console.log("Okay btn selected under dialog pop-up: ", await page.locator('#okayBtn').isVisible());
  
  await page.locator('#okayBtn').click();
  
  


  

  /*
  //dropdown static
  await page.locator('select.form-control').selectOption('consult');
  console.log(await page.locator('select.form-control').inputValue());
  await expect(page.locator('select.form-control')).toHaveValue('consult');


  //dropdown dynamic
  await page.locator('.blinkingText').click();
  const pages = page.context().pages();
  const childPage = pages[1];
  await childPage.waitForLoadState();
  const text = await childPage.locator('.red').textContent();
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0];
  console.log(domain);
  await page.locator('#username').fill(`rahul@${domain}`);
  */
});
