const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

let emailField = By.css('input[formcontrolname="email"]');
let passwordField = By.css('input[formcontrolname="password"]');
let firstNameField = By.css('input[formcontrolname="firstName"]');
let middleNameField = By.css('input[formcontrolname="middleName"]');
let lastNameField = By.css('input[formcontrolname="lastName"]');
let birthdayField = By.css('input[formcontrolname="birthDay"]');
let registerButton = By.css('button[type="submit"]');
let bdayIcon = By.css('icon ion-ios-calendar');
let emailErrorMsg = By.css('span[class="ng-star-inserted"]');
let passwordErrorMsg = By.css('div[class="ng-star-inserted"]');
let firstNameErrorMsg = By.css('div.row:nth-child(2) div[class="ng-star-inserted"]');
let lastNameErrorMsg = By.css('div.row:nth-child(3) div[class="ng-star-inserted"]');
let bdayErrorMsg = By.css('div.row:nth-child(3) div:nth-child(2) div[class="ng-star-inserted"]');
let loginButton = By.css('a[href="/login"]');
let birthMonthDP = By.css('select:first-child option[class="ng-star-inserted"]');
let birthYearDP = By.css('select:nth-child(2) option[class="ng-star-inserted"]');
let birthDayDP = By.css('div[class="btn-light ng-star-inserted"]');

class RegisterPage extends BasePage {
    
    inputUserDetails = async (email, password, firstName, middleName, lastName, birthday) => {
        await this.enterText(emailField, email);
        await this.enterText(passwordField, password);
        await this.enterText(firstNameField, firstName);
        await this.enterText(middleNameField, middleName);
        await this.enterText(lastNameField, lastName);
        await this.enterText(birthdayField, birthday);
    }

    clickRegisterButton = async () => {
        await this.clickElement(registerButton);
    }
    getEmailErrorMessage = async () => {
        return await this.getText(emailErrorMsg);
    }
    getPasswordErrorMessage = async () => {
        return await this.getText(passwordErrorMsg);
    }
    getFirstNameErrorMessage = async () => {
        return await this.getText(firstNameErrorMsg);
    }
    getLastNameErrorMessage = async () => {
        return await this.getText(lastNameErrorMsg);
    }
    getBdayErrorMessage = async () => {
        return await this.getText(bdayErrorMsg);
    }
    clickBirthdayDatePickerIcon = async () => {
        await this.clickElement(bdayIcon);
    }
    selectBirthMonth = async (birthMonth) => {
        let month = await this.driver.findElements(birthMonthDP);
        for(let i = 0; i < month.length; i++) {
            if (await month[i].getText() === birthMonth) {
                await month[i].click();
            }
        }
    }
    selectBirthYear = async (birthYear) => {
        let year = await this.driver.findElements(birthYearDP);
        for (let i = 0; i < year.length; i++) {
            if (await year[i].getText() === birthYear) {
                await year[i].click();
            }
        }
    }
    selectBirthDay = async (birthDay) => {
        let day = await this.driver.findElements(birthDayDP);
        for (let i = 0; i < year.length; i++) {
            if (await day[i].getText() === birthDay) {
                await day[i].click();
            }
        }
    }
    verifyRegisterButtonDisabled = async () => {
        return await this.verifyElementEnabled(registerButton);
    }
    clickLoginMemberAccount = async () => {
        await this.clickElement(loginButton);
    }
    isPageLoaded = async () => {
        return await this.verifyPageLoad(firstNameField);
    }
}

module.exports = RegisterPage;

