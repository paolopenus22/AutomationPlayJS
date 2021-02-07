const { Builder, until, By } = require("selenium-webdriver");
const chrome = require('chromedriver');
const { testURL } = require("../Config/jest.config");

var Singleton = (() => {
    let instance;
 
    createInstance = () => {
        let driver = new Builder().forBrowser('chrome').build();
        return driver;
    }
    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

class BasePage {
 
    constructor() {
        let driver = Singleton.getInstance();
        this.driver = driver;
}
    navigateToMoviesApp = async () => {
        await this.driver.manage().window().maximize();
        await this.driver.get(testURL);
    }
    closeMoviesApp = async () => {
        await this.driver.quit();
    }
    clickElement = async (el) => {
        
        await this.driver.wait(until.elementLocated(el), 50000);
        let elem = await this.driver.findElement(el).then((x) => {
                    x.click();
        });
        return elem;
    }
    enterText = async (el, text) => {
        await this.driver.wait(until.elementLocated(el), 5000);
        let elem = await this.driver.findElement(el).then((x) => {
                    x.sendKeys(text);
        });
        return elem;
    }
    getText = async (el) => {
        return await this.driver.wait(until.elementLocated(el), 5000).getText();
    }
    verifyElementEnabled = async (el) => {
        await this.driver.wait(until.elementLocated(el), 5000);
        let enable = await this.driver.findElement(el).then((x) => {
                    x.isEnabled();
        });
        return enable;
    }
     verifyPageLoad = async (el) => {
        let display = true;
        try 
        {
            await this.driver.wait(until.elementLocated(el), 5000);
        }
        catch 
        {            
            display = false;
        }

        return display;
    }

    WaitVisibleElement = async (el) => {
        let display = true;
        try 
        {
            await this.driver.wait(until.elementLocated(el), 50000);
        }
        catch 
        {            
            display = false;
        }

        return display;
    }

}
module.exports = BasePage;