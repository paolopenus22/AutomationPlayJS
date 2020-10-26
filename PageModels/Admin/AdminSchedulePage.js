const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let addMovieSchedBtn = By.css('app-schedule-list form button');
let scheduleCard = By.css('app-schedule-card');
let movieName = By.css('app-schedule-card h6');
let dateTime = By.css('app-schedule-card p');
let deleteIcon = By.css('i[class="icon ion-ios-trash"]');
let viewCinemaDropdown = By.css('app-schedule-list form [name="cinema"]');
let itemsPerPage = By.css('app-schedule-list form [name="itemsPerPage"]');
let nextPagination = By.css('pagination-template [class="pagination-next"]');
let previousPagination = By.css('pagination-template [class="pagination-previous"]');

class AdminSchedulePage extends BasePage {

    AddMovieSchedule = async() => {
        await this.clickElement(addMovieSchedBtn);
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
        await this.clickElement(viewCinemaDropdown);
        let options = await this.driver.findElement(viewCinemaDropdown).findElements('option');

        for(let i =0; i< options.lenth; i++)
        {
            if(options[i].getText() == cinema)
            {
                await options[i].click();
            }
        }
    }

    itemPerPage = async(num) => {
        await this.clickElement(itemsPerPage);
        let options = await this.driver.findElement(itemsPerPage).findElements('option');

        for(let i =0; i< options.lenth; i++)
        {
            if(options[i].getText() == num)
            {
                await options[i].click();
            }
        }
    }

    clickNextPagination = async() => {
        await this.clickElement(nextPagination);
    }

    clickPreviousPagination = async() => {
        await this.clickElement(previousPagination);
    }

}
module.exports = AdminSchedulePage;