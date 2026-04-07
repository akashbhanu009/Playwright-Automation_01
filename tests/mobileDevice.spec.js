

import { test, expect, devices } from '@playwright/test';

test.use({
    ...devices['iPhone 11'],
    trace: 'on',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
});

test('mobile device test', async ({ page }) => {

    await page.goto('https://demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();

    await page.locator('#loginusername').fill('akashbhanu');
    await page.locator('#loginusername').press('Tab');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Log out' }).click();
    await expect(page.locator('#login2')).toMatchAriaSnapshot(`
    - link "Log in":
      - /url: "#"
    `); await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page.locator('#loginusername')).toBeEmpty();
    await page.locator('#loginusername').click();
    await page.locator('#loginusername').fill('akashbhanu');
    await expect(page.locator('#loginusername')).toHaveValue('akashbhanu');
    await expect(page.locator('#loginusername')).toBeVisible();


});



/*
await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('akashbhanu');
  await page.locator('#loginusername').press('Tab');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
  await expect(page.locator('#login2')).toMatchAriaSnapshot(`
    - link "Log in":
      - /url: "#"
    `);
  await page.getByRole('link', { name: 'Log in' }).click();
  await expect(page.locator('#loginusername')).toBeEmpty();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('akashbhanu');
  await expect(page.locator('#loginusername')).toHaveValue('akashbhanu');
  await expect(page.locator('#loginusername')).toBeVisible();

*/