import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import assert from "assert";

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const SELENIUM_URL = process.env.SELENIUM_URL || "http://localhost:4444/wd/hub";

async function run() {
  const driver = new Builder()
    .forBrowser("chrome")
    .usingServer(SELENIUM_URL)
    .setChromeOptions(new chrome.Options().addArguments("--headless=new"))
    .build();

  try {
    await driver.get(APP_URL);
    await driver.findElement(By.name("q")).sendKeys("selenium test");
    await driver.findElement(By.css("button[type=submit]")).click();

    await driver.wait(until.elementLocated(By.id("term")), 5000);
    const resultText = await driver.findElement(By.id("term")).getText();
    assert.strictEqual(resultText, "selenium test");

    console.log("Selenium UI test passed.");
  } finally {
    await driver.quit();
  }
}

run().catch((err) => {
  console.error("Selenium UI test failed:", err);
  process.exit(1);
});
