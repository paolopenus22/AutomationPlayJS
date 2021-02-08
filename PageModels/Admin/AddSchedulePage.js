const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let branchName = By.css('app-schedule-add form h5');
let cinemaDropdown = By.css('app-schedule-add form [name="cinema"]');
let cinemaOptions = By.css('select[name="cinema"] option');
let movieDropdown = By.css('app-schedule-add form [name="movie"]');
let startDateInput = By.css('app-schedule-add form [name="startDate"]');
let hourInput = By.css('input[aria-label="Hours"]');
let minInput = By.css('app-schedule-add form [placeholder="MM"]');
let priceInput = By.css('app-schedule-add form [name="ticketPrice"]');
let addButton = By.css('app-schedule-add form [type="submit"]');
let movieNameInDetail = By.css('app-movie-detail h5');
let backToListLink = By.css('app-schedule-add a');

class AddSchedulePage extends BasePage {

    selectCinemaName = async (cinemaName) => {
        await this.clickElement(cinemaDropdown);
        //let dropdown = await this.driver.wait(until.elementsLocated(cinemaDropdown), 50000)
        let options = await this.driver.findElements(cinemaOptions);
        // let selectedOption = await options.findElements(By.css('option'));
        
        for(let i = 0; i < options.length; i++)
        {
           let text = await options[i].getAttribute('text');
            if(text == cinemaName)
            {
                await options[i].click();
                break;
            }
        }
    }

    getCinemaList = async () => {
        let listOfArr = [];

        await this.clickElement(cinemaDropdown);
        let dropdownContainer = await this.driver.findElement(cinemaDropdown);
        let dropdownOptions = await dropdownContainer.findElements(By.css('option'));

        for (let index = 1; index < dropdownOptions.length; index++) {
        
        let text = await dropdownOptions[index].getText();
            listOfArr.push(text.trim());
        }

        return listOfArr;
    }


    getMovieList = async () => {
        let listOfArr = [];

        await this.clickElement(cinemaDropdown);
        let dropdownContainer = this.driver.findElement(movieDropdown)
        let dropdownOptions = await dropdownContainer.findElements(By.css('option'));

        for (let index = 1; index < dropdownOptions.length; index++) {
        let text = await dropdownOptions[index].getText();
            listOfArr.push(text.trim());
        }

        return listOfArr;
    }


    selectMovieName = async (movieName) => {
        let options = this.driver.findElement(movieDropdown)
        let selectedOption = await options.findElements(By.css('option'));

        for(let i =0; i< selectedOption.length; i++)
        {
           let text = await selectedOption[i].getText();

            if(text.trim().includes(movieName))
            {
                await selectedOption[i].click();
            }
        }
    }

    selectRandomCinema = async () => {
        await this.clickElement(cinemaDropdown);
        let option = await this.driver.findElement(cinemaDropdown);
        let selectedOption = await option.findElements(By.css('option'));

        let randomMovie = Math.floor(Math.random() * selectedOption.length);

        if (!randomMovie == 0) {
            selectedOption[randomMovie].click();
        } else {
            selectedOption[randomMovie + 1].click();
        }
    }

    selectRandomMovieName = async () => {

        await this.clickElement(movieDropdown);
        let options = await this.driver.findElement(movieDropdown)
        let selectedOption = await options.findElements(By.css('option'));

        let randomMovie =  Math.floor(Math.random() * selectedOption.length);

        if (!randomMovie == 0) {
            selectedOption[randomMovie].click();
        }else {
            selectedOption[randomMovie + 1].click();
        }
    }

    addSchedule = async (cinema, movie, startDate, hr, min, price) => {
        await this.selectCinemaName(cinema);
        await this.selectMovieName(movie);
        await this.enterStartDate(startDate);

        await this.driver.sleep(5000);
        await this.clickElement(hourInput);
        await this.driver.findElement(hourInput).clear();
        await this.enterText(hourInput, hr)

        await this.driver.findElement(minInput).clear();
        await this.enterText(minInput, min)

        await this.enterTicketPrice(price);
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
        await this.verifyElementEnabled(addButton);
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

    getCinemaNames = async () => {
        await this.clickElement(cinemaDropdown);
        return await this.getText(cinemaDropdown);
    }  
    
    addDays = async (days) => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate() + days;

        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        return `${year}-${month}-${day}`;
    }

    isPageLoaded = async () => {
        await this.verifyPageLoad(cinemaDropdown) && this.verifyPageLoad(movieDropdown);
    }

}
module.exports = AddSchedulePage;