let LandingPage = require('../../PageModels/LandingPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');
let AdminPage = require('../../PageModels/Admin/AdminPage');
let AdminBranchPage = require('../../PageModels/Admin/AdminBranchPage');
let EditCinemaPage = require('../../PageModels/Admin/EditCinemaPage');
let AddCinemaPage = require('../../PageModels/Admin/AddCinemaPage');
let EditBranchPage = require('../../PageModels/Admin/EditBranchPage');
let AdminSchedulePage = require('../../PageModels/Admin/AdminSchedulePage');
let AddSchedulePage = require('../../PageModels/Admin/AddSchedulePage');

describe('Add Cinema by Admin', () => {

    let email = 'DoNotUse_AdminAccount@admin.com';
    let validPassword =  'password123';
    const cinemaNumber = Math.floor(Math.random() * 100);
    const cinemaName = 'Cinema ' + cinemaNumber;


    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.adminPage = new AdminPage();
        this.adminBranchPage = new AdminBranchPage();
        this.editCinemaPage = new EditCinemaPage();
        this.addCinemaPage = new AddCinemaPage();
        this.editBranchPage = new EditBranchPage();
        this.adminSchedulePage = new AdminSchedulePage();
        this.addSchedulePage = new AddSchedulePage();

        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
    });

    test('Add Movie Schedule', async () => {

        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();

        await this.loginPage.isPageLoaded();        
        await this.loginPage.inputLoginCredentials(email, validPassword);  
        await this.loginPage.clickLoginButton();

        // Navigate to admin tab
        await this.homePage.isPageLoaded();
        await this.homePage.clickAdminTab();

        // Select branch on the dropdown
        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModule('Branch');

        // Click random branch
        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.itemPerPage('18');
        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.ClickRandomBranch();

        // Get cinemas count
        await this.editBranchPage.isPageLoaded();
        let cinemasCount = await this.editBranchPage.getCinemasCount();

        // Create until there are 3 cinemas on the selected branch
        while (cinemasCount < 3) {
            
            await this.editCinemaPage.isPageLoaded();
            await this.editCinemaPage.clickAddButton();

            await this.addCinemaPage.isPageLoaded();
            await this.addCinemaPage.inputCinemaName(cinemaName);

            cinemasCount = await this.editBranchPage.getCinemasCount();
        }

        // Add movie schedule
        await this.editBranchPage.clickViewSchedules();
        await this.adminSchedulePage.isPageLoaded();
        await this.adminSchedulePage.AddMovieSchedule();

        // Select cinema on the dropdown
        let selectedCinema = await this.addSchedulePage.selectCinemaName(cinemaName);
        
        // Select random movie on the dropdown
        let movieName = await this.addSchedulePage.selectRandomMovieName();
        
        // fill the schedule information and click to add the movie shedule
        await this.addSchedulePage.enterStartDate('2020-11-08');
        await this.addSchedulePage.enterTime('01', '30')
        await this.addSchedulePage.enterTicketPrice('100')
        await this.addSchedulePage.clickAddButton();

        // Filter the cinema's schedule
        await this.adminSchedulePage.isPageLoaded();

        await this.adminSchedulePage.itemPerPage('18');
        let filterCinema = await this.adminSchedulePage.viewSpecificCinema(selectedCinema);


        expect(await this.adminSchedulePage.verifyIsMovieAdded(movieName.trim())).toBe(true)
        expect(await this.adminSchedulePage.getCurrentUrl()).toContain('/schedule');
    });

    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
     });
});