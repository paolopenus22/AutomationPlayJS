const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let branchName = By.css('app-schedule-add form h5');
let cinemaDropdown = By.css('app-schedule-add form [name="cinema"]');
let movieDropdown = By.css('app-schedule-add form [name="movie"]');
let startDateInput = By.css('app-schedule-add form [name="startDate"]');
let hourInput = By.css('app-schedule-add form [placeholder="HH"]');
let minInput = By.css('app-schedule-add form [placeholder="MM"]');
let priceInput = By.css('app-schedule-add form [name="ticketPrice"]');
let addButton = By.css('app-schedule-add form [type="submit"]');
let movieNameInDetail = By.css('app-movie-detail h5');
let backToListLink = By.css('app-schedule-add a');

class AddSchedulePage extends BasePage {

    selectCinemaName = async (cinemaName) => {
        let text = "";
        await this.clickElement(cinemaDropdown);
        let options = await this.driver.findElement(cinemaDropdown);
        let selectedOption = await options.findElements(By.css('option'));

        for(let i =0; i< selectedOption.length; i++)
        {
            text = await selectedOption[i].getText();
            if(text  === cinemaName)
            {
                await selectedOption[i].click();
            }
            await selectedOption[1].click();
        }
        return text;
    }


    selectMovieName = async (movieName) => {
        await this.clickElement(movieDropdown);
        let options = this.driver.findElement(movieDropdown)
        let selectedOption = await options.findElements(By.css('option'));

        for(let i =0; i< selectedOption.lenth; i++)
        {
            if(selectedOption[i].getText() == movieName)
            {
                selectedOption[i].click();
            }
        }
    }

    selectRandomMovieName = async () => {
        let text = "";
        await this.clickElement(movieDropdown);
        let options = await this.driver.findElement(movieDropdown)
        let selectedOption = await options.findElements(By.css('option'));
        let randomMovie =  Math.floor(Math.random() * selectedOption.length);
        text = selectedOption[randomMovie].getText();

        if (text === '--Select Movie--') {
            
            selectedOption[randomMovie + 1].click();
        }else {
            selectedOption[randomMovie].click();
        }
        return text;
    }

    enterStartDate = async(startDate) => {
        await this.enterText(startDateInput, startDate);
    }

    enterTime = async(hr, min) => {
        await this.driver.wait(until.elementLocated(hourInput), 5000);
        await this.enterText(hourInput, Key.BACK_SPACE);
        await this.enterText(hourInput, hr);

        await this.driver.wait(until.elementLocated(minInput), 5000);
        await this.enterText(minInput, Key.BACK_SPACE);
        await this.enterText(minInput,min);
    }

    clickAddButton = async () => {
        await this.clickElement(addButton);
    }

    enterTicketPrice = async(price) => {
        await this.driver.wait(until.elementLocated(priceInput), 5000);
        await this.enterText(priceInput, Key.BACK_SPACE);
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