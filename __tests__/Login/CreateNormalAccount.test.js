let LandingPage = require('../../PageModels/LandingPage');
let RegisterPage = require('../../PageModels/RegisterPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');

describe('Create a normal account', () => {

    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.registerPage = new RegisterPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
    });
    test('Create normal user and verify login', async () => {

        let userEmail = "Test3@yahoo.com";
        let userPassword = "test123";
        let firstName = "Rowel";
        let middleName = "Olino";
        let lastName = "Libunao";
        let birthDay = "2020-10-14";

        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(userEmail, userPassword, firstName, middleName, lastName, birthDay);
        await this.registerPage.clickRegisterButton();
        await this.loginPage.inputLoginCredentials(userEmail, userPassword);
        await this.loginPage.clickLoginButton();
        expect(await this.homePage.verifyMoviesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyBrachesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyAdminTabisDisplayed()).toBe(false);
        expect(await this.homePage.verifyUserLoggedin()).toEqual(userEmail);
        expect(await this.homePage.verifyLogoutButtonisDisplayed()).toEqual('Logout');
    });

    test('Create another normal user and verify login', async () => {

        let userEmail = "Test4@yahoo.com";
        let userPassword = "test123";
        let firstName = "Kim";
        let middleName = "Kim";
        let lastName = "Cofino";
        let birthDay = "2020-10-14";

        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(userEmail, userPassword, firstName, middleName, lastName, birthDay);
        await this.registerPage.clickRegisterButton();
        await this.loginPage.inputLoginCredentials(userEmail, userPassword);
        await this.loginPage.clickLoginButton();
        expect(await this.homePage.verifyMoviesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyBrachesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyAdminTabisDisplayed()).toBe(false);
        expect(await this.homePage.verifyUserLoggedin()).toEqual(userEmail);
        expect(await this.homePage.verifyLogoutButtonisDisplayed()).toEqual('Logout');
    });
    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
    });
});

