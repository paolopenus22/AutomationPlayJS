const { Builder, By } = require("selenium-webdriver");
const chrome = require('chromedriver');


describe('Error messages for negative login scenarios', () => {
    let driver;
    let timeout = 100000;

    beforeEach(async () => {
        jest.setTimeout(40000);
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get("http://magenicmovies.azurewebsites.net");
    });

    test('Verify error message when Email is invalid', async () => {
       let invalidEmail = 'Abcd';
       let errorMsg = 'Invalid email.';
       
       //Click Login Tab
       await driver.findElement(By.css("a[href='/login']")).click();       
       
       //Enter invalid email
       await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(invalidEmail);       
       
       //Get the error message
       let getErrorMsg = await driver.findElement(By.css("[class='text-danger'] span")).getText();

       //Compare the expected message vs actual
        expect(getErrorMsg).toBe(errorMsg);

    }, timeout);

    test('Verify error message when Email is null', async () => {     
        let nullEmail = '';
        let errorMsg = 'Email is required.';
     
        //Click Login Tab
        await driver.findElement(By.css("a[href='/login']")).click();

        //Enter null email    
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(nullEmail);       
        
        //To click away
        await driver.findElement(By.css("i[class='icon ion-ios-person']")).click();
        
        //Get the error message
        let getErrorMsg = await driver.findElement(By.css("[class='text-danger'] span")).getText();
     
        //Compare the expected message vs actual
        expect(getErrorMsg).toBe(errorMsg);
     
    }, timeout);
    
    test('Verify error message when Password is null', async () => {     
        let email = 'DoNotUse_NormalAcccount@mail.com';
        let nullPassword =  '';
        let errorMsg = 'Password is required.';
     
        //Click Login Tab
        await driver.findElement(By.css("a[href='/login']")).click();       

        //Enter email  
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(email);
        
        //Enter null password
        await driver.findElement(By.css("input[formcontrolname='password']")).sendKeys(nullPassword);       
        
        //To click away
        await driver.findElement(By.css("i[class='icon ion-ios-key']")).click();
        
        //Get the error message
        let getErrorMsg = await driver.findElement(By.css("[class='text-danger'] div")).getText();
     
        //Compare the expected message vs actual
        expect(getErrorMsg).toBe(errorMsg);
     
    }, timeout);

    test('Verify error message when Users password is incorrect', async () => {     
        let email = 'DoNotUse_NormalAcccount@mail.com';
        let invalidPassword =  '1234';
        let errorMsg = 'Incorrect password';
     
        //Click Login Tab
        await driver.findElement(By.css("a[href='/login']")).click();       
        
        //Enter email
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(email);
        
        //Enter invalid password
        await driver.findElement(By.css("input[formcontrolname='password']")).sendKeys(invalidPassword);       
        
        //Click submit
        await driver.findElement(By.css("button[type='submit']")).click();
        
        //Get the error message
        await driver.sleep(2000);
        let getErrorMsg = await driver.findElement(By.css("[class='text-danger'] p")).getText();
     
        //Compare the expected message vs actual
        expect(getErrorMsg).toBe(errorMsg);
     
    }, timeout);

    test('Verify login button is disabled when there is an error in login', async () => {     
        let nullEmail = '';
     
        //Click Login Tab
        await driver.findElement(By.css("a[href='/login']")).click();       

        //Enter email    
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(nullEmail);       
        
        //To click away
        await driver.findElement(By.css("i[class='icon ion-ios-person']")).click();
        
        //Verify if submit button is disabled/enabled
        let buttonSubmit = await driver.findElement(By.css("button[type='submit']")).isEnabled();
     
        //Check button submit is disabled
        expect(!buttonSubmit).toBe(true);
     
    }, timeout);

    afterEach(async () => {
        await driver.close();
    });
});

