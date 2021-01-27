const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

let selectBranch = By.css('#mat-select-4');
let selectCinema = By.css('#mat-select-5');
let chooseADate = By.css('#mat-select-6');
let selectTime = By.css('#mat-select-7');
let selectFromDropdown = By.css('span[class=mat-option-text]');
let selectSeatPlan = By.css('.seat-plan .seat.ng-star-inserted > span');
let confirmReservationButton = By.css('button[type="submit"]');
let ticketSummary = By.css('app-reservation-summary div div');
let proceedPaymentButton = By.css('button[class="btn btn-success m-2"]');
let reservationDetails = By.css('.col-md-12.reservation-details');

class TicketRegistrationPage extends BasePage {

    selectBranchFromDropdown = async (branch) => {
        this.clickElement(selectBranch);
        const selectBranchList = this.driver.findElements(selectFromDropdown);
        for (let i = 0; i < selectBranchList.length; i++) {
            if (await selectBranchList[i].getText() === branch) {
                await selectBranchList[i].click();
            }
        }
    }
    selectCinemaFromDropdown = async (cinema) => {
        this.clickElement(selectCinema);
        const selectCinemaList = this.driver.findElements(selectFromDropdown);
        for (let i = 0; i < selectCinemaList.length; i++) {
            if (await selectCinemaList[i].getText() === cinema) {
                await selectCinemaList[i].click();
            }
        }
    }
    chooseADateFromDropdown = async (date) => {
        this.clickElement(chooseADate);
        const chooseADateFromList = this.driver.findElements(selectFromDropdown);
        for (let i = 0; i < chooseADateFromList.length; i++) {
            if (await chooseADateFromList[i].getText() === date) {
                await chooseADateFromList[i].click();
            }
        }
    }
    selectTimeFromDropdown = async (time) => {
        this.clickElement(selectTime);
        const selectTimeList = this.driver.findElements(selectFromDropdown);
        for (let i = 0; i < selectTimeList.length; i++) {
            if (await selectTimeList[i].getText() === time) {
                await selectTimeList[i].click();
            }
        }
    }

    selectSeat = (seats) => {
        const seatPlanList = this.driver.findElements(selectSeatPlan);
        for (let i = 0; i < seats; i++) {
            for (let j = 0; j < seatPlanList.length; j++) {
                if (!seatPlanList[j].getAttribute('class').includes('taken')) {
                    seatPlanList[j].click();
                }
            }
        }
    }
    clickConfirmReservation = () => {
        this.clickElement(confirmReservationButton);
    }
    verifyTicketReservationSummary = (reservation) => {
        const ticketReservationSummary = this.getText(ticketSummary);
        if (ticketReservationSummary.includes(reservation)) {
            return true;
        }   
    }
    clickProceedToPayment = () => {
        this.clickElement(proceedPaymentButton);
    }
    isPageLoaded = async () => {
        return await this.verifyPageLoad(reservationDetails);
    }
}

module.exports = TicketRegistrationPage;