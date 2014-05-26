var baseAction = require("./base");
var remote = require("../remote");
var Const = require("../const");

module.exports = baseAction(Const.ABOUT, true, function(resolve, reject) {
  remote.get("/riak/test/about").then(resolve);
});
