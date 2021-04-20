const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");
const AdminBranchPage = require("../Admin/AdminBranchPage");

let maintainModule = By.css('div.form-group select.form-control option');

class AdminPage extends BasePage {

    selectMaintainModule = async (moduleName) => {

        // await this.clickElement(maintainModule);
        let dropdownOption = await this.driver.findElements(maintainModule);

        for (let index = 0; index < dropdownOption.length; index++) {
            if (await dropdownOption[index].getText() == `${moduleName}`) {
          
                await dropdownOption[index].click();
                break;
            }
        }         
    }

    selectMaintainModuleBranch = async () => {

        await this.clickElement(maintainModule);
        let dropdownOption = await this.driver.findElements(maintainModule);

        for (let index = 0; index < dropdownOption.length; index++) {
            if (await dropdownOption[index].getText() == ` Branch `) {
          
                await dropdownOption[index].click();
                return new AdminBranchPage();
            }
        }        
        
        
    }

    isPageLoaded = async () => {
        await this.verifyPageLoad(maintainModule);
    }

}

module.exports = AdminPage;