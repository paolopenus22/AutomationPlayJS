const { By, until } = require("selenium-webdriver");
let BasePage = require("../PageModels/BasePage");
let loginBtn = By.css('a[href="/login"]');
let registerBtn = By.css('a[href="/register"]');
let branchesBtn = By.css('a[href="/branches"]');
let adminBtn = By.css('a[href="/admin"]');

class LandingPage extends BasePage {

    clickLoginButton = async () => {
        await this.clickElement(loginBtn);
    }
    clickRegisterButton = async () => {
        await this.clickElement(registerBtn);
    }
    isPageLoaded = async () => {
        return this.verifyPageLoad(loginBtn) && this.verifyPageLoad(registerBtn);
    }
}
module.exports = LandingPage;