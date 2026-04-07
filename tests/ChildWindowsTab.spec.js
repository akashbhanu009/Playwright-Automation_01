import { test, expect } from '@playwright/test';

test('Child Windows and tabs', async ({ page }) => {
  await page.pause(); //to run the playwright inspector
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.waitForLoadState('networkidle');

  //new window named 'page1Promimse'
  const page1Promise = page.waitForEvent('popup'); // listen any new page event to open new tab
  await page.getByRole('link', { name: 'Free Access to InterviewQues/' }).click();
  const page1 = await page1Promise;

  console.log("The text present as: ", await page1.locator('p.im-para.red').textContent());

  // split and get the email id from the text and enter into parent window
  const text = await page1.locator('p.im-para.red').textContent();
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0]; //rahulshettyacademy.com
  console.log("The email id is: ", domain);
  await page.locator('#username').fill(domain);

  await page1.getByText('Please email us at mentor@').click();
  await expect(page1.locator('#interview-material-container')).toContainText('Please email us at mentor@rahulshettyacademy.com with below template to receive response');
  
  //get back to parent window i.e 'page' and perform actions
  await page.locator('span').nth(4).click();
  await page.getByRole('button', { name: 'Cancel' }).click();


  //new window named 'page2Promimse'
  const page2Promise = page.waitForEvent('popup'); // listen any new page event to open new tab
  await page.getByRole('link', { name: 'Free Access to InterviewQues/' }).click();
  const page2 = await page2Promise;
  await expect(page2.locator('#interview-material-container')).toContainText('We are offering free assistance of providing Interview Questions/Resume Preparation/ Material to the enrolled Users of any Rahul Shetty Paid courses on any platform');
  await expect(page2.getByRole('link', { name: 'NEW Learning paths' })).toBeVisible();
  await page2.getByRole('link', { name: 'Mentorship' }).click();
  await page1.getByRole('link', { name: 'Practice' }).click();
});



