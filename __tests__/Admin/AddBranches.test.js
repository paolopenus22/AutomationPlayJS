let LandingPage = require('../../PageModels/LandingPage');
let RegisterPage = require('../../PageModels/RegisterPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');
let AdminPage = require('../../PageModels/Admin/AdminPage');
let AdminBranchPage = require('../../PageModels/Admin/AdminBranchPage');
let AddBranchPage = require('../../PageModels/Admin/AddBranchPage');
let Utils = require('../../utils/cleanup');
let faker = require('faker');

describe('Add Branches by Admin', () => {
    let adminFirstName = faker.name.firstName();
    let adminMiddleName = faker.name.lastName();
    let adminLastName = faker.name.lastName();
    let adminEmail = adminFirstName + adminLastName + '@admin.com';
    let adminPassword = faker.internet.password();
    let adminBday = faker.date.past(40).toISOString();

    let city = faker.address.city();
    let newBranch = 'SM ' + city;

    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.registerPage = new RegisterPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.adminPage = new AdminPage();
        this.addBranchPage = new AddBranchPage();
        this.adminBranchPage = new AdminBranchPage();
        this.cleanUp = new Utils();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(adminEmail, adminPassword, adminFirstName, adminMiddleName, adminLastName, adminBday);
        await this.registerPage.clickRegisterButton();
    });

    test('Add new branch', async () => {      
        await this.loginPage.isPageLoaded();
        await this.loginPage.inputLoginCredentials(adminEmail, adminPassword);
        await this.loginPage.clickLoginButton();

        await this.homePage.isPageLoaded();
        await this.homePage.clickAdminTab();

        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModule('Branch');

        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.clickAddBranchButton();
        await this.addBranchPage.isPageLoaded();
        await this.addBranchPage.inputBranchDetails(newBranch, city);
        await this.addBranchPage.clickAddButton();
        await this.addBranchPage.selectMaxTotalItems('18');
        expect(await this.addBranchPage.verifyNewBranchName(newBranch)).toEqual(newBranch);
    });

    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
        await this.cleanUp.deleteUser(adminEmail);
        await this.cleanUp.deleteBranch(newBranch);
     });
});