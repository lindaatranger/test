const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Selenium Sample Test', function() {
    let driver;

    // Set the timeout for the tests (optional)
    this.timeout(30000); // 30 seconds

    // Setup the WebDriver before running tests
      // Setup the WebDriver before running tests
      before(async function() {
        // Set Chrome options for headless mode
        const options = new chrome.Options();
        options.addArguments('--headless'); // Run in headless mode
        options.addArguments('--disable-gpu'); // Disable GPU acceleration (optional)
        options.addArguments('--no-sandbox'); // Bypass OS security model (optional)
        options.addArguments('--window-size=1920,1080'); // Set window size

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    // Quit the WebDriver after tests
    after(async function() {
        await driver.quit();
    });

    it('should be able to login', async function() {
        await driver.get('https://dev.rangerrfx.com');

       //Wait the email field is visible and enabled
        const loginEmailField = await driver.wait(until.elementLocated(By.id('1-email')), 10000);
        await driver.wait(until.elementIsVisible(loginEmailField), 10000);
        await driver.wait(until.elementIsEnabled(loginEmailField), 10000);
        await loginEmailField.sendKeys("linda502@hotmail.com");

        // Wait for the password field to be present and visible
        await driver.wait(until.elementLocated(By.id('1-password')), 10000);
        const loginPwdField = await driver.findElement(By.id('1-password'));
        await loginPwdField.sendKeys("Pass1234");

        // Wait for the login button to be present and clickable
        const loginBtn = await driver.wait(until.elementLocated(By.id('1-submit')), 10000);
        await driver.wait(until.elementIsVisible(loginBtn), 10000); // Ensure it's visible
        await loginBtn.click();

        // Wait for the page to load and the title to change
        await driver.wait(until.titleIs('RangerRFX'), 10000);

        // Get the title after the login
        const dashboardPageTitle = await driver.getTitle();
        assert.strictEqual(dashboardPageTitle, 'RangerRFX');
    });
});
