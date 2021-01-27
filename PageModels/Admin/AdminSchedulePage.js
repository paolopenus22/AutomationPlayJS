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
let viewCinemaDropdown = By.css('select[name="cinema"] option');
let itemsPerPage = By.css('app-schedule-list form [name="itemsPerPage"]');
let nextPagination = By.css('pagination-template [class="pagination-next"]');
let previousPagination = By.css('pagination-template [class="pagination-previous"]');


class AdminSchedulePage extends BasePage {

    AddMovieSchedule = async() => {
        await this.driver.wait(until.elementLocated(addMovieSchedBtn), 50000);
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

        await this.driver.wait(until.elementLocated(viewCinemaDropdown), 50000)
        let dropdownElement = await this.driver.findElements(viewCinemaDropdown);
        

        for (let i = 0; i < dropdownElement.length; i++) {

           let text = await dropdownElement[i].getText();

            if (text.trim().includes(cinema)) {
                await dropdownElement[i].click();
                break;
            }
        }
    }

    verifyIfElementExist = async() => {
        try {
            await this.driver.findElement(scheduleCard);
            return true;
        } catch (error) {
            return false;
        }
    }


    itemPerPage = async() => {
        let options = await this.driver.findElement(itemsPerPage)
        let selectedOption = await options.findElements(By.css('option'));

        for(let i = 0; i < selectedOption.length; i++)
        {
            // let text = await selectedOption[i].getText();
            if(await selectedOption[i].getText() == `18`)
            {
                await selectedOption[i].click();
            }
        }
    }

    getSelectedMovieTitles = async(movieTitle) => {
        let listOfTitles = [];

        listOfTitles.push(movieTitle);

        return listOfTitles;
    }

    formatDate = async(movieDate, movieTime) => {
        let timeValues = movieTime.split(':');
        let hourValue = "";

        if(timeValues[2] == "pm"){
            let integerHour = parseInt(timeValues[0]);
            hourValue = integerHour - 12;
            hourValue = `0${hourValue}`;
        }else {
            hourValue = timeValues[0];
        }

        let scheduleTobeChecked = movieDate + ' ' + hourValue + ':' + timeValues[1] + ' ' + timeValues[2];

        return scheduleTobeChecked;
    }

    verifyAddedMovieSchedule= async (movieTitle) => {
        let isDisplayed = false;
        let scheduleCardMovieTitle = "";

        await this.driver.wait(until.elementsLocated(movieName), 5000);
        let listOfScheduleCards = await this.driver.findElements(movieName);
    
        for (let i = 0; i <  listOfScheduleCards.length; i++) {

            scheduleCardMovieTitle = await listOfScheduleCards[i].getText();

            if (scheduleCardMovieTitle.trim() == movieTitle.trim()) {
                isDisplayed = true;
                break;
            }   
        }     
        return isDisplayed;
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
        await this.verifyPageLoad(movieName) || await this.verifyPageLoad(addMovieSchedBtn);
    }

}
module.exports = AdminSchedulePage;