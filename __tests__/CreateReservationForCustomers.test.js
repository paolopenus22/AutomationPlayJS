const LandingPage = require('../PageModels/LandingPage');
const RegisterPage = require('../PageModels/RegisterPage');
const LoginPage = require('../PageModels/LoginPage');
const AdminPage = require('../PageModels/Admin/AdminPage');
const AdminBranchPage = require('../PageModels/Admin/AdminBranchPage');
const EditBranchPage = require('../PageModels/Admin/EditBranchPage');
const AddCinemaPage = require('../PageModels/Admin/AddCinemaPage');
const EditCinemaPage = require('../PageModels/Admin/EditCinemaPage');
const AddSchedulePage = require('../PageModels/Admin/AddSchedulePage');
const AdminSchedulePage = require('../PageModels/Admin/AdminSchedulePage');
const BranchesPage = require('../PageModels/BranchesPage');
const HomePage = require('../PageModels/HomePage');
const MoviesPage = require('../PageModels/MoviesPage');
const TicketReservationPage = require('../PageModels/TicketReservationPage')
const PaymentSummaryPage = require('../PageModels/PaymentSummaryPage');
const Utils = require('../utils/cleanup');
const Dates = require('../utils/dates');
let faker = require('faker');
const { start } = require('chromedriver');

describe('Create a reservation as customer', () => {
    let adminFirstName = faker.name.firstName();
    let adminMiddleName = faker.name.lastName();
    let adminLastName = faker.name.lastName();
    let adminEmail = `${adminFirstName}${adminLastName}@admin.com`;
    let adminPassword = faker.internet.password();
    let adminBday = faker.date.past(40).toISOString();

    // Customer 1
    let customer1firstName = faker.name.firstName();
    let customer1middleName = faker.name.lastName();
    let customer1lastName = faker.name.lastName();
    let customer1userEmail = `${customer1firstName}${customer1lastName}@test.com`;
    let customer1userPassword = faker.internet.password();
    let customer1birthDay = faker.date.past(40).toISOString();
    let customer1seat = '9';

    // Customer 2
    // let customer2firstName = faker.name.firstName();
    // let customer2middleName = faker.name.middleName();
    // let customer2lastName = faker.name.lastName();
    // let customer2userEmail = `${customer2firstName}${customer2lastName}@test.com`;
    // let customer2userPassword = faker.internet.password();
    // let customer2birthDay = faker.date.past(40).toISOString();
    // let customer1seat = '8';

    let uniqueNum = Math.floor(Math.random() * 1000);
    let cinema = `Cinema ${uniqueNum + 1}`;
    let row = 10;
    let column = 20;

    let title = 'Captain America: Civil War';
    let branch = 'Circuit Makati';

    let startDate = new Date();
    startDate.setDate(startDate.getDate() + 5);
    startDate = startDate.toISOString().slice(0, 10);
    let hr = 10;
    let min = 30;
    let price = 250;
    let movieTime = `${hr}:${min} am`;
    
    let customer1cardHolderName = `${customer1firstName} ${customer1lastName}`;
    let customer2cardHolderName = `${customer1firstName} ${customer1lastName}`;    
    let creditCardNum = '1234567890123456';
    let cvv = '123';
    let expiryDate = '10/30';
    
    beforeEach(async () => {
        this.adminPage = new AdminPage();
        this.adminBranchPage = new AdminBranchPage();
        this.editBranchPage = new EditBranchPage();
        this.addCinemaPage = new AddCinemaPage();
        this.editCinemaPage = new EditCinemaPage();
        this.addSchedulePage = new AddSchedulePage();
        this.adminSchedulePage = new AdminSchedulePage();
        this.landingPage = new LandingPage();
        this.registerPage = new RegisterPage();
        this.loginPage = new LoginPage();
        this.branchesPage = new BranchesPage();
        this.homePage = new HomePage();
        this.moviesPage = new MoviesPage();
        this.ticketReservationPage = new TicketReservationPage();
        this.paymentSummaryPage = new PaymentSummaryPage();
        this.cleanUp = new Utils();
        this.dates = new Dates();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(adminEmail, adminPassword, adminFirstName, adminMiddleName, adminLastName, adminBday);
        await this.registerPage.clickRegisterButton();
        await this.landingPage.isPageLoaded();

        await this.loginPage.inputLoginCredentials(adminEmail, adminPassword);
        await this.loginPage.clickLoginButton();

        await this.homePage.isPageLoaded();
        await this.homePage.clickAdminTab(); 

        await this.adminPage.isPageLoaded();
        await this.adminPage.selectMaintainModule('Branch');

        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.ClickRandomBranchLink();

        await this.editBranchPage.clickAddCinema();
        await this.addCinemaPage.isPageLoaded();
        await this.addCinemaPage.inputCinemaName(cinema);

        await this.editBranchPage.isPageLoaded();
        await this.editBranchPage.clickCinemaLink(cinema);  
        await this.editCinemaPage.isPageLoaded();
        await this.editCinemaPage.enterRows(row);
        await this.editCinemaPage.enterColumns(column);
        await this.editCinemaPage.clickUpdateButton();

        await this.editBranchPage.isPageLoaded();
        await this.editBranchPage.clickBackToList();

        await this.adminBranchPage.isPageLoaded();
        await this.adminBranchPage.CheckScheduleOfBranchName(branch);

        await this.adminSchedulePage.isPageLoaded();
        await this.adminSchedulePage.AddMovieSchedule();

        await this.addSchedulePage.isPageLoaded();
        await this.addSchedulePage.selectCinemaName(cinema);
        await this.addSchedulePage.addSchedule(cinema, title, startDate, hr, min, price);
        await this.addSchedulePage.clickAddButton();
        await this.adminSchedulePage.isPageLoaded();
        await this.homePage.clickLogoutButton();
    });

    test('Login as Customer 1', async() => {
        await this.loginPage.isPageLoaded();
        await this.landingPage.clickRegisterButton();

        await this.registerPage.inputUserDetails(customer1userEmail, customer1userPassword, customer1firstName, customer1middleName, customer1lastName, customer1birthDay);
        await this.registerPage.clickRegisterButton();

        // 1. Login as Customer 1 (use existing customer)
        await this.loginPage.inputLoginCredentials(customer1userEmail, customer1userPassword);
        await this.loginPage.clickLoginButton();

        // 2. Click 'Get Ticket' for the movie
        await this.moviesPage.isPageLoaded();
        await this.moviesPage.getTicketOfMovie(title);

        // 3. Select the Branch, Cinema and the Date/Time from the schedule created for the movie.
        await this.ticketReservationPage.isPageLoaded();
        await this.ticketReservationPage.selectBranchFromDropdown(branch);
        await this.ticketReservationPage.selectCinemaFromDropdown(cinema);
        await this.ticketReservationPage.chooseADateFromDropdown(startDate);
        await this.ticketReservationPage.selectTimeFromDropdown(movieTime);

        // 4. Reserve 9 seats and confirm the reservation
        let reservedSeats = await this.ticketReservationPage.selectSeat(customer1seat);
        let seatList = reservedSeats.join(', ');
        await this.ticketReservationPage.clickConfirmReservation();

        // 5. Verify Ticket Summary (Branch, Cinema, Movie Title, Screen Date, Screen Time, Prince, Total, Selected Seats, No. of Seats)
        await this.ticketReservationPage.verifyTicketReservationSummary(title);
        let formattedDate = await this.dates.formatTicketSummaryDate(startDate);
        expect(await this.ticketReservationPage.checkTicketSummaryDetails(branch, cinema, title, formattedDate, movieTime, seatList, customer1seat, price)).toEqual(true);

        // 6. Click Proceed to payment and input Cardholder Name, Credit Card No., CVV and Expiry Date.
        await this.ticketReservationPage.clickProceedToPayment();
        await this.paymentSummaryPage.isPageLoaded();
        await this.paymentSummaryPage.inputPaymentDetails(customer1cardHolderName, creditCardNum, cvv, expiryDate);
        await this.paymentSummaryPage.clickProceedButton();
        
        // 7. Verify Payment Summary (Description and Total Amount)
        await this.paymentSummaryPage.getDescriptionText();
        let formattedPaymentSummaryDate = await this.paymentSummaryPage.formatPaymentSummaryDate(startDate)
        expect(await this.paymentSummaryPage.desc).toContain(`${title} | ${branch} | ${cinema} | ${formattedPaymentSummaryDate} ${movieTime} | ${seatList}`);

         // 8. Proceed to Payment
        await this.paymentSummaryPage.clickProceedButton();
        await this.paymentSummaryPage.getProcessingMessage();
        expect(await this.paymentSummaryPage.message).toContain("Communicating with your bank. Wait for the process to complete.Do not refresh this page.");
         
        // 9. Verify if the ff. details are displayed (Dialog Box: "Your receipt has been sent to your email.", Branch Name, Cinema Name, Movie Title, Date, Time, Prince, Seats selected, No. of Seats and Total)
         await this.paymentSummaryPage.getConfirmedReservationDialogEmail();
         expect(await this.paymentSummaryPage.confirmedReservationDialogEmail).toContain("Your receipt has been sent to your email.");
         expect(await this.paymentSummaryPage.verifyConfirmedReservationDetails(branch, cinema, title, formattedDate, movieTime, seatList, customer1seat, price)).toEqual(true);
 
         // 10. Close the Confirmed Reservation modal
        await this.paymentSummaryPage.clickCloseButton();
         
        // 11. Log Out 
         await this.homePage.clickLogoutButton();

        // 12. Login as Customer 2 (use existing customer)
        
        await this.loginPage.inputLoginCredentials(customer2userEmail, customer2userPassword);
        await this.loginPage.clickLoginButton();
    });

    afterAll(async () => {
        await this.landingPage.closeMoviesApp();
        await this.cleanUp.deleteUser(adminEmail);
        await this.cleanUp.deleteUser(customer1userEmail);
        // await this.cleanUp.deleteUser(customer2userEmail);
        await this.cleanUp.deleteUser(cinema);
    });
})
