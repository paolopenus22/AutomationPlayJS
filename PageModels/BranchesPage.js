const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

let branchCard = By.css('app-branch-card');
let branchName = By.css("app-branch-card span");
let branchAddress = By.css("app-branch-card p");
let checkScheduleBtn = By.css("app-branch-card [class='btn btn-info m-2']");

class BranchesPage extends BasePage {

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
    
    isPageLoaded = async () => {
        return this.verifyPageLoad(branchCard);
    }
}
module.exports = BranchesPage;