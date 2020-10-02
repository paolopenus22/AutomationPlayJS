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

       await driver.findElement(By.css("a[href='/login']")).click();       
       
       await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(invalidEmail);       
       let getErrorMsg = await driver.findElement(By.css("[class='text-danger'] span")).getText();

        expect(getErrorMsg).toBe(errorMsg);

    }, timeout);

    test('Verify error message when Email is null', async () => {     
        let nullEmail = '';
        let errorMsg = 'Email is required.';
     
        await driver.findElement(By.css("a[href='/login']")).click();       
            
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(nullEmail);       
        await driver.findElement(By.css("i[class='icon ion-ios-person']")).click();
        let getErrorMsg = await driver.findElement(By.css("[class='text-danger'] span")).getText();
     
        expect(getErrorMsg).toBe(errorMsg);
     
    }, timeout);
    
    test('Verify error message when Password is null', async () => {     
        let email = 'DoNotUse_NormalAcccount@mail.com';
        let nullPassword =  '';
        let errorMsg = 'Password is required.';
     
        await driver.findElement(By.css("a[href='/login']")).click();       
            
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(email);
        await driver.findElement(By.css("input[formcontrolname='password']")).sendKeys(nullPassword);       
        await driver.findElement(By.css("i[class='icon ion-ios-key']")).click();
        let getErrorMsg = await driver.findElement(By.css("[class='text-danger'] div")).getText();
     
        expect(getErrorMsg).toBe(errorMsg);
     
    }, timeout);

    test('Verify error message when Users password is incorrect', async () => {     
        let email = 'DoNotUse_NormalAcccount@mail.com';
        let invalidPassword =  '1234';
        let errorMsg = 'Incorrect password';
     
        await driver.findElement(By.css("a[href='/login']")).click();       
            
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(email);
        await driver.findElement(By.css("input[formcontrolname='password']")).sendKeys(invalidPassword);       
        await driver.findElement(By.css("button[type='submit']")).click();
        
        await driver.sleep(2000);
        let getErrorMsg = await driver.findElement(By.css("[class='text-danger'] p")).getText();
     
        expect(getErrorMsg).toBe(errorMsg);
     
    }, timeout);

    test('Verify login button is disabled when there is an error in login', async () => {     
        let nullEmail = '';
     
        await driver.findElement(By.css("a[href='/login']")).click();       
            
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(nullEmail);       
        await driver.findElement(By.css("i[class='icon ion-ios-person']")).click();
        let getErrorMsg = await driver.findElement(By.css("button[type='submit']")).isEnabled();
     
        expect(!getErrorMsg).toBe(true);
     
    }, timeout);

    afterEach(async () => {
        await driver.close();
    });
});

