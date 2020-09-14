const { Builder } = require("selenium-webdriver");
const chrome = require('chromedriver');

const driver = new Builder().forBrowser('chrome').build();

async function Demo() {
    await driver.get('https://www.youtube.com/');
    await driver.close();
}

Demo();