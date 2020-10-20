const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

let moviesTab = By.css('a[href="/movies"]');
let branchesTab = By.css('a[href="/branches"]');
let adminTab = By.css('a[href="/admin"]');
let logoutButton = By.css('button[class="btn btn-link nav-link"]');
let userLoggedin = By.css('ul:nth-child(2) a[class="nav-link"]');
let movieList = By.css('div[class="text-center"]:nth-child(2) a');
let movieTrailerButton = By.css('div[class="text-center"]:nth-child(3) button:first-child');
let getTicketButton = By.css('div[class="text-center"]:nth-child(3) button:nth-child(2)');
let movieTimeSlot = By.css('br[_ngcontent-yho-c22]:nth-child(2)');

class HomePage extends BasePage {
    
    verifyMoviesTabisDisplayed = async () => {
        return await this.verifyPageLoad(moviesTab);
    }
    verifyBrachesTabisDisplayed = async () => {
        return await this.verifyPageLoad(branchesTab);
    }
    verifyAdminTabisDisplayed = async () => {
        return await this.verifyPageLoad(adminTab);
    }
    verifyUserLoggedin = async () => {
        return await this.getText(userLoggedin);
    }
    verifyLogoutButtonisDisplayed = async () => {
        return await this.verifyPageLoad(logoutButton);
    }
    clickMoviesTab = async () => {
        await this.clickElement(moviesTab);
    }
    clickBranchesTab = async () => {
        await this.clickElement(branchesTab);
    }
    clickAdminTab = async () => {
        await this.clickElement(adminTab);
    }
    clickLogoutButton = async () => {
        await this.clickElement(logoutButton);
    }
    checkMoviesAvailable = async (selectMovie, movieTime) => {
        let movies = await this.driver.findElements(movieList);
        let time = await this.driver.findElements(movieTimeSlot);
        for (let i = 0; i < movies.length; i++) {
            if (await movies[i].getText() === selectMovie && await time[i].getText() === movieTime) {
                if (this.driver.findElement(getTicketButton)) {
                    await getTicketButton.click();
                } 
                if (this.driver.findElement(movieTrailerButton)) {
                    await movieTrailerButton.click();
                }
            }
        }
    }
    isPageLoaded = async () => {
        return await this.verifyPageLoad(adminTab);
    }
}

module.exports = HomePage;