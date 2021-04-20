const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");
const EditBranchPage = require("../Admin/EditBranchPage");

let branchCard = By.css('app-admin app-branch-list .branch-card');
let branchName = By.css("app-admin app-branch-list .branch-card div:nth-child(2) a");
let branchAddress = By.css("app-admin app-branch-card p");
let checkScheduleBtn = By.css("[class='btn btn-info m-2']");
let branchTextBox = By.css('app-admin [id="txtSearchBranch"]');
let branchSearchDropDown = By.css('app-admin ngb-typeahead-window ngb-highlight');
let itemsPerPage = By.css('app-admin form [name="itemsPerPage"]');
let nextPagination = By.css('app-admin [class="pagination-next"]');
let previousPagination = By.css('app-admin [class="pagination-previous"]');
let branchLogo = By.css('div.text-center a img');
let branchLink = By.css('div:nth-child(2) a');
let addBranchButton = By.css('button[class="btn btn-outline-primary mr-3"]');

class AdminBranchPage extends BasePage {

    CheckScheduleOfBranchName = async(name) => {
        await this.driver.wait(until.elementLocated(branchCard), 10000);
        let cards = await this.driver.findElements(branchCard);   

        for(let i = 0; i < cards.length; i++)
        {       
            if(await cards[i].findElement(branchName).getText() === name)
            {
                await cards[i].findElement(checkScheduleBtn).click();
                return new EditBranchPage();
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
        await this.driver.wait(until.elementLocated(branchCard), 10000);
        let cards = await this.driver.findElements(branchCard);            
        let index = Math.floor(Math.random() * cards.length);

        await this.driver.wait(until.elementLocated(branchLogo), 10000);
        await cards[index].findElement(branchLogo).click();
        
        return new EditBranchPage();
    }
    
    isPageLoaded = async () => {
        await this.verifyPageLoad(branchLink) && this.verifyPageLoad(branchCard);
    }

    SearchForBranchName = async (name) => {
        await this.enterText(branchTextBox, name);
    }

    SelectFromDropDownSearch = async () => {
        await this.clickElement(branchSearchDropDown);
    }

    itemPerPage = async(num) => {
        await this.clickElement(itemsPerPage);
        let options = await this.driver.findElement(itemsPerPage)
        let selectedOption = await options.findElements(By.css('option'));

        for(let i =0; i< selectedOption.length; i++)
        {
            if(selectedOption[i].getText() == num)
            {
                await selectedOption[i].click();
            }
        }
    }

    clickNextPagination = async() => {
        await this.clickElement(nextPagination);
    }

    clickPreviousPagination = async() => {
        await this.clickElement(previousPagination);
    }

    clickBranchNameLogo = async(name) => {     
        let cards = await this.driver.findElements(branchCard);            
        for(let i = 0; i < cards.length; i++)
        {
            if(await cards[i].findElement(branchName).getText() === name)
            {
                await cards[i].findElement(branchLogo).click();
                break;
            }
        }        
        return new EditBranchPage();
    }

    // Use this in case branch logo is not yet loading
    ClickRandomBranchLink = async() => {     
        await this.driver.wait(until.elementLocated(branchCard), 10000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(branchCard)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(branchCard)), 50000);        
        let cards = await this.driver.findElements(branchCard);        
        let index = Math.floor(Math.random() * cards.length);

        await this.driver.wait(until.elementLocated(branchLink), 10000);
        await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(branchLink)), 50000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(branchLink)), 50000);
        await cards[index].findElement(branchLink).click();        
        return new EditBranchPage();
    }

    clickAddBranchButton = async () => {
        await this.clickElement(addBranchButton);
    }
}
module.exports = AdminBranchPage;