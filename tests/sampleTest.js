const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Selenium Sample Test', function() {
    let driver;

    // Set the timeout for the tests (optional)
    this.timeout(30000); // 30 seconds

    // Setup the WebDriver before running tests
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Quit the WebDriver after tests
    after(async function() {
        await driver.quit();
    });

    it('should be able to login', async function() {
        await driver.get('https://dev.rangerrfx.com');
        
        const loginEmailField = await driver.findElement(By.id('1-email'));
        await loginEmailField.sendKeys("linda@rangerrfx.com");
        const loginPwdField = await driver.findElement(By.id('1-password'));
        await loginPwdField.sendKeys("Pass1234");
        const loginBtn = await driver.findElement(By.id('1-submit'));
        await loginBtn.click();
        
       
       

       // assert.strictEqual(title, 'Example Domain');
    });

    // it('should find and interact with an element', async function() {
    //     await driver.get('https://example.com');
        
    //     // Find the element by its tag name and click on it (if applicable)
    //     const moreInfoLink = await driver.findElement(By.css('a'));
    //     assert.strictEqual(await moreInfoLink.getText(), 'More information...');

    //     // Click the link
    //     await moreInfoLink.click();

    //     // Wait for the new page to load and verify the title
    //     await driver.wait(until.titleIs('IANA — IANA-managed Reserved Domains'), 10000);
    // });
});
