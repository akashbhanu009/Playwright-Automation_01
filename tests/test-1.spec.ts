import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Ddemoqa%26oq%3Ddemoqa%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCDE1OTJqMGoyqAIAsAIB%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3DeJSZabOyM6yZnesP0pWAwQ8&q=EgR6r5AxGPqo5swGIjCvAv9bAXnUuPiDDbhlW21CwXjJ78a1kMqdBON2vgjeFo1zfiKCDhvIgAPj7GSJvVQyAVJaAUM');
  await page.locator('iframe[name="a-fta5o9kbsdey"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-fta5o9kbsdey"]').contentFrame().locator('[id="2"]').click();
  await page.locator('iframe[name="c-fta5o9kbsdey"]').contentFrame().locator('[id="8"]').click();
  await page.locator('iframe[name="c-fta5o9kbsdey"]').contentFrame().locator('[id="6"]').click();
  await page.locator('iframe[name="c-fta5o9kbsdey"]').contentFrame().locator('[id="7"]').click();
  await page.locator('iframe[name="c-fta5o9kbsdey"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('link', { name: 'Demo QA Demo QA https://' }).click();
  await page.goto('https://demoqa.com/');
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByText('Forms').click();
  await expect(page.locator('#userEmail-wrapper')).toMatchAriaSnapshot(`
    - text: Email
    - textbox "name@example.com"
    `);
  await page.locator('div:nth-child(2) > .group-header > .header-wrapper').click();
  await page.getByRole('link', { name: 'Practice Form' }).click();
  await page.getByText('Alerts, Frame & Windows').click();
  await page.getByRole('link', { name: 'Frames', exact: true }).click();
  await page.getByText('Forms').click();
  await page.getByText('Forms').click();
  await page.getByText('Forms').click();
  await page.getByRole('link', { name: 'Practice Form' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('akash');
  await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('bhanu');
  await page.getByRole('textbox', { name: 'Last Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('a@gmail.com');
  await page.getByRole('textbox', { name: 'name@example.com' }).press('Tab');
  await page.getByRole('radio', { name: 'Male', exact: true }).press('m');
  await page.getByRole('radio', { name: 'Male', exact: true }).press('a');
  await page.getByRole('radio', { name: 'Male', exact: true }).press('Enter');
  await page.getByRole('radio', { name: 'Male', exact: true }).press('Enter');
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.getByRole('textbox', { name: 'Mobile Number' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('321556789');
  await page.locator('#dateOfBirthInput').click();
  await page.getByRole('gridcell', { name: 'Choose Saturday, February 21st,' }).selectOption('7');
  await page.getByRole('gridcell', { name: 'Choose Thursday, August 13th,' }).click();
  await expect(page.locator('#userForm')).toMatchAriaSnapshot(`
    - text: Name
    - textbox "First Name"
    - textbox "Last Name"
    - text: Email
    - textbox "name@example.com"
    - text: Gender
    - radio "Male" [checked]
    - text: Male
    - radio "Female"
    - text: Female
    - radio "Other"
    - text: /Other Mobile\\(\\d+ Digits\\)/
    - textbox "Mobile Number"
    - text: Date of Birth
    - textbox: /\\d+ Aug \\d+/
    - text: Subjects
    - log
    - combobox
    - text: Hobbies
    - checkbox "Sports"
    - text: Sports
    - checkbox "Reading"
    - text: Reading
    - checkbox "Music"
    - text: Music Picture
    - button "Choose File"
    - text: Current Address
    - textbox "Current Address"
    - text: State and City
    - log
    - text: Select State
    - combobox
    - log
    - text: Select City
    - button "Submit"
    `);
  await expect(page.getByRole('textbox', { name: 'Mobile Number' })).toHaveValue('321556789');
  await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('akash');
  await expect(page.locator('#userEmail-wrapper')).toMatchAriaSnapshot(`
    - text: Email
    - textbox "name@example.com"
    `);
});