import { test, expect } from '@playwright/test';

export class Project {

    constructor(page) {

        this.page = page;
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'name@example.com' });
        this.age = page.getByRole('textbox', { name: 'Age' });
        this.salary = page.getByRole('textbox', { name: 'Salary' });
        this.department = page.getByRole('textbox', { name: 'Department' });
        this.submitForm = page.getByRole('button', { name: 'Submit' });
        this.modalTitle = page.locator('#example-modal-sizes-title-lg');

    }

    async urlpage() {
        const url = 'https://demoqa.com/webtables';

        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                await this.page.goto(url, {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                await expect(this.addBtn).toBeVisible({ timeout: 20000 });
                return;
            } catch (error) {
                if (attempt === 2) throw error;
                await this.page.waitForTimeout(1500);
            }
        }
    }

    async addBtnFillForm(fn, ln, email, age, sal, dep) {
        await this.addBtn.click();
        await this.firstName.fill(fn);
        await this.lastName.fill(ln);
        await this.email.fill(email);
        await this.age.fill(age);
        await this.salary.fill(sal);
        await this.department.fill(dep);
        await expect(this.submitForm).toBeEnabled();
        await this.submitForm.click();
        await expect(this.modalTitle).toBeHidden();

        const newRow = this.page.locator('tr').locator('td').nth(0);
        await expect(newRow).toBeVisible();

    }

}
