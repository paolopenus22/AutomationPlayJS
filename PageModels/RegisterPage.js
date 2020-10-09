const { By, until } = require("selenium-webdriver");
const BasePage = require("../PageModels/BasePage");

let emailField = By.css('input[formcontrolname="email"]');
let passwordField = By.css('input[formcontrolname="password"]');
let firstNameField = By.css('input[formcontrolname="firstName"]');
let middleNameField = By.css('input[formcontrolname="middleName"]');
let lastNameField = By.css('input[formcontrolname="lastName"]');
let birthdayField = By.css('input[formcontrolname="birthDay"]');
let registerButton = By.css('button[type="submit"]');

class RegisterPage extends BasePage {
    
    inputUserDetails = async (email, password, firstName, middleName, lastName, birthday) => {
        await this.enterText(emailField, email);
        await this.enterText(passwordField, password);
        await this.enterText(firstNameField, firstName);
        await this.enterText(middleNameField, middleName);
        await this.enterText(lastNameField, lastName);
        await this.enterText(birthdayField, birthday);
        await this.clickElement(registerButton);
    }
}

module.exports = RegisterPage;

