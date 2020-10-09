
const { Builder, By } = require("selenium-webdriver");
const chrome = require('chromedriver');
let driver = new Builder().forBrowser('chrome').build();;
class BranchesPage {

    constructor()
    {
        this.branchCard = driver.$$("app-branch-card");
        this.branchName = driver.$$("app-branch-card span");
        this.branchAddress = driver.$$("app-branch-card p");
        this.checkScheduleBtn = driver.$$("app-branch-card [class='btn btn-info m-2']");        
    }

    ClickCheckScheduleOfBranchName = async(branchName) => 
    {
        await this.branchCard.filter((elem) => {
            return elem.$$("app-branch-card span").get(1).getText().then(async(text) => {
                return  await text.includes(await branchName);
            })
        }).$$("app-branch-card [class='btn btn-info m-2']").click();
    }

    ClickCheckScheduleOfBranchAddress = async(branchAddress) => 
    {
        await this.branchCard.filter((elem) => {
            return elem.$$("app-branch-card p").get(1).getText().then(async(text) => {
                return  await text.includes(await branchAddress);
            })
        }).$$("app-branch-card [class='btn btn-info m-2']").click();
    }

    ClickCheckScheduleOfRandomBranch = async() => {
        let randomNum = this.checkScheduleBtn.count().then(function(num){
            return Math.floor(Math.random() * num);
        });
        this.checkScheduleBtn.get(randomNum).click();
    }

    


}
module.exports = BranchesPage;