import{test,expect} from '@playwright/test';

test('Calendar Validations test', async ({ page }) => {
  //for calendar code

  const month= '6';
  const date= '15';
  const year= '2027';

  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers', { waitUntil: 'networkidle', timeout: 50000 });

  await page.locator('.react-date-picker__inputGroup').click();
  await page.locator('.react-calendar__navigation__label__labelText').click();
  await page.locator('.react-calendar__navigation__label__labelText').click();
  await page.getByText(year).click(); 
  //6th month and month is in string so we need to convert it into integer using 'parseInt'
  await page.locator('.react-calendar__year-view__months__month').nth(parseInt(month)-1).click();
//   await page.getByRole('button', { name: new RegExp('^' + date + '$') }).click();

//  await page.locator('//abbr[text()="' + date + '"]').click(); //this or below code
 await page.locator('abbr:has-text("' + date + '")').click();

 //calendar date validation -->
//  const expectedList= [month, date, year].join('/');
  const expectedList= [month, date, year];
  const selectedDate= page.locator('.react-date-picker__inputGroup input');

  // expect(selectedDate).toHaveValue(expectedList.join('/'));
  for(let i=0; i<selectedDate.count; i++){
    const actualValue = await selectedDate.nth(i).inputValue();
    expect(actualValue).toBe(expectedList[i]);
    await expect(selectedDate.nth(i)).toHaveValue(expectedList[i]);
  }

  
});