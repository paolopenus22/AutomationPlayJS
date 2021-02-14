const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const MoviesPage = require("./MoviesPage");

let cardholderNameField = By.css('input[formcontrolname="cardholderName"]');
let creditCardNumField = By.css('p-inputmask[formcontrolname="cardNumber"] input');
let cvvField = By.css('p-inputmask[formcontrolname="cvv"] input');
let expiryDateField = By.css('p-inputmask[formcontrolname="expiryDate"] input');
let proceedButton = By.css('button[type="submit"]');
let confirmedReservationPopUp = By.css('.ui-dialog-title.ng-tns-c11-51.ng-star-inserted');
let cardHolderNameErrorMsg = By.css('div.row:nth-child(1) span[class="ng-star-inserted"]');
let creditCardNumErrorMsg = By.css('div.row:nth-child(2) span[class="ng-star-inserted"]');
let cvvErrorMsg = By.css('div.row:nth-child(3) span[class="ng-star-inserted"]');
let expiryDateErrorMsg = By.css('div.row:nth-child(4) span[class="ng-star-inserted"]');
let closeButton = By.css('button[class="btn btn-primary m-2"]');
let description = By.css('app-payment-summary  div:nth-child(2) > div:nth-child(2)');
let amount = By.css('app-payment-summary div:nth-child(3) > div:nth-child(2)');
let confirmedDialogBox = By.css('[header="Confirmed Reservation"]');

class PaymentSummaryPage extends BasePage {

    inputPaymentDetails = async (cardHolderName, creditCardNum, cvv, expiryDate) => {
        await this.enterText(cardholderNameField, cardHolderName)
        await this.enterText(creditCardNumField, creditCardNum)
        await this.enterText(cvvField, cvv)
        await this.enterText(expiryDateField, expiryDate)
    }
    getCardholderNameErrorMsg = async () => {
        await this.getText(cardHolderNameErrorMsg);
    }
    getCreditCardNumErrorMsg = async () => {
        await this.getText(creditCardNumErrorMsg);
    }
    getCvvErrorMsg = async () => {
        await this.getText(cvvErrorMsg);
    }
    getExpiryDateErrorMsg = async () => {
        await this.getText(expiryDateErrorMsg);
    }
    clickProceedButton = async () => {
        await this.clickElement(proceedButton);
    }
    verifyPayment = async () => {
        await this.driver.sleep(5000);
        return await this.getText(confirmedReservationPopUp);
    }
    clickCloseButton = async () => {
        await this.driver.wait(until.elementsLocated(closeButton), 15000);
        await this.clickElement(closeButton);   
        return new MoviesPage();
    }
    isPageLoaded = async () => {
        return await this.verifyPageLoad(cardholderNameField);
    }

    getDescription = async () => {
        return await this.getText(description);
    }
    getTotalAmount = async () => {
        return await this.getText(amount);
    }

    waitForCloseConfirmedReservationDialogBox = async () =>
    {
        await this.driver.wait(until.elementsLocated(confirmedDialogBox), 5000);
        await this.driver.wait(until.elementIsNotVisible(await this.driver.findElement(confirmedDialogBox)), 10000);  
    }
}

module.exports = PaymentSummaryPage;