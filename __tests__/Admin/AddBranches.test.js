let LandingPage = require('../../PageModels/LandingPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');
let AdminPage = require('../../PageModels/Admin/AdminPage');
let AddBranchPage = require('../../PageModels/Admin/AddBranchPage');

describe('Add Branches by Admin', () => {
    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.adminPage = new AdminPage();
        this.addBranchPage = new AddBranchPage();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
    });

    test('Add new branch', async () => {
        let adminEmail = 'testqa41@admin.com';
        let adminPassword = '@dmin';
        let newBranch = 'Circuit Makati';
        let city = 'Makati City'

        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();
        
        await this.loginPage.isPageLoaded();
        await this.loginPage.inputLoginCredentials(adminEmail, adminPassword);
        await this.loginPage.clickLoginButton();

        await this.homePage.isPageLoaded();
        await this.homePage.clickAdminTab();

        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModule('Branch');

        await this.addBranchPage.isPageLoaded();
        await this.addBranchPage.clickAddBranchButton();
        await this.addBranchPage.inputBranchDetails(newBranch, city);
        await this.addBranchPage.clickAddButton();
        await this.addBranchPage.selectMaxTotalItems('18');
        expect(await this.addBranchPage.verifyNewBranchName(newBranch)).toEqual(newBranch);
    });

    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
     });
});