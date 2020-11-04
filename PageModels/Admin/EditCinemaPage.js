const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let nameField = By.css('input[formcontrolname="name"]');
let rows = By.css('input[name="rows"]');
let columns = By.css('input[name="columns"]');
let seats = By.css('.seat span');
let seatPlan = By.css('div[class="seat-plan"] span[hidden]');
let updateButton = By.css('button.btn-primary');
let backToList = By.partialLinkText('Back');
let editCinemaPageHeader = By.css('div[class="col-md-10"] h4');
let addCinema = By.css('button[class="btn btn-outline-secondary mr-2"]');
let cinemaList = By.css('app-cinema-list ul> li> a');

class EditCinemaPage extends BasePage {

    editCinemaName = async (cinemaName) => {
        await nameField.clear();
        await nameField.enterText(nameField, cinemaName);
    }

    enterRows = async (rowValue) => {
        await rows.clear();
        await this.enterText(rows, rowValue);
    }

    enterColumns = async (columnValue) => {
        await columns.clear();
        await this.enterText(columns, columnValue);
    }

    clickUpdateButton = async () => {
        await this.clickElement(updateButton);

    }

    clickBackToListLink = async () => {
        await this.clickElement(backToList);
    }

    selectDisabledSeatsbyValue = async (...disableSeats) => {
        let seatNumber = await this.driver.findElements(seats).getText();
        for (let i = 0; i < seatNumber.length; i++) {
            if (disableSeats.includes(seatNumber[i])) {
                await seatNumber[i].click();
            }
        }
    }

    getDisabledSeats = async () => {
        let seats = [];
        let seatsDisabled = await driver.findElements(seatPlan);
        for (const index of seatsDisabled) {
            const seatText = await index.getAttribute('innerText');
            seats.push(seatText);
        }   

        return seats;
    }

    isPageLoaded = async () => {
        await this.verifyPageLoad(nameField) && this.verifyPageLoad(editCinemaPageHeader);
    }

    clickAddButton = async () => {
        await this.clickElement(addCinema);
    }

    verifyCinema = async (name) => {        
        let options = await this.driver.findElements(cinemaList);
        let returnVal = false;

        console.log(await options.length);

        for (let index = 0; index < options.length; index++) {
            
            if (await options[index].getText() == ` ${name} `) {
                returnVal = true;
                break;
            }
        }        
        return returnVal;
    }
}

module.exports = EditCinemaPage;