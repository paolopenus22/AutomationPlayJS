let LandingPage = require('../../PageModels/LandingPage');
let RegisterPage = require('../../PageModels/RegisterPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');
let Utils = require('../../utils/cleanup');
let faker = require('faker');

describe('Create a normal account', () => {

    // test # 1
    let firstName = faker.name.firstName();
    let middleName = faker.name.lastName();
    let lastName = faker.name.lastName();
    let userEmail = firstName + lastName + '@gmail.com';
    let userPassword = faker.internet.password();
    let birthDay = faker.date.past(40).toISOString()

    //test # 2
    let firstName2 = faker.name.firstName();
    let middleName2 = faker.name.lastName();
    let lastName2 = faker.name.lastName();
    let userEmail2 = firstName2 + lastName2 + '@gmail.com';
    let userPassword2 = faker.internet.password();
    let birthDay2 = faker.date.past(40).toISOString();
    
    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.registerPage = new RegisterPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.cleanUp = new Utils();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
    });
    test('Create normal user and verify login', async () => {

        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(userEmail, userPassword, firstName, middleName, lastName, birthDay);
        await this.registerPage.clickRegisterButton();
        await this.loginPage.inputLoginCredentials(userEmail, userPassword);
        await this.loginPage.clickLoginButton();
        expect(await this.homePage.verifyMoviesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyBrachesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyAdminTabisDisplayed()).toEqual(false);
        expect(await this.homePage.verifyUserLoggedin()).toEqual(userEmail);
        expect(await this.homePage.verifyLogoutButtonisDisplayed()).toEqual('Logout');
    });

    test('Create another normal user and verify login', async () => {

        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(userEmail2, userPassword2, firstName2, middleName2, lastName2, birthDay2);
        await this.registerPage.clickRegisterButton();
        await this.loginPage.inputLoginCredentials(userEmail2, userPassword2);
        await this.loginPage.clickLoginButton();
        expect(await this.homePage.verifyMoviesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyBrachesTabisDisplayed()).toBe(true);
        expect(await this.homePage.verifyAdminTabisDisplayed()).toEqual(false);
        expect(await this.homePage.verifyUserLoggedin()).toEqual(userEmail2);
        expect(await this.homePage.verifyLogoutButtonisDisplayed()).toEqual('Logout');
    });
    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
        await this.cleanUp.deleteUser(userEmail);
        await this.cleanUp.deleteUser(userEmail2);
    });
});

