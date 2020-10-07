const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

class LoginPage extends BasePage {

constructor(){
    super();
    this.email = By.css('input[formcontrolname="email"]');
    this.password = By.css('input[formcontrolname="password"]');
    this.emailIcon = By.css('i[class="icon ion-ios-person"]');
    this.passwordIcon = By.css('i[class="icon ion-ios-key"]');
    this.invalidEmailMsg = By.css('[class="text-danger"] span');
    this.passwordRequiredMsg = By.css('[class="text-danger"] div');
    this.passwordIncorrectMsg = By.css('[class="text-danger"] p');
    this.loginButton = By.css('button[type="submit"]');
}
    inputLoginCredentials = async (email, password) => {
        await this.driver.findElement(this.email).sendKeys(email);
        await this.driver.findElement(this.password).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }
    getEmailErrorMessage = async () => {
        await this.driver.wait(until.elementLocated(this.invalidEmailMsg), 5000);
        return await this.driver.findElement(this.invalidEmailMsg).getText();
    }
    getRequiredPasswordErrorMessage = async () => {
        await this.driver.wait(until.elementLocated(this.passwordRequiredMsg), 5000);
        return await this.driver.findElement(this.passwordRequiredMsg).getText();
    }
    getIncorrectPasswordErrorMessage = async () => {
        await this.driver.wait(until.elementLocated(this.passwordIncorrectMsg), 5000);
        return await this.driver.findElement(this.passwordIncorrectMsg).getText();
    }
    clickEmailIcon = async () => {
        await this.driver.findElement(this.emailIcon).click()
    }
    clickPasswordIcon = async () => {
        await this.driver.findElement(this.passwordIcon).click()
    }
    verifyLoginButtonDisabled = async () => {
        return await this.driver.findElement(this.loginButton).isEnabled();
    }
    isPageLoaded = async () => {
        return await this.driver.findElement(this.email).isDisplayed() &&
                this.driver.findElement(this.password).isDisplayed();
    }
}
module.exports = LoginPage;