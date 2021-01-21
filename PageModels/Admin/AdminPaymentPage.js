const { By, until } = require("selenium-webdriver");
const BasePage = require("../BasePage");

let transactionDateInput = By.css('[name="transactionDate"]');
let itemsPerPage = By.css('app-schedule-list form [name="itemsPerPage"]');
let nextPagination = By.css('pagination-template [class="pagination-next"]');
let previousPagination = By.css('pagination-template [class="pagination-previous"]');
let addPaymentPage = By.css('app-payment-list');
let transactionDate = By.css('td[class="transaction-date"] a');
let description = By.css('td[class="description"]');
let amount = By.css('td[class="amount"]');


class AdminPaymentPage extends BasePage
{
    EnterTransactionDate = async(date) => 
    {
        await this.enterText(transactionDateInput, date);
    }

    ClickTransactionDate = async(sched) => 
    {
        let date = await this.driver.findElements(transactionDate);
        for(let i = 0; i < date.length; i++)
        {
            if(await date[i].getText() === sched)
            {
                await date[i].click();
                break;
            }
        }
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

    isPageLoaded = async () => {
        await this.verifyPageLoad(addPaymentPage);
    }

    getDescription = async() => {
        return await description.getText();
    }

    getAmount = async() => {
        return await amount.getText();
    }
}

module.exports = AdminPaymentPage;