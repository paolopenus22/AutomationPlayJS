const { Builder, By , until } = require("selenium-webdriver");
const chromedriver = require('chromedriver');

describe('Test Automation', () => {
    let driver;
    let timeout = 100000;
    let userEmail = "Test@yahoo.com";
    let userPassword = "test123";

    beforeEach(async () => {
        jest.setTimeout(40000);
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://magenicmovies.azurewebsites.net');
    });

    test('TC1 - Create normal account using any email except for the admin domain', async () => {

        // Click Register 
        await driver.findElement(By.css("a[href='/register']")).click();

        // Input Email
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(userEmail);

        // Input Password
        await driver.findElement(By.css("input[formcontrolname='password']")).sendKeys(userPassword);

        // Input First Name
        let firstName = "Rowel";
        await driver.findElement(By.css("input[formcontrolname='firstName']")).sendKeys(firstName);

        // Input Middle Name
        let middleName = "Olino";
        await driver.findElement(By.css("input[formcontrolname='middleName']")).sendKeys(middleName);

        // Input Last Name
        let lastName = "Libunao";
        await driver.findElement(By.css("input[formcontrolname='lastName']")).sendKeys(lastName);

        // Input BirthDay
        let birthDay = "2020-10-14";
        await driver.findElement(By.css("input[formcontrolname='birthDay']")).sendKeys(birthDay);

        // Register Button
        await driver.findElement(By.css("button[type='submit']")).click();
        await driver.sleep(50000);

    }, timeout);

    test('TC2 - Verify login to Movie App using the user created in AC1', async () => {

        // Click Login
        await driver.findElement(By.css("a[href='/login']")).click();

        // Input Email
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(userEmail);
    
        // Input Password
        await driver.findElement(By.css("input[formcontrolname='password']")).sendKeys(userPassword);

        // Click Login
        await driver.findElement(By.css("button[type='submit']")).click();

    }, timeout);

    test('TC3 - Verify the landing page after login. Tabs, registered email and logout button', async () => {

        // Click Login
        await driver.findElement(By.css("a[href='/login']")).click();

        // Input Email
        await driver.findElement(By.css("input[formcontrolname='email']")).sendKeys(userEmail);
      
        // Input Password
        await driver.findElement(By.css("input[formcontrolname='password']")).sendKeys(userPassword);
  
        // Click Login
        await driver.findElement(By.css("button[type='submit']")).click();

        await driver.sleep(5000);

        // Movie Tab
        const movieTab = await driver.findElement(By.css("a[href='/movies']"));
        await expect(movieTab).toBeTruthy();

        await driver.sleep(500);
        // Branches Tab
        const branchesTab = await driver.findElement(By.css("a[href='/branches']"));
        await expect(branchesTab).toBeTruthy();

        await driver.sleep(500);
        // Registered Email
        const verifyEmail = await driver.findElement(By.css("#navbarNav > ul:nth-child(2) > li:nth-child(1) > a")).getText();
        await expect(verifyEmail).toBe(userEmail);

        await driver.sleep(500);
        // Logout Button
        const logoutButton = await driver.findElement(By.css("button[class='btn btn-link nav-link']"));
        await expect(logoutButton).toBeTruthy();

    }, timeout);
    
    afterEach(async () => {
        await driver.close();
    });
});

