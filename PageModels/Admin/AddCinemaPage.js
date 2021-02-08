const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let cinemaNameField = By.css('input[formcontrolname="name"]');
let nameRequiresMsg = By.css('div.text-danger span');
let addButton = By.css('button[type="submit"]');
let backLinkText = By.css('div.row > a');
let addCinemaPageHeader = By.css('div[class="col-md-10"] h4');

class AddCinemaPage extends BasePage {

    inputCinemaName = async (cinemaName, cinemaNumber) => {
        await this.enterText(cinemaNameField, cinemaName + ' ' + cinemaNumber);
        await this.clickElement(addButton);
        return `${cinemaName} ${cinemaNumber}`;
    }
    
    getRequiredNameErrorMessage = async () => {
        return await this.getText(nameRequiresMsg);
    }

    clickBackToList = async () => { 
        await this.clickElement(backLinkText);
    }

    isPageLoaded = async () => {
        await this.verifyPageLoad(addCinemaPageHeader) && this.verifyPageLoad(cinemaNameField);
    }
}
module.exports = AddCinemaPage;