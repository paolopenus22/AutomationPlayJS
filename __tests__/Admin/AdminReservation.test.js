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
let Dates = require('../../utils/dates');
let faker = require('faker');



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
    let noOfSeats = 10;
    let reservedSeats;

    let addDays;
    let movie = 'Spider-Man: Homecoming';
    let tartgetTime = '11:00';
    let [hr,min] = tartgetTime.split(':');
    let price = '350';

    let cardHolderName = 'Raffy Solayao';
    let creditCardNum = '1111 1111 1111 1111';
    let cvv ='111';
    let expiryDate = '1025';


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
        this.dates = new Dates();
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

        addDays = await this.addSchedulePage.addDays(3);
        await this.addSchedulePage.addSchedule(cinema, movie, addDays, hr, min, price);
        await this.addSchedulePage.clickAddButton();
        await this.adminSchedulePage.isPageLoaded();

         // 9. Go to branch and check schedule
        await this.homePage.clickBranchesTab();
        await this.branchesPage.isPageLoaded();
        await this.branchesPage.CheckScheduleOfBranchName(branchName);
   
        await this.moviesPage.isPageLoaded();
        await this.moviesPage.getTicketOfMovie(movie);

        
        let formattedTime = this.dates.formatTime(tartgetTime)
        // 10. Book reservation
        await this.ticketReservationPage.isPageLoaded();
        await this.ticketReservationPage.selectBranchFromDropdown(branchName);
        await this.ticketReservationPage.selectCinemaFromDropdown(cinema);
        await this.ticketReservationPage.chooseADateFromDropdown(addDays);
        await this.ticketReservationPage.selectTimeFromDropdown(formattedTime);
        reservedSeats = await this.ticketReservationPage.selectSeat(noOfSeats);
        let seatString = reservedSeats.join(", ");

        await this.ticketReservationPage.clickConfirmReservation();
        
        // 11. Verify the ff details from reservation should be displayed 
        // a. Ticket Summary dialog box with Ticket Summary text is displayed 
        // b. Branch name  
        // c. Cinema name  
        // d. Movie name  
        // e. Date  
        // f. Time  
        // g. Price 
        // h. Seats selected    
        let formattedDate = await this.dates.formatTicketSummaryDate(addDays);
        expect(await this.ticketReservationPage.checkTicketSummaryDetails(branchName, cinema, movie, formattedDate, formattedTime, seatString, noOfSeats, price)).toEqual(true);
        
        // 12. Proceed to payment
        await this.ticketReservationPage.clickProceedToPayment();

        // 13. Input Cardholder name, credit card no., cvv and expiry
        await this.paymentSummaryPage.inputPaymentDetails(cardHolderName, creditCardNum, cvv, expiryDate);

        // 14. Verify payment summary details are correct base from the previous inputs (description and total amount) 
        await this.paymentSummaryPage.getDescriptionText();
        let formattedPaymentSummaryDate = await this.paymentSummaryPage.formatPaymentSummaryDate(addDays)
        expect(await this.paymentSummaryPage.desc).toContain(
            `${movie} | ${branchName} | ${cinema} | ${formattedPaymentSummaryDate} ${formattedTime} | ${seatString}`
         );

        expect(await this.paymentSummaryPage.verifyTickeTotalAmount(price, reservedSeats)).toBe(true);

        // 15. Proceed to Payment
        await this.paymentSummaryPage.clickProceedButton();

        await this.paymentSummaryPage.getProcessingMessage();
        
        expect(await this.paymentSummaryPage.message).toContain(
            "Communicating with your bank. Wait for the process to complete.Do not refresh this page."
            );

        // 16. Verify the ff details from reservation should be displayed 
        // a. Confirmed Reservation dialog box with text "Your receipt has been sent to your email." 
        // b. Branch name  
        // c. Cinema name  
        // d. Movie title 
        // e. Date  
        // f. Time  
        // g. Price 
        // h. Seats selected 
        // i. # of seats 
        // j. Total

        await this.paymentSummaryPage.getConfirmedReservationDialogEmail();

        expect(await this.paymentSummaryPage.confirmedReservationDialogEmail).toContain(
            "Your receipt has been sent to your email."
            );

        expect(await this.paymentSummaryPage.verifyConfirmedReservationDetails(branchName, cinema, movie, formattedDate, formattedTime, seatString, noOfSeats, price)).toEqual(true);

        // 17. Close the Confirmed Reservation modal
        await this.paymentSummaryPage.clickCloseButton();

        // 18. Verify the admin user should navigated to Movies tab
        expect(await this.moviesPage.getCurrentUrl()).toContain('/movies')

        // 19. Click LogOut Button
        await this.homePage.clickLogoutButton()

    });

    afterAll(async () => {
        // await this.landingPage.closeMoviesApp();
        await this.cleanUp.deleteUser(adminEmail);
        await this.cleanUp.deleteCinema(cinema);
    });
});