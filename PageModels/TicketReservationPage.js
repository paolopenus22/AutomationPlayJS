const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

let selectBranch = By.css('[formcontrolname="branchId"]');
let selectCinema = By.css('[formcontrolname="cinemaId"]');
let chooseADate = By.css('[formcontrolname="watchDate"]');
let selectTime = By.css('[formcontrolname="scheduleId"]');
let selectFromDropdown = By.css('[class="cdk-overlay-pane"] mat-option span');
let selectSeatPlan = By.css('.seat-plan .seat.ng-star-inserted > span');
let availableSeat =  By.css('.seat-plan [class="seat ng-star-inserted"] span');
let confirmReservationButton = By.css('button[type="submit"]');
let ticketSummary = By.css('app-reservation-summary div div');
let proceedPaymentButton = By.css('button[class="btn btn-success m-2"]');
let reservationDetails = By.css('.col-md-12.reservation-details');

class TicketRegistrationPage extends BasePage {

    selectBranchFromDropdown = async (branch) => {
        this.clickElement(selectBranch);
        await this.driver.wait(until.elementsLocated(selectFromDropdown), 50000);
        const selectBranchList = await this.driver.findElements(selectFromDropdown);
        for (let i = 0; i < selectBranchList.length; i++) {
            if (await selectBranchList[i].getText() === branch) {
                await selectBranchList[i].click();
                break;
            }
        }
        await this.driver.sleep(3000);
    }

    selectCinemaFromDropdown = async (cinema) => {
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(selectCinema)), 50000);
        
        this.clickElement(selectCinema);
               
        await this.driver.wait(until.elementsLocated(selectFromDropdown), 50000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(selectFromDropdown)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(selectFromDropdown)), 50000);
        let selectCinemaList = await this.driver.findElements(selectFromDropdown);

        for (let i = 0; i < await selectCinemaList.length; i++) {
            if (await selectCinemaList[i].getText() === cinema) {
                await selectCinemaList[i].click();
                break;
            }
        }

        await this.driver.sleep(5000);
    }

    chooseADateFromDropdown = async (date) => {
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(chooseADate)), 50000);

        this.clickElement(chooseADate);

        await this.driver.wait(until.elementsLocated(selectFromDropdown), 50000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(selectFromDropdown)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(selectFromDropdown)), 50000);
        await this.driver.wait(until.elementsLocated(selectFromDropdown), 50000);
        let chooseADateFromList = await this.driver.findElements(selectFromDropdown);

        for (let i = 0; i < await chooseADateFromList.length; i++) {
            if (await chooseADateFromList[i].getText() === date) {
                await chooseADateFromList[i].click();
                break;
            }
        }
        await this.driver.sleep(5000);
    }

    selectTimeFromDropdown = async (time) => {
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(selectTime)), 50000);

        this.clickElement(selectTime);
        
        await this.driver.wait(until.elementsLocated(selectFromDropdown), 50000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(selectFromDropdown)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(selectFromDropdown)), 50000);
        const selectTimeList = await this.driver.findElements(selectFromDropdown);
        for (let i = 0; i < await selectTimeList.length; i++) {
            if (await selectTimeList[i].getText() === time) {
                await selectTimeList[i].click();
                break;
            }
        }
    }

    selectSeat = async(seats) => {
        await this.driver.wait(until.elementsLocated(availableSeat), 50000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(availableSeat)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(availableSeat)), 50000);
        let seatPlanList = await this.driver.findElements(availableSeat);

        for (let i = 0; i < seats; i++) {
            await seatPlanList[i].click();
        }
    }

    clickConfirmReservation = async() => {
        await this.driver.wait(until.elementsLocated(confirmReservationButton), 50000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(confirmReservationButton)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(confirmReservationButton)), 50000);
        const btn = await this.driver.findElement(confirmReservationButton);

        await this.clickElement(confirmReservationButton);
        await this.driver.sleep(5000);
    }

    verifyTicketReservationSummary = (reservation) => {
        const ticketReservationSummary = this.getText(ticketSummary);
        if (ticketReservationSummary.includes(reservation)) {
            return true;
        }   
    }

    clickProceedToPayment = async () => {
        await this.clickElement(proceedPaymentButton);
    }
    
    isPageLoaded = async () => {
        return await this.verifyPageLoad(reservationDetails);
    }
}

module.exports = TicketRegistrationPage;