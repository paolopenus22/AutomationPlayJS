let LandingPage = require('../PageModels/LandingPage');

describe('test', () => {
    
    beforeEach(async () => {
        this.landingPage = new LandingPage();
        jest.setTimeout(30000);
        await this.landingPage.navigateToMoviesApp();
    });
    test('Demo', async () => {
        await this.landingPage.isPageLoaded();
        await this.landingPage.clickLoginButton();
    });
    test('Demo1', async () => {
        await this.landingPage.clickRegisterButton();
    });
    afterEach(async () => {
        await this.landingPage.closeMoviesApp();
    });
});
