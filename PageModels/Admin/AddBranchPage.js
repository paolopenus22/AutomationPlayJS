const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let nameField = By.css('input[formcontrolname="name"]');
let addressField = By.css('textarea[formcontrolname="address"]');
let nameErrorMsg = By.css('div[class="text-danger"] span');
let addButton = By.css('button[type="submit"]');
let backToListButton = By.css('a[href="/admin/branch"]');
let branchesList = By.css('div[class="branch-card"] div:nth-child(2) a');
let addBranchHeader = By.css('app-branch-list');
let itemsPerPage = By.css('select[name="itemsPerPage"] option');

class AddBranchPage extends BasePage {
    inputBranchDetails = async (name, address) => {
        await this.enterText(nameField, name);
        await this.enterText(addressField, address);
    }
    getNameErrorMessage = async () => {
        return await this.getText(nameErrorMsg);
    }
    clickAddButton = async () => {
        await this.clickElement(addButton);
    }
    clickBackToList = async () => {
        await this.clickElement(backToListButton);
    }
    verifyNewBranchName = async (name) => {
        let branchList = await this.driver.findElements(branchesList);
        let newBranchName = '';
        for(let i = 0; i < branchList.length; i++) {
            const branchName = await branchList[i].getText();
            if (branchName === name) {
                newBranchName = branchName;
                break;
            }
        }
        return newBranchName;
    }
    selectMaxTotalItems = async (totalPage) => {
        await this.clickElement(itemsPerPage);
        const totalOptions = await this.driver.findElements(itemsPerPage);
        for (let i = 0; i < totalOptions.length; i++) {
            if (await totalOptions[i].getText() === totalPage) {
                await totalOptions[i].click();
            }
        }
        await this.driver.sleep(3000);
    }
    isPageLoaded = async () => {
        return await this.verifyPageLoad(addBranchHeader);
    }
}

module.exports = AddBranchPage;