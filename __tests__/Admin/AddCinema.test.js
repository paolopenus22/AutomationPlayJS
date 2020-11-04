let LandingPage = require('../../PageModels/LandingPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');
let AdminPage = require('../../PageModels/Admin/AdminPage');
let AdminBranchPage = require('../../PageModels/Admin/AdminBranchPage');
let EditCinemaPage = require('../../PageModels/Admin/EditCinemaPage');
let AddCinemaPage = require('../../PageModels/Admin/AddCinemaPage');

describe('Add Cinema by Admin', () => {
    
    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.adminPage = new AdminPage();
        this.adminBranchPage = new AdminBranchPage();
        this.editCinemaPage = new EditCinemaPage();
        this.addCinemaPage = new AddCinemaPage();

        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
    });
    test('Add Cinemas', async () => {     
        let email = 'DoNotUse_AdminAccount@admin.com';
        let invalidPassword =  'password123';
        let cinema1 = 'Cinema 19';
        let cinema2 = 'Cinema 21';

        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();

        await this.loginPage.isPageLoaded();        
        await this.loginPage.inputLoginCredentials(email, invalidPassword);  
        await this.loginPage.clickLoginButton();
        
        await this.homePage.isPageLoaded();
        await this.homePage.clickAdminTab();
        
        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModule('Branch');
        
        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.ClickRandomBranch();

        await this.editCinemaPage.isPageLoaded();
        await this.editCinemaPage.clickAddButton();

        await this.addCinemaPage.isPageLoaded();
        await this.addCinemaPage.inputCinemaName(cinema1);

        await this.editCinemaPage.isPageLoaded();
        await this.editCinemaPage.clickAddButton();

        await this.addCinemaPage.isPageLoaded();
        await this.addCinemaPage.inputCinemaName(cinema2);

        await this.editCinemaPage.isPageLoaded();
        expect(await this.editCinemaPage.verifyCinema(cinema1)).toBe(true);
        expect(await this.editCinemaPage.verifyCinema(cinema2)).toBe(true);
    });
    
    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
     });
});