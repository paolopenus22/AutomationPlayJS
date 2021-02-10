const { By, Key, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");


let movieCard = By.css('app-movie-card');
let movieCardsDetails = By.css('.movie-card div:nth-child(2) a')


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

}
module.exports = MoviesPage;