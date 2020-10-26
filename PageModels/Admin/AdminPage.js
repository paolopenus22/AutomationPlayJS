const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let maintainModule = By.css('select.form-control');

class AdminPage extends BasePage {

    selectMaintainModule = async (moduleName) => {

        await this.clickElement(maintainModule)
        let dropdownOption = await this.driver.findElement(maintainModule).findElements('option');

        for (let index = 0; index < dropdownOption.length; index++) {
            if (await dropdownOption[index].getText() == moduleName) {
          
                await dropdownOption[index].click();
                break;
            }
        }   
    }

    isPageLoaded = async () => {
        await this.verifyPageLoad(maintainModule);
    }

}

module.exports = AdminPage;