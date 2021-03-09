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

describe('Add Branches by Admin', () => {
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

    let cinema = [
        "Cinema 262",
        "Cinema 735",
        "Cinema 869",
        "Cinema 976"                
        ];

    beforeEach(async () => {
        this.cleanUp = new Utils();
    });

    test('Add new branch', async () => {      
    });

    afterAll(async () => {
        for(let i = 0; i < cinema.length; i++){
            await this.cleanUp.deleteCinema(cinema[i]);
        }
     });
});