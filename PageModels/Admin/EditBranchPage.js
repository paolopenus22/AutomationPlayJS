const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");
const BranchesPage = require("../BranchesPage");
const EditCinemaPage = require("../Admin/EditCinemaPage");
const AdminSchedulePage = require("../Admin/AdminSchedulePage");
const AddCinemaPage = require("../Admin/AddCinemaPage");

let updateBtn = By.css('button[type="submit"]');
let addCinemaBtn = By.css('button.btn-outline-secondary');
let viewSchedulesBtn = By.css('button.btn-outline-info');
let cinemaLinks = By.css('a[href*="/admin/branch/"]');
let backLinkText = By.css('a[href="/admin/branch"]');
let addCinema = By.css('button[class="btn btn-outline-secondary mr-2"]');
let cinemaList = By.css('h4 + ul');


class EditBranchPage extends BasePage {

    clickUpdateButton = async () => {
        await this.clickElement(updateBtn);
    }

    clickAddCinema = async () => {
        await this.clickElement(addCinemaBtn);
    }

    clickViewSchedules = async () => {
        await this.clickElement(viewSchedulesBtn);
        return new AdminSchedulePage();
    }

    isCinemaDisplayed = async (cinemaName) => {
        await this.driver.wait(until.elementLocated(cinemaLinks), 5000)
       return await this.driver.findElements(By.partialLinkText(cinemaLinks, cinemaName)).isDisplayed();
    }

    clickBackToList = async () => {
        await this.clickElement(backLinkText);
        return new BranchesPage();
    }

    getCinemasCount = async () => {
        return await this.driver.findElement(cinemaLinks).count();
    }

    clickCinemaLink = async (cinemaName) => {
        let cinemaList = await this.driver.findElement(cinemaLinks);
        for (let index = 0; index < cinemaList.length; index++) {
            if (await cinemaName.includes(cinemaList[index])) {
                await cinemaList[index].click();
            }           
        }
        return new EditCinemaPage();
    }

    getCinemaName = async (cinemaName) => {
        let cinemaLink = await this.driver.findElement(cinemaLinks);
        let cinemaLinkName = "";
        for (let index = 0; index < cinemaLink.length; index++) {
           if (await cinemaName.includes(cinemaLink[index])) {
               cinemaLinkName = cinemaLink[index].getText();
           }
        }
        return cinemaLinkName;
    }

    clickAddButton = async () => {
        await this.clickElement(addCinema);
        return new AddCinemaPage();
    }

    verifyCinema = async () => {               
        return await this.getText(cinemaList);
    }

    isPageLoaded = async () => {
        await this.verifyPageLoad(addCinema) && this.verifyPageLoad(cinemaList);
    }
}


module.exports = EditBranchPage;
