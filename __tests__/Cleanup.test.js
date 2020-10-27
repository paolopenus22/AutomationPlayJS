let CleanUp = require('../utils/cleanup');

describe('Deleting Data in API', () => {

    beforeEach(async () => {
        this.cleanupPage = new CleanUp();
        jest.setTimeout(40000);
    });

    // Go to https://magenicmovies-api.azurewebsites.net/users
    // and check the ID of the EMAIL you want to delete
    // Insert in deleteUser() function as a parameter
    // and run this specific test "jest -t DeleteSpecificUSER"
    test('DeleteSpecificUSER', async () => {
        await this.cleanupPage.deleteUser(78);
    });

    // Go to https://magenicmovies-api.azurewebsites.net/branches
    // and check the ID of the BRANCH you want to delete
    // Insert in deleteBranch() function as a parameter
    // and run this specific test "jest -t DeleteSpecificBRANCH"
    test('DeleteSpecificBRANCH', async () => {
        await this.cleanupPage.deleteBranch(5);
    });

    // Go to https://magenicmovies-api.azurewebsites.net/cinemas
    // and check the ID of the cinema you want to delete
    // Insert in deleteUser() function as a parameter
    // and run this specific test "jest -t DeleteSpecificCINEMA"
    test('DeleteSpecificCINEMA', async () => {
        await this.cleanupPage.deleteCinema(5);
    });
});

