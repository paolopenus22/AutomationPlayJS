const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let branchName = By.css('app-schedule-add form h5');
let cinemaDropdown = By.css('app-schedule-add form [name="cinema"]');
let movieDropdown = By.css('app-schedule-add form [name="movie"]');
let startDateInput = By.css('app-schedule-add form [name="startDate"]');
let hourInput = By.css('app-schedule-add form [placeholder="HH"]');
let minInput = By.css('app-schedule-add form [placeholder="MM"]');
let priceInput = By.css('app-schedule-add form [name="ticketPrice"]');
let addBtn = By.css('app-schedule-add form [type="submit"]');
let movieNameInDetail = By.css('app-movie-detail h5');
let backToListLink = By.css('app-schedule-add a');

class AddSchedulePage extends BasePage {

    selectCinemaName = async (cinemaName) => {
        await this.clickElement(cinemaDropdown);
        let options = await this.driver.findElement(cinemaDropdown).findElements('option');

        for(let i =0; i< options.lenth; i++)
        {
            if(options[i].getText() == cinemaName)
            {
                await options[i].click();
            }
        }
    }

    selectMovieName = async (movieName) => {
        await this.clickElement(movieDropdown);
        let options = this.driver.findElement(movieDropdown).findElements('option');

        for(let i =0; i< options.lenth; i++)
        {
            if(options[i].getText() == movieName)
            {
                options[i].click();
            }
        }
    }

    enterStartDate = async(startDate) => {
        await this.enterText(startDateInput, startDate);
    }

    enterTime = async(hr, min) => {
        await hourInput.clear();
        await this.enterText(hourInput, hr);

        await minInput.clear();
        await this.enterText(minInput,min);
    }

    enterTicketPrice = async(price) => {
        await this.enterText(priceInput, price);
    }

    ClickAddButton = async() => {
        await this.clickElement(addBtn);
    }

    getMovieNameInDetails = async() =>{
        await this.getText(movieNameInDetail);
    }

    BackToList = async() => {
        await this.clickElement(backToListLink);
    }

}
module.exports = AddSchedulePage;