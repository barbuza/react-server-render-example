var baseAction = require("./base");
var Const = require("../const");

module.exports = baseAction(Const.NOT_FOUND, true, function(resolve) {
  resolve();
});
