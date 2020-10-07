const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

class LandingPage extends BasePage {

constructor(){
    super();
    this.loginBtn = By.css('a[href="/login"]');
    this.registerBtn = By.css('a[href="/register"]');
}
    clickLoginButton = async () => {
        await this.driver.wait(until.elementLocated(this.loginBtn), 5000);
        await this.driver.findElement(this.loginBtn).click();
    }
    clickRegisterButton = async () => {
        await this.driver.wait(until.elementLocated(this.registerBtn), 5000);
        await this.driver.findElement(this.registerBtn).click();
    }
    isPageLoaded = async () => {
        return await this.driver.findElement(this.loginBtn).isDisplayed() &&
            await this.driver.findElement(this.registerBtn).isDisplayed();
    }
}
module.exports = LandingPage;