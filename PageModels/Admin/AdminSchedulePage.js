const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");
const AddSchedulePage = require("../Admin/AddSchedulePage");

let addMovieSchedBtn = By.css('app-schedule-list form button');
let scheduleCards = By.css('div.row-eq-height');
let movieName = By.css('app-schedule-card h6');
let dateTime = By.css('app-schedule-card p');
let deleteIcon = By.css('i[class="icon ion-ios-trash"]');
let viewCinemaDropdown = By.css('select[name="cinema"]');
let itemsPerPage = By.css('app-schedule-list form [name="itemsPerPage"]');
let nextPagination = By.css('pagination-template [class="pagination-next"]');
let previousPagination = By.css('pagination-template [class="pagination-previous"]');
let dropdownLabels = By.css('app-schedule-list form label');
class AdminSchedulePage extends BasePage {

    AddMovieSchedule = async() => {
        await this.clickElement(addMovieSchedBtn);
        return new AddSchedulePage();
    }

    deleteSchedule =async(name, schedule) => {        
        let cards = await this.driver.findElements(scheduleCard);

        for(let i =0; i < cards.length; i++)
        {
            if((cards[i].findElement(movieName).getText() == name) &&
              (cards[i].findElement(dateTime).getText() == schedule))
            {
                await cards[i].findElement(deleteIcon).click();
            }
        }
    }

    viewSpecificCinema = async(cinema) => {
        let text = ""
        await this.clickElement(viewCinemaDropdown);
        let dropdownElement = await this.driver.findElement(viewCinemaDropdown);
        let dropdownElements = await dropdownElement.findElements(By.css('option'));
        for (let i = 1; i < dropdownElements.length; i++) {
             text = await dropdownElements[i].getText();
            if (dropdownElements[i].getText() == cinema) {
                await dropdownElements[i].click();
            }
        }
        return text;
    }

    itemPerPage = async(num) => {
        await this.clickElement(itemsPerPage);
        let options = await this.driver.findElement(itemsPerPage)
        let selectedOption = await options.findElements(By.css('option'));

        for(let i =0; i< selectedOption.length; i++)
        {
            if(selectedOption[i].getText() == num)
            {
                await selectedOption[i].click();
            }
        }
    }

    verifyIsMovieAdded = async (movieTitle) => {
        let isPresent = false;
        await this.driver.wait(until.elementLocated(scheduleCards), 5000);
        let element = await this.driver.findElement(scheduleCards);
        let listOfScheduleCards = await element.findElements(By.css('div.schedule-card h6'));
        let arrCard = [];

        for (let i = 0; i < listOfScheduleCards.length; i++) {

            let arrCardText = await listOfScheduleCards[i].getText();
            arrCard.push(arrCardText);

            if (arrCard.includes(movieTitle)) {
                isPresent = true;
                break;
            }
        }

        console.log(arrCard);
        
        return isPresent;
        
    }

    getCurrentUrl = async () => {
        let currentUrl = await this.driver.getCurrentUrl();
        return currentUrl;
    }

    clickNextPagination = async() => {
        await this.clickElement(nextPagination);
    }

    clickPreviousPagination = async() => {
        await this.clickElement(previousPagination);
    }

    isPageLoaded = async () => {
        await this.verifyPageLoad(addMovieSchedBtn);
    }

}
module.exports = AdminSchedulePage;