const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

let emailField = By.css('.input-group-prepend + input[formcontrolname="email"]');
let passwordField = By.css('.input-group-prepend + input[formcontrolname="password"]');
let emailIcon = By.css('i[class="icon ion-ios-person"]');
let passwordIcon = By.css('i[class="icon ion-ios-key"]');
let invalidEmailMsg = By.css('[class="text-danger"] span');
let passwordRequiredMsg = By.css('[class="text-danger"] div');
let passwordIncorrectMsg = By.css('[class="text-danger"] p');
let loginButton = By.css('button[type="submit"]');

class LoginPage extends BasePage {

    inputLoginCredentials = async (email, password) => {
        await this.enterText(emailField, email);
        await this.enterText(passwordField, password);
       
    }
    clickLoginButton = async () => {
        await this.clickElement(loginButton);
    }
    getEmailErrorMessage = async () => {
        return await this.getText(invalidEmailMsg);
    }
    getRequiredPasswordErrorMessage = async () => {
        return await this.getText(passwordRequiredMsg);
    }
    getIncorrectPasswordErrorMessage = async () => {
        return await this.getText(passwordIncorrectMsg);
    }
    clickEmailIcon = async () => {
        await this.clickElement(emailIcon);
    }
    clickPasswordIcon = async () => {
        await this.clickElement(passwordIcon);
    }
    verifyLoginButtonDisabled = async () => {
        return await this.verifyElementEnabled(loginButton);
    }
    isPageLoaded = async () => {
        return await this.verifyPageLoad(emailField);
    }
}
module.exports = LoginPage;