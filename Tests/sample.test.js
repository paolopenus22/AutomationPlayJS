const { Builder } = require("selenium-webdriver");
const chrome = require('chromedriver');

describe('test', () => {
    let driver = new Builder().forBrowser('chrome').build();
    let timeout = 100000;

    test('Demo', async () => {
       await driver.get(location.href);
        }, timeout);

    afterEach(async () => {
        await driver.close();
    });
});

