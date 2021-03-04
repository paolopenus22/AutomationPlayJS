const { By, until, promise } = require("selenium-webdriver");
const BasePage = require("../BasePage");
const AddSchedulePage = require("../Admin/AddSchedulePage");

let addMovieSchedBtn = By.css('app-schedule-list form button');
let movieScheduleContainer = By.css('div.row-eq-height');
let schedCard = By.css('div.schedule-card');
let scheduleCard = By.css('app-schedule-card');
let movieName = By.css('app-schedule-card h6');
let dateTime = By.css('app-schedule-card p');
let deleteIcon = By.css('i[class="icon ion-ios-trash"]');
let viewCinemaDropdown = By.css('select[name="cinema"]');
let itemsPerPage = By.css('app-schedule-list form [name="itemsPerPage"]');
let nextPagination = By.css('pagination-template [class="pagination-next"]');
let previousPagination = By.css('pagination-template [class="pagination-previous"]');


class AdminSchedulePage extends BasePage {

    AddMovieSchedule = async() => {
        await this.driver.wait(until.elementLocated(addMovieSchedBtn), 100000);
        await this.clickElement(addMovieSchedBtn);
        // return new AdminSchedulePage();
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
        await this.driver.sleep(3000);
        await this.driver.wait(until.elementLocated(viewCinemaDropdown), 50000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(viewCinemaDropdown)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(viewCinemaDropdown)), 50000);
        let dropdown = await this.driver.findElement(viewCinemaDropdown);
        let dropdownElement = await dropdown.findElements(By.css('option'));

        for (let i = 1; i < dropdownElement.length; i++) {
            await this.driver.wait(until.elementIsVisible(dropdownElement[i]), 50000);
            let text = await dropdownElement[i].getAttribute('text');

            if (text == cinema) {
                await dropdownElement[i].click();
                break;
            }
        }
    }

    itemPerPage = async() => {
        
        let options = await this.driver.wait(until.elementLocated(itemsPerPage), 50000)

        await this.driver.wait(until.elementIsVisible(this.driver.findElement(itemsPerPage)), 50000)
        await this.driver.wait(until.elementIsEnabled(this.driver.findElement(itemsPerPage)), 50000)
        let selectedOption = await options.findElements(By.css('option'));

        for(let i = 0; i < selectedOption.length; i++)
        {
            await this.driver.wait(until.elementIsVisible(selectedOption[i]), 50000);
            if(await selectedOption[i].getText() == `18`)
            {
                await selectedOption[i].click();
            }
        }
       await this.wait(3000);
    }

    getSelectedMovieTitles = async(movieTitle) => {
        let listOfTitles = [];

        listOfTitles.push(movieTitle);

        return listOfTitles;
    }

    verifyAddedMovieSchedule= async () => {

        await this.driver.wait(until.elementsLocated(movieName), 5000);
        let listOfScheduleCards = await this.driver.findElements(movieName);
    
        for (let i = 1; i <  listOfScheduleCards.length; i++) {
            await this.driver.wait(until.elementIsVisible(listOfScheduleCards[i]), 5000);
            let scheduleCardMovieTitle = await listOfScheduleCards[i].getText();
            return scheduleCardMovieTitle;
        }     
        
    }

    getMovieScheduleCount = async() => {
        let count = 0
        await this.driver.wait(until.elementsLocated(movieScheduleContainer), 5000);
        let scheduleContainer = await this.driver.findElement(movieScheduleContainer);
        await scheduleContainer.findElements(scheduleCard).then((index) => {
            count = index.length;
        });
        return count;
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