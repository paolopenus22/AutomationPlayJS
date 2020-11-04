const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let maintainModule = By.css('div.form-group select.form-control option');

class AdminPage extends BasePage {

    selectMaintainModule = async (moduleName) => {

        await this.clickElement(maintainModule);
        let dropdownOption = await this.driver.findElements(maintainModule);

        for (let index = 0; index < dropdownOption.length; index++) {
            if (await dropdownOption[index].getText() == ` ${moduleName} `) {
          
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