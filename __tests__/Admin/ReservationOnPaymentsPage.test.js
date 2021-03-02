let LandingPage = require('../../PageModels/LandingPage');
let RegisterPage = require('../../PageModels/RegisterPage');
let LoginPage = require('../../PageModels/LoginPage');
let HomePage = require('../../PageModels/HomePage');
let AdminPage = require('../../PageModels/Admin/AdminPage');
let AdminBranchPage = require('../../PageModels/Admin/AdminBranchPage');
let EditBranchPage = require('../../PageModels/Admin/EditBranchPage');
let AddCinemaPage = require('../../PageModels/Admin/AddCinemaPage');
let EditCinemaPage = require('../../PageModels/Admin/EditCinemaPage');
let AdminSchedulePage = require('../../PageModels/Admin/AdminSchedulePage');
let AddSchedulePage = require('../../PageModels/Admin/AddSchedulePage');
let MoviesPage = require('../../PageModels/MoviesPage');
let BranchesPage = require('../../PageModels/BranchesPage');
let TicketReservationPage = require('../../PageModels/TicketReservationPage');
let PaymentSummaryPage = require('../../PageModels/PaymentSummaryPage');
let AdminPaymentPage = require('../../PageModels/Admin/AdminPaymentPage');
let AdminPaymentDetailPage = require('../../PageModels/Admin/AdminPaymentDetailPage');
let Utils = require('../../utils/cleanup');
let faker = require('faker');
const { TouchSequence } = require('selenium-webdriver');
const { start } = require('chromedriver');


describe('Verify reservations on Payment Page', () => {
    let adminFirstName = faker.name.firstName();
    let adminMiddleName = faker.name.lastName();
    let adminLastName = faker.name.lastName();
    let adminEmail = adminFirstName + adminLastName + '@admin.com';
    let adminPassword = faker.internet.password();
    let adminBday = faker.date.past(40).toISOString();

    let uniqueNum = Math.floor(Math.random() * 1000);
    let cinema = `Cinema 00${uniqueNum + 1}`;
    let row = 10;
    let column = 10;

    let movie = 'Spider-Man: Homecoming';
    let startDate = new Date();
    startDate.setDate(startDate.getDate() + 5);
    startDate = startDate.toISOString().slice(0, 10);
    let hr = 11;
    let min = 30; 
    let price = 200;
    let noOfSeats = 2;
    
    let cardHolderName = 'John Cruz';
    let creditCardNum = '1111 1111 1111 1111';
    let cvv ='111';
    let expiryDate = '1025';
    let dateToday = new Date();
    dateToday = dateToday.toString().slice(0, 10);

    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.registerPage = new RegisterPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.adminPage = new AdminPage();   
        this.adminBranchPage = new AdminBranchPage();
        this.editBranchPage = new EditBranchPage();
        this.addCinemaPage = new AddCinemaPage();
        this.editCinemaPage = new EditCinemaPage();
        this.adminSchedulePage = new AdminSchedulePage();
        this.addSchedulePage = new AddSchedulePage();
        this.branchesPage = new BranchesPage();
        this.moviesPage = new MoviesPage();
        this.ticketReservationPage = new TicketReservationPage();
        this.paymentSummaryPage = new PaymentSummaryPage();
        this.adminPaymentPage = new AdminPaymentPage();
        this.adminPaymentDetailPage = new AdminPaymentDetailPage();

        this.cleanUp = new Utils();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(adminEmail, adminPassword, adminFirstName, adminMiddleName, adminLastName, adminBday);
        await this.registerPage.clickRegisterButton();
        await this.landingPage.isPageLoaded();

        // 1. Login as admin
        await this.loginPage.inputLoginCredentials(adminEmail, adminPassword);
        await this.loginPage.clickLoginButton();
    });    

    test('Verify reservations', async () => {
        // 2. Click Admin Menu
        await this.homePage.isPageLoaded();
        await this.homePage.clickAdminTab();        

        // 3. Select branch from dropdown (Maintain Module)
        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModule('Branch');

        // 4. click random branch
        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.ClickRandomBranchLink();

        // ** Get branch name and address
        await this.editBranchPage.isPageLoaded();
        let branchName = await this.editBranchPage.getBranchName(); 

        // 6. Add Cinema to the branch
        await this.editBranchPage.clickAddCinema();
        await this.addCinemaPage.isPageLoaded();
        await this.addCinemaPage.inputCinemaName(cinema);
        
        // 7. Set the seat plan
        await this.editBranchPage.isPageLoaded();
        await this.editBranchPage.clickCinemaLink(cinema);  
        await this.editCinemaPage.isPageLoaded();
        await this.editCinemaPage.enterRows(row);
        await this.editCinemaPage.enterColumns(column);
        await this.editCinemaPage.clickUpdateButton();
        
        // 8. Add movie schedule to branch
        await this.editBranchPage.isPageLoaded();
        await this.editBranchPage.clickBackToList();

        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.CheckScheduleOfBranchName(branchName);

        await this.adminSchedulePage.isPageLoaded();
        await this.adminSchedulePage.AddMovieSchedule();

        await this.addSchedulePage.isPageLoaded();
        await this.addSchedulePage.selectCinemaName(cinema);
        await this.addSchedulePage.addSchedule(cinema, movie, startDate, hr, min, price);
        await this.addSchedulePage.clickAddButton();
        await this.adminSchedulePage.isPageLoaded();

        // 9. Go to branch and check schedule
        await this.homePage.clickBranchesTab();
        await this.branchesPage.isPageLoaded();
        await this.branchesPage.CheckScheduleOfBranchName(branchName);
        
        await this.moviesPage.isPageLoaded();
        await this.moviesPage.getTicketOfMovie(movie);

        // 10. Book reservation
        await this.ticketReservationPage.isPageLoaded();
        await this.ticketReservationPage.selectBranchFromDropdown(branchName);
        await this.ticketReservationPage.selectCinemaFromDropdown(cinema);
        await this.ticketReservationPage.chooseADateFromDropdown(startDate);
        await this.ticketReservationPage.selectTimeFromDropdown(`${hr}:${min} am`);
        await this.ticketReservationPage.selectSeat(noOfSeats);
        await this.ticketReservationPage.clickConfirmReservation();
        await this.ticketReservationPage.clickProceedToPayment();
        
        // 11. Proceed payment
        await this.paymentSummaryPage.isPageLoaded();
        await this.paymentSummaryPage.inputPaymentDetails(cardHolderName, creditCardNum, cvv, expiryDate);
        let desc = await this.paymentSummaryPage.getDescription();
        let totalAmount = noOfSeats * price;

        await this.paymentSummaryPage.clickProceedButton();
        await this.paymentSummaryPage.waitForCloseConfirmedReservationDialogBox(); 
        await this.paymentSummaryPage.clickCloseButton();

        // 12. Go to Admin Tab -> Payment
        await this.moviesPage.isPageLoaded();
        await this.homePage.clickAdminTab();
        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModule('Payment');

        await this.adminPaymentPage.isPageLoaded();
        await this.adminPaymentPage.EnterTransactionDate(dateToday);
        await this.adminPaymentPage.ClickTransactionDateByDescription(desc);

        // 13. Click the date and time link of the date
        await this.adminPaymentDetailPage.isPageLoaded();
        let user = await this.adminPaymentDetailPage.getPaymentDetailUser();
        let paymentDesc = await this.adminPaymentDetailPage.getPaymentDetailDescription();
        let cardHolder = await this.adminPaymentDetailPage.getPaymentDetailCardHolderName();
        let amount = await this.adminPaymentDetailPage.getPaymentDetailAmount();

        // 14. Verify the reservation details displayed are correct based from previous inputs (user, description, cardholder name and amount) should be displayed.
        expect(user).toBe(adminEmail);
        expect(desc).toBe(paymentDesc);
        expect(cardHolderName).toBe(cardHolder);
        expect(totalAmount.toString()).toBe(amount);
        
    });

    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
        await this.cleanUp.deleteUser(adminEmail);
        await this.cleanUp.deleteCinema(cinema);
    });
});