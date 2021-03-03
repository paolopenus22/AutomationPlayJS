const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");


let movieCard = By.css('app-movie-card');
let movieCardsDetails = By.css('.movie-card div:nth-child(2) a');
let getTicketButton = By.css('button:nth-child(2)');


class MoviesPage extends BasePage {


    getListOfMovieTitles = async () => {
        let movieTitleList = [];
        let movieTitles;

        await this.driver.wait(until.elementsLocated(movieCard), 50000);
        let movieCardsTitle= await this.driver.findElements(movieCardsDetails);

        for (let i = 0; i < movieCardsTitle.length; i++) {
            await this.driver.wait(until.elementIsVisible(movieCardsTitle[i]), 50000);
            movieTitles = await movieCardsTitle[i].getText();
            movieTitleList.push(movieTitles);
        }
        return movieTitleList;
    }

    isPageLoaded = async () => {
        return await this.verifyPageLoad(movieCard) && this.verifyPageLoad(movieCardsDetails);
    }

    getTicketOfMovie = async (name)=> {
        await this.driver.wait(until.elementsLocated(movieCard), 50000);
        
        let movieCardsTitle= await this.driver.findElements(movieCardsDetails);
        let card = await this.driver.findElements(movieCard);

        for (let i = 0; i < movieCardsTitle.length; i++) {
            
            if (await movieCardsTitle[i].getText() === name)
            {
                card[i].findElement(getTicketButton).click();
            }
        }
    }
    getCurrentUrl = async () => {
        let currentUrl = await this.driver.getCurrentUrl();
        return currentUrl;
    }
}
module.exports = MoviesPage;