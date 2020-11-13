const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let addBranchButton = By.css('button[class="btn btn-outline-primary mr-3"]');
let nameField = By.css('input[formcontrolname="name"]');
let addressField = By.css('textarea[formcontrolname="address"]');
let nameErrorMsg = By.css('div[class="text-danger"] span');
let addButton = By.css('button[type="submit"]');
let backToListButton = By.css('a[href="/admin/branch"]');
let branchesList = By.css('div[class="branch-card"] div:nth-child(2) a');
let addBranchHeader = By.css('app-branch-list');

class AddBranchPage extends BasePage {
    clickAddBranchButton = async () => {
        await this.clickElement(addBranchButton);
    }
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
    verifyNewBranchName = async () => {
        let branchList = await this.driver.findElements(branchesList);
        let newBranchName = '';
        for(let i = 0; i < branchList.length; i++) {
            if (await branchList[i].getText() === name) {
                newBranchName = branchList[i].getText();
            }
            return newBranchName;
        }
    }
    isPageLoaded = async () => {
        return await this.verifyPageLoad(addBranchHeader);
    }
}

module.exports = AddBranchPage;