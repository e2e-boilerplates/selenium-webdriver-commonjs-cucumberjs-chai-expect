const { Given, When, Then } = require("cucumber");
const { Builder, By } = require("selenium-webdriver");
const { expect } = require("chai");
const chrome = require("selenium-webdriver/chrome");

require("chromedriver");

let browser;
const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

Given(/^Navigate to the sandbox$/, async () => {
  browser = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  await browser.get("https://e2e-boilerplates.github.io/sandbox/");
});

When(/^I am on the sandbox page$/, async () => {
  const title = await browser.getTitle();
  expect(title).to.equal("Sandbox");
});

Then(/^The page header should be "([^"]*)"$/, async expectedHeader => {
  const header = await browser.findElement(By.css("h1"));
  header.getText().then(text => {
    expect(text).to.equal(expectedHeader);
  });
});
