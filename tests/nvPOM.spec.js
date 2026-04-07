
import { test, expect } from '@playwright/test';
import { Project } from '../pages/nvPOM';
import dataset from '../utils/nvPomDATA.json';
import {customTest} from '../utils/customFixture';


for (const data of dataset) {
    test(`new vision project with ${data.fn}`, async ({ page }) => {
        const nvPrj = new Project(page);

        await nvPrj.urlpage();
        await nvPrj.addBtnFillForm(
            data.fn,
            data.ln,
            data.email,
            data.age,
            data.sal,
            data.dep
        );
    });
}

console.log('Running test with custom fixture and data from JSON file');

customTest('new vision project with custom data', async ({ page, testDataForForm }) => {
    const nvPrj = new Project(page);

    await nvPrj.urlpage();
    await nvPrj.addBtnFillForm(
        testDataForForm.fn,
        testDataForForm.ln,
        testDataForForm.email,
        testDataForForm.age,
        testDataForForm.sal,
        testDataForForm.dep
    );
});
