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
let amount = By.css('app-payment-summary div:nth-child(3) div:nth-child(2)');
let confirmedDialogBox = By.css('[header="Confirmed Reservation"]');
let descriptionText = By.css('app-payment-summary div:nth-child(2) div:nth-child(2)');
let emailText = By.css('div.ui-dialog-content p');
let confirmedReservationDialog = By.css('div.ui-dialog-titlebar+div.ui-dialog-content');
let desc = "";
let email = "";

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

    getDescriptionText = async () => {
        await this.driver.wait(until.elementsLocated(descriptionText), 50000);
        await this.driver.findElement(descriptionText).getText().then((value) =>{
            this.desc = value;
        });
    }

    formatPaymentSummaryDate = async (date) => {
        const [yyyy, MM, dd] = date.split("-");
        return `${MM}/${dd}/${yyyy}`;
    }

    verifyTickeTotalAmount = async (price, seats) => {
        let phpAmount = await this.driver.findElement(amount).getText();
        let amountText = await phpAmount.substring(phpAmount.indexOf(" ")).trimStart().replace(",", "");
        let totalAmount = parseFloat(price * seats.length).toFixed(2);
        return amountText == totalAmount;
    }
    getEmailText = async () => {
        await this.driver.wait(until.elementLocated(emailText), 50000);
        await this.driver.findElement(emailText).getText().then((value) => {
            console.log(value);
            this.email = value;
        });
    }

    verifyConfirmedReservationDetails = async (email, branchName, cinemaName, movieName, date, time, reservedSeats, noOfSeats, price) => {
        await this.driver.wait(until.elementLocated(confirmedReservationDialog), 50000);
        await this.driver.wait(until.elementLocated(closeButton), 50000);

        let formattedTime = `${time.substr(0, time.indexOf(' '))} ${time.slice(-2).toUpperCase()}`
        return await this.driver.findElement(confirmedReservationDialog).getText().then(async (text) =>{
            console.log(text);
            console.log(branchName, cinemaName, movieName, date, time, reservedSeats, noOfSeats, price)
            return text.includes(`Your receipt has been sent to your email.`)
            && text.includes(`Movie Title: ${movieName}`)
            && text.includes(`Branch: ${branchName}`)
            && text.includes(`Cinema: ${cinemaName}`)
            && text.includes(`Screening Date: ${await this.formattedDateTicketSummaryDialog(date)}`)
            && text.includes(`Screening Time: ${formattedTime}`)
            && text.includes(`Selected Seats: ${reservedSeats}`)
            && text.includes(`No. of Seats: ${noOfSeats}`)
            && text.includes(`Ticket Price: ${price}`)
            && text.includes(`Total: ${price*reservedSeats.length}`)
        });
    }
}

module.exports = PaymentSummaryPage;