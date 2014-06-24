var chai = require("chai");
var chaiWebdriver = require("chai-webdriver");
var sizzle = require("webdriver-sizzle");

var webdriver = require("selenium-webdriver");

webdriver.WebElement.prototype.mouseMove = function() {
  return this.getDriver().actions().mouseMove(this).perform();
};

chai.use(require("chai-as-promised"));

module.exports = {
  test: require("selenium-webdriver/testing"),
  makeDriver: function(url) {
    var driver = new webdriver.Builder()
          .withCapabilities(webdriver.Capabilities.chrome())
          .build();

    chai.use(chaiWebdriver(driver));
    if (typeof url === "string") {
      driver.get(url);
    }
    return {
      driver: driver,
      $: sizzle(driver),
      sleep: function(duration) {
        return driver.sleep(duration);
      }
    }
  },
  expect: chai.expect,
  assert: chai.assert
};
