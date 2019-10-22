const { Given, When, Then, AfterAll } = require("cucumber");
const { Builder, By, Capabilities, Key, until } = require("selenium-webdriver");
const { expect } = require("chai");

require("chromedriver");

const capabilities = Capabilities.chrome();
capabilities.set("chromeOptions", { w3c: false });
const browser = new Builder().withCapabilities(capabilities).build();

Given("I am on the Google search page", async () => {
  await browser.get("https://www.google.com");
});

When("I search for {string}", async searchWord => {
  const element = await browser.findElement(By.name("q"));
  element.sendKeys(searchWord, Key.RETURN);
  element.submit();
});

Then("the page title should start with {string}", async searchWord => {
  await browser.wait(until.urlContains("search"), 5000);

  const title = await browser.getTitle();
  const words = title.split(" ");
  expect(words[0]).to.equal(searchWord);
});

AfterAll("end", async () => {
  await browser.quit();
});
