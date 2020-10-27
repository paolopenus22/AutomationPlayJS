let LandingPage = require('../../PageModels/LandingPage');
let RegisterPage = require('../../PageModels/RegisterPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');

describe('Create an admin account', () => {

    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.registerPage = new RegisterPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
    });

    test('Create admin account and verify login', async () => {
        
        let adminEmail = 'testqa28@admin.com';
        let adminPassword = '@dmin';
        let adminFirstName = 'Anne';
        let adminMiddleName = 'Gonzales';
        let adminLastName = 'Macabale';
        let adminBday = '1994-10-11';

        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(adminEmail, adminPassword, adminFirstName, adminMiddleName, adminLastName, adminBday);
        await this.registerPage.clickRegisterButton();
        await this.loginPage.inputLoginCredentials(adminEmail, adminPassword);
        await this.loginPage.clickLoginButton();
        expect(await this.homePage.verifyMoviesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyBrachesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyAdminTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyUserLoggedin()).toEqual(adminEmail);
        expect(await this.homePage.verifyLogoutButtonisDisplayed()).toEqual('Logout');
    });

    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
    });
});
