import{test,expect} from '@playwright/test';

test('Label locators playwright test', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/', { waitUntil: 'networkidle', timeout: 50000 });
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').check();
    
    //select option from dropdown 'Male' or 'Female'
    await page.getByLabel('Gender').selectOption('Female');

    await page.getByPlaceholder('Password').fill('Abt@1983');

    await page.getByRole('button',{value:'Submit'}).click();

    console.log('Success message is visible?: ', await page.getByText('Success!', { exact: true }).isVisible());

    await page.getByRole('link', {name: 'shop'}).click();

    //chain locators
    await page.locator('app-card-list.row').waitFor();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click();
    
});