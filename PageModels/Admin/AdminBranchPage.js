const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let branchCard = By.css('app-admin app-branch-card');
let branchName = By.css("app-admin app-branch-card a");
let branchAddress = By.css("app-admin app-branch-card p");
let checkScheduleBtn = By.css("app-admin app-branch-card [class='btn btn-info m-2']");
let branchTextBox = By.css('app-admin [id="txtSearchBranch"]');
let branchSearchDropDown = By.css('app-admin ngb-typeahead-window ngb-highlight');
let itemsPerPage = By.css('app-admin form [name="itemsPerPage"]');
let nextPagination = By.css('app-admin [class="pagination-next"]');
let previousPagination = By.css('app-admin [class="pagination-previous"]');
let branchLogo = By.css('div.text-center a img');

class AdminBranchPage extends BasePage {

    CheckScheduleOfBranchName = async(name) => {
        let cards = await this.driver.findElements(branchCard);
        for(let i = 0; i < cards.length; i++)
        {
            if(await cards[i].findElement(branchName).getText() === name)
            {
                await cards[i].findElement(checkScheduleBtn).click();
                break;
            }
        }
    }

    CheckScheduleOfBranchAddress = async(address) => {
        let cards = await this.driver.findElements(branchCard);            
        for(let i = 0; i < cards.length; i++)
        {
            if(await cards[i].findElement(branchAddress).getText() === address)
            {
                await cards[i].findElement(checkScheduleBtn).click();
                break;
            }
        }
    }

    ClickCheckScheduleOfRandomBranch = async() => {
        let cards = await this.driver.findElements(branchCard);            
        let index = Math.floor(Math.random() * cards.length);

        await cards[index].findElement(checkScheduleBtn).click();
    }

    ClickRandomBranch = async() => {
        let cards = await this.driver.findElements(branchCard);            
        let index = Math.floor(Math.random() * cards.length);

        await cards[index].findElement(branchLogo).click();
    }
    
    isPageLoaded = async () => {
        await this.verifyPageLoad(branchLogo) && this.verifyPageLoad(branchCard);
    }

    SearchForBranchName = async (name) => {
        await this.enterText(branchTextBox, name);
    }

    SelectFromDropDownSearch = async () => {
        await this.clickElement(branchSearchDropDown);
    }

    itemPerPage = async(num) => {
        await this.clickElement(itemsPerPage);
        let options = await this.driver.findElement(itemsPerPage).findElements('option');

        for(let i =0; i< options.length; i++)
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
module.exports = AdminBranchPage;