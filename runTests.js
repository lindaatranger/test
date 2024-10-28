const Mocha = require('mocha');
const path = require('path');
const fs = require('fs');

// Create a new Mocha instance
const mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        reportFilename: 'report',
        reportDir: 'reports',
        quiet: true,
    },
});

// Read the test directory and add each test file
const testDir = path.join(__dirname, 'tests');
fs.readdirSync(testDir).filter(file => {
    // Only include .js files
    return file.endsWith('.js');
}).forEach(file => {
    mocha.addFile(path.join(testDir, file));
});

// Run the tests
mocha.run(failures => {
    process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
});
