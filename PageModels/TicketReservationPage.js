const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

let selectBranch = By.css('[formcontrolname="branchId"]');
let selectCinema = By.css('[formcontrolname="cinemaId"]');
let chooseADate = By.css('[formcontrolname="watchDate"]');
let selectTime = By.css('[formcontrolname="scheduleId"]');
let selectFromDropdown = By.css('[class="cdk-overlay-pane"] mat-option span');
let selectSeatPlan = By.css('.seat-plan .seat.ng-star-inserted > span');
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
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(selectFromDropdown)), 50000);
        const selectCinemaList = await this.driver.findElements(selectFromDropdown);
        for (let i = 0; i < await selectCinemaList.length; i++) {
            await this.wait(5000);
            if (selectCinemaList[i].getText() === cinema) {
                console.log(await selectCinemaList[i].getText());
                await this.wait(5000);
                await selectCinemaList[i].click();
                break;
            }
        }

        await this.driver.sleep(5000);
    }
    chooseADateFromDropdown = async (date) => {
        await this.driver.wait(until.elementsLocated(chooseADate), 50000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(selectCinema)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(selectCinema)), 50000);

        this.clickElement(chooseADate);

        await this.driver.wait(until.elementsLocated(selectFromDropdown), 50000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(selectFromDropdown)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(selectFromDropdown)), 50000);
        await this.driver.wait(until.elementsLocated(selectFromDropdown), 50000);
        const chooseADateFromList = await this.driver.findElements(selectFromDropdown);
        for (let i = 0; i < chooseADateFromList.length; i++) {
            if (await chooseADateFromList[i].getText() === date) {
                await this.driver.wait(until.elementsLocated(chooseADateFromList[i]), 50000);
                await chooseADateFromList[i].click();
            }
        }
        await this.driver.sleep(5000);
    }
    selectTimeFromDropdown = async (time) => {
        this.clickElement(selectTime);
        await this.driver.wait(until.elementsLocated(selectFromDropdown), 50000);
        const selectTimeList = await this.driver.findElements(selectFromDropdown);
        for (let i = 0; i < selectTimeList.length; i++) {
            if (await selectTimeList[i].getText() === time) {
                await selectTimeList[i].click();
            }
        }
    }

    selectSeat = async(seats) => {
        await this.driver.wait(until.elementsLocated(selectSeatPlan), 50000);
        const seatPlanList = await this.driver.findElements(selectSeatPlan);
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