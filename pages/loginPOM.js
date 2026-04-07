
export class LoginPage{

    constructor(page){
        this.page=page;
        this.username=page.locator('#username');
        this.password=page.locator('#password');
        this.loginBtn=page.locator('i').filter({ hasText: 'Login' }).last();
    }

    async navigateToLoginPage(){
        await this.page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'networkidle', timeout: 50000 });
    }

    async loginToApplication(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}