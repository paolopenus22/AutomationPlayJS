const { Builder, By } = require("selenium-webdriver");
const chrome = require('chromedriver');
const jestConfig = require("../Config/jest.config");

describe('Create an admin account', () => {
    let driver;
    let adminEmail = 'test@admin.com';
    let adminPassword = '@dmin';

    beforeEach(async () => {
        jest.setTimeout(100000);
        driver = new Builder().forBrowser('chrome').build();
        await driver.get('http://magenicmovies.azurewebsites.net/movies');
    });

    test('Verify a user can register an admin account using this domain "@admin.com"', async () => {
        //Click register button
        await driver.findElement(By.css('a[href="/register"]')).click();

        //Input admin email
        await driver.findElement(By.css('input[formcontrolname="email"]')).sendKeys(adminEmail);

        //Input password
        await driver.findElement(By.css('input[formcontrolname="password"]')).sendKeys(adminPassword);
        
        //Input First Name
        const adminFirstName = 'Anne';
        await driver.findElement(By.css('input[formcontrolname="firstName"]')).sendKeys(adminFirstName);
        
        //Input Middle Name
        const adminMiddleName = 'Gonzales';
        await driver.findElement(By.css('input[formcontrolname="middleName"]')).sendKeys(adminMiddleName);
        
        //Input Last Name
        const adminLastName = 'Macabale';
        await driver.findElement(By.css('input[formcontrolname="lastName"]')).sendKeys(adminLastName);

        //Input Birthday
        const adminBday = '1994-10-11';
        await driver.findElement(By.css('input[formcontrolname="birthDay"]')).sendKeys(adminBday);
        
        //Click Register/Submit Button
        await driver.findElement(By.css('button[type="submit"]')).click();
    });

    test('Verify an admin user can login to Movie App using the user created from AC1.', async () => {      
        //Click Login
        await driver.findElement(By.css('a[href="/login"]')).click();

        //Input registered email
        await driver.findElement(By.css('input[formcontrolname="email"]')).sendKeys(adminEmail);

        //Input password
        await driver.findElement(By.css('input[formcontrolname="password"]')).sendKeys(adminPassword);

        //Click Login Button
        await driver.findElement(By.css('button[type="submit"]')).click();
    });

    test('Verify the landing page after login. Tabs, registered email and logout button', async () => {
        //Click Login
        await driver.findElement(By.css('a[href="/login"]')).click();

        //Input registered email
        await driver.findElement(By.css('input[formcontrolname="email"]')).sendKeys(adminEmail);

        //Input password
        await driver.findElement(By.css('input[formcontrolname="password"]')).sendKeys(adminPassword);

        //Click Login Button
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.sleep(500);
        const movieTab = await driver.findElement(By.css('a[href="/movies"]'));
        await expect(movieTab).toBeTruthy();

        await driver.sleep(500);
        const branchesTab = await driver.findElement(By.css('a[href="/branches"]'));
        await expect(branchesTab).toBeTruthy();

        await driver.sleep(500);
        const adminTab = await driver.findElement(By.css('a[href="/admin"]'));
        await expect(adminTab).toBeTruthy();
        
        await driver.sleep(500);
        const verifyAdmin = await driver.findElement(By.css('#navbarNav > ul:nth-child(2) > li:nth-child(1) > a')).getText();
        await expect(verifyAdmin).toEqual(adminEmail);

        await driver.sleep(500);
        const logoutButton = await driver.findElement(By.css('.btn.btn-link.nav-link'));
        await expect(logoutButton).toBeTruthy();
    });

    afterEach(async () => {
        await driver.close();
    });
});
