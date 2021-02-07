const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let appPaymentDetail = By.css('app-payment-detail');
let user = By.css('app-payment-detail > div > div > div.form-group.ng-star-inserted > span');
let description = By.css('app-payment-detail > div > div > div:nth-child(3) > span');
let cardHolderName = By.css('app-payment-detail > div > div > div:nth-child(4) > span');
let amount = By.css('app-payment-detail > div > div > div:nth-child(5) > span');

class AdminPaymentDetailPage extends BasePage
{
    isPageLoaded = async () => {
        await this.verifyPageLoad(appPaymentDetail);
    }

    getPaymentDetailUser = async() => {
        return await user.getText();
    }

    getPaymentDetailDescription = async() => {
        return await description.getText();
    }

    getPaymentDetailCardHolderName = async() => {
        return await cardHolderName.getText();
    }

    getPaymentDetailAmount = async() => {
        return await amount.getText();
    }


}

module.exports = AdminPaymentDetailPage;