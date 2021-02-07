const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

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
        return await this.getText(confirmedReservationPopUp);
    }
    clickCloseButton = async () => {
        await this.driver.wait(until.elementsLocated(closeButton), 50000);
        await this.clickElement(closeButton);
    }
    isPageLoaded = async () => {
        return await this.verifyPageLoad(cardholderNameField);
    }

    getDescription = async () => {
        return await description.getText();
    }
    getTotalAmount = async () => {
        return await amount.getText();
    }

}

module.exports = PaymentSummaryPage;