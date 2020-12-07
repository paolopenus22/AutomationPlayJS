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
let screenDiv = By.css('app-seat-plan [class="col-md-7 screen"]');
let appSeat = By.css('app-seat > div');
let cinemaNameEdit = By.css('app-cinema-edit [formcontrolname="name"]');
let appSeatDisabled = By.css('app-seat [class="seat disabled"]');

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

    setTheSeat = async(row, column) => {
        await this.driver.findElement(rows).clear();
        await this.enterText(rows, row);

        await this.driver.findElement(columns).clear();
        await this.enterText(columns, column);
        await this.clickElement(screenDiv);
        
        await this.driver.wait(until.elementLocated(appSeat), 10000);
        let seat = await this.driver.findElements(appSeat);

        //clicker
        var index = 0;
        for(var i = 1; i <= row; i++)
        {
            for(var j = 7; j >= i; j--)
            {
             await seat[index].click();
             index++;
            }
            for(var k = 1; k <= 4+(i*2); k++)
            {
              // skip
              index++; 
            }
            for(var l = 7; l >= i; l--)
            {
                await seat[index].click();
                index++;
            }
        }
    }

    getCinemaName = async () => {
        return this.driver.findElement(cinemaNameEdit).getAttribute('value').then(function(elem){
            return elem;
        });
    }

    getSeatClass = async() => {
        var index = 0;
        var toVerify = [];

        await this.driver.wait(until.elementLocated(appSeat), 10000);
        let seat = await this.driver.findElements(appSeat);

        for(var i = 1; i <= 5; i++)
        {
            for(var j = 7; j >= i; j--)
            {
                toVerify.push(await seat[index].getAttribute('class'));
                index++;
            }
            for(var k = 1; k <= 4+(i*2); k++)
            {
              // skip
                toVerify.push(await seat[index].getAttribute('class'));
                index++; 
            }
            for(var l = 7; l >= i; l--)
            {
                toVerify.push(await seat[index].getAttribute('class'));
                index++;
            }
        }
        return toVerify;
    }

    GetTotalCountOfDisableSeat = async() => {
        let seats = await this.driver.findElements(appSeatDisabled);
        return seats.length;     
    }
    
    VerifyTextOfDisableSeat = async() => {
        return this.driver.findElement(appSeatDisabled).getText().then(function(elem){
            return elem;
        });    
    }
    
}

module.exports = EditCinemaPage;