const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let cinemaNameField = By.css('input[formcontrolname="name"]');
let nameRequiresMsg = By.css('div.text-danger span');
let addButton = By.css('button[type="submit"]');
let backLinkText = By.css('div.row > a');
let addCinemaHeader = By.css('div[class="col-md-10"] h4');

class AddCinemaPage extends BasePage {

    inputCinemaName = async (cinemaName) => {
        await this.enterText(cinemaNameField, cinemaName);
        await this.clickElement(addButton);
    }
    
    getRequiredNameErrorMessage = async () => {
        return await this.getText(nameRequiresMsg);
    }

    clickBackToList = async () => { 
        await this.clickElement(backLinkText);
    }

    isPageLoaded = async () => {
        await this.verifyPageLoad(cinemaNameField) && this.verifyPageLoad(addCinemaHeader);
    }
    
}
module.exports = AddCinemaPage;