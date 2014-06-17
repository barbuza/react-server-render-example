var baseAction = require("./base");
var Const = require("../const");

module.exports = baseAction(Const.PAGE, false, function(resolve, reject, match) {
  resolve({
    title: "page " + match.name
  });
});
