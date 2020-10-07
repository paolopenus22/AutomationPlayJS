let LandingPage = require('../../PageModels/LandingPage');
let LoginPage = require('../../PageModels/LoginPage');


describe('Error messages for negative login scenarios', () => {

    beforeEach(async () => {
        this.landingPage = new LandingPage();
        this.loginPage = new LoginPage();
        jest.setTimeout(40000);
        await this.landingPage.navigateToMoviesApp();
    });

    test('Verify error message when Email is invalid', async () => {
       let invalidEmail = 'Abcd';
       let errorMsg = 'Invalid email.';
       
       //Click Login Tab
        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();      
       //Enter invalid email  
        await this.loginPage.isPageLoaded();
        await this.loginPage.inputLoginCredentials(invalidEmail, '');
       //Get the error message
        let getErrorMsg = await this.loginPage.getEmailErrorMessage();
       //Compare the expected message vs actual
        expect(getErrorMsg).toBe(errorMsg);

    });

    // test('Verify error message when Email is null', async () => {     
    //     let nullEmail = '';
    //     let errorMsg = 'Email is required.';
     
    //     //Click Login Tab
    //     await this.landingPage.isPageLoaded();
    //     await this.landingPage.clickLoginButton();  
    //     //Enter null email    
    //     await this.loginPage.isPageLoaded();
    //     await this.loginPage.inputLoginCredentials(nullEmail, '');   
    //     //To click away
    //     await this.loginPage.clickEmailIcon();
    //     //Get the error message
    //     let getErrorMsg = await this.loginPage.getEmailErrorMessage();
    //     //Compare the expected message vs actual
    //     expect(getErrorMsg).toBe(errorMsg);
     
    // });
    
    // test('Verify error message when Password is null', async () => {     
    //     let email = 'DoNotUse_NormalAcccount@mail.com';
    //     let nullPassword =  '';
    //     let errorMsg = 'Password is required.';
     
    //     //Click Login Tab
    //     await this.landingPage.isPageLoaded();
    //     await this.landingPage.clickLoginButton();     
    //     //Enter email   
    //     //Enter null password
    //     await this.loginPage.isPageLoaded();
    //     await this.loginPage.inputLoginCredentials(email, nullPassword);         
    //     //To click away
    //     await this.loginPage.clickPasswordIcon();
    //     //Get the error message
    //     let getErrorMsg = await this.loginPage.getRequiredPasswordErrorMessage();
    //     //Compare the expected message vs actual
    //     expect(getErrorMsg).toBe(errorMsg);
     
    // });

    // test('Verify error message when Users password is incorrect', async () => {     
    //     let email = 'DoNotUse_NormalAcccount@mail.com';
    //     let invalidPassword =  '1234';
    //     let errorMsg = 'Incorrect password';
     
    //     //Click Login Tab
    //     await this.landingPage.isPageLoaded();
    //     await this.landingPage.clickLoginButton();        
    //     //Enter email
    //     //Enter invalid password
    //     await this.loginPage.isPageLoaded();
    //     await this.loginPage.inputLoginCredentials(email, invalidPassword);     
    //     //Click submit
    //     await this.loginPage.clickLoginButton();
    //     //Get the error message
    //     let getErrorMsg = await this.loginPage.getIncorrectPasswordErrorMessage();
    //     //Compare the expected message vs actual
    //     expect(getErrorMsg).toBe(errorMsg);
     
    // });

    // test('Verify login button is disabled when there is an error in login', async () => {     
    //     let nullEmail = '';
     
    //     //Click Login Tab
    //     await this.landingPage.isPageLoaded();
    //     await this.landingPage.clickLoginButton();          
    //     //Enter email
    //     await this.loginPage.isPageLoaded();   
    //     await this.loginPage.inputLoginCredentials(nullEmail, '');        
    //     //To click away
    //     await this.loginPage.clickEmailIcon();
    //     //Verify if submit button is disabled/enabled
    //     let buttonSubmit = await this.loginPage.verifyLoginButtonDisabled();
    //     //Check button submit is disabled
    //     expect(!buttonSubmit).toBe(true);

    // });

    afterEach(async () => {
        await this.landingPage.closeMoviesApp();
    });
});

