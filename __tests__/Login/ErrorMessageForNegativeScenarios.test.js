let LandingPage = require('../../PageModels/LandingPage');
let LoginPage = require('../../PageModels/LoginPage');
let RegisterPage = require('../../PageModels/RegisterPage');
let faker = require('faker');

describe('Error messages for negative login scenarios', () => {

    let adminFirstName = faker.name.firstName();
    let adminMiddleName = faker.name.lastName();
    let adminLastName = faker.name.lastName();
    let adminEmail = adminFirstName + adminLastName + '@admin.com';
    let adminPassword = faker.internet.password();
    let adminBday = faker.date.past(40).toISOString();
    
    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.loginPage = new LoginPage();
        this.registerPage = new RegisterPage();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
        await this.landingPage.clickRegisterButton();
        await this.registerPage.inputUserDetails(adminEmail, adminPassword, adminFirstName, adminMiddleName, adminLastName, adminBday);
        await this.registerPage.clickRegisterButton();
    });
    test('Verify error message when Email is invalid', async () => {
        let invalidEmail = 'Abcd';
        let errorMsg = 'Invalid email.';
       
        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();      
        await this.loginPage.isPageLoaded();
        await this.loginPage.inputLoginCredentials(invalidEmail, '');
        let getErrorMsg = await this.loginPage.getEmailErrorMessage();
        expect(getErrorMsg).toBe(errorMsg);
    });
    test('Verify error message when Email is null', async () => {     
        let nullEmail = '';
        let errorMsg = 'Email is required.';
     
        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();  
        await this.loginPage.isPageLoaded();
        await this.loginPage.inputLoginCredentials(nullEmail, '');   
        await this.loginPage.clickEmailIcon();
        let getErrorMsg = await this.loginPage.getEmailErrorMessage();
        expect(getErrorMsg).toBe(errorMsg);
    });
    test('Verify error message when Password is null', async () => {     
        let email = 'DoNotUse_NormalAcccount@mail.com';
        let nullPassword =  '';
        let errorMsg = 'Password is required.';
     
        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();     
        await this.loginPage.isPageLoaded();
        await this.loginPage.inputLoginCredentials(email, nullPassword);         
        await this.loginPage.clickPasswordIcon();
        let getErrorMsg = await this.loginPage.getRequiredPasswordErrorMessage();
        expect(getErrorMsg).toBe(errorMsg);
    });
    test('Verify error message when Users password is incorrect', async () => {     
        let email = adminEmail;
        let invalidPassword =  '1234';
        let errorMsg = 'Incorrect password';
     
        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();
        await this.loginPage.isPageLoaded();        
        await this.loginPage.inputLoginCredentials(email, invalidPassword);  
        await this.loginPage.clickLoginButton();   
        let getErrorMsg = await this.loginPage.getIncorrectPasswordErrorMessage();
        expect(getErrorMsg).toBe(errorMsg);
     
    });
    test('Verify login button is disabled when there is an error in login', async () => {     
        let nullEmail = '';
     
        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();          
        await this.loginPage.isPageLoaded();   
        await this.loginPage.inputLoginCredentials(nullEmail, '');        
        await this.loginPage.clickEmailIcon();
        let buttonSubmit = await this.loginPage.verifyLoginButtonDisabled();
        expect(!buttonSubmit).toBe(true);
    });
    afterAll(async () => {
       await this.landingPage.closeMoviesApp();
    });
});

