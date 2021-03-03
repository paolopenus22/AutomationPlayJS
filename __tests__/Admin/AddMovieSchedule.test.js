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
let RegisterPage = require('../../PageModels/RegisterPage');
let MoviesPage = require('../../PageModels/MoviesPage')
let Utils = require('../../utils/cleanup');
let faker = require('faker');
const { random } = require('faker');
const { Driver } = require('selenium-webdriver/chrome');

describe('Add Cinema by Admin', () => {

    let adminFirstName = faker.name.firstName();
    let adminMiddleName = faker.name.lastName();
    let adminLastName = faker.name.lastName();
    let adminEmail = adminFirstName + adminLastName + '@admin.com';
    let adminPassword = faker.internet.password();
    let adminBday = faker.date.past(40).toISOString();

    let cinemaNumber = Math.floor(Math.random() * 1000);
    let cinemaName = `Cinema ${cinemaNumber + 1}`;
    let movies = ['Captain America: Civil War','Spider-Man: Homecoming','The Avengers'];


    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.loginPage = new LoginPage();
        this.registerPage = new RegisterPage();
        this.homePage = new HomePage();
        this.adminPage = new AdminPage();
        this.adminBranchPage = new AdminBranchPage();
        this.editCinemaPage = new EditCinemaPage();
        this.addCinemaPage = new AddCinemaPage();
        this.editBranchPage = new EditBranchPage();
        this.adminSchedulePage = new AdminSchedulePage();
        this.addSchedulePage = new AddSchedulePage();
        this.moviesPage = new MoviesPage();
        this.cleanUp = new Utils();

        jest.setTimeout(4000000);
        await this.landingPage.navigateToMoviesApp();
        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(adminEmail, adminPassword, adminFirstName, adminMiddleName, adminLastName, adminBday);
        await this.registerPage.clickRegisterButton();
        await this.landingPage.isPageLoaded();
        await this.loginPage.inputLoginCredentials(adminEmail, adminPassword);
        await this.loginPage.clickLoginButton();
    });

    test('Add Movie Schedule', async () => {

        let listOfCinemas;
        let listOfMovies;
        let addDays;
        let hours = 0;
        let minutes = 0;

        let selectedMovieTitles= [];

        // Navigate to admin tab
        await this.homePage.isPageLoaded();
        await this.homePage.clickAdminTab();

        // Select branch on the dropdown
        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModuleBranch();

        // Click random branch
        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.ClickRandomBranch();

        // Get cinemas count
        await this.editBranchPage.isPageLoaded();
        let cinemasCount = await this.editBranchPage.getCinemasCount();
        
        // Create until there are atleast 3 cinemas on the selected branch
        while (cinemasCount < 3) {
            
            await this.editBranchPage.isPageLoaded();
            await this.editBranchPage.clickAddButton();

            await this.addCinemaPage.isPageLoaded();
            await this.addCinemaPage.inputCinemaName(cinemaName);
            cinemasCount = await this.editBranchPage.getCinemasCount();
            cinemaNumber++;
        }

        listOfCinemas = await this.editBranchPage.getCinemaList();
    
        await this.editBranchPage.clickViewSchedules()

       //CINEMA 1 SCHEDULES
        for(let i = 1; i < 4; i++) {
            for(let j = 1; j < 4; j++) {  
                await this.adminSchedulePage.AddMovieSchedule();
               //listOfMovies = await this.addSchedulePage.getMovieList();
                hours+=2;

                addDays = await this.addSchedulePage.addDays(3);
                let input = await this.addSchedulePage.addSchedule(listOfCinemas[0], movies[0], addDays, hours + 2, minutes + 30, 250);
                selectedMovieTitles.push(input);
                await this.addSchedulePage.clickAddButton();
            }
        }
        //CINEMA 2 SCHEDULES
        for(let i = 1; i < 4; i++) {
            for(let j = 1; j < 4; j++) {
                await this.adminSchedulePage.AddMovieSchedule();
                hours+=2;
            
                addDays = await this.addSchedulePage.addDays(4);
                let input = await this.addSchedulePage.addSchedule(listOfCinemas[1], movies[1], addDays, hours + 2, minutes + 30, 250)
                selectedMovieTitles.push(input);
                await this.addSchedulePage.clickAddButton();
            }
        }
        //CINEMA 3 SCHEDULES
        for(let i = 1; i < 4; i++) {
            for(let j = 1; j < 4; j++) {
                await this.adminSchedulePage.AddMovieSchedule();
                hours+=2;

                addDays = await this.addSchedulePage.addDays(5);
                let input = await this.addSchedulePage.addSchedule(listOfCinemas[2], movies[2], addDays, hours + 2, minutes + 30, 250)
                selectedMovieTitles.push(input);
                await this.addSchedulePage.clickAddButton();
            }
        }
        for (let i = 0; i < 3; i++) {
            await this.adminSchedulePage.viewSpecificCinema(listOfCinemas[i]);
            await this.adminSchedulePage.itemPerPage();
            await this.adminSchedulePage.isPageLoaded();
            expect(await this.adminSchedulePage.verifyAddedMovieSchedule()).toContain(movies[i]);
        }

        expect(await this.adminSchedulePage.getCurrentUrl()).toContain('/schedule');
        await this.homePage.clickMoviesTab();
        expect(await this.moviesPage.getListOfMovieTitles()).toEqual(selectedMovieTitles);
     ;
    });

    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
        await this.cleanup.deleteUser(adminEmail);
        await this.cleanup.deleteCinema(cinemaName)
     });
});