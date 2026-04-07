import { test, expect } from '@playwright/test';

test('Popup Validations test', async ({ page }) => {
  //for more validations code
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/', { waitUntil: 'networkidle', timeout: 50000 });


  //     await page.goto('https://www.google.com');
  //     await page.goBack();
  //     await page.goForward();

  await page.locator('#show-textbox').click();
  await expect(page.locator('#displayed-text')).toBeVisible();

  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();


  //alert popup validation 'dismiss' 
  await page.locator('#confirmbtn').click();

  page.on('dialog', async dialog => {
    console.log('Dismiss: ', dialog.message());
    expect(dialog.message()).toBe('Hello , Are you sure you want to confirm?');
    await dialog.dismiss();
  });

  // await page.reload();
  //alert popup validation 'accept'
  await page.locator('#confirmbtn').click();

  page.on('dialog', async dialog => {
    console.log('Accept: ', dialog.message());
    expect(dialog.message()).toBe('Hello , Are you sure you want to confirm?');
    await dialog.accept();
  });

  // mouse hover
  await page.locator('#mousehover').hover();
  await page.getByText('Top').click();
  await expect(page.locator('#mousehover')).toBeVisible();

  await page.locator('#mousehover').hover();
  await page.getByText('Reload').click();
  await expect(page).toHaveURL('https://rahulshettyacademy.com/AutomationPractice/');


  // frames haandling

  const framesPage = page.frameLocator('#courses-iframe');

  await framesPage.locator('li a[href*="lifetime-access"]:visible').click();
  // await framesPage.locator('#courses-iframe:visible').click();

  const text = await framesPage.locator('.text h2').textContent();
  console.log('Frame Text: ', text);
  expect(text).toContain('Join 13,522 Happy Subscibers!');

  console.log(text.split(' ')[1]);


});


test('Screenshot & Visual Comparision test', async ({ page }) => {
  //for more validations code
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/', { waitUntil: 'networkidle', timeout: 50000 });


  //     await page.goto('https://www.google.com');
  //     await page.goBack();
  //     await page.goForward();

  await page.locator('#show-textbox').click();
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#displayed-text:visible').screenshot({ path: 'tests/screenshots/singleElement.png' });

  await page.locator('#hide-textbox').click();
  //full page screenshot
  await page.screenshot({ path: 'tests/screenshots/fullPage.png', fullPage: true });
  await expect(page.locator('#displayed-text')).toBeHidden();


});   


// test.only('Visual UI Comparision test', async ({ page }) => {
//   //for more validations code
//   await page.goto('https://google.com/', { waitUntil: 'networkidle', timeout: 50000 });
//   expect.soft(await page.screenshot()).toMatchSnapshot('googleHomePage.png');

//   //     await page.goto('https://www.google.com');
//   //     await page.goBack();
//   //     await page.goForward();  
// });






