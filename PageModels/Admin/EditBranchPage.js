const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");
const BranchesPage = require("../BranchesPage");
const EditCinemaPage = require("../Admin/EditCinemaPage");
const AddCinemaPage = require("../Admin/AddCinemaPage");
const AdminSchedulePage = require("../Admin/AdminSchedulePage");

let updateBtn = By.css('button[type="submit"]');
let addCinemaBtn = By.css('button.btn-outline-secondary');
let viewSchedulesBtn = By.css('button.btn-outline-info');
let cinemaLinks = By.css('app-cinema-list > ul');
let backLinkText = By.css('a[href="/admin/branch"]');
let editBranchHeader = By.css('app-branch-edit h4');
let cinemaHeader = By.css('app-cinema-list h4');
let addCinema = By.css('button[class="btn btn-outline-secondary mr-2"]');
let cinemaList = By.css('h4 + ul');
let cinemaItems = By.css('h4 + ul > li > a');


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
        let count = 0;
        await this.driver.wait(until.elementLocated(cinemaLinks), 5000);
        let cinemas = await this.driver.findElement(cinemaLinks);
        await cinemas.findElements(By.css('li > a')).then((elements) => {
            count = elements.length;    
        });
        return count;
    }

    clickCinemaLink = async (cinemaName) => {        
        let list = await this.driver.findElements(cinemaItems);            
        for(let i = 0; i < list.length; i++)
        {
            if(await list[i].getText() == `${cinemaName}`)
            {
                await list[i].click();
                return new EditCinemaPage();
            }
        }
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
        await this.driver.wait(until.elementLocated(cinemaList), 10000);           
        return await this.getText(cinemaList);
    }

    isPageLoaded = async () => {
        await this.verifyPageLoad(addCinema) && this.verifyPageLoad(cinemaList);
        return new EditBranchPage();
    }

    isPageLoadedBack = async () => {
        await this.driver.wait(until.elementLocated(addCinema), 10000);
        return this.verifyPageLoad(addCinema) && this.verifyPageLoad(cinemaList);
    }

    clickRandomCinemaLink = async () => {
        let items = await this.driver.findElements(cinemaItems);
        let index = Math.floor(Math.random() * items.length);

        await items[index].click();
        return new EditCinemaPage();
    }
    getCinemaList = async () => {
        let listOfArr = [];
        let containerLinks = await this.driver.findElement(cinemaLinks);
        let links = await containerLinks.findElements(By.css('li > a'));
        let text;

        for (let i = 0; i < links.length; i++) {
            text = await links[i].getText();
            listOfArr.push(text);
        }
        return listOfArr;
    }
}


module.exports = EditBranchPage;
