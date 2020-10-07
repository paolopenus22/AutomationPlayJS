const { Builder } = require("selenium-webdriver");
const chrome = require('chromedriver');
const { testURL } = require("../Config/jest.config");

initDriver = () => {
    if (!this.driver) {
        return new Builder().forBrowser('chrome').build();
    }
    else {
        return this.driver;
    }
}

var _driver = initDriver();

class BasePage {     
    constructor() {
        this.driver = _driver;
    };
    navigateToMoviesApp = async () => {
        await this.driver.manage().window().maximize();
        await this.driver.get(testURL);
    }
    closeMoviesApp = async () => {
        await this.driver.quit();
    }
}
module.exports = BasePage;