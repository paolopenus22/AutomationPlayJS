const { By, until } = require("selenium-webdriver");
let BasePage = require("../PageModels/BasePage");
let loginBtn = By.css('a[href="/login"]');
let registerBtn = By.css('a[href="/register"]');
let adminTab = By.css('a[href="/admin"]');
class LandingPage extends BasePage {

    clickLoginButton = async () => {
        this.clickElement(loginBtn);
    }
    clickRegisterButton = async () => {
        this.clickElement(registerBtn);
    }
    isPageLoaded = async () => {
        return this.verifyPageLoad(loginBtn) && this.verifyPageLoad(registerBtn);
    }

    clickAdminTab = async () => {
        this.clickElement(adminTab);
    }
}
module.exports = LandingPage;