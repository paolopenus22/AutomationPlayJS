let LandingPage = require('../../PageModels/LandingPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');
let AdminPage = require('../../PageModels/Admin/AdminPage');
let AdminBranchPage = require('../../PageModels/Admin/AdminBranchPage');
let EditBranchPage = require('../../PageModels/Admin/EditBranchPage');
let AddCinemaPage = require('../../PageModels/Admin/AddCinemaPage');
let EditCinemaPage = require('../../PageModels/Admin/EditCinemaPage');
let Utils = require('../../utils/cleanup');
let faker = require('faker');

describe('Manage Cinema Seat Plan', () => {
    let adminEmail = 'admin@admin.com';
    let adminPassword = 'password';
    let uniqueNum = Math.floor(Math.random() * 1000);
    let cinema = `Cinema ${uniqueNum + 1}`;

    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.adminPage = new AdminPage();
        this.adminBranchPage = new AdminBranchPage();
        this.editBranchPage = new EditBranchPage();
        this.addCinemaPage = new AddCinemaPage();
        this.editCinemaPage = new EditCinemaPage();
        this.cleanUp = new Utils();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
    });

    test('Seat plan', async () => {
        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();

        // 1. Login as Admin User
        await this.loginPage.isPageLoaded();
        await this.loginPage.inputLoginCredentials(adminEmail, adminPassword);
        await this.loginPage.clickLoginButton();

        // 2. Click Admin Menu
        await this.homePage.isPageLoaded();
        await this.homePage.clickAdminTab();

        // 3. Select branch from dropdown (Maintain Module)
        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModuleBranch();

        // 4. Select Random Branch
        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.ClickRandomBranch();

        // 5. Verify if there is/are a cinema/s existing under Cinemas. If no cinema name is existing, click Add Cinema, fill out name, and click Add, else proceed to next step
        await this.editBranchPage.isPageLoaded();
        let cinemaCount = await this.editBranchPage.getCinemasCount();

        if(cinemaCount === 0) {
            await this.editBranchPage.clickAddButton();

            await this.addCinemaPage.isPageLoaded();
            await this.addCinemaPage.inputCinemaName(cinema);

            await this.editBranchPage.isPageLoaded();
            await this.editBranchPage.clickCinemaLink(cinema);
        }
        else {
            // 6. Select a random Cinema by clicking the link under Cinemas
            await this.editBranchPage.clickRandomCinemaLink();
        }

        // 7. Set rows and columns following below order, Enable / Disable seats accordingly(5 rows and 20 columns) 
        await this.editCinemaPage.isPageLoaded();
        await this.editCinemaPage.setTheSeat(5, 20);

        // 8. Click Update button
        let cinemaName = await this.editCinemaPage.getCinemaName();
        await this.editCinemaPage.clickUpdateButton();

        // 9. VERIFY if user is navigated back to branch page
        await this.editBranchPage.isPageLoaded();
        expect(await this.editBranchPage.isPageLoadedBack()).toBe(true);

        // 10. Click the updated cinema link
        await this.editBranchPage.clickCinemaLink(cinemaName);

        // 11. Verify the 1st added cinema seating arrangement should be same as created
        var seat = await this.editCinemaPage.getSeatClass();
        var index = 0;
        for(var i = 1; i <= 5; i++)
        {
            for(var j = 7; j >= i; j--)
            {
                expect(seat[index]).toBe('seat disabled');
                index++;
            }
            for(var k = 1; k <= 4+(i*2); k++)
            {
                expect(seat[index]).toBe('seat');
                index++;
            }
            for(var l = 7; l >= i; l--)
            {
                expect(seat[index]).toBe('seat disabled');
                index++;
            }
        }
        // 11 a. Verify the count of disabled seats
        expect(await this.editCinemaPage.GetTotalCountOfDisableSeat()).toBe(50);

        // 11 b. Verify each disabled seats text
        expect(await this.editCinemaPage.VerifyTextOfDisableSeat()).toBe('');

    });

    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
        await this.cleanUp.deleteCinema(cinema);
     });
});
