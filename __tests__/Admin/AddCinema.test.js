let LandingPage = require('../../PageModels/LandingPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');
let AdminPage = require('../../PageModels/Admin/AdminPage');
let AdminBranchPage = require('../../PageModels/Admin/AdminBranchPage');
let EditBranchPage = require('../../PageModels/Admin/EditBranchPage');
let EditCinemaPage = require('../../PageModels/Admin/EditCinemaPage');
let AddCinemaPage = require('../../PageModels/Admin/AddCinemaPage');
let AdminSchedulePage = require('../../PageModels/Admin/AdminSchedulePage');
let AddSchedulePage = require('../../PageModels/Admin/AddSchedulePage');
let RegisterPage = require('../../PageModels/RegisterPage');
let Utils = require('../../utils/cleanup');

describe('Add Cinema by Admin', () => {

    let adminEmail = 'testqa145@admin.com';
    let adminPassword = '@dmin';
    let adminFirstName = 'Jaja';
    let adminMiddleName = 'M';
    let adminLastName = 'Gamilla';
    let adminBday = '1994-11-01';

    let uniqueNum = Math.floor(Math.random() * 1000);
    let cinema1 = `Cinema ${uniqueNum + 1}`;
    let cinema2 = `Cinema ${uniqueNum + 2}`;

    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.adminPage = new AdminPage();
        this.adminBranchPage = new AdminBranchPage();
        this.editCinemaPage = new EditCinemaPage();
        this.addCinemaPage = new AddCinemaPage();
        this.registerPage = new RegisterPage();
        this.editBranchPage = new EditBranchPage();
        this.adminSchedulePage = new AdminSchedulePage();
        this.addSchedulePage = new AddSchedulePage();

        this.cleanUp = new Utils();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(adminEmail, adminPassword, adminFirstName, adminMiddleName, adminLastName, adminBday);
        await this.registerPage.clickRegisterButton();
        await this.loginPage.inputLoginCredentials(adminEmail, adminPassword);
        await this.loginPage.clickLoginButton();
    });

    test('Add Cinemas', async () => {
        
        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();

        await this.loginPage.isPageLoaded();        
        await this.loginPage.inputLoginCredentials(adminEmail, adminPassword);  
        await this.loginPage.clickLoginButton();
        
        await this.homePage.isPageLoaded();
        await this.homePage.clickAdminTab();
        
        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModule('Branch');
        
        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.ClickRandomBranch();

        await this.editBranchPage.isPageLoaded();
        await this.editBranchPage.clickAddButton();

        await this.addCinemaPage.isPageLoaded();
        await this.addCinemaPage.inputCinemaName(cinema1);

        await this.editBranchPage.isPageLoaded();
        await this.editBranchPage.clickAddButton();

        await this.addCinemaPage.isPageLoaded();
        await this.addCinemaPage.inputCinemaName(cinema2);

        await this.editBranchPage.isPageLoaded();
        await this.editBranchPage.isPageLoaded();
        expect(await this.editBranchPage.verifyCinema()).toContain(cinema1);
        expect(await this.editBranchPage.verifyCinema()).toContain(cinema2);

        await this.editBranchPage.clickViewSchedules();

        await this.adminSchedulePage.isPageLoaded();
        await this.adminSchedulePage.AddMovieSchedule();

        await this.addSchedulePage.isPageLoaded();
        await this.addSchedulePage.isPageLoaded();
        expect(await this.addSchedulePage.getCinemaNames()).toContain(cinema1);
        expect(await this.addSchedulePage.getCinemaNames()).toContain(cinema2);
    });
    
    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
        await this.cleanUp.deleteUser(adminEmail);
        await this.cleanUp.deleteCinema(cinema1);
        await this.cleanUp.deleteCinema(cinema2);
     });
});